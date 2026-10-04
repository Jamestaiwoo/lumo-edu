import { describe, expect, it } from "vitest";
import { COURSES, COURSE_LESSON_ORDER, courseLessons } from "@/content/course";
import {
  isLessonUnlocked,
  getTrackUnlockedLessonIndex,
  nextLessonIdInTrack,
  trackOfLesson,
} from "@/lib/recommendation";

const track = COURSE_LESSON_ORDER;

describe("course track ordering", () => {
  it("lists every registered lesson exactly once, in course order", () => {
    expect(track.length).toBeGreaterThan(0);
    expect(new Set(track).size).toBe(track.length);
    const expected = COURSES.flatMap((course) =>
      courseLessons(course.id).map((lesson) => lesson.id),
    );
    expect(track).toEqual(expected);
  });

  it("orders each lesson consecutively with no gaps", () => {
    track.forEach((lessonId, index) => {
      expect(trackOfLesson(lessonId), `${lessonId} belongs to the course track`).toBe("course");
      if (index + 1 < track.length) {
        expect(nextLessonIdInTrack(lessonId), `${lessonId} next lesson`).toBe(track[index + 1]);
      } else {
        expect(nextLessonIdInTrack(lessonId), `${track.length} is terminal`).toBeUndefined();
      }
    });
  });

  it("connects every course boundary: previous last lesson precedes next first", () => {
    const boundaries = COURSES.map((course) => courseLessons(course.id)[0]!.id);
    boundaries.forEach((firstLessonId, index) => {
      const position = track.indexOf(firstLessonId);
      expect(position, `${firstLessonId} on track`).toBeGreaterThanOrEqual(0);
      if (index > 0) {
        const previousCourse = COURSES[index - 1]!;
        const previousLast = courseLessons(previousCourse.id).at(-1)!;
        expect(position, `${previousCourse.id} ends before ${COURSES[index]!.id} begins`).toBe(
          track.indexOf(previousLast.id) + 1,
        );
      }
    });
  });

  it("keeps course lessons contiguous within the track", () => {
    for (const course of COURSES) {
      const ids = courseLessons(course.id).map((lesson) => lesson.id);
      const positions = ids.map((id) => track.indexOf(id));
      const start = positions[0]!;
      expect(positions, `${course.id} contiguous`).toEqual(ids.map((_, offset) => start + offset));
    }
  });
});

describe("course track unlocking", () => {
  it("unlocks exactly one lesson for a fresh learner", () => {
    const unlocked = track.filter((id) => isLessonUnlocked(id, []));
    expect(unlocked).toEqual([track[0]]);
  });

  it("unlocks strictly forward as lessons complete (no cycles, no skips)", () => {
    const completed: string[] = [];
    for (const lessonId of track) {
      // The next lesson is unlocked; nothing beyond it is.
      expect(isLessonUnlocked(lessonId, completed), `${lessonId} unlocked`).toBe(true);
      const nextIndex = track.indexOf(lessonId) + 1;
      for (let i = nextIndex + 1; i < track.length; i++) {
        expect(isLessonUnlocked(track[i]!, completed), `${track[i]} stays locked`).toBe(false);
      }
      completed.push(lessonId);
    }
    expect(completed).toEqual(track);
  });

  it("advances the unlocked index monotonically to the track length", () => {
    const completed: string[] = [];
    let previous = getTrackUnlockedLessonIndex("course", completed);
    expect(previous).toBe(0);
    for (const lessonId of track) {
      completed.push(lessonId);
      const current = getTrackUnlockedLessonIndex("course", completed);
      expect(current).toBeGreaterThanOrEqual(previous);
      previous = current;
    }
    expect(previous).toBe(track.length - 1);
  });

  it("locks the first lesson of a later course until the previous course is complete", () => {
    if (COURSES.length < 2) return;
    const firstCourse = COURSES[0]!;
    const secondCourse = COURSES[1]!;
    const firstLessons = courseLessons(firstCourse.id).map((lesson) => lesson.id);
    const secondFirst = courseLessons(secondCourse.id)[0]!.id;
    // All-but-last of course 1 done → course 2 still locked.
    expect(isLessonUnlocked(secondFirst, firstLessons.slice(0, -1))).toBe(false);
    // Course 1 fully done → course 2 first lesson unlocks.
    expect(isLessonUnlocked(secondFirst, firstLessons)).toBe(true);
  });
});
