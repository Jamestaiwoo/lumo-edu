import { ALL_LESSONS, LESSON_ORDER, type Lesson } from "@/content/curriculum";
import {
  COURSE_LESSON_ORDER,
  COURSE_LESSONS,
  getCourseLesson,
  lessonQuestions,
} from "@/content/course";
import type { CourseLesson } from "@/content/course";

/**
 * Two sequential tracks share one unlock rule.
 *
 * - The `legacy` track is the original 12 question-first lessons in
 *   `src/content/curriculum.ts`. Its order and behaviour are unchanged.
 * - The `course` track is the declarative course layer. It has its own order,
 *   so a new learner can start Course 1 immediately instead of finishing the
 *   legacy drills first.
 *
 * A lesson is unlocked when every earlier lesson *in its own track* is done.
 */

export type LessonTrack = "legacy" | "course";

/** Legacy lesson order — kept as the reference order for the original path. */
export const LEGACY_LESSON_ORDER: readonly string[] = LESSON_ORDER;

export function trackOfLesson(lessonId: string): LessonTrack | undefined {
  if (LESSON_ORDER.includes(lessonId)) return "legacy";
  if (COURSE_LESSON_ORDER.includes(lessonId)) return "course";
  return undefined;
}

export function lessonOrderForTrack(track: LessonTrack): readonly string[] {
  return track === "legacy" ? LEGACY_LESSON_ORDER : COURSE_LESSON_ORDER;
}

function unlockedIndexIn(order: readonly string[], completedLessonIds: readonly string[]): number {
  if (order.length === 0) return -1;
  const done = new Set(completedLessonIds);
  const firstIncomplete = order.findIndex((id) => !done.has(id));
  return firstIncomplete === -1 ? order.length - 1 : firstIncomplete;
}

/** Unlocked index on the legacy path. Signature kept for existing callers. */
export function getUnlockedLessonIndex(completedLessonIds: string[]): number {
  return unlockedIndexIn(LEGACY_LESSON_ORDER, completedLessonIds);
}

export function getTrackUnlockedLessonIndex(
  track: LessonTrack,
  completedLessonIds: readonly string[],
): number {
  return unlockedIndexIn(lessonOrderForTrack(track), completedLessonIds);
}

export function isLessonUnlocked(lessonId: string, completedLessonIds: string[]): boolean {
  const track = trackOfLesson(lessonId);
  if (!track) return false;
  const order = lessonOrderForTrack(track);
  const index = order.indexOf(lessonId);
  if (index < 0) return false;
  return index <= unlockedIndexIn(order, completedLessonIds);
}

/* -------------------------------------------------------------- navigation */

/** The next lesson in the same track, whether or not it is unlocked yet. */
export function nextLessonIdInTrack(lessonId: string): string | undefined {
  const track = trackOfLesson(lessonId);
  if (!track) return undefined;
  const order = lessonOrderForTrack(track);
  const index = order.indexOf(lessonId);
  if (index < 0 || index + 1 >= order.length) return undefined;
  return order[index + 1];
}

/** The lesson a learner should open next on the course path. */
export function nextLessonInCourse(
  completedLessonIds: readonly string[],
): CourseLesson | undefined {
  const done = new Set(completedLessonIds);
  const id = COURSE_LESSON_ORDER.find((candidate) => !done.has(candidate));
  return id ? getCourseLesson(id) : undefined;
}

/* ---------------------------------------------------------- recommendation */

export function getLessonForTopic(topic: string): Lesson | undefined {
  return ALL_LESSONS.find((lesson) =>
    lesson.questions.some((question) => question.topic === topic),
  );
}

export function getRecommendedLesson(topic: string, unlockedIndex: number): Lesson | undefined {
  const lesson = getLessonForTopic(topic);
  if (!lesson) return undefined;

  const lessonIndex = LESSON_ORDER.indexOf(lesson.id);
  if (lessonIndex < 0 || lessonIndex > unlockedIndex) return undefined;

  return lesson;
}

export function getCourseLessonForTopic(topic: string): CourseLesson | undefined {
  return COURSE_LESSONS.find((lesson) =>
    lessonQuestions(lesson).some((question) => question.topic === topic),
  );
}

export type LessonSuggestion = {
  id: string;
  title: string;
  track: LessonTrack;
};

/**
 * Track-aware review recommendation: prefer the course lesson that teaches the
 * topic, fall back to the legacy lesson, and never suggest a locked lesson.
 */
export function getRecommendedLessonForTopic(
  topic: string,
  completedLessonIds: readonly string[],
): LessonSuggestion | undefined {
  const completed = [...completedLessonIds];
  const candidates: LessonSuggestion[] = [];

  const courseLesson = getCourseLessonForTopic(topic);
  if (courseLesson)
    candidates.push({ id: courseLesson.id, title: courseLesson.title, track: "course" });

  const legacyLesson = getLessonForTopic(topic);
  if (legacyLesson)
    candidates.push({ id: legacyLesson.id, title: legacyLesson.title, track: "legacy" });

  return candidates.find((candidate) => isLessonUnlocked(candidate.id, completed));
}
