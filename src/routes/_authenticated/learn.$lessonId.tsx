import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, ChevronLeft, Flame, Trophy, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Disclaimer } from "@/components/Disclaimer";
import { getLesson, worldOfLesson, type Question } from "@/content/curriculum";
import { useCompleteLesson, ACHIEVEMENT_MAP } from "@/lib/api";
import type { SubmittedAnswer } from "@/lib/progress.functions";
import { ErrorBanner } from "@/components/state/StateViews";

export const Route = createFileRoute("/_authenticated/learn/$lessonId")({
  head: () => ({
    meta: [
      { title: "Lesson — Lumo" },
      { name: "description", content: "Interactive trading questions with instant feedback and explanations." },
      { property: "og:title", content: "Lesson — Lumo" },
      { property: "og:description", content: "Interactive trading questions with instant feedback and explanations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LessonPage,
});

function LessonPage() {
  const { lessonId } = useParams({ from: "/_authenticated/learn/$lessonId" });
  const navigate = useNavigate();
  const lesson = getLesson(lessonId);
  const world = worldOfLesson(lessonId);
  const complete = useCompleteLesson();

  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<SubmittedAnswer[]>([]);
  const [summary, setSummary] = useState<{
    correct: number;
    total: number;
    gained: number;
    streak: number;
    alreadyRewarded: boolean;
    newAchievements: string[];
  } | null>(null);

  const question = lesson?.questions[index];
  const progressPct = useMemo(
    () => (lesson ? ((index + 1) / lesson.questions.length) * 100 : 0),
    [index, lesson],
  );

  if (!lesson || !question || !world) {
    return (
      <div className="mx-auto max-w-md px-5 py-16 text-center">
        <p className="text-sm text-muted-foreground">That lesson doesn't exist.</p>
        <Link to="/learn" className="mt-4 inline-block text-sm font-semibold text-primary">
          Back to the path
        </Link>
      </div>
    );
  }

  const isCorrect = evaluate(question, choice, text);

  async function onCheck() {
    if (!checked) {
      setChecked(true);
      return;
    }
    const raw = question!.type === "numeric" ? text : String(choice ?? "");
    const nextAnswers = [...answers, { questionId: question!.id, raw }];
    setAnswers(nextAnswers);
    setChecked(false);
    setChoice(null);
    setText("");

    if (index + 1 < lesson!.questions.length) {
      setIndex(index + 1);
      return;
    }
    try {
      const res = await complete.mutateAsync({ lessonId: lesson!.id, answers: nextAnswers });
      setSummary(res);
    } catch {
      /* surfaced by the inline error banner below */
    }
  }

  if (summary) {
    const pct = Math.round((summary.correct / summary.total) * 100);
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col gap-5 px-5 py-10">
        <div className="surface glow-primary rounded-3xl border border-primary/30 p-6 text-center">
          <Trophy className="mx-auto size-10 text-accent" aria-hidden />
          <h1 className="mt-3 text-2xl font-bold">Lesson complete</h1>
          <p className="mt-1 text-sm text-muted-foreground">{lesson.title}</p>
          <p className="mt-4 text-4xl font-bold text-primary">{pct}%</p>
          <p className="text-xs text-muted-foreground">
            {summary.correct} of {summary.total} correct
          </p>
          <div className="mt-5 flex justify-center gap-2 text-sm font-semibold">
            <span className="flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1.5 text-primary">
              <Zap className="size-4" aria-hidden />+{summary.gained} XP
            </span>
            <span className="flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1.5 text-accent">
              <Flame className="size-4" aria-hidden />
              {summary.streak} day streak
            </span>
          </div>
          {summary.alreadyRewarded && (
            <p className="mt-3 text-[11px] text-muted-foreground">
              You'd already earned the XP for this lesson — this run counts as practice and your best score is kept.
            </p>
          )}
        </div>


        {summary.newAchievements.length > 0 && (
          <div className="rounded-2xl border border-border/60 bg-card p-4">
            <p className="text-sm font-semibold">Achievements unlocked</p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {summary.newAchievements.map((code) => (
                <li key={code}>🏅 {ACHIEVEMENT_MAP[code]?.title ?? code}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2">
          <Disclaimer />
          <Button className="h-12 font-bold" onClick={() => navigate({ to: "/learn" })}>
            Back to path
          </Button>
          <Button variant="outline" className="h-11" onClick={() => navigate({ to: "/home" })}>
            Go home
          </Button>
        </div>
      </div>
    );
  }

  const answered = question.type === "numeric" ? text.trim() !== "" : choice !== null;

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/learn" })}
          aria-label="Leave lesson"
          className="flex size-9 items-center justify-center rounded-full bg-secondary"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="text-xs font-semibold text-muted-foreground">
          {index + 1}/{lesson.questions.length}
        </span>
      </div>

      <h1 className="mt-8 text-xl font-bold leading-snug">{question.prompt}</h1>

      <div className="mt-6 flex flex-col gap-2.5">
        {question.type === "mcq" &&
          question.options.map((opt, i) => (
            <OptionButton
              key={opt}
              label={opt}
              state={optionState(checked, choice, i, question.answer)}
              onClick={() => !checked && setChoice(i)}
            />
          ))}

        {question.type === "truefalse" &&
          ["True", "False"].map((opt, i) => (
            <OptionButton
              key={opt}
              label={opt}
              state={optionState(checked, choice, i, question.answer ? 0 : 1)}
              onClick={() => !checked && setChoice(i)}
            />
          ))}

        {question.type === "numeric" && (
          <div className="flex items-center gap-2">
            <Input
              inputMode="decimal"
              value={text}
              disabled={checked}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your answer"
              className="h-14 text-lg"
            />
            {question.unit ? <span className="text-sm text-muted-foreground">{question.unit}</span> : null}
          </div>
        )}
      </div>

      <div className="mt-auto pt-8">
        {checked && (
          <div
            className={`mb-3 rounded-2xl border p-4 ${
              isCorrect ? "border-success/50 bg-success/10" : "border-destructive/50 bg-destructive/10"
            }`}
          >
            <p className={`flex items-center gap-2 text-sm font-bold ${isCorrect ? "text-success" : "text-destructive"}`}>
              {isCorrect ? <Check className="size-4" aria-hidden /> : <X className="size-4" aria-hidden />}
              {isCorrect ? "Correct" : "Not quite"}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-foreground/90">{question.explain}</p>
          </div>
        )}
        {complete.isError && (
          <div className="mb-3">
            <ErrorBanner error={complete.error} />
          </div>
        )}
        <Button
          className="h-13 w-full py-4 font-bold"
          disabled={!answered || complete.isPending}
          onClick={onCheck}
        >
          {complete.isPending ? "Saving…" : checked ? "Continue" : "Check answer"}
        </Button>
      </div>
    </div>
  );
}

function optionState(
  checked: boolean,
  choice: number | null,
  index: number,
  answer: number,
): "idle" | "selected" | "correct" | "wrong" {
  if (!checked) return choice === index ? "selected" : "idle";
  if (index === answer) return "correct";
  if (choice === index) return "wrong";
  return "idle";
}

function OptionButton({
  label,
  state,
  onClick,
}: {
  label: string;
  state: "idle" | "selected" | "correct" | "wrong";
  onClick: () => void;
}) {
  const cls = {
    idle: "border-border bg-card",
    selected: "border-primary bg-primary/10",
    correct: "border-success bg-success/15",
    wrong: "border-destructive bg-destructive/15",
  }[state];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition active:scale-[0.99] ${cls}`}
    >
      {label}
    </button>
  );
}

function evaluate(q: Question, choice: number | null, text: string) {
  if (q.type === "mcq") return choice === q.answer;
  if (q.type === "truefalse") return (choice === 0) === q.answer;
  const val = Number(text.replace(/[^0-9.\-]/g, ""));
  if (Number.isNaN(val)) return false;
  return Math.abs(val - q.answer) <= (q.tolerance ?? 0.01);
}
