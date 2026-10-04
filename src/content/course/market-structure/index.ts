import type { Course } from "../types";
import { lesson01ContinuousAuctions } from "./lesson-01-continuous-auctions";
import { lesson02ReadingTheBook } from "./lesson-02-reading-the-book";
import { lesson03LiquidityDimensions } from "./lesson-03-liquidity-dimensions";
import { lesson04SlippageMechanics } from "./lesson-04-slippage-mechanics";
import { lesson05CostLedger } from "./lesson-05-cost-ledger";
import { lesson06OrderTactics } from "./lesson-06-order-tactics-slicing";
import { lesson07MarketMakersHft } from "./lesson-07-market-makers-hft";
import { lesson08InstitutionsFlowMap } from "./lesson-08-institutions-flow-map";

/**
 * Course 5 — Market Structure & Microstructure.
 *
 * What happens inside the book between pressing buy and owning the position:
 * price formation and auctions, depth and liquidity, execution cost, and the
 * participants whose flow actually moves markets.
 */
export const marketStructureCourse: Course = {
  id: "c5",
  title: "Market Structure & Microstructure",
  tagline: "What happens between clicking buy and owning the position",
  description:
    "Inside the book: how quotes form and auctions clear, how to read depth and resilience, what execution really costs, and which participants are on the other side of every fill.",
  level: "Advanced · builds on Courses 1–4",
  completionAchievement: "course_5_microstructure",
  outcomes: [
    "Read a quote, a book walk and an auction clearing price without guessing",
    "Measure liquidity on three axes: spread, depth and resilience",
    "Split a real fill into spread cost and impact cost, and set a participation cap",
    "Build a five-line cost ledger and derive the break-even move for any trade",
    "Name the participants behind a fill and map the institutional flow around your instrument",
  ],
  modules: [
    {
      id: "c5-m1",
      title: "Module 1 · Auctions, Books & Liquidity",
      subtitle: "How prices form, and what the book can absorb",
      description:
        "Continuous trading versus auctions, how to read depth and hidden liquidity, and liquidity measured on three axes rather than one.",
      lessonIds: ["ms-l1", "ms-l2", "ms-l3"],
    },
    {
      id: "c5-m2",
      title: "Module 2 · Execution & Costs",
      subtitle: "Slippage, the full cost ledger and order tactics",
      description:
        "Where slippage comes from and how to measure it, every cost line in one account, and the ordering toolkit — including when slicing pays and when it does not.",
      lessonIds: ["ms-l4", "ms-l5", "ms-l6"],
    },
    {
      id: "c5-m3",
      title: "Module 3 · Who Moves Markets",
      subtitle: "Liquidity providers, speed traders and institutional flow",
      description:
        "Market makers and their inventory economics, high-frequency quoting behaviour, and the institutional flow map that makes the biggest prints predictable.",
      lessonIds: ["ms-l7", "ms-l8"],
    },
  ],
  lessons: [
    lesson01ContinuousAuctions,
    lesson02ReadingTheBook,
    lesson03LiquidityDimensions,
    lesson04SlippageMechanics,
    lesson05CostLedger,
    lesson06OrderTactics,
    lesson07MarketMakersHft,
    lesson08InstitutionsFlowMap,
  ],
};
