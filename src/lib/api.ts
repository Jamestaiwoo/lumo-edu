import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ACHIEVEMENTS, WORLDS, type Lesson } from "@/content/curriculum";
import { levelFromXp, nextStreak, todayISO } from "./game";

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
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Not signed in");
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
    mutationFn: async (patch: Partial<Profile>) => {
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

export type LessonResult = {
  questionId: string;
  topic: string;
  correct: boolean;
};

export function useCompleteLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      lesson,
      worldId,
      results,
    }: {
      lesson: Lesson;
      worldId: string;
      results: LessonResult[];
    }) => {
      const uid = await requireUserId();
      const correct = results.filter((r) => r.correct).length;
      const total = results.length;

      await supabase.from("question_attempts").insert(
        results.map((r) => ({
          user_id: uid,
          lesson_id: lesson.id,
          question_id: r.questionId,
          topic: r.topic,
          correct: r.correct,
        })),
      );

      const { data: existing } = await supabase
        .from("lesson_progress")
        .select("*")
        .eq("user_id", uid)
        .eq("lesson_id", lesson.id)
        .maybeSingle();

      const prev = existing as unknown as (LessonProgress & { id: string }) | null;
      const bestScore = Math.max(prev?.best_score ?? 0, correct);
      const wasCompleted = prev?.completed ?? false;

      await supabase.from("lesson_progress").upsert(
        {
          user_id: uid,
          lesson_id: lesson.id,
          world_id: worldId,
          completed: true,
          best_score: bestScore,
          total_questions: total,
          attempts: (prev?.attempts ?? 0) + 1,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,lesson_id" },
      );

      const { data: prof } = await supabase.from("profiles").select("*").eq("id", uid).single();
      const profile = prof as unknown as Profile;

      const gained = Math.round((lesson.xp * correct) / Math.max(total, 1)) + (wasCompleted ? 0 : 10);
      const newXp = profile.xp + gained;
      const { streak } = nextStreak(profile.last_active_date, profile.streak_count);
      const { level } = levelFromXp(newXp);

      await supabase
        .from("profiles")
        .update({
          xp: newXp,
          level,
          streak_count: streak,
          longest_streak: Math.max(profile.longest_streak, streak),
          last_active_date: todayISO(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", uid);

      // Achievements
      const earned: string[] = [];
      const { data: progressRows } = await supabase
        .from("lesson_progress")
        .select("lesson_id, world_id, completed")
        .eq("user_id", uid);
      const done = (progressRows ?? []) as { lesson_id: string; world_id: string; completed: boolean }[];

      if (done.filter((d) => d.completed).length >= 1) earned.push("first_lesson");
      if (correct === total) earned.push("perfect_lesson");
      if (streak >= 3) earned.push("streak_3");
      if (streak >= 7) earned.push("streak_7");
      if (level >= 5) earned.push("level_5");
      const w1 = WORLDS[0];
      if (w1 && w1.lessons.every((l) => done.some((d) => d.lesson_id === l.id && d.completed)))
        earned.push("world_1");

      if (earned.length) {
        await supabase
          .from("achievements")
          .upsert(
            earned.map((code) => ({ user_id: uid, code })),
            { onConflict: "user_id,code" },
          );
      }

      return { correct, total, gained, streak, level, newAchievements: earned };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      qc.invalidateQueries({ queryKey: ["progress"] });
      qc.invalidateQueries({ queryKey: ["achievements"] });
      qc.invalidateQueries({ queryKey: ["topic-stats"] });
    },
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
  return useMutation({
    mutationFn: async (t: {
      symbol: string;
      side: string;
      quantity: number;
      entry_price: number;
      stop_loss: number | null;
      take_profit: number | null;
      risk_amount: number | null;
      notes?: string;
    }) => {
      const uid = await requireUserId();
      const { error } = await supabase.from("paper_trades").insert({ ...t, user_id: uid });
      if (error) throw error;
      await supabase.from("achievements").upsert({ user_id: uid, code: "first_trade" }, { onConflict: "user_id,code" });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trades"] });
      qc.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
}

export function useCloseTrade() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ trade, exitPrice }: { trade: Trade; exitPrice: number }) => {
      const uid = await requireUserId();
      const dir = trade.side === "short" ? -1 : 1;
      const pnl = +((exitPrice - Number(trade.entry_price)) * Number(trade.quantity) * dir).toFixed(2);
      const { error } = await supabase
        .from("paper_trades")
        .update({
          status: "closed",
          exit_price: exitPrice,
          pnl,
          closed_at: new Date().toISOString(),
        })
        .eq("id", trade.id);
      if (error) throw error;
      const { data: prof } = await supabase.from("profiles").select("cash_balance").eq("id", uid).single();
      const bal = Number((prof as { cash_balance: number } | null)?.cash_balance ?? 10000);
      await supabase.from("profiles").update({ cash_balance: +(bal + pnl).toFixed(2) }).eq("id", uid);
      return pnl;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trades"] });
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
