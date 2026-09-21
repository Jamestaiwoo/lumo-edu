import { describe, expect, it } from "vitest";
import { TOPIC_LABELS } from "@/content/curriculum";
import {
  COURSES,
  COURSE_LESSONS,
  COURSE_LESSON_ORDER,
  courseLessons,
  courseProgress,
  getCourseLesson,
  getModuleOfLesson,
  isAssessedBlock,
  lessonAssessmentItems,
  lessonQuestions,
} from "..";

const course = COURSES[0]!;

describe("course registry", () => {
  it("exposes Trading Foundations as the first course", () => {
    expect(course.id).toBe("c1");
    expect(course.title).toBe("Trading Foundations");
    expect(course.completionAchievement).toBe("course_1_foundations");
    expect(course.outcomes.length).toBeGreaterThanOrEqual(3);
  });

  it("keeps module order and lesson order in agreement", () => {
    const flattened = course.modules.flatMap((module) => module.lessonIds);
    expect(flattened).toEqual(COURSE_LESSON_ORDER);
    expect(courseLessons(course.id).map((lesson) => lesson.id)).toEqual(flattened);
  });

  it("resolves every module lesson id and assigns it back to that module", () => {
    for (const module of course.modules) {
      expect(module.lessonIds.length).toBeGreaterThan(0);
      for (const lessonId of module.lessonIds) {
        const lesson = getCourseLesson(lessonId);
        expect(lesson, `${lessonId} should resolve`).toBeDefined();
        expect(lesson!.moduleId).toBe(module.id);
        expect(getModuleOfLesson(lessonId)?.module.id).toBe(module.id);
        expect(getModuleOfLesson(lessonId)?.course.id).toBe(course.id);
      }
    }
  });

  it("has ten lessons and no duplicate ids", () => {
    expect(COURSE_LESSONS).toHaveLength(10);
    const ids = new Set(COURSE_LESSONS.map((lesson) => lesson.id));
    expect(ids.size).toBe(COURSE_LESSONS.length);
  });

  it("reports progress from completed lesson ids", () => {
    expect(courseProgress(course, [])).toMatchObject({
      completed: 0,
      total: 10,
      percent: 0,
      done: false,
    });
    expect(courseProgress(course, COURSE_LESSON_ORDER.slice(0, 5))).toMatchObject({
      completed: 5,
      percent: 50,
    });
    expect(courseProgress(course, COURSE_LESSON_ORDER).done).toBe(true);
  });
});

describe("lesson schema", () => {
  it("gives every lesson a teaching arc rather than a question list", () => {
    for (const lesson of COURSE_LESSONS) {
      const kinds = lesson.blocks.map((block) => block.kind);
      expect(kinds, `${lesson.id} needs teaching`).toContain("explain");
      expect(kinds, `${lesson.id} needs a demonstration`).toContain("example");
      expect(kinds, `${lesson.id} needs an interaction`).toContain("interactive");
      expect(kinds, `${lesson.id} needs guided practice`).toContain("practice");
      expect(kinds, `${lesson.id} needs a knowledge check`).toContain("check");
      expect(kinds, `${lesson.id} needs a reflection`).toContain("reflection");
      expect(kinds, `${lesson.id} needs a recap`).toContain("summary");
    }
  });

  it("teaches before it tests", () => {
    for (const lesson of COURSE_LESSONS) {
      const firstAssessment = lesson.blocks.findIndex((block) => isAssessedBlock(block));
      const explainIndex = lesson.blocks.findIndex((block) => block.kind === "explain");
      expect(explainIndex, `${lesson.id} should explain before assessing`).toBeLessThan(
        firstAssessment,
      );
    }
  });

  it("keeps lesson metadata complete", () => {
    for (const lesson of COURSE_LESSONS) {
      expect(lesson.title.length).toBeGreaterThan(3);
      expect(lesson.blurb.length).toBeGreaterThan(10);
      expect(lesson.objectives.length).toBeGreaterThanOrEqual(3);
      expect(lesson.durationMinutes).toBeGreaterThan(0);
      expect(lesson.xp).toBeGreaterThan(0);
      expect(lesson.keyTakeaway.length).toBeGreaterThan(20);

      const blockIds = lesson.blocks.map((block) => block.id);
      expect(new Set(blockIds).size, `${lesson.id} block ids must be unique`).toBe(blockIds.length);
    }
  });

  it("carries three to five graded items per lesson", () => {
    for (const lesson of COURSE_LESSONS) {
      const items = lessonAssessmentItems(lesson);
      expect(items.length, `${lesson.id} graded items`).toBeGreaterThanOrEqual(3);
      expect(items.length, `${lesson.id} graded items`).toBeLessThanOrEqual(5);
      expect(lessonQuestions(lesson)).toHaveLength(items.length);
    }
  });
});

describe("assessment schema", () => {
  const items = COURSE_LESSONS.flatMap((lesson) => lessonAssessmentItems(lesson));

  it("uses unique question ids and knows every topic", () => {
    const ids = new Set(items.map((item) => item.question.id));
    expect(ids.size).toBe(items.length);
    for (const item of items) {
      expect(TOPIC_LABELS[item.question.topic], `${item.question.id} topic`).toBeDefined();
    }
  });

  it("gives every question a usable explanation", () => {
    for (const item of items) {
      expect(item.question.explain.length, `${item.question.id} explain`).toBeGreaterThan(40);
    }
  });

  it("keeps multiple-choice answers in range", () => {
    for (const item of items) {
      const question = item.question;
      if (question.type !== "mcq") continue;
      expect(question.options.length).toBeGreaterThanOrEqual(3);
      expect(question.answer).toBeGreaterThanOrEqual(0);
      expect(question.answer).toBeLessThan(question.options.length);
      expect(new Set(question.options).size).toBe(question.options.length);
    }
  });

  it("keeps numeric answers finite", () => {
    for (const item of items) {
      if (item.question.type !== "numeric") continue;
      expect(Number.isFinite(item.question.answer)).toBe(true);
    }
  });

  it("explains the misconception behind every wrong multiple-choice option", () => {
    for (const item of items) {
      const question = item.question;
      if (question.type !== "mcq") continue;
      const feedback = item.feedbackByAnswer;
      expect(feedback, `${question.id} should explain wrong answers`).toBeDefined();
      for (const key of Object.keys(feedback ?? {})) {
        const index = Number(key);
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index, `${question.id} feedback key must be an option index`).toBeLessThan(
          question.options.length,
        );
        expect(index, `${question.id} must not "explain" the correct answer`).not.toBe(
          question.answer,
        );
      }
    }
  });
});
