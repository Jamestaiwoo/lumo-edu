import { describe, expect, it } from "vitest";
import { ALL_LESSONS, LESSON_ORDER } from "@/content/curriculum";
import {
  COURSE_LESSONS,
  COURSE_LESSON_ORDER,
  getCourseLesson,
  lessonQuestions,
} from "@/content/course";
import { resolveLesson } from "@/content/lessons";
import {
  LEGACY_LESSON_ORDER,
  getRecommendedLessonForTopic,
  isLessonUnlocked,
  nextLessonIdInTrack,
  trackOfLesson,
} from "../recommendation";
import { evaluateRaw, feedbackForAnswer, buildSubmission, submittedRaw } from "../lesson-feedback";
import { simulateOrder } from "../order-simulation";

describe("lesson resolver", () => {
  it("still resolves every legacy lesson exactly as before", () => {
    expect(LESSON_ORDER).toHaveLength(12);
    expect(LESSON_ORDER[0]).toBe("w1l1");

    const first = resolveLesson("w1l1")!;
    expect(first.kind).toBe("legacy");
    expect(first.containerId).toBe("w1");
    expect(first.questions).toHaveLength(5);
    expect(first.questions.map((q) => q.id)).toEqual([
      "w1l1q1",
      "w1l1q2",
      "w1l1q3",
      "w1l1q4",
      "w1l1q5",
    ]);
  });

  it("resolves course lessons through the same shape the server grades", () => {
    const lesson = resolveLesson("tf-l4")!;
    expect(lesson.kind).toBe("course");
    expect(lesson.containerId).toBe("c1");
    expect(lesson.title).toBe("Bid, Ask, Spread & Liquidity");
    expect(lesson.questions.map((q) => q.id)).toEqual(
      lessonQuestions(getCourseLesson("tf-l4")!).map((q) => q.id),
    );
    expect(lesson.xp).toBeGreaterThan(0);
  });

  it("rejects unknown lessons", () => {
    expect(resolveLesson("nope")).toBeUndefined();
    expect(resolveLesson("")).toBeUndefined();
  });
});

describe("lesson tracks", () => {
  it("routes each lesson to its own order", () => {
    expect(trackOfLesson("w1l1")).toBe("legacy");
    expect(trackOfLesson("tf-l1")).toBe("course");
    expect(trackOfLesson("unknown")).toBeUndefined();
    expect(LEGACY_LESSON_ORDER).toBe(LESSON_ORDER);
  });

  it("keeps the legacy unlock rules identical", () => {
    expect(isLessonUnlocked("w1l1", [])).toBe(true);
    expect(isLessonUnlocked("w1l2", [])).toBe(false);
    expect(isLessonUnlocked("w1l2", ["w1l1"])).toBe(true);
    expect(isLessonUnlocked("w1l3", ["w1l1"])).toBe(false);
  });

  it("gives Course 1 its own fresh sequence", () => {
    expect(COURSE_LESSON_ORDER[0]).toBe("tf-l1");
    expect(isLessonUnlocked("tf-l1", [])).toBe(true);
    expect(isLessonUnlocked("tf-l2", [])).toBe(false);
    expect(isLessonUnlocked("tf-l2", ["tf-l1"])).toBe(true);
  });

  it("does not let one track unlock the other", () => {
    expect(isLessonUnlocked("tf-l2", [...LESSON_ORDER])).toBe(false);
    expect(isLessonUnlocked("w1l2", [...COURSE_LESSON_ORDER])).toBe(false);
  });

  it("walks the next lesson inside a track only", () => {
    expect(nextLessonIdInTrack("tf-l1")).toBe("tf-l2");
    expect(nextLessonIdInTrack("tf-l9")).toBe("tf-l10");
    expect(nextLessonIdInTrack("tf-l10")).toBeUndefined();
    expect(nextLessonIdInTrack("w1l1")).toBe("w1l2");
    expect(nextLessonIdInTrack("unknown")).toBeUndefined();
  });

  it("keeps the legacy path complete and unchanged", () => {
    expect(ALL_LESSONS).toHaveLength(12);
    expect(isLessonUnlocked("w3l4", [...LESSON_ORDER])).toBe(true);
  });
});

describe("track-aware recommendations", () => {
  it("prefers the course lesson that teaches the topic when it is unlocked", () => {
    const suggestion = getRecommendedLessonForTopic("spread", ["tf-l1", "tf-l2", "tf-l3"]);
    expect(suggestion).toMatchObject({ id: "tf-l4", track: "course" });
  });

  it("falls back to a legacy lesson when the course lesson is still locked", () => {
    // "spread" is taught by legacy w1l2 (index 1) and course tf-l4 (locked until tf-l1..l3).
    const suggestion = getRecommendedLessonForTopic("spread", ["w1l1"]);
    expect(suggestion).toMatchObject({ id: "w1l2", track: "legacy" });
  });

  it("never recommends a lesson the learner has not unlocked", () => {
    expect(getRecommendedLessonForTopic("orders", [])).toBeUndefined();
    expect(getRecommendedLessonForTopic("spread", [])).toBeUndefined();
  });

  it("returns nothing for a topic that no lesson teaches", () => {
    expect(getRecommendedLessonForTopic("not-a-topic", [...LESSON_ORDER])).toBeUndefined();
  });
});

describe("client grading mirrors the server", () => {
  const mcq = {
    id: "q",
    type: "mcq" as const,
    topic: "orders",
    prompt: "p",
    options: ["a", "b"],
    answer: 1,
    explain: "e",
  };
  const tf = {
    id: "q2",
    type: "truefalse" as const,
    topic: "orders",
    prompt: "p",
    answer: false,
    explain: "e",
  };
  const num = {
    id: "q3",
    type: "numeric" as const,
    topic: "costs",
    prompt: "p",
    answer: 10,
    tolerance: 0.5,
    unit: "dollars",
    explain: "e",
  };

  it("grades a multiple choice index", () => {
    expect(evaluateRaw(mcq, "1")).toBe(true);
    expect(evaluateRaw(mcq, "0")).toBe(false);
  });

  it("grades true/false with the legacy 0/1 encoding", () => {
    expect(evaluateRaw(tf, "1")).toBe(true);
    expect(evaluateRaw(tf, "0")).toBe(false);
  });

  it("grades numbers with tolerance and rejects junk", () => {
    expect(evaluateRaw(num, "$10")).toBe(true);
    expect(evaluateRaw(num, "10.4")).toBe(true);
    expect(evaluateRaw(num, "10.6")).toBe(false);
    expect(evaluateRaw(num, "")).toBe(false);
    expect(evaluateRaw(num, "abc")).toBe(false);
  });

  it("encodes submissions the way the server expects", () => {
    expect(submittedRaw(mcq, 1, "")).toBe("1");
    expect(submittedRaw(tf, 0, "")).toBe("0");
    expect(submittedRaw(num, null, "10")).toBe("10");
  });

  it("prefers misconception feedback, then falls back to the explanation", () => {
    const item = { question: mcq, feedbackByAnswer: { "0": "specifically wrong" } };
    expect(feedbackForAnswer(item, "0")).toBe("specifically wrong");
    expect(feedbackForAnswer(item, "9")).toBe("e");

    const numeric = { question: num, feedbackByAnswer: { numeric: "check your units" } };
    expect(feedbackForAnswer(numeric, "12")).toBe("check your units");
  });
});

describe("order type simulator", () => {
  const ticks = [20.15, 20.14, 20.13, 20.11, 20.1, 20.09, 20.12, 20.15];

  it("fills a market order immediately at the crossed side", () => {
    const buy = simulateOrder({ type: "market", side: "buy", bid: 20.15, ask: 20.16, ticks });
    const sell = simulateOrder({ type: "market", side: "sell", bid: 20.15, ask: 20.16, ticks });
    expect(buy.fillPrice).toBe(20.16);
    expect(sell.fillPrice).toBe(20.15);
    expect(buy.immediate).toBe(true);
  });

  it("leaves a limit order unfilled when the market never reaches it", () => {
    const outcome = simulateOrder({
      type: "limit",
      side: "buy",
      bid: 20.15,
      ask: 20.16,
      ticks,
      limitPrice: 19.5,
    });
    expect(outcome.status).toBe("unfilled");
    expect(outcome.fillPrice).toBeNull();
  });

  it("fills a limit buy at the first tick that reaches the price", () => {
    const outcome = simulateOrder({
      type: "limit",
      side: "buy",
      bid: 20.15,
      ask: 20.16,
      ticks,
      limitPrice: 20.1,
    });
    expect(outcome.status).toBe("filled");
    expect(outcome.fillPrice).toBe(20.1);
    expect(outcome.filledAtTick).toBe(4);
  });

  it("treats an aggressive limit as a market order with a cap", () => {
    const outcome = simulateOrder({
      type: "limit",
      side: "buy",
      bid: 20.15,
      ask: 20.16,
      ticks,
      limitPrice: 20.5,
    });
    expect(outcome.immediate).toBe(true);
    expect(outcome.fillPrice).toBe(20.16);
  });

  it("fills a limit sell only when the market rises to it", () => {
    const never = simulateOrder({
      type: "limit",
      side: "sell",
      bid: 20.15,
      ask: 20.16,
      ticks,
      limitPrice: 21,
    });
    expect(never.status).toBe("unfilled");

    const reached = simulateOrder({
      type: "limit",
      side: "sell",
      bid: 20.15,
      ask: 20.16,
      ticks,
      limitPrice: 20.14,
    });
    expect(reached.status).toBe("filled");
    expect(reached.fillPrice).toBe(20.15);
  });

  it("refuses a limit order with no price", () => {
    const outcome = simulateOrder({
      type: "limit",
      side: "buy",
      bid: 20.15,
      ask: 20.16,
      ticks,
      limitPrice: null,
    });
    expect(outcome.status).toBe("unfilled");
    expect(outcome.headline).toMatch(/no limit price/i);
  });
});

describe("grader empty-answer guard", () => {
  /** Regression: `Number("") === 0` used to grade a blank correct for
   * mcq option 0 and true-false "True" — on the server and client alike. */
  const everyQuestion = [
    ...LESSON_ORDER.map((id) => resolveLesson(id)!.questions).flat(),
    ...COURSE_LESSONS.map((lesson) => lessonQuestions(lesson)).flat(),
  ];

  it("grades no question correct on an empty or blank answer", () => {
    expect(everyQuestion.length).toBeGreaterThan(50);
    for (const question of everyQuestion) {
      expect(evaluateRaw(question, ""), `${question.id} empty`).toBe(false);
      expect(evaluateRaw(question, "   "), `${question.id} whitespace`).toBe(false);
    }
  });
});

describe("completion submission contract", () => {
  const lesson = getCourseLesson("tf-l4")!;
  const questions = lessonQuestions(lesson);

  /** The raw string the server's grade() marks correct for this question. */
  const correctRaw = (q: (typeof questions)[number]): string => {
    if (q.type === "truefalse") return String(q.answer ? 0 : 1);
    return String(q.answer);
  };

  it("emits one entry per question, in lesson order, ignoring extra answers", () => {
    const everything = Object.fromEntries(questions.map((q) => [q.id, "9"]));
    const payload = buildSubmission(questions, { ...everything, stray: "ignored" });
    expect(payload.map((entry) => entry.questionId)).toEqual(questions.map((q) => q.id));
  });

  it("passes choice indices and numeric text through verbatim", () => {
    const mcq = questions.find((q) => q.type === "mcq");
    const numeric = questions.find((q) => q.type === "numeric");
    const payload = buildSubmission(questions, {
      ...(mcq ? { [mcq.id]: "2" } : {}),
      ...(numeric ? { [numeric.id]: "10.50" } : {}),
    });
    const byId = new Map(payload.map((entry) => [entry.questionId, entry.raw]));
    if (mcq) expect(byId.get(mcq.id)).toBe("2");
    if (numeric) expect(byId.get(numeric.id)).toBe("10.50");
  });

  it("sends an empty raw — never NaN — for anything unanswered", () => {
    const payload = buildSubmission(questions, {});
    expect(payload).toHaveLength(questions.length);
    for (const entry of payload) {
      expect(entry.raw).toBe("");
    }
  });

  it("grades its own payload the way the server will", () => {
    const correctAnswers = Object.fromEntries(questions.map((q) => [q.id, correctRaw(q)]));
    for (const entry of buildSubmission(questions, correctAnswers)) {
      const q = questions.find((question) => question.id === entry.questionId)!;
      expect(evaluateRaw(q, entry.raw), `${q.id} should grade correct`).toBe(true);
    }
    for (const entry of buildSubmission(questions, {})) {
      const q = questions.find((question) => question.id === entry.questionId)!;
      expect(evaluateRaw(q, entry.raw), `${q.id} empty should grade false`).toBe(false);
    }
  });
});
