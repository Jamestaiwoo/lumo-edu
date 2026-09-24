/**
 * Answer handling shared by the course lesson runner.
 *
 * The client needs an immediate verdict to show feedback, and the raw answer to
 * send to the server. This module mirrors the server's grading rules exactly
 * (`grade()` in `progress.functions.ts`) — but the server result is still the
 * only one that is ever persisted, so a tampered client cannot award itself XP.
 */

import type { Question } from "@/content/curriculum";
import type { AssessmentItem } from "@/content/course/types";

export type SubmittedAnswer = { questionId: string; raw: string };

/**
 * Build the completion payload for the server's `completeLesson`.
 *
 * The stored answers already carry the raw encoding the server grades
 * (choice index as a string for mcq/truefalse, typed text for numeric), so
 * this is a verbatim passthrough — one entry per question, in lesson order.
 * Anything unanswered is sent as "" (the server grades it false), never
 * "NaN" or undefined.
 */
export function buildSubmission(
  questions: Question[],
  answers: Readonly<Record<string, string>>,
): SubmittedAnswer[] {
  return questions.map((question) => ({
    questionId: question.id,
    raw: answers[question.id] ?? "",
  }));
}

/** The raw string the server expects for this submission. */
export function submittedRaw(question: Question, choice: number | null, text: string): string {
  return question.type === "numeric" ? text : String(choice ?? "");
}

export function evaluateRaw(question: Question, raw: string): boolean {
  const value = (raw ?? "").trim();
  // Mirrors grade(): an empty answer is never correct (`Number("") === 0`
  // would otherwise mark a blank correct for mcq option 0 / true-false True).
  if (value === "") return false;
  if (question.type === "mcq") return Number(value) === question.answer;
  if (question.type === "truefalse") return (Number(value) === 0) === question.answer;
  const num = Number(value.replace(/[^0-9.-]/g, ""));
  if (!Number.isFinite(num)) return false;
  return Math.abs(num - question.answer) <= (question.tolerance ?? 0.01);
}

export function hasAnswer(question: Question, choice: number | null, text: string): boolean {
  if (question.type === "numeric") return text.trim() !== "";
  return choice !== null;
}

/**
 * Misconception-specific feedback when the learner picked a specific wrong
 * answer, falling back to the question's general explanation.
 */
export function feedbackForAnswer(item: AssessmentItem, raw: string): string {
  const message =
    item.feedbackByAnswer?.[raw] ??
    (item.question.type === "numeric" ? item.feedbackByAnswer?.["numeric"] : undefined);
  return message ?? item.question.explain;
}

/** The item's own explanation, used when the learner answers correctly. */
export function explanationForAnswer(item: AssessmentItem): string {
  return item.question.explain;
}

/** Local preview of the score. The server recomputes this and returns its own. */
export function scoreAnswers(
  questions: Question[],
  answers: Readonly<Record<string, string>>,
): { correct: number; total: number } {
  const correct = questions.filter((question) => {
    const raw = answers[question.id];
    return raw !== undefined && evaluateRaw(question, raw);
  }).length;
  return { correct, total: questions.length };
}

/**
 * Whether assessment blocks should be non-interactive: while a completion
 * submission is in flight and after it succeeds (the graded record is fixed
 * at that point; the local "Check answers" flow is formative only).
 */
export function assessmentLocked(state: { done: boolean; pending: boolean }): boolean {
  return state.done || state.pending;
}
