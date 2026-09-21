/**
 * Course registry.
 *
 * Adding a subject (Forex, Options, Trading Psychology, …) means adding a
 * folder under `src/content/course/` and listing the new course here. The
 * lesson engine, the unlock rules and the server grading pipeline need no
 * changes.
 */

import type { Question } from "@/content/curriculum";
import type {
  Assessment,
  AssessmentItem,
  Course,
  CourseLesson,
  LearningBlock,
  LearningBlockWithAssessment,
} from "./types";
import { tradingFoundationsCourse } from "./trading-foundations";

export type {
  Assessment,
  AssessmentItem,
  BlockKind,
  Callout,
  Candle,
  ChartTask,
  ChartZone,
  Course,
  CourseLesson,
  CourseModule,
  DecisionChoice,
  Explanation,
  Interaction,
  KeyTerm,
  LearningBlock,
  LearningBlockWithAssessment,
  OrderBookLevel,
  OrderBookSnapshot,
  PositionSizeMission,
  Scenario,
  SpreadLevel,
  Tone,
  TradePlanField,
  Visual,
  VisualMarker,
  WorkedExample,
  WorkedStep,
} from "./types";

export const COURSES: Course[] = [tradingFoundationsCourse];

export const COURSE_LESSONS: CourseLesson[] = COURSES.flatMap((course) => course.lessons);

/** Lesson order across all courses: course order, then module order, then lesson order. */
export const COURSE_LESSON_ORDER: string[] = COURSE_LESSONS.map((lesson) => lesson.id);

const LESSON_BY_ID = new Map(COURSE_LESSONS.map((lesson) => [lesson.id, lesson]));

const MODULE_LOOKUP = new Map(
  COURSES.flatMap((course) =>
    course.modules.map((module) => [module.id, { course, module }] as const),
  ),
);

export function getCourseLesson(lessonId: string): CourseLesson | undefined {
  return LESSON_BY_ID.get(lessonId);
}

export function isCourseLesson(lessonId: string): boolean {
  return LESSON_BY_ID.has(lessonId);
}

export function getCourse(courseId: string): Course | undefined {
  return COURSES.find((course) => course.id === courseId);
}

export function getModuleOfLesson(
  lessonId: string,
): { course: Course; module: Course["modules"][number] } | undefined {
  const lesson = getCourseLesson(lessonId);
  if (!lesson) return undefined;
  return MODULE_LOOKUP.get(lesson.moduleId);
}

export function getCourseOfLesson(lessonId: string): Course | undefined {
  return getModuleOfLesson(lessonId)?.course;
}

/** Lessons of a course, in path order. */
export function courseLessons(courseId: string): CourseLesson[] {
  const course = getCourse(courseId);
  if (!course) return [];
  const byId = new Map(course.lessons.map((lesson) => [lesson.id, lesson]));
  return course.modules
    .flatMap((module) => module.lessonIds)
    .map((id) => byId.get(id))
    .filter((lesson): lesson is CourseLesson => Boolean(lesson));
}

/* --------------------------------------------------------------- assessment */

const ASSESSED_KINDS = ["practice", "check", "scenario"] as const;

export function isAssessedBlock(block: LearningBlock): block is LearningBlockWithAssessment {
  return (ASSESSED_KINDS as readonly string[]).includes(block.kind);
}

export function assessmentOf(block: LearningBlock): Assessment | undefined {
  if (!isAssessedBlock(block)) return undefined;
  return block.kind === "scenario" ? block.scenario.assessment : block.assessment;
}

/** Every graded item in a lesson, in the order the learner meets them. */
export function lessonAssessmentItems(lesson: CourseLesson): AssessmentItem[] {
  return lesson.blocks.flatMap((block) => assessmentOf(block)?.items ?? []);
}

/** The graded questions, shaped exactly like the legacy curriculum's questions. */
export function lessonQuestions(lesson: CourseLesson): Question[] {
  return lessonAssessmentItems(lesson).map((item) => item.question);
}

export function lessonAssessmentItem(
  lesson: CourseLesson,
  questionId: string,
): AssessmentItem | undefined {
  return lessonAssessmentItems(lesson).find((item) => item.question.id === questionId);
}

/* ----------------------------------------------------------------- progress */

export type CourseProgress = {
  completed: number;
  total: number;
  percent: number;
  durationMinutes: number;
  done: boolean;
};

export function courseDurationMinutes(course: Course): number {
  return course.lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0);
}

export function courseProgress(
  course: Course,
  completedLessonIds: readonly string[],
): CourseProgress {
  const done = new Set(completedLessonIds);
  const lessons = courseLessons(course.id);
  const completed = lessons.filter((lesson) => done.has(lesson.id)).length;
  const total = lessons.length;
  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    durationMinutes: courseDurationMinutes(course),
    done: total > 0 && completed === total,
  };
}
