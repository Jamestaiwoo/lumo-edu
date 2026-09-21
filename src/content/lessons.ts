/**
 * One lookup that understands both lesson formats.
 *
 * - `legacy` lessons come from `src/content/curriculum.ts` and are a list of
 *   questions with no teaching material attached.
 * - `course` lessons come from the declarative course layer, and expose the
 *   graded items of their assessment blocks as plain questions.
 *
 * The server grades both through this resolver, so the existing mastery, XP and
 * progress pipeline does not need to know which format a lesson uses.
 */

import { getLesson, worldOfLesson, type Question } from "@/content/curriculum";
import { getCourseLesson, getCourseOfLesson, lessonQuestions } from "@/content/course";

export type LessonKind = "legacy" | "course";

export type ResolvedLesson = {
  id: string;
  kind: LessonKind;
  title: string;
  blurb: string;
  xp: number;
  /** World id for legacy lessons, course id for course lessons. */
  containerId: string;
  containerTitle: string;
  questions: Question[];
};

const CACHE = new Map<string, ResolvedLesson | undefined>();

function build(lessonId: string): ResolvedLesson | undefined {
  const legacy = getLesson(lessonId);
  if (legacy) {
    const world = worldOfLesson(lessonId);
    return {
      id: legacy.id,
      kind: "legacy",
      title: legacy.title,
      blurb: legacy.blurb,
      xp: legacy.xp,
      containerId: world?.id ?? "legacy",
      containerTitle: world?.title ?? "Foundation drills",
      questions: legacy.questions,
    };
  }

  const courseLesson = getCourseLesson(lessonId);
  if (courseLesson) {
    const course = getCourseOfLesson(lessonId);
    return {
      id: courseLesson.id,
      kind: "course",
      title: courseLesson.title,
      blurb: courseLesson.blurb,
      xp: courseLesson.xp,
      containerId: course?.id ?? "course",
      containerTitle: course?.title ?? "Course",
      questions: lessonQuestions(courseLesson),
    };
  }

  return undefined;
}

export function resolveLesson(lessonId: string): ResolvedLesson | undefined {
  if (!CACHE.has(lessonId)) CACHE.set(lessonId, build(lessonId));
  return CACHE.get(lessonId);
}

export function isKnownLesson(lessonId: string): boolean {
  return resolveLesson(lessonId) !== undefined;
}

export function isCourseLessonId(lessonId: string): boolean {
  return resolveLesson(lessonId)?.kind === "course";
}

/** The graded question ids of a lesson, used to validate a submission. */
export function lessonQuestionIds(lessonId: string): string[] {
  return (resolveLesson(lessonId)?.questions ?? []).map((question) => question.id);
}
