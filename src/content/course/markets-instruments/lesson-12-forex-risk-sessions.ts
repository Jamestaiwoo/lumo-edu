import type { CourseLesson } from "../types";

export const lesson12ForexRiskSessions: CourseLesson = {
  id: "mk-l12",
  moduleId: "c4-m4",
  title: "Forex Risk & Sessions",
  blurb: "Forex never closes — which means it also never stops gapping, widening and slipping.",
  objectives: [
    "Name the four sessions and where liquidity concentrates",
    "Explain rollover, weekend gaps and holiday thinness",
    "Quantify the cost of a spread widening on a live position",
    "Apply session and counterparty checks before entry",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Forex is a 24-hour OTC market: no closing bell, no central exchange, and liquidity that varies by clock. Session choice and broker choice are risk decisions, not preferences.",
  blocks: [
    {
      kind: "explain",
      id: "mk-l12-b1",
      explanation: {
        heading: "The clock is a risk factor",
        whyItMatters:
          "The same position carries very different execution risk at 9am London versus 10pm New York. Session awareness is the forex-specific version of rp-l9's liquidity lesson.",
        paragraphs: [
          "Sessions: Sydney opens the week; Tokyo adds yen and Asian crosses; London is the deepest window (roughly 8am–5pm local) with the highest turnover; New York overlaps London in the morning, giving the day's widest liquidity, then thins into the afternoon. The London–New York overlap is where majors trade with the tightest spreads and cleanest fills; the dead zone between New York's close and Tokyo's open is where ranges widen and slippage grows.",
          "Rollover: the daily value date rolls (typically 5pm New York). Spreads blow out for a few minutes, swap/financing is applied, and stops sitting near the market can be swept on thin books. Trading through rollover means accepting a spread that can be five to ten times normal.",
          "Weekend gaps: the market closes Friday evening and reopens Sunday. Any news over the weekend — elections, interventions, geopolitical shocks — prices in before you can act. A stop is not a guarantee: your position opens at the gap price, wherever that is. The same applies to holidays, when one major centre is out and liquidity halves.",
          "Counterparty reality: forex has no central exchange. Your broker is the counterparty or the intermediary to it, so broker solvency, regulation, execution model and stop-honouring behaviour are part of the trade. Retail leverage caps exist precisely because retail losses here are common.",
        ],
        keyTerms: [
          {
            term: "Session overlap",
            definition:
              "London–New York overlap — the tightest spreads and deepest majors liquidity.",
          },
          {
            term: "Rollover",
            definition:
              "Daily value-date roll (~5pm NY): spreads spike, financing applies, thin books.",
          },
          {
            term: "Counterparty risk",
            definition:
              "In OTC forex your broker/intermediary is on the other side — their health is your risk.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "mk-l12-b2",
      example: {
        title: "One position, three clocks",
        setup:
          "You hold 2 mini lots EUR/USD ($1/pip). Compare executing the same exit across three windows.",
        steps: [
          {
            label: "London–NY overlap",
            detail: "Spread ≈ 0.3 pips → cost = 0.3 × $1 × 2 = $0.60. Fill quality is at its best.",
          },
          {
            label: "Late New York (thin)",
            detail:
              "Spread widens to ≈ 1.5 pips → $3.00 per exit. Slippage on market orders adds more on a fast move.",
          },
          {
            label: "Rollover window",
            detail:
              "Spread ≈ 3.0 pips → $6.00, and the book is thin: the same order can slip further. Tenfold cost for the same trade.",
          },
          {
            label: "Weekend gap",
            detail:
              "A stop 40 pips away can open 120 pips through if weekend news broke against you — $240 of unintended risk on a position you thought was capped.",
          },
        ],
        takeaway:
          "Execution cost and gap risk are scheduled, not random — trade the clock you can control.",
      },
    },
    {
      kind: "visual",
      id: "mk-l12-b3",
      title: "Session liquidity map",
      visual: {
        type: "table",
        label: "Windows and what they cost",
        columns: ["Window", "Liquidity", "Spread", "Main risk"],
        rows: [
          [
            "London–NY overlap",
            "Deepest",
            "Tightest (0.2–0.5 pips majors)",
            "Fast trends — great fills, quick stops",
          ],
          ["Tokyo / Asia", "Moderate", "0.5–1.0 pips", "Range-bound; yen crosses active"],
          ["Late NY → rollover", "Thin", "3–10× normal", "Stop sweeps, financing, slippage"],
          ["Sunday open", "Very thin", "Very wide", "Weekend news gaps straight through stops"],
          ["Holidays (one centre out)", "Halved", "Wide", "Moves outsized by small orders"],
        ],
        caption:
          "Deep liquidity is not about activity — it is about how much size the book absorbs before price moves.",
      },
    },
    {
      kind: "interactive",
      id: "mk-l12-b4",
      title: "Pick your window",
      takeaway:
        "Defensible forex plans name the session they trade and the sessions they refuse — the refusal is the risk control.",
      interaction: {
        type: "scenario-decision",
        prompt: "You have one setup to trade this week. Which execution plan is sound?",
        situation: [
          "The setup is a 40-pip breakout on EUR/USD; you can trade any session; a central-bank meeting lands Friday afternoon.",
        ],
        choices: [
          {
            label:
              "Enter in the London–NY overlap, avoid holding through Friday's meeting or the weekend, and place the stop as a hard exit rather than a guaranteed fill",
            outcome: "Session, event and stop-honesty are each addressed.",
            best: true,
            feedback:
              "Correct — best liquidity for entry, no scheduled gap exposure, and the stop is treated as an instruction, not a promise.",
          },
          {
            label: "Trade at Sunday open for the best 'fresh' prices",
            outcome:
              "Sunday open is the thinnest book of the week — spreads are widest and gaps land first.",
            best: false,
            feedback:
              "Fresh prices at the week's thin open are exactly where weekend news is priced in ahead of you.",
          },
          {
            label: "Hold through Friday's meeting with a tight stop — the stop protects you",
            outcome:
              "A gap does not fill your stop; you open at the gap price and the loss is bigger than planned.",
            best: false,
            feedback:
              "Meeting and weekend gaps are unbounded relative to your stop — size down or flatten, do not rely on the order type.",
          },
          {
            label: "Trade during rollover to catch the wider movement",
            outcome: "Rollover spikes are spread artefacts on thin books, not tradeable movement.",
            best: false,
            feedback:
              "Trading into a 10× spread to chase noise pays the broker ten times for the privilege.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "mk-l12-b5",
      title: "Guided practice",
      assessment: {
        intro: "Price the clock and the gap.",
        allowRetry: true,
        items: [
          {
            skill: "Spread-widening cost",
            question: {
              id: "mk-l12-q1",
              type: "numeric",
              topic: "costs",
              prompt:
                "You hold 3 mini lots ($1/pip). The spread widens from 0.4 to 2.2 pips. What is the extra cost to exit, in dollars?",
              answer: 5.4,
              tolerance: 0.1,
              unit: "USD",
              explain:
                "Extra spread = 1.8 pips × $1 × 3 lots = $5.40 — the same exit, nearly 6× the normal cost.",
            },
            feedbackByAnswer: {
              numeric: "(2.2 − 0.4) × 1 × 3 = 1.8 × 3 = 5.4.",
            },
          },
          {
            skill: "Gap-through stop loss",
            question: {
              id: "mk-l12-q2",
              type: "numeric",
              topic: "stops",
              prompt:
                "Your stop is 30 pips away on 2 mini lots ($1/pip), but a weekend gap opens 90 pips through it. What is the loss in dollars?",
              answer: 180,
              tolerance: 1,
              unit: "USD",
              explain:
                "You exit at the gap, not the stop: 90 pips × $1 × 2 = $180 — triple the $60 you had planned to risk.",
            },
            feedbackByAnswer: {
              numeric: "Gap distance × pip value × lots: 90 × 1 × 2 = 180.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "mk-l12-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "OTC structure",
            question: {
              id: "mk-l12-q3",
              type: "mcq",
              topic: "market-basics",
              prompt: "What does it mean that spot forex is an OTC market?",
              options: [
                "It trades only during exchange hours",
                "There is no central exchange — your broker or intermediary is the counterparty, so their execution and solvency are part of your risk",
                "Prices are set once a day by a committee",
                "It is unregulated everywhere",
              ],
              answer: 1,
              explain:
                "Bilateral dealing is the defining feature: no centralised clearing means counterparty and execution quality are trade inputs.",
            },
            feedbackByAnswer: {
              "0": "OTC is precisely why forex trades around the clock rather than on a single exchange clock.",
              "2": "Prices come from a decentralised interbank network continuously, not a daily fix (fixings exist, but they are not the market).",
              "3": "Retail forex is regulated in major jurisdictions — with leverage caps that exist because of retail loss rates.",
            },
          },
          {
            skill: "Stop honesty in gaps",
            question: {
              id: "mk-l12-q4",
              type: "truefalse",
              topic: "stops",
              prompt:
                "Because forex trades 24 hours, a stop order guarantees you will exit at the exact stop price.",
              answer: false,
              explain:
                "A stop becomes a market order once triggered — in gaps and thin windows it fills at the next available price, which can be far past the stop.",
            },
            feedbackByAnswer: {
              true: "Gaps and thin books routinely fill stops well beyond their price — plan for it.",
              false: "Correct — 24-hour trading removes the closing bell, not the gap risk.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "mk-l12-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You want to hold a EUR/USD long over the weekend. Account ceiling for the trade: $150.",
          "Weekend news could gap the pair up to 120 pips against you. Mini lots are $1/pip.",
        ],
        assessment: {
          items: [
            {
              skill: "Sizing for the weekend gap",
              question: {
                id: "mk-l12-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt:
                  "How many whole mini lots survive a 120-pip weekend gap inside the $150 ceiling?",
                answer: 1,
                tolerance: 0,
                unit: "mini lots",
                explain:
                  "Gap risk per mini lot = 120 × $1 = $120. $150 ÷ $120 = 1.25 → round down to 1 mini lot. The ceiling division is Chapter 2's habit applied to a gap, not a stop.",
              },
              feedbackByAnswer: {
                numeric: "120 pips × $1 = $120 per mini lot; 150 ÷ 120 = 1.25 → 1 whole mini lot.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "mk-l12-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Write the two sessions you would trade and the two windows you would never hold size through — then the one position size you would accept over a weekend.",
      ],
    },
    {
      kind: "summary",
      id: "mk-l12-b9",
      title: "Recap",
      points: [
        "Sessions differ in liquidity: London–NY overlap is tightest; late NY, rollover, Sunday open and holidays are thin.",
        "Spread widening and slippage are predictable costs of trading the clock badly.",
        "Stops gap through: size for the possible gap, and flatten before scheduled events and weekends.",
        "Forex is OTC — broker regulation, execution model and solvency are part of the position.",
        "Course 4 closes here: you can now name what you own, rent or bet on in all four instrument families.",
      ],
      nextStep:
        "Next course: market structure & microstructure — what happens inside the book when you press buy.",
    },
  ],
};
