export type MasteryStatus =
  | "needs_review"
  | "developing"
  | "strong"
  | "mastered";

export type ReviewPriority = "high" | "medium" | "low";

export interface MasteryInput {
  attempts: number;
  correct: number;
  recentAttempts?: number;
  recentCorrect?: number;
  lastPracticed?: string | null;
  now?: string;
}

export interface TopicMastery {
  attempts: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  recentAttempts: number;
  recentCorrect: number;
  recentAccuracy: number;
  lastPracticed: string | null;
  status: MasteryStatus;
  reviewPriority: ReviewPriority;
  reviewPriorityScore: number;
}

const DAY_MS = 86_400_000;

export function getMasteryStatus(accuracy: number): MasteryStatus {
  if (accuracy < 0.5) return "needs_review";
  if (accuracy < 0.75) return "developing";
  if (accuracy < 0.9) return "strong";
  return "mastered";
}

function daysSince(lastPracticed: string | null, now: string): number | null {
  if (!lastPracticed) return null;
  const then = Date.parse(lastPracticed);
  const current = Date.parse(now);
  if (!Number.isFinite(then) || !Number.isFinite(current) || current < then) return null;
  return Math.floor((current - then) / DAY_MS);
}

export function getReviewPriority({
  attempts,
  status,
  recentAccuracy,
  lastPracticed,
  now = new Date().toISOString(),
}: {
  attempts: number;
  status: MasteryStatus;
  recentAccuracy: number;
  lastPracticed?: string | null;
  now?: string;
}): { priority: ReviewPriority; score: number } {
  if (attempts <= 0) return { priority: "high", score: 100 };

  const age = daysSince(lastPracticed ?? null, now);
  let score = status === "needs_review" ? 80 : status === "developing" ? 55 : status === "strong" ? 25 : 10;

  if (recentAccuracy < 0.5) score += 20;
  else if (recentAccuracy < 0.75) score += 10;

  if (age !== null) {
    if (age >= 14) score += 20;
    else if (age >= 7) score += 10;
    else if (age >= 3) score += 5;
  }

  score = Math.min(100, score);
  const priority: ReviewPriority = score >= 70 ? "high" : score >= 40 ? "medium" : "low";
  return { priority, score };
}

export function calculateMastery({
  attempts,
  correct,
  recentAttempts = 0,
  recentCorrect = 0,
  lastPracticed = null,
  now = new Date().toISOString(),
}: MasteryInput): TopicMastery {
  if (attempts <= 0) {
    return {
      attempts: 0,
      correct: 0,
      incorrect: 0,
      accuracy: 0,
      recentAttempts: 0,
      recentCorrect: 0,
      recentAccuracy: 0,
      lastPracticed,
      status: "needs_review",
      reviewPriority: "high",
      reviewPriorityScore: 100,
    };
  }

  const accuracy = Math.min(1, Math.max(0, correct / attempts));
  const incorrect = Math.max(0, attempts - correct);
  const recentAccuracy = recentAttempts > 0 ? recentCorrect / recentAttempts : accuracy;
  const effectiveAccuracy = recentAttempts > 0 ? Math.min(accuracy, recentAccuracy) : accuracy;
  const status = attempts < 3 ? "needs_review" : getMasteryStatus(effectiveAccuracy);
  const review = getReviewPriority({ attempts, status, recentAccuracy, lastPracticed, now });

  return {
    attempts,
    correct,
    incorrect,
    accuracy,
    recentAttempts,
    recentCorrect,
    recentAccuracy,
    lastPracticed,
    status,
    reviewPriority: review.priority,
    reviewPriorityScore: review.score,
  };
}

export interface TopicMasteryRecord extends TopicMastery {
  topic: string;
}

export function rankTopicsForReview(stats: TopicMasteryRecord[]): TopicMasteryRecord[] {
  return [...stats].sort(
    (a, b) =>
      b.reviewPriorityScore - a.reviewPriorityScore ||
      a.accuracy - b.accuracy ||
      (a.lastPracticed ?? "").localeCompare(b.lastPracticed ?? "") ||
      a.topic.localeCompare(b.topic),
  );
}

export function recommendTopic(stats: TopicMasteryRecord[]): TopicMasteryRecord | null {
  return rankTopicsForReview(stats)[0] ?? null;
}
