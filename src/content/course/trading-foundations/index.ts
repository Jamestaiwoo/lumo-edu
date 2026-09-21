import type { Course } from "../types";
import { lesson01WhatIsTrading } from "./lesson-01-what-is-trading";
import { lesson02HowMarketsWork } from "./lesson-02-how-markets-work";
import { lesson03PriceFormation } from "./lesson-03-price-formation";
import { lesson04BidAskSpread } from "./lesson-04-bid-ask-spread";
import { lesson05OrderTypes } from "./lesson-05-order-types";
import { lesson06ReadingCharts } from "./lesson-06-reading-charts";
import { lesson07RiskBeforeReward } from "./lesson-07-risk-before-reward";
import { lesson08TradePlan } from "./lesson-08-trade-plan";
import { lesson09CostsAndExecution } from "./lesson-09-costs-and-execution";
import { lesson10PuttingItTogether } from "./lesson-10-putting-it-together";

/**
 * Course 1 — Trading Foundations.
 *
 * Ten lessons in four modules. Every lesson is a list of learning blocks, so
 * the progression is Teach → Demonstrate → Interact → Practice → Explain →
 * Check → Reflect → Recap rather than a list of questions.
 *
 * Assessment lives inside the lesson as `practice`, `check` and `scenario`
 * blocks. Those items feed the existing server-side grading, XP, streak and
 * mastery pipeline unchanged.
 */
export const tradingFoundationsCourse: Course = {
  id: "c1",
  title: "Trading Foundations",
  tagline: "How markets actually work, before you risk a single cent",
  description:
    "A guided course on the mechanics behind every price you will ever see: who trades, how orders execute, what trading really costs, and how to plan a decision before you take it.",
  level: "Foundation · no experience needed",
  completionAchievement: "course_1_foundations",
  outcomes: [
    "Describe how prices form from competing buyers and sellers",
    "Read a quote, an order book and a price chart without guessing",
    "Choose between market and limit orders for a reason you can explain",
    "Size a position from the risk you are willing to take, not from a feeling",
    "Write a trade plan that says where you are wrong before you enter",
  ],
  modules: [
    {
      id: "c1-m1",
      title: "Module 1 · How markets work",
      subtitle: "Prices, participants and the mechanics behind them",
      description:
        "Start with the machine itself: what a market is, who is on the other side, and how individual decisions become a single price.",
      lessonIds: ["tf-l1", "tf-l2", "tf-l3"],
    },
    {
      id: "c1-m2",
      title: "Module 2 · Quotes, charts and orders",
      subtitle: "Reading the two prices, then choosing how to trade them",
      description:
        "The bid, the ask, the spread and the candles — then the order types that decide what you pay and whether you get filled at all.",
      lessonIds: ["tf-l4", "tf-l5", "tf-l6"],
    },
    {
      id: "c1-m3",
      title: "Module 3 · Risk, costs and planning",
      subtitle: "The part that decides whether you survive to learn",
      description:
        "Risk ceilings, stop-based position sizing, written plans and the frictions — fees, slippage and spread — that every trade pays.",
      lessonIds: ["tf-l7", "tf-l8", "tf-l9"],
    },
    {
      id: "c1-m4",
      title: "Module 4 · Putting it together",
      subtitle: "One repeatable process, from context to review",
      description:
        "Combine everything into a six-step decision process you can run on any market, with honest expectations about what a process can and cannot do.",
      lessonIds: ["tf-l10"],
    },
  ],
  lessons: [
    lesson01WhatIsTrading,
    lesson02HowMarketsWork,
    lesson03PriceFormation,
    lesson04BidAskSpread,
    lesson05OrderTypes,
    lesson06ReadingCharts,
    lesson07RiskBeforeReward,
    lesson08TradePlan,
    lesson09CostsAndExecution,
    lesson10PuttingItTogether,
  ],
};
