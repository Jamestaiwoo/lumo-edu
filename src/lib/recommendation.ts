import { ALL_LESSONS, LESSON_ORDER, type Lesson } from "@/content/curriculum";

export function getLessonForTopic(topic: string): Lesson | undefined {
  return ALL_LESSONS.find((lesson) => lesson.questions.some((question) => question.topic === topic));
}

export function getRecommendedLesson(topic: string, unlockedIndex: number): Lesson | undefined {
  const lesson = getLessonForTopic(topic);
  if (!lesson) return undefined;

  const lessonIndex = LESSON_ORDER.indexOf(lesson.id);
  if (lessonIndex < 0 || lessonIndex > unlockedIndex) return undefined;

  return lesson;
}


export function getUnlockedLessonIndex(completedLessonIds: string[]): number {
  const firstIncompleteIndex = LESSON_ORDER.findIndex((id) => !completedLessonIds.includes(id));
  return firstIncompleteIndex === -1 ? LESSON_ORDER.length - 1 : firstIncompleteIndex;
}

export function isLessonUnlocked(lessonId: string, completedLessonIds: string[]): boolean {
  const lessonIndex = LESSON_ORDER.indexOf(lessonId);
  if (lessonIndex < 0) return false;
  return lessonIndex <= getUnlockedLessonIndex(completedLessonIds);
}
