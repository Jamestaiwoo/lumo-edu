import type { Course } from "../types";
import { lesson01OwningABusiness } from "./lesson-01-owning-a-business";
import { lesson02EarningsDividendsSplits } from "./lesson-02-earnings-dividends-splits";
import { lesson03StockSpecificRisk } from "./lesson-03-stock-specific-risk";
import { lesson04WhatAnIndexIs } from "./lesson-04-what-an-index-is";
import { lesson05EtfStructure } from "./lesson-05-etf-structure";
import { lesson06IndexProductsAsTrades } from "./lesson-06-index-products-as-trades";
import { lesson07PhysicalMarkets } from "./lesson-07-physical-markets";
import { lesson08ContangoBackwardation } from "./lesson-08-contango-backwardation";
import { lesson09CommodityDrivers } from "./lesson-09-commodity-drivers";
import { lesson10CurrencyPairsPips } from "./lesson-10-currency-pairs-pips";
import { lesson11CentralBanksRates } from "./lesson-11-central-banks-rates";
import { lesson12ForexRiskSessions } from "./lesson-12-forex-risk-sessions";

/**
 * Course 4 — Markets & Instruments.
 *
 * Four instrument families side by side (stocks, indices & ETFs, commodities,
 * forex) so cross-instrument comparisons — spreads, hours, drivers, contract
 * mechanics — are taught together rather than in isolation.
 */
export const marketsInstrumentsCourse: Course = {
  id: "c4",
  title: "Markets & Instruments",
  tagline: "What you actually own, rent, or bet on when you click buy",
  description:
    "Four instrument families in one pass: equities and what they represent, indices and ETFs as baskets, commodities and their physical futures machinery, and currencies with their pip and session mechanics.",
  level: "Intermediate · builds on Courses 1–3",
  completionAchievement: "course_4_instruments",
  outcomes: [
    "Distinguish owning equity, a basket, a futures contract, and a currency pair",
    "Read index and ETF tracking, and know when tracking error matters",
    "Explain contango, backwardation and roll costs in commodity futures",
    "Compute pip values and size forex positions from account currency",
    "Match instrument-specific risks to instrument-specific playbooks",
  ],
  modules: [
    {
      id: "c4-m1",
      title: "Module 1 · Stocks",
      subtitle: "Ownership, corporate actions, single-name risk",
      description:
        "What a share is, how earnings/dividends/splits move the price, and what can go wrong in one company while the market rises.",
      lessonIds: ["mk-l1", "mk-l2", "mk-l3"],
    },
    {
      id: "c4-m2",
      title: "Module 2 · Indices & ETFs",
      subtitle: "Baskets, benchmarks and the funds that hold them",
      description:
        "How an index is constructed, how ETFs replicate it through creation/redemption, and how to trade index exposure without owning 500 companies.",
      lessonIds: ["mk-l4", "mk-l5", "mk-l6"],
    },
    {
      id: "c4-m3",
      title: "Module 3 · Commodities",
      subtitle: "Physical truth, futures strings and roll economics",
      description:
        "Why commodities trade through dated contracts, what contango and backwardation cost you, and which macro drivers move each family.",
      lessonIds: ["mk-l7", "mk-l8", "mk-l9"],
    },
    {
      id: "c4-m4",
      title: "Module 4 · Forex",
      subtitle: "Pairs, pips, central banks and sessions",
      description:
        "The currency market's quoting conventions, the rate-differential engine behind moves, and the session-liquidity risk map.",
      lessonIds: ["mk-l10", "mk-l11", "mk-l12"],
    },
  ],
  lessons: [
    lesson01OwningABusiness,
    lesson02EarningsDividendsSplits,
    lesson03StockSpecificRisk,
    lesson04WhatAnIndexIs,
    lesson05EtfStructure,
    lesson06IndexProductsAsTrades,
    lesson07PhysicalMarkets,
    lesson08ContangoBackwardation,
    lesson09CommodityDrivers,
    lesson10CurrencyPairsPips,
    lesson11CentralBanksRates,
    lesson12ForexRiskSessions,
  ],
};
