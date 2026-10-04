import type { CourseLesson } from "../types";

export const lesson02SizingFromStop: CourseLesson = {
  id: "rp-l2",
  moduleId: "c2-m1",
  title: "Sizing from the Stop",
  blurb: "Position size is division: budget divided by stop distance.",
  objectives: [
    "Derive a position size from the risk budget and stop distance",
    "Explain why a wider stop demands a smaller position",
    "Identify when a stop is too far for the account to size sensibly",
    "Compute the shares, dollars and unit risk of a planned trade",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Size = risk budget ÷ stop distance. The stop comes from invalidation, the budget from your ceiling — and division decides the quantity every time.",
  blocks: [
    {
      kind: "explain",
      id: "rp-l2-b1",
      explanation: {
        heading: "The quantity falls out of a division problem",
        whyItMatters:
          "Traders get into trouble by choosing a quantity first — '100 shares feels right' — and discovering the risk afterwards. Reversing the order makes the quantity a calculation instead of a guess.",
        paragraphs: [
          "Three numbers exist before size can be computed. The risk budget is the dollar amount you accept losing, from the previous lesson (percentage × account). The stop distance is the gap between entry and stop price, in dollars per share. The entry price tells you the capital required, which matters for leverage and minimums but not for the risk calculation.",
          "The formula: quantity = budget ÷ stop distance. A $250 budget with a $2.50 stop buys 100 shares. The same budget with a $5.00 stop buys 50. The trade did not become worse; the market simply asked for a wider invalidation point, and division absorbed the difference by halving the position. Your dollar risk stays at $250 either way — that is the entire point.",
          "This is also why 'the stop is too wide' is a coherent complaint. If the logical stop is $10 away and your budget is $250, you may hold 25 shares — often below a sensible round lot or below the position that produces meaningful movement. The discipline is not to move the stop closer to make the quantity nicer; it is to either accept the smaller size or skip the trade.",
          "Two derived numbers should always be visible in your plan. Unit risk is the stop distance per share (the $2.50 above). Position risk is unit risk × quantity, which must equal — never exceed — the budget. If position risk comes out over budget, the arithmetic already told you the answer.",
        ],
        keyTerms: [
          {
            term: "Stop distance",
            definition: "The dollar gap between entry price and stop price, per share or contract.",
          },
          {
            term: "Position size",
            definition: "The quantity held, derived as risk budget divided by stop distance.",
          },
          {
            term: "Position risk",
            definition:
              "Unit risk × quantity. By construction it equals the budget, not a cent more.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "rp-l2-b2",
      example: {
        title: "Two entries, one budget",
        setup:
          "$25,000 account, 1% ceiling → $250 budget. Trade A enters at $50.00 with a stop at $47.50. Trade B enters at $200.00 with a stop at $195.00.",
        steps: [
          {
            label: "Trade A: find the stop distance",
            detail: "50.00 − 47.50 = $2.50 per share of unit risk.",
          },
          {
            label: "Trade A: divide",
            detail:
              "250 ÷ 2.50 = 100 shares. Position risk: 2.50 × 100 = $250. Exactly the budget.",
          },
          {
            label: "Trade B: find the stop distance",
            detail: "200.00 − 195.00 = $5.00 per share of unit risk.",
          },
          {
            label: "Trade B: divide",
            detail:
              "250 ÷ 5.00 = 50 shares. Position risk: 5.00 × 50 = $250. Same budget, half the shares, because this chart's invalidation is twice as far away.",
          },
          {
            label: "Sanity-check the capital side",
            detail:
              "Trade A commits 100 × 50 = $5,000 of buying power; Trade B commits 50 × 200 = $10,000. Risk is identical; capital use is not — check both before entering.",
          },
        ],
        takeaway:
          "The budget never changes; the stop distance decides the quantity. If the quantity looks wrong, recheck the stop, not the appetite.",
      },
    },
    {
      kind: "visual",
      id: "rp-l2-b3",
      title: "Stop distance versus quantity at a fixed $250 budget",
      visual: {
        type: "table",
        label: "Wider stop → smaller position",
        columns: ["Stop distance", "Quantity (shares)", "Position risk", "Capital at $50 entry"],
        rows: [
          ["$1.25", "200", "$250", "$10,000"],
          ["$2.50", "100", "$250", "$5,000"],
          ["$5.00", "50", "$250", "$2,500"],
          ["$10.00", "25", "$250", "$1,250"],
        ],
        caption:
          "Position risk stays pinned at the budget across every stop distance. Only the quantity flexes.",
      },
    },
    {
      kind: "interactive",
      id: "rp-l2-b4",
      title: "Build the size",
      takeaway:
        "The builder rewards hitting the risk budget from entry and stop — every quantity the mission accepts keeps position risk inside the ceiling.",
      interaction: {
        type: "position-size-builder",
        prompt:
          "Set quantity so that (entry − stop) × quantity stays within the $250 budget for a $25,000 account at 1% risk.",
        currency: "USD",
        defaults: { balance: 25000, riskPct: 1, entry: 50, stop: 47.5 },
        mission: {
          prompt:
            "Entry $50.00, stop $47.50. Find a quantity whose position risk is at or below the budget and as close to it as possible.",
          minShares: 50,
          maxShares: 100,
          success:
            "Exactly: (50.00 − 47.50) × 100 = $250 — the full budget, no more. Anything from 50 to 99 shares also fits, but undershoots the risk the plan intends.",
          retry:
            "Recheck: budget = 25,000 × 1% = $250; unit risk = $2.50; quantity = 250 ÷ 2.50 = 100 shares.",
        },
      },
    },
    {
      kind: "practice",
      id: "rp-l2-b5",
      title: "Guided practice",
      assessment: {
        intro: "Size three positions from their stops.",
        allowRetry: true,
        items: [
          {
            skill: "Dividing budget by stop distance",
            question: {
              id: "rp-l2-q1",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "A $20,000 account at 1.5% risk plans an entry at $34.00 with a stop at $32.00. How many shares?",
              answer: 150,
              tolerance: 1,
              unit: "shares",
              explain:
                "Budget = 20,000 × 0.015 = $300. Unit risk = 34 − 32 = $2. Quantity = 300 ÷ 2 = 150 shares.",
            },
            feedbackByAnswer: {
              numeric: "Budget first (300), then unit risk (2), then divide: 300 ÷ 2 = 150.",
            },
          },
          {
            skill: "Adjusting size when the stop widens",
            question: {
              id: "rp-l2-q2",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "Same $300 budget, but invalidation sits $5.00 below entry. What quantity now?",
              answer: 60,
              tolerance: 1,
              unit: "shares",
              explain:
                "300 ÷ 5 = 60 shares. A wider stop halves the position; the dollar risk does not move.",
            },
            feedbackByAnswer: {
              numeric: "Divide the same $300 budget by the new $5 stop: 300 ÷ 5 = 60.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "rp-l2-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Why the stop drives size, not conviction",
            question: {
              id: "rp-l2-q4",
              type: "mcq",
              topic: "stops",
              prompt:
                "A setup demands a $6.00 stop, double your usual. What does discipline require?",
              options: [
                "Halve the quantity so position risk still equals the budget",
                "Move the stop to $3.00 away so normal size fits",
                "Double the risk budget because the idea is stronger",
                "Buy double the quantity — a wider stop means more conviction",
              ],
              answer: 0,
              explain:
                "Budget ÷ stop distance. Double the distance, half the quantity: position risk stays at the ceiling.",
            },
            feedbackByAnswer: {
              "1": "Moving the stop closer than invalidation trades a real stop for a premature exit.",
              "2": "The budget is fixed by your ceiling, not by how convincing a chart looks.",
              "3": "Doubling quantity with a doubled stop quadruples the dollar risk.",
            },
          },
          {
            skill: "The stop that the account cannot express",
            question: {
              id: "rp-l2-q5",
              type: "truefalse",
              topic: "stops",
              prompt:
                "If the only logical stop produces a quantity of 3 shares, skipping the trade is a rule-consistent choice.",
              answer: true,
              explain:
                "When division yields an untradeably small position, the trade does not fit the account. Accepting it or skipping it are both fine; moving the stop to force a nicer size is not.",
            },
            feedbackByAnswer: {
              true: "Correct — the fit check comes before entry, never after.",
              false:
                "Forcing a closer stop to get a round lot converts an invalidation level into a coin flip.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "rp-l2-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Your $15,000 account risks 1% ($150). A futures micro-contract moves your planned stop by 12 index points, and each point is worth $2 per contract.",
          "You want the quantity to look substantial, so you are tempted to treat each contract as risking $12 instead of $24.",
        ],
        assessment: {
          items: [
            {
              skill: "Sizing contracts from point value",
              question: {
                id: "rp-l2-q6",
                type: "numeric",
                topic: "position-sizing",
                prompt:
                  "Unit risk per contract = 12 points × $2 = $24. Budget = $150. How many contracts fit within the budget?",
                answer: 6,
                tolerance: 0,
                unit: "contracts",
                explain:
                  "150 ÷ 24 = 6.25, and partial contracts cannot be traded, so 6 contracts — risking $144 — is the largest whole fit.",
              },
              feedbackByAnswer: {
                numeric:
                  "Compute unit risk first: 12 × 2 = 24. Then 150 ÷ 24 = 6.25 → round down to 6 whole contracts.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "rp-l2-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Recall a trade you sized by feel rather than by division. What stop distance would the rule have used, and what quantity would it have produced?",
      ],
    },
    {
      kind: "summary",
      id: "rp-l2-b9",
      title: "Recap",
      points: [
        "Quantity = risk budget ÷ stop distance, always in that order.",
        "A wider stop halves the position; position risk stays pinned at the budget.",
        "Position risk (unit risk × quantity) must equal — never exceed — the ceiling.",
        "When division yields an untradeable quantity, skip the trade instead of moving the stop.",
      ],
      nextStep:
        "Next: why the small-denominator side of this arithmetic is worth losing sleep over.",
    },
  ],
};
