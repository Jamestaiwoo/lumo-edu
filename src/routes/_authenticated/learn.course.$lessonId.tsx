import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, Lock, Target, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Disclaimer } from "@/components/Disclaimer";
import { useCompleteLesson, useProgress, type LessonProgress } from "@/lib/api";
import { ErrorBanner, LoadingState } from "@/components/state/StateViews";
import { getCourseLesson, getModuleOfLesson, lessonQuestions } from "@/content/course";
import { isLessonUnlocked, nextLessonIdInTrack } from "@/lib/recommendation";
import { buildSubmission } from "@/lib/lesson-feedback";
import type { CompleteLessonResult } from "@/lib/progress.functions";
import {
  ExplainBlockView,
  ExampleBlockView,
  SummaryBlockView,
  ReflectionBlockView,
} from "@/components/lesson/blocks/TeachingBlocks";
import { VisualBlockView } from "@/components/lesson/blocks/VisualBlockView";
import { InteractionView } from "@/components/lesson/interactions/InteractionView";
import { AssessmentBlockView, type BlockAnswers } from "@/components/lesson/AssessmentBlockView";

export const Route = createFileRoute("/_authenticated/learn/course/$lessonId")({
  head: () => ({ meta: [{ title: "Lesson — Lumo" }] }),
  component: CourseLessonPage,
});
const EYEBROW: Record<string, string> = {
  practice: "Guided practice",
  check: "Knowledge check",
  scenario: "Scenario",
};

function CourseLessonPage() {
  const params = Route.useParams();
  const lesson = getCourseLesson(params.lessonId);
  const navigate = useNavigate();
  const complete = useCompleteLesson();
  const progressQuery = useProgress();
  const [answers, setAnswers] = useState<BlockAnswers>({});
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [done, setDone] = useState<{ correct: number; total: number; gained: number } | null>(null);
  const questions = useMemo(() => (lesson ? lessonQuestions(lesson) : []), [lesson]);
  const answered = questions.filter((q) => {
    const v = answers[q.id];
    return v !== undefined && v !== "";
  }).length;
  const total = questions.length;
  const ready = total > 0 && answered === total;
  const onAnswer = (questionId: string, raw: string) => {
    if (done || complete.isPending) return;
    setAnswers((prev) => ({ ...prev, [questionId]: raw }));
  };
  const submit = () => {
    complete.mutate(
      { lessonId: lesson!.id, answers: buildSubmission(questions, answers) },
      {
        onSuccess: (r: CompleteLessonResult) =>
          setDone({ correct: r.correct, total: r.total, gained: r.gained }),
      },
    );
  };

  const completedIds = ((progressQuery.data ?? []) as LessonProgress[])
    .filter((p: LessonProgress) => p.completed)
    .map((p: LessonProgress) => p.lesson_id);
  const mod = getModuleOfLesson(lesson?.id ?? "");
  const nextId = lesson ? nextLessonIdInTrack(lesson.id) : null;

  if (progressQuery.isPending) return <LoadingState label="Loading lesson…" rows={4} />;
  if (progressQuery.isError) {
    return (
      <div className="mx-auto max-w-md px-5 py-16 text-center">
        <p className="text-sm text-muted-foreground">We could not verify your progress.</p>
        <Button className="mt-4" onClick={() => progressQuery.refetch()}>
          Try again
        </Button>
      </div>
    );
  }
  if (!lesson) {
    return (
      <div className="mx-auto max-w-md px-5 py-16 text-center">
        <p className="text-sm text-muted-foreground">That lesson does not exist.</p>
        <Link to="/learn" className="mt-4 inline-block text-sm font-semibold text-primary">
          Back to the path
        </Link>
      </div>
    );
  }
  if (!isLessonUnlocked(lesson.id, completedIds)) {
    return (
      <div className="mx-auto max-w-md px-5 py-16 text-center">
        <Lock className="mx-auto size-6 text-muted-foreground" />
        <p className="mt-3 text-sm font-bold">Finish the previous lesson first.</p>
        <Link to="/learn" className="mt-4 inline-block text-sm font-semibold text-primary">
          Back to the path
        </Link>
      </div>
    );
  }
  if (done) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col items-center justify-center px-5 py-10 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-success/15">
          <Trophy className="size-7 text-success" />
        </span>
        <h1 className="mt-4 text-xl font-bold">Lesson complete</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lesson.title} · {done.correct}/{done.total} · +{done.gained} XP
        </p>
        <p className="mt-3 rounded-2xl border bg-card p-3 text-xs leading-relaxed">
          {lesson.keyTakeaway}
        </p>
        <div className="mt-4 flex w-full gap-2">
          <Button
            variant="secondary"
            className="h-12 flex-1"
            onClick={() => navigate({ to: "/learn" })}
          >
            Course path
          </Button>
          {nextId ? (
            <Button
              className="h-12 flex-1"
              onClick={() =>
                navigate({ to: "/learn/course/$lessonId", params: { lessonId: nextId } })
              }
            >
              Next lesson
            </Button>
          ) : null}
        </div>
        <div className="mt-6 w-full">
          <Disclaimer />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/learn" className="flex items-center gap-1 font-semibold">
          <ArrowLeft className="size-3.5" />
          {mod?.course.title ?? "Course"}
        </Link>
        <span>·</span>
        <span>{mod?.module.title ?? ""}</span>
      </div>
      <h1 className="mt-2 text-2xl font-bold leading-tight">{lesson.title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{lesson.blurb}</p>
      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" />
          {lesson.durationMinutes} min
        </span>
        <span className="flex items-center gap-1">
          <Target className="size-3.5" />
          {total} checks
        </span>
        <span className="flex items-center gap-1">
          <Zap className="size-3.5" />+{lesson.xp} XP
        </span>
      </div>
      <div className="mt-3 rounded-2xl border border-primary/30 bg-primary/5 p-3.5">
        <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
          By the end you can
        </p>
        <ul className="mt-1.5 flex flex-col gap-1">
          {lesson.objectives.map((o) => (
            <li key={o} className="flex gap-2 text-xs leading-relaxed">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
              {o}
            </li>
          ))}
        </ul>
      </div>
      <div className="sticky top-0 z-10 -mx-4 bg-background/90 px-4 py-2 backdrop-blur">
        <Progress value={total === 0 ? 0 : (answered / total) * 100} />
        <p className="mt-1 text-[11px] text-muted-foreground">
          {answered}/{total} checks answered · teaching first, grading at the end
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {lesson.blocks.map((block) => {
          if (block.kind === "explain")
            return <ExplainBlockView key={block.id} explanation={block.explanation} />;
          if (block.kind === "example")
            return <ExampleBlockView key={block.id} example={block.example} />;
          if (block.kind === "visual")
            return <VisualBlockView key={block.id} title={block.title} visual={block.visual} />;
          if (block.kind === "interactive")
            return (
              <InteractionView
                key={block.id}
                title={block.title}
                interaction={block.interaction}
                takeaway={block.takeaway}
              />
            );
          if (block.kind === "reflection") {
            return (
              <ReflectionBlockView
                key={block.id}
                title={block.title}
                prompts={block.prompts}
                helper={block.helper}
                value={reflections[block.id] ?? ""}
                onChange={(v) => setReflections((p) => ({ ...p, [block.id]: v }))}
              />
            );
          }
          if (block.kind === "summary")
            return (
              <SummaryBlockView
                key={block.id}
                title={block.title}
                points={block.points}
                nextStep={block.nextStep}
              />
            );
          if (block.kind === "practice" || block.kind === "check") {
            return (
              <AssessmentBlockView
                key={block.id}
                title={block.title}
                eyebrow={EYEBROW[block.kind] ?? block.kind}
                intro={block.assessment.intro}
                assessment={block.assessment}
                answers={answers}
                locked={false}
                allowRetryGlobal={false}
                onAnswer={onAnswer}
              />
            );
          }
          if (block.kind === "scenario") {
            return (
              <AssessmentBlockView
                key={block.id}
                title={block.title}
                eyebrow="Scenario"
                intro={block.scenario.situation.join(" ")}
                assessment={block.scenario.assessment}
                answers={answers}
                locked={false}
                allowRetryGlobal={false}
                onAnswer={onAnswer}
              />
            );
          }
          return null;
        })}
      </div>
      <div className="fixed inset-x-0 bottom-0 border-t bg-background/95 p-4 backdrop-blur">
        <div className="mx-auto w-full max-w-2xl">
          {complete.isError ? (
            <div className="mb-2">
              <ErrorBanner error={complete.error} />
            </div>
          ) : null}
          <Button
            className="h-12 w-full font-bold"
            disabled={!ready || complete.isPending}
            onClick={submit}
          >
            {complete.isPending
              ? "Saving…"
              : ready
                ? `Finish lesson · ${answered}/${total}`
                : `Answer all checks · ${answered}/${total}`}
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <Disclaimer />
      </div>
    </div>
  );
}
