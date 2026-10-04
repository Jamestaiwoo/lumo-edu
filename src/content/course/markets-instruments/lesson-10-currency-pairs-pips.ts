import type { CourseLesson } from "../types";

export const lesson10CurrencyPairsPips: CourseLesson = {
  id: "mk-l10",
  moduleId: "c4-m4",
  title: "Currency Pairs & Pips",
  blurb:
    "Every forex price is a ratio — and your P&L is denominated in whichever side you are not holding.",
  objectives: [
    "Read a pair as base/quote and say what a rising price means",
    "Compute pip value for USD-quoted and USD-based pairs",
    "Convert a stop distance in pips into money risk per lot",
    "Size a forex position from an account-currency budget",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "A forex price is a ratio: base over quote. Pips are the price unit, lots are the size unit, and pip value depends on where the dollar sits in the pair — get that wrong and every size is wrong.",
  blocks: [
    {
      kind: "explain",
      id: "mk-l10-b1",
      explanation: {
        heading: "A ratio with a job to do",
        whyItMatters:
          "Forex looks like the simplest market and is the easiest to mis-size: the same 20-pip stop costs $200 on one pair and ¥2,000 on another. The pair's quoting convention decides.",
        paragraphs: [
          "Structure: EUR/USD = 1.0850 means one euro costs 1.0850 dollars. EUR is the base (the thing being priced), USD the quote (the money you pay in). Buying the pair means you are long the euro and short the dollar simultaneously — every forex trade is a relative bet, never an absolute one.",
          "Majors (EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD) all include the dollar; crosses (EUR/GBP, EUR/JPY, GBP/JPY) do not — crosses move on the two legs' relative strength and typically carry wider spreads and jumpier ranges.",
          "The pip: the standard smallest quoted increment. For most pairs it is 0.0001 (the fourth decimal); for JPY-quoted pairs (USD/JPY, EUR/JPY) it is 0.01 (the second decimal). A 'pipette' is a tenth of a pip — the fifth/sixth decimal seen in retail quotes. A 20-pip move on EUR/USD is 1.0850 → 1.0870.",
          "Pip value: what one pip is worth in your account currency, per unit of position. Standard lot = 100,000 units of base; mini = 10,000; micro = 1,000. When USD is the quote currency (EUR/USD), pip value per standard lot is fixed: 100,000 × 0.0001 = $10 per pip — mini $1, micro $0.10. When USD is the base (USD/JPY), pip value is in the quote currency: 100,000 × 0.01 = ¥1,000 per pip, which you convert to dollars by dividing by the current rate (¥1,000 ÷ 150.00 ≈ $6.67 per pip).",
        ],
        keyTerms: [
          {
            term: "Base / quote",
            definition:
              "Base is the priced asset, quote the money it costs — EUR/USD: euros priced in dollars.",
          },
          {
            term: "Cross",
            definition: "A pair with no USD leg (EUR/GBP) — two simultaneous relative bets.",
          },
          {
            term: "Pip value",
            definition:
              "Money per pip per position; fixed ($10/standard lot) only when USD is the quote currency.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "mk-l10-b2",
      example: {
        title: "Same stop, three pip values",
        setup:
          "You risk $100 with a 25-pip stop. Account is USD. Compare EUR/USD (USD quote), USD/JPY at 150.00 (USD base), and a mini lot on EUR/USD.",
        steps: [
          {
            label: "EUR/USD standard lot",
            detail:
              "Pip value = 100,000 × 0.0001 = $10. Unit risk = 25 × $10 = $250. 100 ÷ 250 = 0.4 lots — no full lot fits.",
          },
          {
            label: "EUR/USD mini lot",
            detail:
              "Pip value = $1. Unit risk = 25 × $1 = $25. 100 ÷ 25 = 4 mini lots = 40,000 units. Budget respected.",
          },
          {
            label: "USD/JPY standard lot",
            detail:
              "Pip value = ¥1,000 ÷ 150.00 ≈ $6.67. Unit risk = 25 × $6.67 ≈ $166.75. 100 ÷ 166.75 ≈ 0.6 lots — still too big for one lot.",
          },
          {
            label: "Read the result",
            detail:
              "Identical stops, three different dollar bills. The pip convention and lot size set the risk — the stop distance alone tells you nothing.",
          },
        ],
        takeaway:
          "Size forex as: pips risked × pip value × lots ≤ budget — solve for lots, round down.",
      },
    },
    {
      kind: "visual",
      id: "mk-l10-b3",
      title: "Pip and lot reference",
      visual: {
        type: "table",
        label: "Standard lot (100,000 units)",
        columns: ["Pair", "Pip", "Pip value", "Notes"],
        rows: [
          [
            "EUR/USD (USD quote)",
            "0.0001",
            "$10.00",
            "Fixed — quote currency is your account currency",
          ],
          ["GBP/USD (USD quote)", "0.0001", "$10.00", "Same convention, wider typical range"],
          [
            "USD/JPY @ 150.00 (USD base)",
            "0.01",
            "≈ $6.67",
            "¥1,000 ÷ rate — pip value moves with price",
          ],
          [
            "USD/CHF @ 0.90 (USD base)",
            "0.0001",
            "≈ $11.11",
            "CHF 10 ÷ 0.90 — moves as the rate moves",
          ],
        ],
        caption:
          "Fixed $10 only happens when the dollar is the quote. Everything else must be converted — the rate you divide by changes as the market moves.",
      },
    },
    {
      kind: "interactive",
      id: "mk-l10-b4",
      title: "Spot the sizing error",
      takeaway:
        "Forex risk errors are almost always pip-value errors: a trader applies the $10-per-pip habit to a pair where it is false.",
      interaction: {
        type: "scenario-decision",
        prompt: "A trader writes three plans. Which one sizes correctly?",
        situation: [
          "Account: $500 USD. (a) 1 standard lot EUR/USD, 30-pip stop · (b) 1 standard lot USD/JPY at 150, 30-pip stop, budget $100 · (c) 0.2 standard lots EUR/USD, 30-pip stop.",
        ],
        choices: [
          {
            label:
              "Only (c) — 0.2 standard lots ≈ 20,000 units ≈ $2/pip → 30 × $2 = $60 risk on a $500 account",
            outcome:
              "Sizing is derived from pip value and budget, not from habit or leverage limits.",
            best: true,
            feedback:
              "Correct — pips risked × pip value × size ≤ budget, solved for size. (a) and (b) both break the ceiling; only (c) fits it.",
          },
          {
            label: "(a) — one standard lot is the standard forex size",
            outcome: "30 pips × $10 = $300 risk — 60% of the account on one trade.",
            best: false,
            feedback:
              "Standard lot is a convention, not a permission slip: $300 of a $500 account violates every ceiling from Course 2.",
          },
          {
            label: "(b) — the stop is capped in pips and the budget is stated",
            outcome: "30 pips × ≈ $6.67 = ~$200 — double the stated $100 budget.",
            best: false,
            feedback:
              "Stating a budget does not satisfy it; you must divide by the pair's actual pip value, which is not $10 here.",
          },
          {
            label: "All three — leverage makes the difference negligible",
            outcome:
              "Leverage sets the margin requirement, never the loss. Risk is pips × pip value × size.",
            best: false,
            feedback:
              "High leverage makes oversized positions possible, which is exactly why pip-value arithmetic is the guardrail.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "mk-l10-b5",
      title: "Guided practice",
      assessment: {
        intro: "Convert pips into money.",
        allowRetry: true,
        items: [
          {
            skill: "Pip value, USD quote",
            question: {
              id: "mk-l10-q1",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "GBP/USD, standard lot (100,000 units), pip = 0.0001. What is one pip worth in USD?",
              answer: 10,
              tolerance: 0.05,
              unit: "USD",
              explain: "100,000 × 0.0001 = $10 per pip — fixed whenever USD is the quote currency.",
            },
            feedbackByAnswer: {
              numeric: "Units × pip size: 100,000 × 0.0001 = 10.",
            },
          },
          {
            skill: "Pip value, USD base",
            question: {
              id: "mk-l10-q2",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "USD/JPY at 150.00, standard lot: pip = 0.01, so one pip is ¥1,000. What is that worth in USD (2 decimals)?",
              answer: 6.67,
              tolerance: 0.05,
              unit: "USD",
              explain:
                "¥1,000 ÷ 150.00 ≈ $6.67 — when USD is the base, pip value must be converted by the rate.",
            },
            feedbackByAnswer: {
              numeric: "Yen pip value ÷ rate: 1,000 ÷ 150.00 ≈ 6.67.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "mk-l10-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Reading the pair",
            question: {
              id: "mk-l10-q3",
              type: "mcq",
              topic: "market-basics",
              prompt: "EUR/USD rises from 1.0800 to 1.0860. What happened?",
              options: [
                "The euro weakened against the dollar",
                "One euro now costs more dollars — the base strengthened against the quote",
                "The dollar strengthened against everything",
                "Nothing without more data",
              ],
              answer: 1,
              explain:
                "Price is base-in-quote: a higher number means the base buys more quote currency — euro strength, dollar weakness.",
            },
            feedbackByAnswer: {
              "0": "A rising EUR/USD is euro strength, the reverse of this option.",
              "2": "A stronger dollar would push EUR/USD down, not up.",
              "3": "The quote fully describes the pair's move — no extra data needed to read direction.",
            },
          },
          {
            skill: "Cross-pair risk",
            question: {
              id: "mk-l10-q4",
              type: "truefalse",
              topic: "costs",
              prompt:
                "Trading a cross like GBP/JPY means holding two relative bets at once, typically with wider spreads and larger ranges than a major.",
              answer: true,
              explain:
                "No dollar leg means both currencies' stories are live; crosses are thinner, so spreads widen and ranges stretch.",
            },
            feedbackByAnswer: {
              true: "Correct — two legs, one position, wider cost of doing business.",
              false:
                "Crosses layer two exposures and thinner liquidity — the added cost is structural.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "mk-l10-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Account: $5,000 USD. Risk ceiling per trade: 1% = $50.",
          "Setup: EUR/USD long, stop 25 pips below entry. You trade mini lots (10,000 units): pip value = $1 per mini lot.",
        ],
        assessment: {
          items: [
            {
              skill: "Forex sizing from budget",
              question: {
                id: "mk-l10-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt: "How many mini lots fit the $50 ceiling with a 25-pip stop?",
                answer: 2,
                tolerance: 0,
                unit: "mini lots",
                explain:
                  "Unit risk = 25 × $1 = $25 per mini lot. $50 ÷ $25 = 2 mini lots (20,000 units) — the Course-2 division again.",
              },
              feedbackByAnswer: {
                numeric: "25 pips × $1 = $25 per mini lot; 50 ÷ 25 = 2.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "mk-l10-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Pick a pair you would actually trade. Write its pip size, your typical stop in pips, and the dollar risk at one lot — then your correct size for a 1% ceiling.",
      ],
    },
    {
      kind: "summary",
      id: "mk-l10-b9",
      title: "Recap",
      points: [
        "A pair is a ratio: base priced in quote — buying it is long one currency, short the other.",
        "Pip = 0.0001 (0.01 for JPY pairs); lots run 100,000 / 10,000 / 1,000 units.",
        "Pip value is fixed at $10/standard lot only when USD is the quote — otherwise convert by the rate.",
        "Sizing formula is unchanged: pips × pip value × lots ≤ budget, round down.",
      ],
      nextStep:
        "Next: who actually moves currencies — central banks, rate differentials and carry.",
    },
  ],
};
