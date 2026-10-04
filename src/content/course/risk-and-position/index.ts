import type { Course } from "../types";
import { lesson01RiskCeiling } from "./lesson-01-risk-ceiling";
import { lesson02SizingFromStop } from "./lesson-02-sizing-from-stop";
import { lesson03MathOfRuin } from "./lesson-03-math-of-ruin";
import { lesson04WhereIdeasGoWrong } from "./lesson-04-where-ideas-go-wrong";
import { lesson05StopTypes } from "./lesson-05-stop-types";
import { lesson06GapsAndSlippage } from "./lesson-06-gaps-and-slippage";
import { lesson07CorrelationConcentration } from "./lesson-07-correlation-concentration";
import { lesson08DrawdownArithmetic } from "./lesson-08-drawdown-arithmetic";
import { lesson09RecoveryRules } from "./lesson-09-recovery-rules";

/**
 * Course 2 — Risk & Position Management.
 *
 * Builds directly on Course 1's risk-before-reward lesson: three modules
 * covering the per-trade risk ceiling, stops and invalidation, and portfolio
 * level drawdown arithmetic. Same block-based arc as Course 1.
 */
export const riskPositionCourse: Course = {
  id: "c2",
  title: "Risk & Position Management",
  tagline: "The numbers you control before the market gets a vote",
  description:
    "Turn risk from a feeling into arithmetic: a per-trade ceiling, stops derived from invalidation, position sizes derived from stops, and the drawdown math that decides who survives a bad run.",
  level: "Foundation · builds on Trading Foundations",
  completionAchievement: "course_2_risk",
  outcomes: [
    "Set a per-trade risk ceiling as a percentage of the account",
    "Derive position size from stop distance using division, not confidence",
    "Explain why deep drawdowns require geometrically larger recoveries",
    "Choose stop types for their trade-offs instead of by habit",
    "Judge portfolio risk through correlation and concentration, not position count",
  ],
  modules: [
    {
      id: "c2-m1",
      title: "Module 1 · Risk per trade",
      subtitle: "One ceiling, derived size, honest arithmetic",
      description:
        "Fix the maximum acceptable loss per trade, derive size from the stop distance, and internalise the compounding maths that makes small risk non-negotiable.",
      lessonIds: ["rp-l1", "rp-l2", "rp-l3"],
    },
    {
      id: "c2-m2",
      title: "Module 2 · Stops & invalidation",
      subtitle: "Where the idea is wrong, and what the market can do about it",
      description:
        "Treat the stop as a claim about invalidation, compare the stop types and their trade-offs, and work through the gap and slippage cases that break naive stop assumptions.",
      lessonIds: ["rp-l4", "rp-l5", "rp-l6"],
    },
    {
      id: "c2-m3",
      title: "Module 3 · Portfolio risk & drawdown",
      subtitle: "Correlation, concentration and the recovery table",
      description:
        "Move from one position to many: correlated risk, concentration traps, drawdown arithmetic, and the recovery rules that keep a bad month survivable.",
      lessonIds: ["rp-l7", "rp-l8", "rp-l9"],
    },
  ],
  lessons: [
    lesson01RiskCeiling,
    lesson02SizingFromStop,
    lesson03MathOfRuin,
    lesson04WhereIdeasGoWrong,
    lesson05StopTypes,
    lesson06GapsAndSlippage,
    lesson07CorrelationConcentration,
    lesson08DrawdownArithmetic,
    lesson09RecoveryRules,
  ],
};
