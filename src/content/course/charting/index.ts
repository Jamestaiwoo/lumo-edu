import type { Course } from "../types";
import { lesson01AnatomyOfCandle } from "./lesson-01-anatomy-of-candle";
import { lesson02SwingStructure } from "./lesson-02-swing-structure";
import { lesson03ReadingWithoutIndicators } from "./lesson-03-reading-without-indicators";
import { lesson04TrendsAndStages } from "./lesson-04-trends-and-stages";
import { lesson05RangesAndBreakouts } from "./lesson-05-ranges-and-breakouts";
import { lesson06LevelsAsZones } from "./lesson-06-levels-as-zones";
import { lesson07WhatIndicatorsCompute } from "./lesson-07-what-indicators-compute";
import { lesson08MomentumAndTrend } from "./lesson-08-momentum-and-trend";
import { lesson09IndicatorFailureModes } from "./lesson-09-indicator-failure-modes";

/**
 * Course 3 — Charting & Technical Analysis.
 *
 * Structure first (candles, swings), then trend/range/level context, then
 * indicators as derived measurements with known failure modes. Stops from
 * Course 2 finally get their structure to sit on.
 */
export const chartingCourse: Course = {
  id: "c3",
  title: "Charting & Technical Analysis",
  tagline: "Reading what buyers and sellers already did — not predicting what they will",
  description:
    "Learn to read a chart as a record of decisions: candles, swing structure, trend stages, ranges and zones — then treat indicators honestly as measurements of that same record.",
  level: "Foundation · builds on Trading Foundations and Risk",
  completionAchievement: "course_3_charts",
  outcomes: [
    "Read a candle series as a continuous record of contested prices",
    "Map swing highs and lows to describe market structure",
    "Classify trend stages and range conditions before choosing a playbook",
    "Treat support and resistance as zones with risk, not lines",
    "Explain what common indicators compute and where they fail",
  ],
  modules: [
    {
      id: "c3-m1",
      title: "Module 1 · Candles & structure",
      subtitle: "The raw record, and how to label it",
      description:
        "What each candle encodes, how swings chain into structure, and how to describe a chart before any indicator touches it.",
      lessonIds: ["tc-l1", "tc-l2", "tc-l3"],
    },
    {
      id: "c3-m2",
      title: "Module 2 · Trends, ranges & levels",
      subtitle: "Context decides the playbook",
      description:
        "Classify the condition — trending or ranging — and locate the zones where prior decisions still matter.",
      lessonIds: ["tc-l4", "tc-l5", "tc-l6"],
    },
    {
      id: "c3-m3",
      title: "Module 3 · Indicators & their limits",
      subtitle: "Derived numbers, delayed signals",
      description:
        "What moving averages, RSI and momentum actually compute — and why every one of them lags, whipsaws, or both.",
      lessonIds: ["tc-l7", "tc-l8", "tc-l9"],
    },
  ],
  lessons: [
    lesson01AnatomyOfCandle,
    lesson02SwingStructure,
    lesson03ReadingWithoutIndicators,
    lesson04TrendsAndStages,
    lesson05RangesAndBreakouts,
    lesson06LevelsAsZones,
    lesson07WhatIndicatorsCompute,
    lesson08MomentumAndTrend,
    lesson09IndicatorFailureModes,
  ],
};
