import { describe, expect, it } from "vitest";
import { calculateMastery, getMasteryStatus, getReviewPriority, rankTopicsForReview, recommendTopic } from "../mastery";
import { getLessonForTopic, getRecommendedLesson } from "../recommendation";

describe("getMasteryStatus", () => {
  it("uses the documented accuracy thresholds", () => {
    expect(getMasteryStatus(0.49)).toBe("needs_review");
    expect(getMasteryStatus(0.5)).toBe("developing");
    expect(getMasteryStatus(0.74)).toBe("developing");
    expect(getMasteryStatus(0.75)).toBe("strong");
    expect(getMasteryStatus(0.89)).toBe("strong");
    expect(getMasteryStatus(0.9)).toBe("mastered");
  });
});

describe("calculateMastery", () => {
  it("keeps fewer than three attempts in needs_review", () => {
    expect(calculateMastery({ attempts: 2, correct: 2 }).status).toBe("needs_review");
  });

  it("uses recent performance as a conservative signal", () => {
    const mastery = calculateMastery({
      attempts: 10,
      correct: 9,
      recentAttempts: 4,
      recentCorrect: 1,
      lastPracticed: "2026-09-18T00:00:00.000Z",
      now: "2026-09-19T00:00:00.000Z",
    });
    expect(mastery.status).toBe("needs_review");
    expect(mastery.reviewPriority).toBe("high");
  });

  it("raises stale strong topics without changing mastery status", () => {
    const mastery = calculateMastery({
      attempts: 10,
      correct: 8,
      lastPracticed: "2026-09-01T00:00:00.000Z",
      now: "2026-09-19T00:00:00.000Z",
    });
    expect(mastery.status).toBe("strong");
    expect(mastery.reviewPriority).toBe("medium");
  });

  it("handles zero attempts deterministically", () => {
    const mastery = calculateMastery({ attempts: 0, correct: 0 });
    expect(mastery.status).toBe("needs_review");
    expect(mastery.reviewPriority).toBe("high");
    expect(mastery.reviewPriorityScore).toBe(100);
  });
});

describe("getReviewPriority", () => {
  it("prioritizes weak recent performance", () => {
    expect(getReviewPriority({ attempts: 5, status: "developing", recentAccuracy: 0.4 }).priority).toBe("high");
  });

  it("does not downgrade mastery just because a topic is stale", () => {
    const review = getReviewPriority({
      attempts: 20,
      status: "mastered",
      recentAccuracy: 1,
      lastPracticed: "2026-09-01T00:00:00.000Z",
      now: "2026-09-19T00:00:00.000Z",
    });
    expect(review.priority).toBe("low");
  });
});

describe("topic recommendation", () => {
  const stats = [
    { topic: "strong-topic", ...calculateMastery({ attempts: 10, correct: 9 }) },
    { topic: "weak-topic", ...calculateMastery({ attempts: 10, correct: 4 }) },
    { topic: "developing-topic", ...calculateMastery({ attempts: 10, correct: 6 }) },
  ];

  it("ranks topics using one deterministic review ordering", () => {
    expect(rankTopicsForReview(stats).map((topic) => topic.topic)).toEqual([
      "weak-topic",
      "developing-topic",
      "strong-topic",
    ]);
  });

  it("uses the same ordering for the single recommended topic", () => {
    expect(recommendTopic(stats)?.topic).toBe(rankTopicsForReview(stats)[0]?.topic);
  });

  it("does not mutate the source array", () => {
    const original = [...stats];
    rankTopicsForReview(stats);
    expect(stats).toEqual(original);
  });
});


describe("lesson-aware recommendations", () => {
  it("maps a topic to the lesson that teaches it", () => {
    expect(getLessonForTopic("position-sizing")?.id).toBe("w2l1");
  });

  it("returns an unlocked lesson without changing progression", () => {
    expect(getRecommendedLesson("position-sizing", 4)?.id).toBe("w2l1");
  });

  it("does not bypass sequential lesson locks", () => {
    expect(getRecommendedLesson("position-sizing", 0)).toBeUndefined();
  });

  it("returns undefined for unknown topics", () => {
    expect(getLessonForTopic("unknown-topic")).toBeUndefined();
    expect(getRecommendedLesson("unknown-topic", 99)).toBeUndefined();
  });
});
