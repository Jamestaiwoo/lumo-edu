import { describe, expect, it } from "vitest";
import { calculateMastery, getMasteryStatus, getReviewPriority, recommendTopic } from "../mastery";

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
    expect(mastery.reviewPriority).toBe("high");
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
    expect(review.priority).toBe("medium");
  });
});

describe("recommendTopic", () => {
  it("selects the highest-priority topic deterministically", () => {
    const result = recommendTopic([
      { topic: "strong-topic", ...calculateMastery({ attempts: 10, correct: 9 }) },
      { topic: "weak-topic", ...calculateMastery({ attempts: 10, correct: 4 }) },
    ]);
    expect(result?.topic).toBe("weak-topic");
  });
});
