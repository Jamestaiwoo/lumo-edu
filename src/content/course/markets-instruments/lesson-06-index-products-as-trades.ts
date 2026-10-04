import type { CourseLesson } from "../types";

export const lesson06IndexProductsAsTrades: CourseLesson = {
  id: "mk-l6",
  moduleId: "c4-m2",
  title: "Index Products as Trades",
  blurb: "ETF or future? Same index, different risk engines.",
  objectives: [
    "Compare index ETFs and index futures as trading vehicles",
    "Compute a futures position's dollar-per-point exposure",
    "Identify margin, leverage and roll obligations in futures",
    "Choose the vehicle from holding period and capital constraints",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "An index future and an index ETF express the same benchmark — but the future adds margin, leverage, expiry and rolls; the ETF adds spread, fees and full upfront capital.",
  blocks: [
    {
      kind: "explain",
      id: "mk-l6-b1",
      explanation: {
        heading: "Two doors into the same index",
        whyItMatters:
          "'Trade the S&P' is a vehicle decision before it is a trade idea. The vehicle sets capital use, overnight risk, cost structure and failure modes.",
        paragraphs: [
          "Index ETFs: buy the basket wrapper outright, pay the full price, hold as long as you like, exit into the market's spread. Costs are visible (spread, tiny fee); no expiry, no forced actions, no leverage. The instrument fails gently — worst case is the basket falling.",
          "Index futures: a contract to transact the index's cash value at expiry, traded with margin — a good-faith deposit, not the full value. Each point of index movement pays or costs the contract's multiplier dollars per contract. That multiplier is the leverage: a fraction of the index's value controls full index exposure, amplifying gains and losses alike.",
          "The obligations are real: initial and maintenance margin with variation margin settling losses daily (and this is Course 2's gap arithmetic at index scale — overnight and weekend gaps breach stop intentions); expiry requiring rollover into the next contract (mk-l8's roll mechanics apply to index futures too, in contango form); and forced liquidation if margin is not met.",
          "Selection logic: long-horizon, capital-efficiency-insensitive → ETF; defined short-horizon tactical exposure with margin available and roll mechanics understood → future; anything in between → understand both cost stacks before choosing. Whichever vehicle: the claim is Course 3 structure, the size is Course 2 arithmetic, and the vehicle's failure mode is this lesson's contribution.",
        ],
        keyTerms: [
          {
            term: "Dollar-per-point (multiplier)",
            definition:
              "The contract's point value — the number that converts index points to money.",
          },
          {
            term: "Margin",
            definition:
              "Good-faith deposit controlling notional exposure — leverage by another name.",
          },
          {
            term: "Rollover",
            definition:
              "Closing the expiring contract and reopening in the next — a scheduled cost event.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "mk-l6-b2",
      example: {
        title: "Same signal, two vehicles",
        setup:
          "Index at 5,200. You are bullish for the next month. ETF at $520 with 0.03% fee; future multiplies $50 per point; margin requirement $12,000 per contract.",
        steps: [
          {
            label: "ETF route",
            detail:
              "$52,000 controls 100 shares of $520 exposure — 1.0× capital, full downside, no expiry.",
          },
          {
            label: "Future route",
            detail:
              "One contract = 5,200 × $50 = $260,000 notional for $12,000 margin — 21.7× capital efficiency, full exposure to $50/point moves.",
          },
          {
            label: "Compare the risk",
            detail:
              "A 1% index drop: ETF −$520 (−1% of capital); future −52 points × $50 = −$2,600 (−21.7% of margin). Leverage works symmetrically.",
          },
          {
            label: "Compare the obligations",
            detail:
              "ETF: none until you sell. Future: daily variation margin, expiry in ~4 weeks, forced liquidation if margin exhausts. The roll and the gap are scheduled risks the ETF does not carry.",
          },
        ],
        takeaway:
          "Capital efficiency purchased with obligations — read both price tags before choosing.",
      },
    },
    {
      kind: "visual",
      id: "mk-l6-b3",
      title: "ETF versus futures",
      visual: {
        type: "table",
        label: "Vehicle comparison",
        columns: ["Property", "Index ETF", "Index future"],
        rows: [
          ["Capital", "Full price paid", "Margin only — leveraged notional"],
          ["Obligations", "None", "Daily variation margin, expiry, roll"],
          [
            "Gap risk",
            "Overnight gap, uncapped but no forced action",
            "Gap breaches margin; forced liquidation possible",
          ],
          ["Costs", "Spread + small fee", "Spread + roll cost + financing"],
          ["Holding", "Unlimited", "Until expiry or your own roll"],
        ],
        caption:
          "Same benchmark exposure; the right column buys efficiency with a schedule of duties.",
      },
    },
    {
      kind: "interactive",
      id: "mk-l6-b4",
      title: "Vehicle selection",
      takeaway:
        "The choice keys to obligations you can meet and costs you have measured — never to 'which one moves faster'.",
      interaction: {
        type: "scenario-decision",
        prompt: "Three traders need index exposure. Which vehicle logic is sound?",
        situation: [
          "(a) Retirement account, 10-year horizon, no margin · (b) Two-week tactical bet with margin skill and time to monitor · (c) 'Futures are cheaper, use them always'.",
        ],
        choices: [
          {
            label:
              "a: broad ETF · b: future with margin plan and roll dated · c: reject — obligations and gap risk must fit the holder",
            outcome: "Each answer matches vehicle duties to the holder's capacity and horizon.",
            best: true,
            feedback:
              "Correct — horizon and obligation capacity decide; 'cheaper' without margin discipline is not a criterion.",
          },
          {
            label: "a: future for capital efficiency — lever the retirement account",
            outcome:
              "Daily variation margin and forced liquidation inside a long-horizon account is a mismatch of duties.",
            best: false,
            feedback:
              "Leverage obligations demand active monitoring and loss capacity the account's purpose excludes.",
          },
          {
            label: "b: ETF — no expiry to worry about",
            outcome:
              "Acceptable but ignores the stated short horizon: full capital locked for two weeks of exposure.",
            best: false,
            feedback:
              "A valid fallback — but the critique should name the cost (capital efficiency), not pretend ETFs lack trade-offs too.",
          },
          {
            label: "c: accept — futures always cheaper",
            outcome:
              "Cost stacks differ (rolls, financing, margin calls); 'cheaper' is situational arithmetic, not a law.",
            best: false,
            feedback:
              "Compare total cost for your horizon and size — futures win sometimes, ETFs win others.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "mk-l6-b5",
      title: "Guided practice",
      assessment: {
        intro: "Multiplier and margin arithmetic.",
        allowRetry: true,
        items: [
          {
            skill: "Notional value of a future",
            question: {
              id: "mk-l6-q1",
              type: "numeric",
              topic: "market-basics",
              prompt:
                "Index at 4,300 with a $25-per-point multiplier. What is one contract's notional value?",
              answer: 107500,
              tolerance: 100,
              unit: "USD",
              explain: "4,300 × 25 = $107,500 — the exposure one contract controls.",
            },
            feedbackByAnswer: { numeric: "Index × multiplier: 4,300 × 25 = 107,500." },
          },
          {
            skill: "Point-move P&L",
            question: {
              id: "mk-l6-q2",
              type: "numeric",
              topic: "market-basics",
              prompt:
                "You are long one contract ($25/point) from 4,300. The index falls to 4,270. What is the mark-to-market loss?",
              answer: 750,
              tolerance: 5,
              unit: "USD",
              explain: "(4,300 − 4,270) × 25 = 30 × 25 = $750 out of your margin, daily.",
            },
            feedbackByAnswer: { numeric: "Point drop × multiplier: 30 × 25 = 750." },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "mk-l6-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "What margin is",
            question: {
              id: "mk-l6-q3",
              type: "mcq",
              topic: "market-basics",
              prompt: "Margin on a futures contract is best described as:",
              options: [
                "The price of the contract",
                "A good-faith deposit controlling full notional exposure — leverage with obligations",
                "A fee charged by the exchange",
                "The maximum permitted loss",
              ],
              answer: 1,
              explain:
                "A fraction of notional controls the whole contract; losses settle daily against it — leverage you must feed.",
            },
            feedbackByAnswer: {
              "0": "The contract's price is the index level × multiplier, not the deposit.",
              "2": "Fees are separate (commission); margin is collateral.",
              "3": "Nothing caps loss at the margin — losses continue until liquidation, and beyond your deposit.",
            },
          },
          {
            skill: "Obligation awareness",
            question: {
              id: "mk-l6-q4",
              type: "truefalse",
              topic: "market-basics",
              prompt:
                "A futures holder faces daily variation margin, an expiry date and possible forced liquidation — duties an ETF holder does not carry.",
              answer: true,
              explain:
                "These are the 'schedules of duties' in the comparison: the efficiency is bought with them.",
            },
            feedbackByAnswer: {
              true: "Correct — the core ETF/future difference.",
              false: "An ETF has no margin, expiry or forced actions — only price risk and costs.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "mk-l6-b7",
      title: "Application scenario — module capstone",
      scenario: {
        situation: [
          "Your $20,000 account, 1% ceiling ($200). You want short-term long exposure to an index at 5,100 via futures, multiplier $10/point, margin $9,000/contract.",
          "Your plan's stop is 40 index points of adverse movement.",
        ],
        assessment: {
          items: [
            {
              skill: "Sizing futures by point risk",
              question: {
                id: "mk-l6-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt:
                  "One contract at $10/point risks 40 × 10 = $400 on your stop — twice the ceiling. What is the largest whole contract count that fits $200?",
                answer: 0,
                tolerance: 0,
                unit: "contracts",
                explain:
                  "One contract already risks $400 > $200, so zero contracts fit this stop. Honest options: a smaller-stop instrument (ETF with a tight stop) or no trade — never 1 contract at 'half risk'.",
              },
              feedbackByAnswer: {
                numeric:
                  "40 × 10 = 400 per contract vs budget 200 — 0 contracts fit; rounding up breaks the ceiling.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "mk-l6-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "If you had to hold index exposure for one month in a margin-enabled account, which vehicle would you choose, and what specific obligation would you diary?",
      ],
    },
    {
      kind: "summary",
      id: "mk-l6-b9",
      title: "Recap",
      points: [
        "ETFs buy the wrapper outright; futures control notional via margin with daily obligations.",
        "Multiplier converts index points to money — it is also the leverage.",
        "Roll dates, variation margin and forced liquidation are futures-specific scheduled risks.",
        "Vehicle choice follows horizon, capital and duty capacity — sizing still follows Course 2.",
      ],
      nextStep:
        "Next: Module 3 — commodities: physical markets, futures strings, and why expiry dominates.",
    },
  ],
};
