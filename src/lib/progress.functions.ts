import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { LESSON_ORDER, WORLDS, getLesson, worldOfLesson, type Question } from "@/content/curriculum";
import { isLessonUnlocked } from "./recommendation";
import { advanceStreak, isoDate, lessonXp, levelForXp } from "./scoring";

export type SubmittedAnswer = { questionId: string; raw: string };

export type CompleteLessonResult = {
  correct: number;
  total: number;
  gained: number;
  xp: number;
  level: number;
  streak: number;
  alreadyRewarded: boolean;
  newAchievements: string[];
};

/** Authoritative grading — the client's opinion of correctness is ignored. */
function grade(question: Question, raw: string): boolean {
  const value = (raw ?? "").trim();
  if (question.type === "mcq") return Number(value) === question.answer;
  if (question.type === "truefalse") return (Number(value) === 0) === question.answer;
  const num = Number(value.replace(/[^0-9.-]/g, ""));
  if (!Number.isFinite(num)) return false;
  return Math.abs(num - question.answer) <= (question.tolerance ?? 0.01);
}

export const completeLesson = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { lessonId: string; answers: SubmittedAnswer[] }) => {
    if (!input || typeof input.lessonId !== "string") throw new Error("Missing lesson");
    if (!Array.isArray(input.answers)) throw new Error("Missing answers");
    return {
      lessonId: input.lessonId,
      answers: input.answers.map((a) => ({ questionId: String(a.questionId), raw: String(a.raw ?? "") })),
    };
  })
  .handler(async ({ data, context }): Promise<CompleteLessonResult> => {
    const { supabase, userId } = context;
    const lesson = getLesson(data.lessonId);
    const world = worldOfLesson(data.lessonId);
    if (!lesson || !world) throw new Error("That lesson doesn't exist.");

    // Enforce the learning path on the server as well as in the UI.
    // A client must never be able to submit a locked lesson by calling this function directly.
    const lessonIndex = LESSON_ORDER.indexOf(lesson.id);
    if (lessonIndex > 0) {
      const previousLessonId = LESSON_ORDER[lessonIndex - 1];
      const { data: previousProgress, error: previousProgressErr } = await supabase
        .from("lesson_progress")
        .select("completed")
        .eq("user_id", userId)
        .eq("lesson_id", previousLessonId)
        .maybeSingle();
      if (previousProgressErr) throw new Error(previousProgressErr.message);
      if (!previousProgress?.completed) throw new Error("Finish the previous lesson first.");
    }

    // ---- grade on the server
    const graded = lesson.questions.map((q) => {
      const submitted = data.answers.find((a) => a.questionId === q.id);
      return { question: q, correct: submitted ? grade(q, submitted.raw) : false };
    });
    const total = graded.length;
    const correct = graded.filter((g) => g.correct).length;

    const { error: attemptErr } = await supabase.from("question_attempts").insert(
      graded.map((g) => ({
        user_id: userId,
        lesson_id: lesson.id,
        question_id: g.question.id,
        topic: g.question.topic,
        correct: g.correct,
      })),
    );
    if (attemptErr) throw new Error(attemptErr.message);

    // ---- idempotent reward claim: one row per lesson, ever
    const sourceKey = `lesson:${lesson.id}`;
    const { error: claimErr } = await supabase
      .from("reward_events")
      .insert({ user_id: userId, source_key: sourceKey, kind: "lesson_complete", xp_awarded: 0 });
    const alreadyRewarded = Boolean(claimErr);
    if (claimErr && claimErr.code !== "23505") throw new Error(claimErr.message);

    // ---- lesson progress (best score / attempts always recorded)
    const { data: prev } = await supabase
      .from("lesson_progress")
      .select("best_score, attempts")
      .eq("user_id", userId)
      .eq("lesson_id", lesson.id)
      .maybeSingle();

    const nowIso = new Date().toISOString();
    const { error: progErr } = await supabase.from("lesson_progress").upsert(
      {
        user_id: userId,
        lesson_id: lesson.id,
        world_id: world.id,
        completed: true,
        best_score: Math.max(prev?.best_score ?? 0, correct),
        total_questions: total,
        attempts: (prev?.attempts ?? 0) + 1,
        completed_at: nowIso,
        updated_at: nowIso,
      },
      { onConflict: "user_id,lesson_id" },
    );
    if (progErr) throw new Error(progErr.message);

    // ---- profile totals, computed here and nowhere else
    const { data: prof, error: profErr } = await supabase
      .from("profiles")
      .select("xp, level, streak_count, longest_streak, last_active_date")
      .eq("id", userId)
      .single();
    if (profErr || !prof) throw new Error(profErr?.message ?? "Profile not found");

    const today = isoDate();
    const gained = lessonXp({ lessonXp: lesson.xp, correct, total, alreadyRewarded });
    const newXp = Math.max(0, prof.xp ?? 0) + gained;
    const level = levelForXp(newXp);
    const { streak } = advanceStreak(prof.last_active_date, prof.streak_count ?? 0, today);

    const { error: updErr } = await supabase
      .from("profiles")
      .update({
        xp: newXp,
        level,
        streak_count: streak,
        longest_streak: Math.max(prof.longest_streak ?? 0, streak),
        last_active_date: today,
        updated_at: nowIso,
      })
      .eq("id", userId);
    if (updErr) throw new Error(updErr.message);

    if (gained > 0) {
      await supabase
        .from("reward_events")
        .update({ xp_awarded: gained })
        .eq("user_id", userId)
        .eq("source_key", sourceKey);
    }

    // ---- achievements, decided on the server
    const { data: progressRows } = await supabase
      .from("lesson_progress")
      .select("lesson_id, completed")
      .eq("user_id", userId);
    const done = (progressRows ?? []) as { lesson_id: string; completed: boolean }[];

    const candidates: string[] = [];
    if (done.some((d) => d.completed)) candidates.push("first_lesson");
    if (total > 0 && correct === total) candidates.push("perfect_lesson");
    if (streak >= 3) candidates.push("streak_3");
    if (streak >= 7) candidates.push("streak_7");
    if (level >= 5) candidates.push("level_5");
    const w1 = WORLDS[0];
    if (w1 && w1.lessons.every((l) => done.some((d) => d.lesson_id === l.id && d.completed)))
      candidates.push("world_1");

    let newAchievements: string[] = [];
    if (candidates.length) {
      const { data: existing } = await supabase
        .from("achievements")
        .select("code")
        .eq("user_id", userId)
        .in("code", candidates);
      const have = new Set((existing ?? []).map((r) => r.code));
      newAchievements = candidates.filter((c) => !have.has(c));
      if (newAchievements.length) {
        await supabase
          .from("achievements")
          .upsert(
            newAchievements.map((code) => ({ user_id: userId, code })),
            { onConflict: "user_id,code" },
          );
      }
    }

    return { correct, total, gained, xp: newXp, level, streak, alreadyRewarded, newAchievements };
  });
