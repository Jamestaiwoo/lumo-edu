import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock, Play, Star } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Disclaimer } from "@/components/Disclaimer";
import { useProgress, useTopicStats, type LessonProgress } from "@/lib/api";
import { ErrorState, LoadingState } from "@/components/state/StateViews";
import { LESSON_ORDER, TOPIC_LABELS, WORLDS } from "@/content/curriculum";
import { COURSES, courseLessons } from "@/content/course";
import { getLessonForTopic, getRecommendedLesson } from "@/lib/recommendation";

export const Route = createFileRoute("/_authenticated/learn/")({
  head: () => ({
    meta: [
      { title: "Learning path — Lumo" },
      {
        name: "description",
        content: "Three worlds of bite-sized trading lessons, unlocked one step at a time.",
      },
      { property: "og:title", content: "Learning path — Lumo" },
      {
        property: "og:description",
        content: "Three worlds of bite-sized trading lessons, unlocked one step at a time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LearnPath,
});

function LearnPath() {
  const progressQuery = useProgress();
  const topicStatsQuery = useTopicStats();

  if (progressQuery.isPending) {
    return (
      <AppShell title="Learning path" subtitle="Finish a lesson to unlock the next">
        <LoadingState label="Loading your path…" rows={5} />
      </AppShell>
    );
  }

  if (progressQuery.isError) {
    return (
      <AppShell title="Learning path" subtitle="Finish a lesson to unlock the next">
        <ErrorState
          error={progressQuery.error}
          title="We couldn't load your path"
          onRetry={() => progressQuery.refetch()}
        />
      </AppShell>
    );
  }

  const progress: LessonProgress[] = progressQuery.data ?? [];
  const courseProgress = (courseId: string) => {
    const ids = courseLessons(courseId).map((l) => l.id);
    const completed = ids.filter((id) => doneMap.has(id)).length;
    return {
      completed,
      total: ids.length,
      pct: ids.length ? Math.round((completed / ids.length) * 100) : 0,
    };
  };
  const courseUnlockedIndex = (courseId: string) => {
    const ids = courseLessons(courseId).map((l) => l.id);
    const idx = ids.findIndex((id) => !doneMap.has(id));
    return idx === -1 ? ids.length : idx;
  };
  const doneMap = new Map(
    progress
      .filter((p: LessonProgress) => p.completed)
      .map((p: LessonProgress) => [p.lesson_id, p] as const),
  );

  const firstIncomplete = LESSON_ORDER.find((id) => !doneMap.has(id));
  const unlockedIndex = firstIncomplete
    ? LESSON_ORDER.indexOf(firstIncomplete)
    : LESSON_ORDER.length - 1;
  const recommended = topicStatsQuery.data?.[0];
  const recommendedLesson = recommended ? getLessonForTopic(recommended.topic) : undefined;
  const unlockedRecommendedLesson = recommended
    ? getRecommendedLesson(recommended.topic, unlockedIndex)
    : undefined;

  return (
    <AppShell title="Learning path" subtitle="Finish a lesson to unlock the next">
      <div className="flex flex-col gap-8">
        {recommended && (
          <section className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
              Recommended review
            </p>
            <div className="mt-1 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">
                  {TOPIC_LABELS[recommended.topic] ?? recommended.topic}
                </p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(recommended.accuracy * 100)}% accuracy · {recommended.reviewPriority}{" "}
                  priority
                </p>
              </div>
              {recommendedLesson && unlockedRecommendedLesson ? (
                <Link
                  to="/learn/$lessonId"
                  params={{ lessonId: unlockedRecommendedLesson.id }}
                  className="shrink-0 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"
                >
                  Review
                </Link>
              ) : (
                <span className="shrink-0 text-[11px] font-semibold text-muted-foreground">
                  Keep progressing
                </span>
              )}
            </div>
          </section>
        )}
        {COURSES.map((course) => {
          const lessons = courseLessons(course.id);
          const done = lessons.filter((l) => doneMap.has(l.id)).length;
          const upTo = courseUnlockedIndex(course.id);
          const pct = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
          const minutes = lessons.reduce((s, l) => s + l.durationMinutes, 0);
          const next = lessons.find((l) => !doneMap.has(l.id));
          return (
            <section
              key={course.id}
              className="rounded-3xl border border-primary/30 bg-primary/5 p-4"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                Course · {course.level}
              </p>
              <h2 className="mt-1 text-lg font-bold">{course.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {course.description}
              </p>
              <div className="mt-3">
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {done}/{lessons.length} lessons · {minutes} min · {pct}%
                </p>
              </div>
              {next ? (
                <p className="mt-2 text-xs">
                  Up next: <span className="font-bold">{next.title}</span>
                </p>
              ) : (
                <p className="mt-2 text-xs font-bold text-success">Course complete</p>
              )}
              <div className="mt-3 flex flex-col gap-4">
                {course.modules.map((m) => (
                  <div key={m.id}>
                    <p className="text-xs font-bold">{m.title}</p>
                    <p className="text-[11px] text-muted-foreground">{m.subtitle}</p>
                    <ol className="mt-2 flex flex-col gap-2">
                      {m.lessonIds.map((id) => {
                        const l = lessons.find((x) => x.id === id);
                        if (!l) return null;
                        const li = lessons.findIndex((x) => x.id === id);
                        const isDone = doneMap.has(id);
                        const locked = li > upTo;
                        const row = (
                          <div
                            className={`flex w-full items-center gap-3 rounded-2xl border p-3 transition ${locked ? "border-border/40 opacity-60" : isDone ? "border-success/40 bg-card" : "border-primary/50 bg-card"}`}
                          >
                            <span
                              className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${locked ? "bg-secondary text-muted-foreground" : isDone ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground"}`}
                            >
                              {locked ? (
                                <Lock className="size-4" />
                              ) : isDone ? (
                                <Check className="size-4" />
                              ) : (
                                <Play className="size-4 fill-current" />
                              )}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-bold">{l.title}</span>
                              <span className="block truncate text-xs text-muted-foreground">
                                {l.blurb}
                              </span>
                              <span className="mt-0.5 block text-[11px] text-muted-foreground">
                                {l.durationMinutes} min · {l.objectives.length} objectives · +{l.xp}{" "}
                                XP
                              </span>
                              <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                                You can: {l.objectives[0]}
                              </span>
                            </span>
                          </div>
                        );
                        return (
                          <li key={id}>
                            {locked ? (
                              <div aria-disabled>{row}</div>
                            ) : (
                              <Link
                                to="/learn/course/$lessonId"
                                params={{ lessonId: id }}
                                className="block active:scale-[0.99]"
                              >
                                {row}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
          Legacy question-first lessons
        </p>
        {WORLDS.map((world, wi) => (
          <section key={world.id}>
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  World {wi + 1}
                </p>
                <h2 className="text-lg font-bold">{world.title}</h2>
                <p className="text-xs text-muted-foreground">{world.subtitle}</p>
              </div>
              <span className="text-xs font-semibold text-muted-foreground">
                {world.lessons.filter((l) => doneMap.has(l.id)).length}/{world.lessons.length}
              </span>
            </div>

            <ol className="relative flex flex-col gap-3">
              {world.lessons.map((lesson, li) => {
                const idx = LESSON_ORDER.indexOf(lesson.id);
                const done = doneMap.get(lesson.id);
                const locked = idx > unlockedIndex;
                const offset = li % 2 === 0 ? "ml-0" : "ml-8";

                const inner = (
                  <div
                    className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 transition ${
                      locked
                        ? "border-border/40 bg-card/40 opacity-60"
                        : done
                          ? "border-success/40 bg-card"
                          : "border-primary/50 bg-card glow-primary"
                    }`}
                  >
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${
                        locked
                          ? "bg-secondary text-muted-foreground"
                          : done
                            ? "bg-success text-success-foreground"
                            : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {locked ? (
                        <Lock className="size-4" aria-hidden />
                      ) : done ? (
                        <Check className="size-5" aria-hidden />
                      ) : (
                        <Play className="size-4 fill-current" aria-hidden />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold">{lesson.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {lesson.blurb}
                      </span>
                    </span>
                    {done ? (
                      <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-success">
                        <Star className="size-3.5 fill-current" aria-hidden />
                        {done.best_score}/{lesson.questions.length}
                      </span>
                    ) : (
                      <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                        +{lesson.xp} XP
                      </span>
                    )}
                  </div>
                );

                return (
                  <li key={lesson.id} className={offset}>
                    {locked ? (
                      <div aria-disabled>{inner}</div>
                    ) : (
                      <Link
                        to="/learn/$lessonId"
                        params={{ lessonId: lesson.id }}
                        className="block active:scale-[0.99]"
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        <Disclaimer />
      </div>
    </AppShell>
  );
}
