import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { ACHIEVEMENTS } from "@/content/curriculum";
import { calculateMastery, type TopicMasteryRecord } from "./mastery";
import { completeLesson, type CompleteLessonResult, type SubmittedAnswer } from "./progress.functions";
import { closeTrade, getPaperAccount, openTrade } from "./trading.functions";

export type Profile = {
  id: string;
  display_name: string;
  experience_level: string;
  goal: string;
  daily_goal_xp: number;
  onboarded: boolean;
  xp: number;
  level: number;
  streak_count: number;
  longest_streak: number;
  last_active_date: string | null;
  cash_balance: number;
};

export type LessonProgress = {
  lesson_id: string;
  world_id: string;
  completed: boolean;
  best_score: number;
  total_questions: number;
  attempts: number;
};

export type Trade = {
  id: string;
  symbol: string;
  side: string;
  quantity: number;
  entry_price: number;
  exit_price: number | null;
  stop_loss: number | null;
  take_profit: number | null;
  status: string;
  pnl: number | null;
  risk_amount: number | null;
  notes: string | null;
  opened_at: string;
  closed_at: string | null;
};

export type JournalEntry = {
  id: string;
  trade_id: string | null;
  title: string;
  notes: string;
  mood: string;
  lesson_learned: string;
  created_at: string;
};

async function requireUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("Your session expired. Please sign in again.");
  return data.user.id;
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<Profile> => {
      const uid = await requireUserId();
      const { data, error } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
      if (error) throw error;
      if (!data) {
        const { data: created, error: insErr } = await supabase
          .from("profiles")
          .insert({ id: uid })
          .select("*")
          .single();
        if (insErr) throw insErr;
        return created as unknown as Profile;
      }
      return data as unknown as Profile;
    },
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    // Only cosmetic / preference fields — XP, level, streak and balance are
    // server-owned and are never written from the browser.
    mutationFn: async (patch: Partial<Pick<Profile, "display_name" | "experience_level" | "goal" | "daily_goal_xp" | "onboarded">>) => {
      const uid = await requireUserId();
      const { error } = await supabase.from("profiles").update(patch).eq("id", uid);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
}

export function useProgress() {
  return useQuery({
    queryKey: ["progress"],
    queryFn: async (): Promise<LessonProgress[]> => {
      const uid = await requireUserId();
      const { data, error } = await supabase.from("lesson_progress").select("*").eq("user_id", uid);
      if (error) throw error;
      return (data ?? []) as unknown as LessonProgress[];
    },
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: async (): Promise<{ code: string; earned_at: string }[]> => {
      const uid = await requireUserId();
      const { data, error } = await supabase
        .from("achievements")
        .select("code, earned_at")
        .eq("user_id", uid);
      if (error) throw error;
      return (data ?? []) as { code: string; earned_at: string }[];
    },
  });
}

export function useTopicStats() {
  return useQuery({
    queryKey: ["topic-stats"],
    queryFn: async (): Promise<TopicMasteryRecord[]> => {
      const uid = await requireUserId();
      const { data, error } = await supabase
        .from("question_attempts")
        .select("topic, correct, created_at")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;

      const map = new Map<string, {
        attempts: number;
        correct: number;
        recentAttempts: number;
        recentCorrect: number;
        lastPracticed: string | null;
      }>();

      for (const row of (data ?? []) as { topic: string; correct: boolean; created_at: string }[]) {
        const entry = map.get(row.topic) ?? {
          attempts: 0,
          correct: 0,
          recentAttempts: 0,
          recentCorrect: 0,
          lastPracticed: row.created_at,
        };
        entry.attempts += 1;
        if (row.correct) entry.correct += 1;
        if (entry.recentAttempts < 5) {
          entry.recentAttempts += 1;
          if (row.correct) entry.recentCorrect += 1;
        }
        if (!entry.lastPracticed || row.created_at > entry.lastPracticed) entry.lastPracticed = row.created_at;
        map.set(row.topic, entry);
      }

      const stats = [...map.entries()].map(([topic, value]) => ({
        topic,
        ...calculateMastery(value),
      }));

      return stats.sort((a, b) =>
        b.reviewPriorityScore - a.reviewPriorityScore ||
        a.accuracy - b.accuracy ||
        a.topic.localeCompare(b.topic),
      );
    },
  });
}mport { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { ACHIEVEMENTS, TOPIC_LABELS } from "@/content/curriculum";
import { calculateMastery, recommendTopic, type TopicMasteryRecord } from "./mastery";
import { completeLesson, type CompleteLessonResult, type SubmittedAnswer } from "./progress.functions";
import { closeTrade, getPaperAccount, openTrade } from "./trading.functions";

export type Profile = {
  id: string;
  display_name: string;
  experience_level: string;
  goal: string;
  daily_goal_xp: number;
  onboarded: boolean;
  xp: number;
  level: number;
  streak_count: number;
  longest_streak: number;
  last_active_date: string | null;
  cash_balance: number;
};

export type LessonProgress = {
  lesson_id: string;
  world_id: string;
  completed: boolean;
  best_score: number;
  total_questions: number;
  attempts: number;
};

export type Trade = {
  id: string;
  symbol: string;
  side: string;
  quantity: number;
  entry_price: number;
  exit_price: number | null;
  stop_loss: number | null;
  take_profit: number | null;
  status: string;
  pnl: number | null;
  risk_amount: number | null;
  notes: string | null;
  opened_at: string;
  closed_at: string | null;
};

export type JournalEntry = {
  id: string;
  trade_id: string | null;
  title: string;
  notes: string;
  mood: string;
  lesson_learned: string;
  created_at: string;
};

async function requireUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("Your session expired. Please sign in again.");
  return data.user.id;
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<Profile> => {
      const uid = await requireUserId();
      const { data, error } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
      if (error) throw error;
      if (!data) {
        const { data: created, error: insErr } = await supabase
          .from("profiles")
          .insert({ id: uid })
          .select("*")
          .single();
        if (insErr) throw insErr;
        return created as unknown as Profile;
      }
      return data as unknown as Profile;
    },
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    // Only cosmetic / preference fields — XP, level, streak and balance are
    // server-owned and are never written from the browser.
    mutationFn: async (patch: Partial<Pick<Profile, "display_name" | "experience_level" | "goal" | "daily_goal_xp" | "onboarded">>) => {
      const uid = await requireUserId();
      const { error } = await supabase.from("profiles").update(patch).eq("id", uid);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
}

export function useProgress() {
  return useQuery({
    queryKey: ["progress"],
    queryFn: async (): Promise<LessonProgress[]> => {
      const uid = await requireUserId();
      const { data, error } = await supabase.from("lesson_progress").select("*").eq("user_id", uid);
      if (error) throw error;
      return (data ?? []) as unknown as LessonProgress[];
    },
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: async (): Promise<{ code: string; earned_at: string }[]> => {
      const uid = await requireUserId();
      const { data, error } = await supabase
        .from("achievements")
        .select("code, earned_at")
        .eq("user_id", uid);
      if (error) throw error;
      return (data ?? []) as { code: string; earned_at: string }[];
    },
  });
}

export function useTopicStats() {
  return useQuery({
    queryKey: ["topic-stats"],
    queryFn: async () => {
      const uid = await requireUserId();
      const { data, error } = await supabase
        .from("question_attempts")
        .select("topic, correct")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      const map = new Map<string, { total: number; correct: number }>();
      for (const row of (data ?? []) as { topic: string; correct: boolean }[]) {
        const e = map.get(row.topic) ?? { total: 0, correct: 0 };
        e.total += 1;
        if (row.correct) e.correct += 1;
        map.set(row.topic, e);
      }
      return [...map.entries()]
        .map(([topic, v]) => ({ topic, ...v, accuracy: v.correct / v.total }))
        .sort((a, b) => a.accuracy - b.accuracy);
    },
  });
}

/**
 * Lesson completion. The browser only sends the raw answers — grading, XP,
 * level, streak and achievements are all decided by the server.
 */
export function useCompleteLesson() {
  const qc = useQueryClient();
  const submit = useServerFn(completeLesson);
  return useMutation({
    mutationFn: async (input: { lessonId: string; answers: SubmittedAnswer[] }): Promise<CompleteLessonResult> =>
      submit({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      qc.invalidateQueries({ queryKey: ["progress"] });
      qc.invalidateQueries({ queryKey: ["achievements"] });
      qc.invalidateQueries({ queryKey: ["topic-stats"] });
      qc.invalidateQueries({ queryKey: ["today-xp"] });
    },
  });
}

export function usePaperAccount() {
  const load = useServerFn(getPaperAccount);
  return useQuery({
    queryKey: ["paper-account"],
    queryFn: () => load({ data: undefined as never }),
  });
}

export function useTrades() {
  return useQuery({
    queryKey: ["trades"],
    queryFn: async (): Promise<Trade[]> => {
      const uid = await requireUserId();
      const { data, error } = await supabase
        .from("paper_trades")
        .select("*")
        .eq("user_id", uid)
        .order("opened_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Trade[];
    },
  });
}

export function useOpenTrade() {
  const qc = useQueryClient();
  const call = useServerFn(openTrade);
  return useMutation({
    mutationFn: (input: {
      symbol: string;
      side: "long" | "short";
      riskPct: number;
      stopLoss: number;
      takeProfit: number | null;
    }) => call({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trades"] });
      qc.invalidateQueries({ queryKey: ["paper-account"] });
      qc.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
}

export function useCloseTrade() {
  const qc = useQueryClient();
  const call = useServerFn(closeTrade);
  return useMutation({
    mutationFn: (input: { tradeId: string }) => call({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trades"] });
      qc.invalidateQueries({ queryKey: ["paper-account"] });
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useJournal() {
  return useQuery({
    queryKey: ["journal"],
    queryFn: async (): Promise<JournalEntry[]> => {
      const uid = await requireUserId();
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as JournalEntry[];
    },
  });
}

export function useAddJournal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry: {
      title: string;
      notes: string;
      mood: string;
      lesson_learned: string;
      trade_id?: string | null;
    }) => {
      const uid = await requireUserId();
      const { error } = await supabase.from("journal_entries").insert({ ...entry, user_id: uid });
      if (error) throw error;
      const { count } = await supabase
        .from("journal_entries")
        .select("id", { count: "exact", head: true })
        .eq("user_id", uid);
      if ((count ?? 0) >= 3) {
        await supabase
          .from("achievements")
          .upsert({ user_id: uid, code: "journal_3" }, { onConflict: "user_id,code" });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["journal"] });
      qc.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
}

export const ACHIEVEMENT_MAP = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.code, a]));
