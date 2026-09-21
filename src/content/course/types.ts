/**
 * Declarative course content architecture.
 *
 * A course is data. Lessons are an ordered list of *learning blocks*, and the
 * lesson engine (React) only knows how to render block kinds — never a
 * specific lesson. Adding a new subject (forex, options, psychology…) means
 * adding a folder of content, not a new component.
 *
 *   Course → Module → Lesson → LearningBlock[]
 *
 * Assessment is one block kind among many. The graded items reuse the existing
 * `Question` union so the server-side grading pipeline stays authoritative and
 * unchanged.
 */

import type { Question } from "@/content/curriculum";

/* ------------------------------------------------------------------ text */

export type Tone = "info" | "tip" | "warning" | "pitfall";

export type Callout = {
  tone: Tone;
  title: string;
  body: string;
};

export type KeyTerm = {
  term: string;
  definition: string;
};

/* --------------------------------------------------------------- teaching */

export type Explanation = {
  heading: string;
  /** Why a learner should care about this before the mechanics are explained. */
  whyItMatters: string;
  paragraphs: string[];
  keyTerms?: KeyTerm[];
  callouts?: Callout[];
};

export type WorkedStep = {
  label: string;
  detail: string;
};

export type WorkedExample = {
  title: string;
  setup: string;
  steps: WorkedStep[];
  takeaway: string;
};

/* ----------------------------------------------------------------- visuals */

export type OrderBookLevel = {
  price: number;
  size: number;
};

export type OrderBookSnapshot = {
  label: string;
  unit: string;
  /** Best (highest) bid first. */
  bids: OrderBookLevel[];
  /** Best (lowest) ask first. */
  asks: OrderBookLevel[];
};

export type Candle = {
  open: number;
  high: number;
  low: number;
  close: number;
};

export type ChartZone = {
  price: number;
  label: string;
  tone: "support" | "resistance";
};

export type VisualMarker = {
  index: number;
  label: string;
  tone: "up" | "down" | "neutral";
};

export type Visual =
  | {
      type: "spread";
      label: string;
      bid: number;
      ask: number;
      unit: string;
      caption: string;
    }
  | { type: "order-book"; book: OrderBookSnapshot; caption: string }
  | {
      type: "price-path";
      label: string;
      points: number[];
      caption: string;
      markers?: VisualMarker[];
    }
  | {
      type: "candles";
      label: string;
      candles: Candle[];
      caption: string;
      zones?: ChartZone[];
    }
  | { type: "table"; label: string; columns: string[]; rows: string[][]; caption?: string };

/* ------------------------------------------------------------ interactions */

export type DecisionChoice = {
  label: string;
  /** What the market does back to you if you take this action. */
  outcome: string;
  /** The action a disciplined, informed learner would take. */
  best: boolean;
  /** Why — written so a wrong pick still teaches something. */
  feedback: string;
};

export type SpreadLevel = {
  name: string;
  note: string;
  bid: number;
  ask: number;
};

export type ChartTask = {
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
};

export type PositionSizeMission = {
  prompt: string;
  minShares: number;
  maxShares: number;
  success: string;
  retry: string;
};

export type TradePlanField = {
  label: string;
  placeholder: string;
  unit: string;
};

export type Interaction =
  | {
      type: "scenario-decision";
      prompt: string;
      situation: string[];
      choices: DecisionChoice[];
    }
  | {
      type: "order-book-decision";
      prompt: string;
      book: OrderBookSnapshot;
      choices: DecisionChoice[];
    }
  | {
      type: "spread-explorer";
      prompt: string;
      unit: string;
      caption: string;
      levels: SpreadLevel[];
    }
  | {
      type: "order-type-simulator";
      prompt: string;
      symbol: string;
      unit: string;
      /** Where the market is when the order is placed. */
      bid: number;
      ask: number;
      /** Mid-price ticks the learner can step the market through. */
      ticks: number[];
    }
  | {
      type: "chart-read";
      prompt: string;
      label: string;
      candles: Candle[];
      zones?: ChartZone[];
      tasks: ChartTask[];
    }
  | {
      type: "position-size-builder";
      prompt: string;
      currency: string;
      defaults: { balance: number; riskPct: number; entry: number; stop: number };
      mission: PositionSizeMission;
    }
  | {
      type: "trade-plan-builder";
      prompt: string;
      symbols: string[];
      fields: TradePlanField[];
      checklist: string[];
      defaults: {
        symbol: string;
        direction: "long" | "short";
        entry: number;
        stop: number;
        target: number;
        riskPct: number;
      };
    };

/* ------------------------------------------------------------- assessment */

export type AssessmentItem = {
  /** Reuses the legacy question union so server grading is unchanged. */
  question: Question;
  hint?: string;
  /**
   * Misconception-specific feedback for a wrong answer, keyed by the submitted
   * raw value ("0", "1", an option index) or `"numeric"` for free entries.
   */
  feedbackByAnswer?: Record<string, string>;
  /** Human label for the sub-skill being tested (used in the lesson recap). */
  skill?: string;
};

export type Assessment = {
  intro?: string;
  items: AssessmentItem[];
  /** Guided practice lets the learner retry; the first attempt is still recorded. */
  allowRetry?: boolean;
};

export type Scenario = {
  situation: string[];
  assessment: Assessment;
};

/* ------------------------------------------------------------------ blocks */

export type LearningBlock =
  | { kind: "explain"; id: string; explanation: Explanation }
  | { kind: "example"; id: string; example: WorkedExample }
  | { kind: "visual"; id: string; title: string; visual: Visual }
  | {
      kind: "interactive";
      id: string;
      title: string;
      interaction: Interaction;
      takeaway: string;
    }
  | { kind: "practice"; id: string; title: string; assessment: Assessment }
  | { kind: "check"; id: string; title: string; assessment: Assessment }
  | { kind: "scenario"; id: string; title: string; scenario: Scenario }
  | { kind: "reflection"; id: string; title: string; prompts: string[]; helper: string }
  | { kind: "summary"; id: string; title: string; points: string[]; nextStep: string };

export type BlockKind = LearningBlock["kind"];

/** The block kinds that carry graded items. */
export type LearningBlockWithAssessment = Extract<
  LearningBlock,
  { kind: "practice" | "check" | "scenario" }
>;

/* ------------------------------------------------------- course structure */

export type CourseLesson = {
  id: string;
  moduleId: string;
  title: string;
  blurb: string;
  /** Written as "you can …" outcomes shown before the lesson starts. */
  objectives: string[];
  durationMinutes: number;
  xp: number;
  keyTakeaway: string;
  blocks: LearningBlock[];
};

export type CourseModule = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  lessonIds: string[];
};

export type Course = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  level: string;
  outcomes: string[];
  modules: CourseModule[];
  lessons: CourseLesson[];
  /** Achievement code granted when every lesson in the course is complete. */
  completionAchievement: string;
};
