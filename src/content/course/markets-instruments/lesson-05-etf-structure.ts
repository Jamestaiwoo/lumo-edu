import type { CourseLesson } from "../types";

export const lesson05EtfStructure: CourseLesson = {
  id: "mk-l5",
  moduleId: "c4-m2",
  title: "ETF Structure & Tracking",
  blurb: "Creation, redemption and the machinery that keeps price near value.",
  objectives: [
    "Explain how creation and redemption arbitrage peg ETF price to NAV",
    "Distinguish ETF market price from net asset value",
    "Identify the sources of tracking error and why it accumulates",
    "Choose between ETF and mutual fund forms for a given use",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "An ETF is a fund whose shares trade like a stock — authorised participants keep the traded price honest by arbitraging any gap to the basket's value.",
  blocks: [
    {
      kind: "explain",
      id: "mk-l5-b1",
      explanation: {
        heading: "Two prices, one arbitrage engine",
        whyItMatters:
          "Everything about ETF reliability — and its failure modes in illiquid or stressed markets — follows from how that peg is maintained and when it slips.",
        paragraphs: [
          "An exchange-traded fund holds a basket and issues shares that trade all day. Two prices exist: NAV (what the basket is worth per share, computed from holdings) and market price (what buyers and sellers pay on the exchange). If market price exceeds NAV, authorised participants — large intermediaries with exchange access — create new shares: deliver the basket to the fund, receive fresh shares, sell them, pocketing the premium. That selling pushes market price back toward NAV. Redemption works the mirror: buy shares cheap, deliver them, receive the basket.",
          "So the market price is policed by arbitrage, not by law. The peg is strongest when the basket is liquid and premium/discount tiny (basis points). It weakens when holdings are illiquid, when the ETF trades outside the basket's hours, or in stress — the premium/discount widens precisely when you least want it, and the arbitrageur's profit is your cost.",
          "Tracking error is the accumulation of frictions: expense ratio (a yearly fee dragging performance), bid-ask spread, cash drag (uninvested balances), sampling error for indexed-but-not-identical baskets, and rebalancing costs. A 0.03% fee ETF may track within a few basis points a year; a leveraged or exotic fund can diverge structurally — those products track a daily objective, not the index's long-run path.",
          "Versus a mutual fund: same basket logic, different plumbing — mutual funds transact once daily at NAV, no intraday premiums, no intraday stops. ETFs add intraday execution (with its spread and premium risk) and usually lower minimums. The trade-off is execution control versus pricing simplicity.",
        ],
        keyTerms: [
          {
            term: "NAV",
            definition:
              "Net asset value: the basket's worth per share — the reference the arbitrage pegs to.",
          },
          {
            term: "Creation/redemption",
            definition:
              "The authorised participant mechanism converting baskets ↔ shares, enforcing the peg.",
          },
          {
            term: "Tracking error",
            definition:
              "Cumulative divergence between fund and index from fees, spreads, cash and sampling.",
          },
        ],
        callouts: [
          {
            tone: "info",
            title: "Premium/discount is checkable",
            body: "Most data platforms show an ETF's live premium to NAV. In liquid funds it is near zero; a persistent gap is information about the fund's plumbing.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "mk-l5-b2",
      example: {
        title: "The arbitrage loop, step by step",
        setup:
          "ETF market price $101.50; NAV $101.00 — a 0.50% premium. The basket is fully liquid.",
        steps: [
          {
            label: "Participant acts",
            detail:
              "An AP delivers $101.00 of underlying shares to the fund and receives one new ETF share.",
          },
          {
            label: "Sell the new share",
            detail: "Sell at market for $101.50 — collect ~$0.50 minus fees and transaction costs.",
          },
          {
            label: "Market responds",
            detail:
              "That sell-side pressure pushes the ETF's price toward $101.00; the premium collapses.",
          },
          {
            label: "Reverse case",
            detail:
              "If the ETF traded at $100.40 (discount), the AP buys shares on-exchange, redeems them for the $101.00 basket, and the buying lifts the price back up.",
          },
        ],
        takeaway:
          "The peg is not a promise — it is profitable work performed continuously by arbitrageurs, which is why it weakens when that work gets expensive.",
      },
    },
    {
      kind: "visual",
      id: "mk-l5-b3",
      title: "Tracking error sources",
      visual: {
        type: "table",
        label: "Why the fund drifts from the index",
        columns: ["Source", "Direction", "Cumulative?"],
        rows: [
          ["Expense ratio (fee)", "Fund underperforms", "Yes — every year"],
          ["Bid-ask spread on rebalancing", "Fund underperforms", "Yes — with turnover"],
          ["Cash drag (uninvested money)", "Either way, usually drag", "Yes"],
          ["Sampling (not all holdings bought)", "Either way", "Varies"],
          ["Premium/discount at your exit", "Your fill vs NAV", "At transaction time"],
        ],
        caption:
          "Fees compound against you silently; premiums bite at execution. Check both before choosing a fund.",
      },
    },
    {
      kind: "interactive",
      id: "mk-l5-b4",
      title: "Fund selection judgements",
      takeaway:
        "Each defensible pick starts from the mechanism — peg, hours, fees, objective — not from last year's performance column.",
      interaction: {
        type: "scenario-decision",
        prompt: "Three ETF questions arrive. Which analysis is sound?",
        situation: [
          "(a) An emerging-market ETF shows a persistent 0.4% premium · (b) A broad US tracker with 0.03% fee and tight spread · (c) A '3× daily tech' fund.",
        ],
        choices: [
          {
            label:
              "a: suspect illiquid holdings weakening the peg; b: tracking error dominated by the small fee; c: daily-reset product whose long-run path diverges from 3× the index",
            outcome:
              "Each verdict follows from structure: peg strength, error sources, and reset arithmetic.",
            best: true,
            feedback:
              "Correct — premiums scale with arbitrage cost, error decomposes into known frictions, and leverage resets daily by design.",
          },
          {
            label: "Buy (a) — premiums mean the ETF is popular, which is bullish",
            outcome:
              "You pay 0.4% over NAV immediately; popularity is not a reason to overpay for the basket.",
            best: false,
            feedback:
              "A premium is a cost you hand to the arbitrage loop, not information about future returns.",
          },
          {
            label: "Choose (c) because 3× sounds like more upside",
            outcome:
              "Daily compounding in chop erodes long-hold returns far below 3× of the index path.",
            best: false,
            feedback:
              "Leveraged funds track a daily objective; hold paths diverge — a structural tracking difference, not a fee.",
          },
          {
            label: "Ignore (b)'s fee — spreads matter more",
            outcome:
              "The fee drags every single year you hold; the spread costs only when you trade.",
            best: false,
            feedback:
              "For buy-and-hold, annual fee × years beats one-time spread; for frequent trading, flip the analysis.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "mk-l5-b5",
      title: "Guided practice",
      assessment: {
        intro: "Premiums, discounts and fee drag.",
        allowRetry: true,
        items: [
          {
            skill: "Premium cost",
            question: {
              id: "mk-l5-q1",
              type: "numeric",
              topic: "costs",
              prompt:
                "ETF NAV is $52.00 but it trades at $52.40. What percentage premium are you paying over the basket?",
              answer: 0.77,
              tolerance: 0.03,
              unit: "%",
              explain: "(52.40 − 52.00) ÷ 52.00 = 0.40 ÷ 52.00 = 0.77% paid above NAV.",
            },
            feedbackByAnswer: {
              numeric: "Premium ÷ NAV: 0.40 ÷ 52.00 = 0.0077 = 0.77%.",
            },
          },
          {
            skill: "Annual fee drag over time",
            question: {
              id: "mk-l5-q2",
              type: "numeric",
              topic: "costs",
              prompt:
                "A 0.20% annual expense ratio on a $25,000 position. What does the fee cost in the first year?",
              answer: 50,
              tolerance: 1,
              unit: "USD",
              explain: "25,000 × 0.002 = $50 per year — charged whether the fund wins or loses.",
            },
            feedbackByAnswer: { numeric: "25,000 × 0.002 = 50." },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "mk-l5-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "The peg mechanism",
            question: {
              id: "mk-l5-q3",
              type: "mcq",
              topic: "market-basics",
              prompt: "What keeps an ETF's market price near its NAV?",
              options: [
                "A regulatory price guarantee",
                "Authorised participants' creation/redemption arbitrage between market price and basket value",
                "The fund manager issuing buy orders",
                "NAV updating to match market price continuously",
              ],
              answer: 1,
              explain:
                "The arbitrage loop is the mechanism; it works while the profit exceeds the cost of doing it.",
            },
            feedbackByAnswer: {
              "0": "No regulator backstops ETF premiums.",
              "2": "Managers do not defend prices with fund capital.",
              "3": "NAV is computed from holdings, not from the exchange tape.",
            },
          },
          {
            skill: "When the peg weakens",
            question: {
              id: "mk-l5-q4",
              type: "truefalse",
              topic: "market-basics",
              prompt:
                "An ETF holding illiquid foreign shares can trade at a wider premium/discount precisely because arbitrage is costlier to perform.",
              answer: true,
              explain:
                "Arbitrage cost — hedging, settlement, transport — sets the residual premium; illiquidity raises that cost.",
            },
            feedbackByAnswer: {
              true: "Correct — the peg degrades exactly where the mechanism gets expensive.",
              false: "That denies the mechanism its own cost function.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "mk-l5-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You place a $20,000 market order in a broad ETF: NAV $400.00, best ask $400.40 (0.10% premium), spread $0.20 wide.",
          "You plan to hold for five years; the fund charges 0.05% annually.",
        ],
        assessment: {
          items: [
            {
              skill: "Entry cost decomposition",
              question: {
                id: "mk-l5-q5",
                type: "numeric",
                topic: "costs",
                prompt:
                  "Buying at the ask means paying a premium of how many dollars on 50 shares (20,000 ÷ 400.50 ≈ 50)?",
                answer: 20,
                tolerance: 2,
                unit: "USD",
                explain:
                  "Premium over NAV = 400.40 − 400.00 = $0.40 × 50 shares = $20 — a one-time cost of the execution moment.",
              },
              feedbackByAnswer: {
                numeric: "0.40 × 50 = 20.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "mk-l5-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "For a fund you hold or want: what is its expense ratio, and roughly what will fees cost over your intended holding period?",
      ],
    },
    {
      kind: "summary",
      id: "mk-l5-b9",
      title: "Recap",
      points: [
        "ETFs have two prices — NAV and market — kept aligned by creation/redemption arbitrage.",
        "The peg is profitable work, not a guarantee; illiquidity and stress widen premiums.",
        "Tracking error accumulates from fees, spreads, cash and sampling.",
        "Leveraged ETFs track daily objectives — long-hold paths diverge structurally.",
      ],
      nextStep:
        "Next: trading index products themselves — futures, ETFs and the risk each carries.",
    },
  ],
};
