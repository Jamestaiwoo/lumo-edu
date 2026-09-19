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
