import type { CourseLesson } from "../types";

export const lesson05CostLedger: CourseLesson = {
  id: "ms-l5",
  moduleId: "c5-m2",
  title: "The Real Cost Ledger",
  blurb: "Your trade must clear five cost lines before it earns you a cent.",
  objectives: [
    "Name the five cost lines of a real trade",
    "Convert every cost into cents per share or ticks per round trip",
    "Compute the break-even move a trade must clear",
    "Estimate the annual cost drag of a trading frequency",
  ],
  durationMinutes: 12,
  xp: 38,
  keyTakeaway:
    "Total cost = spread + commission + slippage + financing + taxes. Whatever your edge, the trade must clear that total first — and frequency multiplies it.",
  blocks: [
    {
      kind: "explain",
      id: "ms-l5-b1",
      explanation: {
        heading: "Five lines, one P&L",
        whyItMatters:
          "A strategy can be right about direction on most of its trades and still lose money. The ledger is where that happens — and most traders have never written it down.",
        paragraphs: [
          "Every round trip passes through five cost lines. Spread: crossing the quote, paid once on entry and once on exit. Commission and explicit fees: broker charges, exchange fees, levies. Slippage: the difference between your arrival price and your average fill. Financing: margin interest, stock borrow, or the swap/roll charged on leveraged and derivative positions. Taxes and stamp duties: jurisdiction-specific but real in most markets.",
          "The lines differ in visibility. Commission is printed on your statement. Financing is a daily accrual that quietly compounds. Slippage appears in no column at all — it is baked into your average fill — which is precisely why it is the most under-reported cost in retail trading.",
          "Convert everything into one comparable unit — cents per share, or basis points per round trip. That makes cost comparable across instruments, position sizes and strategies: a 3.1-cent round-trip cost on a $50 stock is 0.062% of capital, whether you trade 100 shares or 10,000.",
          "Then compute the break-even move: total cost divided by shares. If the ledger says 3.1 cents and your setup typically captures 2 cents, the trade is a loser no matter how well you time it. This single check removes more bad trades than any indicator.",
          "Finally, multiply by frequency. Fifty round trips a year at 3.1 cents on a $50 stock costs about 3.1% of capital a year — a permanent headwind paid before any losses. That is why high-frequency styles need either a lower cost structure or a much larger edge.",
        ],
        keyTerms: [
          {
            term: "Cost drag",
            definition:
              "The total annual cost of trading at a given frequency, expressed as a percentage of capital.",
          },
          {
            term: "Break-even move",
            definition:
              "The price move required just to cover total round-trip costs, before any profit.",
          },
          {
            term: "Financing",
            definition:
              "Margin interest, stock borrow or swap charged for holding leveraged positions over time.",
          },
          {
            term: "Basis point (bp)",
            definition: "One hundredth of a percentage point — 0.01%.",
          },
        ],
        callouts: [
          {
            tone: "tip",
            title: "Write the ledger before the entry",
            body: "Total cost ÷ shares = the move you must capture. If the setup cannot plausibly deliver that, pass on it.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "ms-l5-b2",
      example: {
        title: "One round trip, all five lines",
        setup:
          "You buy 1,000 shares of a $50 stock with limit orders on both sides. The mid moves from 50.00 at entry to 50.07 at exit. Commission is $0.005 per share per side; financing for the two-day hold is $1. Slippage is zero because both orders were limits that filled.",
        steps: [
          {
            label: "What the market gave you",
            detail:
              "Mid-to-mid move: 0.07 × 1,000 = $70 of gross gain. That is the move — not your P&L.",
          },
          {
            label: "Spread",
            detail:
              "0.01 on entry plus 0.01 on exit = $20. Paid on every round trip, in every market, always.",
          },
          {
            label: "Commission and fees",
            detail: "$0.005 × 1,000 shares × 2 sides = $10, printed clearly on your statement.",
          },
          {
            label: "Slippage and financing",
            detail: "Slippage $0 (limit orders). Financing on the two-day hold: $1.",
          },
          {
            label: "Total and net",
            detail:
              "$20 + $10 + $1 = $31 total cost. Net gain $70 − $31 = $39 — you kept 3.9 cents of the 7 cents the market moved.",
          },
          {
            label: "Break-even and frequency",
            detail:
              "Break-even move = $31 ÷ 1,000 = 3.1 cents = 0.062% of capital. Fifty such round trips a year = about 3.1% of capital paid in costs before any losses.",
          },
        ],
        takeaway:
          "The market moved seven cents and you kept under four. Nothing was mispriced — the ledger simply took its share first, and it takes it again on every trade you take.",
      },
    },
    {
      kind: "visual",
      id: "ms-l5-b3",
      title: "The ledger for one round trip",
      visual: {
        type: "table",
        label: "1,000 shares · two-day hold · limit orders both sides",
        columns: ["Cost line", "Calculation", "Amount"],
        rows: [
          ["Spread", "0.01 × 1,000 × 2 sides", "$20.00"],
          ["Commission and fees", "$0.005 × 1,000 × 2 sides", "$10.00"],
          ["Slippage", "Limit orders, no walk", "$0.00"],
          ["Financing", "Two-day margin hold", "$1.00"],
          ["Taxes and levies", "None in this example", "$0.00"],
          ["Total cost", "—", "$31.00"],
          ["Break-even move", "$31 ÷ 1,000 shares", "3.1 cents (0.062%)"],
          ["Net result on a 7-cent move", "$70.00 − $31.00", "$39.00"],
        ],
        caption:
          "Two of the five lines will never appear on a broker statement line by line. The ledger is the only version of the trade that tells the truth.",
      },
    },
    {
      kind: "interactive",
      id: "ms-l5-b4",
      title: "Is the trade worth taking?",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Same instrument, same 1,000 shares, same 3.1-cent round-trip ledger. Your setup now expects to capture only 2 cents per share. What do you do?",
        situation: [
          "Your setup has a genuine 2-cent expected move in your favour.",
          "Total round-trip cost is 3.1 cents per share, and your stop keeps risk at 6 cents per share.",
        ],
        choices: [
          {
            label: "Pass on the trade",
            outcome:
              "You skip it and keep your capital for setups whose expected move clears the ledger.",
            best: true,
            feedback:
              "Correct — arithmetic beats conviction. An expected 2-cent move against a 3.1-cent cost is a losing trade before the market even responds.",
          },
          {
            label: "Take it but with double the size to make it worthwhile",
            outcome:
              "Cost stays 3.1 cents per share, so doubling size doubles the loss, not the edge. It also doubles impact if you cross the book.",
            best: false,
            feedback:
              "Costs are per share, not per trade. Scaling a negative expected value scales the negative — the classic martingale-flavoured error.",
          },
          {
            label: "Take it and hold longer, hoping the move grows to 6 cents",
            outcome:
              "Holding longer adds financing and widens the range of outcomes; the edge you measured was a 2-cent move.",
            best: false,
            feedback:
              "Changing the plan to fit the fee is not a strategy. If the thesis is a 2-cent move, holding for 6 cents is a different, unevidenced trade.",
          },
        ],
      },
      takeaway:
        "Total cost ÷ shares is the move you must capture. A setup that cannot clear it is not a small edge — it is a certain loss with extra steps.",
    },
    {
      kind: "practice",
      id: "ms-l5-b5",
      title: "Guided practice",
      assessment: {
        intro: "Do the ledger arithmetic yourself.",
        allowRetry: true,
        items: [
          {
            skill: "Net result after all costs",
            question: {
              id: "ms-l5-q1",
              type: "numeric",
              topic: "costs",
              prompt:
                "The mid moves 7 cents in your favour on 1,000 shares. Total costs are spread $20, commission $10 and financing $1. What is the net gain in dollars?",
              answer: 39,
              tolerance: 0.5,
              unit: "USD",
              explain:
                "Gross 0.07 × 1,000 = $70. Total cost $20 + $10 + $1 = $31. Net $70 − $31 = $39.",
            },
            feedbackByAnswer: {
              numeric: "Gross $70 minus $31 of ledger = $39.",
            },
          },
          {
            skill: "Break-even move",
            question: {
              id: "ms-l5-q2",
              type: "numeric",
              topic: "costs",
              prompt:
                "Given the same $31 of costs on 1,000 shares, what move in cents per share must the trade capture just to break even?",
              answer: 3.1,
              tolerance: 0.05,
              unit: "cents",
              explain:
                "$31 ÷ 1,000 shares = 3.1 cents. Any setup whose expected move is smaller than this is negative expectancy regardless of how good the entry looks.",
            },
            feedbackByAnswer: {
              numeric: "Total cost ÷ shares: 31 ÷ 1,000 = 0.031 = 3.1 cents per share.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "ms-l5-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Invisible costs",
            question: {
              id: "ms-l5-q3",
              type: "mcq",
              topic: "fees",
              prompt:
                "Which cost line never appears as its own entry on your broker statement, yet is charged on every trade?",
              options: [
                "Commission",
                "Slippage — the gap between your arrival price and your average fill",
                "Regulatory levies",
                "Market data subscriptions",
              ],
              answer: 1,
              explain:
                "Slippage is embedded inside the average fill price, so no line item ever names it. Commission, levies and subscriptions are all itemised — which is exactly why traders systematically underestimate the cost that is not written down.",
            },
            feedbackByAnswer: {
              "0": "Commission is the most visible cost of all — it is printed per trade.",
              "2": "Levies are explicit, itemised charges, usually small and proportional to trade size.",
              "3": "Data subscriptions are a fixed monthly line, not a per-trade execution cost.",
            },
          },
          {
            skill: "Zero-commission trading",
            question: {
              id: "ms-l5-q4",
              type: "truefalse",
              topic: "fees",
              prompt: "If your broker charges no commission, your trading has no cost.",
              answer: false,
              explain:
                "Spread is still crossed, slippage still occurs, and financing still accrues on leveraged positions. Zero commission removes one of five lines — usually the smallest one for active traders.",
            },
            feedbackByAnswer: {
              true: "Zero commission removes the visible line, not the spread, the impact or the financing.",
              false:
                "Correct — the spread is paid on every trade whether or not a commission is charged.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "ms-l5-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You short 1,000 shares of a $50 stock. The stock borrow fee is 8% a year.",
          "You hold the position for five trading days. Assume 250 trading days in a year.",
        ],
        assessment: {
          items: [
            {
              skill: "Financing cost of a short",
              question: {
                id: "ms-l5-q5",
                type: "numeric",
                topic: "fees",
                prompt: "What is the borrow cost of this five-day hold, in dollars?",
                answer: 80,
                tolerance: 1,
                unit: "USD",
                explain:
                  "Position value = 1,000 × $50 = $50,000. Annual borrow = 8% × $50,000 = $4,000. Per trading day = $4,000 ÷ 250 = $16. Five days = $80 — more than double the $39 net profit from the earlier example, so financing can decide a trade on its own.",
              },
              feedbackByAnswer: {
                numeric:
                  "8% of $50,000 is $4,000 a year; ÷ 250 trading days = $16 a day; × 5 days = $80.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "ms-l5-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Write the ledger for the instrument you trade most: spread, commission, expected slippage and financing, converted into cents per share.",
      ],
    },
    {
      kind: "summary",
      id: "ms-l5-b9",
      title: "Recap",
      points: [
        "Five lines: spread, commission, slippage, financing, taxes and levies.",
        "Convert everything to cents per share or basis points per round trip so trades are comparable.",
        "Break-even move = total cost ÷ shares; below it, a setup is a guaranteed loss.",
        "Frequency multiplies cost: fifty round trips at 3.1 cents is roughly 3.1% of capital a year.",
        "Financing can dominate short-term trades — price the hold, not only the entry.",
      ],
      nextStep:
        "Next lesson: the order toolkit — which instruction you send, and how slicing changes the cost you just learned to measure.",
    },
  ],
};
