import type { CourseLesson } from "../types";

export const lesson06OrderTactics: CourseLesson = {
  id: "ms-l6",
  moduleId: "c5-m2",
  title: "Order Tactics & Slicing",
  blurb: "Every execution choice trades impact risk for schedule risk. Pick deliberately.",
  objectives: [
    "Match order types to the risk they remove and the risk they add",
    "Size an order against volume with a participation cap",
    "Compare the impact cost of a block against the timing cost of slicing",
    "Choose an execution plan that fits your actual urgency",
  ],
  durationMinutes: 13,
  xp: 38,
  keyTakeaway:
    "Impact risk falls with patience; schedule risk rises with it. Slicing is not automatically better — it is a trade, and the correct answer depends on your deadline.",
  blocks: [
    {
      kind: "explain",
      id: "ms-l6-b1",
      explanation: {
        heading: "Two risks, and you must pick one",
        whyItMatters:
          "Most execution advice is really a preference dressed as a rule. Understanding the underlying trade-off lets you choose correctly under real constraints.",
        paragraphs: [
          "Impact risk is the cost of demanding liquidity now: you pay the spread and walk the book, but the trade is done and the uncertainty is over. Schedule risk is the cost of waiting: you avoid impacting the price, but the market may move while you work, and your target may get worse or better without you.",
          "Order types map onto that trade-off. A market order eliminates schedule risk and maximises impact. A limit order does the opposite — it removes price risk and introduces fill risk, plus the adverse selection that comes with it. A stop-limit tries to cap the price at which a stop fires, at the cost of no fill at all if price gaps past it. IOC and FOK variants exist for the same reason: to refuse partial outcomes that leave you exposed.",
          "Slicing is the chief tool for large orders. Time slicing sends the same size at intervals (TWAP-like); volume slicing scales with traded volume (VWAP-like); a participation cap limits your order to a fixed share of volume — commonly 5–20%. The theory is simple: if your order is a small fraction of what the market is doing anyway, your impact is small and your fill price approaches the volume-weighted average.",
          "The cost of slicing is exposure. Working 12,000 shares over two hours means two hours of market risk on the unfilled balance, and a systematic pattern that other participants can detect. If the price drifts 20 cents against you while you wait, that timing cost can dwarf the impact you saved.",
          "So the rule is conditional, not absolute: slice when your horizon is longer than your execution time and the thesis tolerates drift; pay impact when the reason for the trade is stronger than the price you want, or when a scheduled event sits between you and the finish.",
        ],
        keyTerms: [
          {
            term: "Impact risk",
            definition: "The cost of demanding liquidity immediately — spread plus book walk.",
          },
          {
            term: "Schedule risk",
            definition:
              "The cost of waiting: the market may move against you while your order works.",
          },
          {
            term: "Participation cap",
            definition:
              "The maximum share of market volume your own order may represent, e.g. 10%.",
          },
          {
            term: "VWAP",
            definition:
              "Volume-weighted average price — the average price at which the instrument traded over a period.",
          },
        ],
        callouts: [
          {
            tone: "tip",
            title: "Decide the deadline first",
            body: "Your deadline chooses your tactic: it sets how much schedule risk you can afford to take on.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "ms-l6-b2",
      example: {
        title: "12,000 shares, one decision",
        setup:
          "You must buy 12,000 shares of a stock trading 60,000 shares an hour. One market order is estimated to cost about 6 cents per share of impact. Working at a 10% participation cap, your estimated average impact is 1.5 cents.",
        steps: [
          {
            label: "Option A — take it now",
            detail:
              "One market order: impact 0.06 × 12,000 = $720, but the position is complete in seconds and nothing can get away from you.",
          },
          {
            label: "Option B — cap participation at 10%",
            detail:
              "10% of 60,000 shares an hour = 6,000 shares an hour. 12,000 ÷ 6,000 = 2 hours of working time.",
          },
          {
            label: "Option B — the saving",
            detail:
              "Impact 0.015 × 12,000 = $180. Slicing saves $720 − $180 = $540 of impact — a 75% reduction.",
          },
          {
            label: "Option B — the price of patience",
            detail:
              "Two hours of exposure. If the price drifts 20 cents against you, that timing cost is 0.20 × 12,000 = $2,400.",
          },
          {
            label: "Compare the two numbers",
            detail:
              "$540 saved versus $2,400 available to lose. The saving is only worth taking if you genuinely believe the two-hour drift will be small.",
          },
          {
            label: "The decision rule",
            detail:
              "No scheduled event and no urgency: slice. An event or a hard deadline: pay the impact, or reduce the size you intend to do at all.",
          },
        ],
        takeaway:
          "Slicing is not free money — it swaps a visible cost for an unbounded one. Budget the timing risk before you choose the tactic.",
      },
    },
    {
      kind: "visual",
      id: "ms-l6-b3",
      title: "The execution toolkit",
      visual: {
        type: "table",
        label: "What each order removes and what it exposes you to",
        columns: ["Tactic", "Removes", "Adds", "Use when"],
        rows: [
          ["Market order", "Schedule risk", "Maximum impact", "Small size, urgent, deep book"],
          [
            "Limit order",
            "Price risk",
            "Fill risk and adverse selection",
            "No deadline; you want the price or nothing",
          ],
          [
            "Stop / stop-limit",
            "The need to watch the level",
            "Gap slippage, or no fill at all",
            "Exits you cannot monitor",
          ],
          [
            "Time slicing (TWAP-like)",
            "Most of the impact",
            "Exposure over the whole schedule",
            "Hours of horizon, no scheduled event",
          ],
          [
            "Participation cap (10%)",
            "Impact against current volume",
            "Slows down when volume dries up",
            "Size is large relative to the book",
          ],
        ],
        caption:
          "Every line is a trade. The skill is naming which risk you can actually afford to hold.",
      },
    },
    {
      kind: "interactive",
      id: "ms-l6-b4",
      title: "Fit the tactic to the deadline",
      interaction: {
        type: "scenario-decision",
        prompt:
          "You must own 3,000 shares within the hour. The visible book holds 1,200 shares across three ticks, and volume is running at 40,000 shares an hour. What is the sound plan?",
        situation: [
          "Hard deadline: one hour. No scheduled event in that window.",
          "Visible depth: 1,200 shares. Market volume: 40,000 shares an hour, so a 10% cap is 4,000 shares an hour.",
        ],
        choices: [
          {
            label:
              "Lift the 1,200 shares on offer now, then work the remaining 1,800 at a 10% participation cap",
            outcome:
              "You take the available liquidity while it is there and work the balance in roughly 27 minutes, comfortably inside the hour.",
            best: true,
            feedback:
              "Correct — you matched tactic to deadline. The available depth gets taken, the rest is worked at a fraction of volume, and the schedule still fits.",
          },
          {
            label: "Send one market order for 3,000 shares",
            outcome:
              "The order walks well past the visible levels into unknown depth; your average could be several ticks above the offer you saw.",
            best: false,
            feedback:
              "It meets the deadline, but you paid for urgency you did not need — you had an hour, and you spent seconds.",
          },
          {
            label: "Rest a limit at the current best bid for all 3,000 shares",
            outcome:
              "You join the queue and wait for sellers. If the stock ticks up, you own nothing at the deadline.",
            best: false,
            feedback:
              "This is pure schedule risk with no participation logic: you capped your price but may not have a position at all when the hour ends.",
          },
        ],
      },
      takeaway:
        "Deadline first, then tactic. Each hour you have of extra time buys you a lower participation rate — and a smaller impact bill.",
    },
    {
      kind: "practice",
      id: "ms-l6-b5",
      title: "Guided practice",
      assessment: {
        intro: "Convert a plan into time and dollars.",
        allowRetry: true,
        items: [
          {
            skill: "Participation arithmetic",
            question: {
              id: "ms-l6-q1",
              type: "numeric",
              topic: "execution",
              prompt:
                "Volume is 60,000 shares an hour and your cap is 10%. How many minutes does a 12,000-share order take to work?",
              answer: 120,
              tolerance: 2,
              unit: "minutes",
              explain:
                "10% of 60,000 = 6,000 shares an hour, which is 100 shares a minute. 12,000 ÷ 100 = 120 minutes — the same two hours the plan assumed.",
            },
            feedbackByAnswer: {
              numeric: "6,000 shares an hour = 100 a minute; 12,000 ÷ 100 = 120 minutes.",
            },
          },
          {
            skill: "Impact cost of a block",
            question: {
              id: "ms-l6-q2",
              type: "numeric",
              topic: "slippage",
              prompt:
                "A single market order for 12,000 shares is estimated to cost 6 cents per share in impact. How many dollars is that?",
              answer: 720,
              tolerance: 5,
              unit: "USD",
              explain:
                "0.06 × 12,000 = $720 of pure impact — the number you are trying to avoid by slicing, and the number you must compare against timing risk.",
            },
            feedbackByAnswer: {
              numeric: "6 cents × 12,000 shares = $720.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "ms-l6-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Trade-off in slicing",
            question: {
              id: "ms-l6-q3",
              type: "mcq",
              topic: "execution",
              prompt: "What does slicing a large order actually trade away?",
              options: [
                "The spread, which no longer has to be paid",
                "Impact risk — in exchange for schedule risk on the unfilled balance",
                "The commission, which is waived on participation orders",
                "The need for a stop loss",
              ],
              answer: 1,
              explain:
                "Working an order over time lowers impact, but leaves you exposed to the price moving while you work. That is the real trade: a visible cost exchanged for an open-ended one.",
            },
            feedbackByAnswer: {
              "0": "Each slice still crosses the spread when it takes liquidity — the toll does not disappear.",
              "2": "Commission is charged per share regardless of how the order is sliced.",
              "3": "Risk management is independent of execution method: slicing changes cost, not the need for a stop.",
            },
          },
          {
            skill: "Cost of patience",
            question: {
              id: "ms-l6-q4",
              type: "truefalse",
              topic: "execution",
              prompt: "Slicing an order removes the risk of the market moving while you wait.",
              answer: false,
              explain:
                "Slicing reduces impact and increases exposure. Over a two-hour schedule the unfilled balance is exposed to every drift, headline and flow change in that window.",
            },
            feedbackByAnswer: {
              true: "Slicing is exactly what creates that exposure — patience is paid for with time in the market.",
              false:
                "Correct — a two-hour order is two hours of market risk on the part you have not filled.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "ms-l6-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You sliced a 12,000-share order over two hours to keep impact near 1.5 cents.",
          "The saving was real, but over the schedule the price drifted 0.20 against you.",
        ],
        assessment: {
          items: [
            {
              skill: "Timing cost versus impact saving",
              question: {
                id: "ms-l6-q5",
                type: "numeric",
                topic: "execution",
                prompt: "How many dollars did that 0.20 adverse drift cost on 12,000 shares?",
                answer: 2400,
                tolerance: 20,
                unit: "USD",
                explain:
                  "0.20 × 12,000 = $2,400 of timing cost against $540 of impact saved. Patience was the right tactic only if the drift stayed small — which is why you budget schedule risk before choosing to slice.",
              },
              feedbackByAnswer: {
                numeric: "20 cents per share × 12,000 shares = $2,400.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "ms-l6-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Write your default tactic for three situations: an urgent entry, a patient entry, and an exit after a stop triggers.",
      ],
    },
    {
      kind: "summary",
      id: "ms-l6-b9",
      title: "Recap",
      points: [
        "Every execution choice trades impact risk against schedule risk.",
        "Market orders buy certainty; limit orders buy price and accept fill risk.",
        "Participation caps convert size into time: 12,000 shares at 10% of 6,000 an hour is two hours.",
        "Slicing cuts impact by roughly 75% in the worked example — and exposes the balance to the whole schedule.",
        "Decide the deadline first; the tactic follows from the time you actually have.",
      ],
      nextStep:
        "Next module: who is actually on the other side of every fill — market makers, high-frequency firms and institutions.",
    },
  ],
};
