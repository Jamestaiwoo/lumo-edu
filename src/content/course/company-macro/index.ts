import type { Course } from "../types";
import { lesson01RevenueToEarnings } from "./lesson-01-revenue-to-earnings";
import { lesson02ValuationMultiples } from "./lesson-02-valuation-multiples";
import { lesson03BalanceSheetCash } from "./lesson-03-balance-sheet-cash";
import { lesson04InterestRates } from "./lesson-04-interest-rates";
import { lesson05InflationRealReturns } from "./lesson-05-inflation-real-returns";
import { lesson06GrowthDataSurprises } from "./lesson-06-growth-data-surprises";
import { lesson07EarningsSeason } from "./lesson-07-earnings-season";
import { lesson08EventRiskCalendar } from "./lesson-08-event-risk-calendar";

/**
 * Course 6 — Company & Macro Analysis.
 *
 * Reading a company's numbers, the macro forces that reprice every asset at
 * once, and planning risk around scheduled events.
 */
export const companyMacroCourse: Course = {
  id: "c6",
  title: "Company & Macro Analysis",
  tagline: "What drives value — inside a company and across the economy",
  description:
    "Read an income statement, balance sheet and cash flow; understand rates, inflation and growth data; and plan your risk around earnings and the economic calendar.",
  level: "Intermediate · builds on Courses 1–5",
  completionAchievement: "course_6_macro",
  outcomes: [
    "Walk an income statement from revenue to EPS and compute margins",
    "Read valuation multiples as expectations, not verdicts",
    "Explain how rates and inflation reprice assets",
    "Measure data and earnings surprises against consensus",
    "Size positions for gap risk around scheduled events",
  ],
  modules: [
    {
      id: "c6-m1",
      title: "Module 1 · Reading a Company",
      subtitle: "Earnings, valuation and cash",
      description:
        "The income statement, valuation multiples, and the balance sheet and cash flow checks that keep profit honest.",
      lessonIds: ["cm-l1", "cm-l2", "cm-l3"],
    },
    {
      id: "c6-m2",
      title: "Module 2 · Macro Drivers",
      subtitle: "Rates, inflation and growth",
      description:
        "How interest rates, inflation and growth data move every asset, and why markets trade surprises.",
      lessonIds: ["cm-l4", "cm-l5", "cm-l6"],
    },
    {
      id: "c6-m3",
      title: "Module 3 · Events & Calendars",
      subtitle: "Earnings season and event risk",
      description: "Reading earnings reactions and sizing positions around scheduled events.",
      lessonIds: ["cm-l7", "cm-l8"],
    },
  ],
  lessons: [
    lesson01RevenueToEarnings,
    lesson02ValuationMultiples,
    lesson03BalanceSheetCash,
    lesson04InterestRates,
    lesson05InflationRealReturns,
    lesson06GrowthDataSurprises,
    lesson07EarningsSeason,
    lesson08EventRiskCalendar,
  ],
};
