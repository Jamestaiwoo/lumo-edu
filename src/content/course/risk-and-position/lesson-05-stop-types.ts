import type { CourseLesson } from "../types";

export const lesson05StopTypes: CourseLesson = {
  id: "rp-l5",
  moduleId: "c2-m2",
  title: "Stop Types & Their Limits",
  blurb: "Market, limit, trailing, time — each exit solves a problem and creates one.",
  objectives: [
    "Compare stop-market and stop-limit exits by fill risk",
    "Explain when a trailing stop helps and when it hands back profit",
    "Choose a stop type from the trade's thesis rather than by habit",
    "State the known failure mode of your preferred exit type",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Every stop type trades one risk for another: certainty of exit versus certainty of price. Pick the trade-off your thesis needs and name the failure you are accepting.",
  blocks: [
    {
      kind: "explain",
      id: "rp-l5-b1",
      explanation: {
        heading: "Four exits, four different promises",
        whyItMatters:
          "The stop level answers 'where am I wrong'. The stop type answers 'how do I actually get out'. Conflating the two produces traders who picked the right level and still lost more than planned.",
        paragraphs: [
          "Stop-market: once the trigger prints, a market order sends you out at whatever the next available price is. Promise: you will be exited. Price: the fill can slip past the trigger, especially in fast or thin markets — the realised loss may exceed the planned unit risk.",
          "Stop-limit: the trigger activates a limit order at your floor. Promise: never filled below the floor. Price: in a fast gap through the level, the limit may never fill, leaving you holding a position whose thesis already failed. You traded slippage risk for non-fill risk.",
          "Trailing stop: the level ratchets with price, locking gains as the trend extends. Promise: let winners run while protecting accumulated profit. Price: it gives back a fixed distance from the best price reached, and on volatile instruments the trail distance you tolerate will feel enormous in hindsight. It exits you from noise as happily as from trends.",
          "Time stop: exit if the thesis has not played out within a set period. Promise: capital is not parked in a dead idea. Price: markets do not respect calendars — a correct thesis may simply need longer, and you will have exited a winner because of impatience disguised as discipline.",
          "No type is 'the safe one'. Choose by asking what the thesis needs guaranteed: guaranteed exit (stop-market), guaranteed floor (stop-limit), automatic profit ratchet (trailing), or capital recycling (time). Then write down the failure mode you accepted.",
        ],
        keyTerms: [
          {
            term: "Slippage",
            definition:
              "The difference between the stop's trigger price and the price you are actually filled at.",
          },
          {
            term: "Non-fill",
            definition:
              "When a stop-limit's floor has no buyers at or above it and the order never executes.",
          },
          {
            term: "Trailing distance",
            definition:
              "How far the trail sits below the best price reached; it sets both protection and give-back.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "rp-l5-b2",
      example: {
        title: "Same level, different exit orders",
        setup:
          "A position with entry $75.00 and invalidation at $72.00 is approached by earnings night, when the stock gaps.",
        steps: [
          {
            label: "Stop-market at $72.00",
            detail:
              "The stock opens at $69.50. You are exited near $69.50, not $72.00: planned unit risk $3.00, realised $5.50 — an 83% larger loss than budgeted.",
          },
          {
            label: "Stop-limit at $72.00 (limit $71.75)",
            detail:
              "The open is below $71.75, so no fill occurs at $71.75 or better. You still own a stock that has invalidated the thesis.",
          },
          {
            label: "Compare honestly",
            detail:
              "The stop-market guaranteed the exit; the stop-limit guaranteed the price. Over the gap, neither could guarantee both — that is the trade-off, not a defect of either order.",
          },
          {
            label: "The unglamorous alternative",
            detail:
              "If neither trade-off is acceptable, the thesis needs re-pricing: avoid the event, size smaller, or accept the known gap risk explicitly in the plan.",
          },
        ],
        takeaway:
          "Choose which promise you need — exit or floor — because a gap will not let you have both.",
      },
    },
    {
      kind: "visual",
      id: "rp-l5-b3",
      title: "The trade-off matrix",
      visual: {
        type: "table",
        label: "Stop types and their failure modes",
        columns: ["Exit type", "Guarantees", "Fails when"],
        rows: [
          ["Stop-market", "You get exited", "Fast markets slip the fill past your level"],
          ["Stop-limit", "Never filled below your floor", "Price gaps through the floor — no fill"],
          [
            "Trailing stop",
            "Protects best-price gains",
            "Volatility gives back more than expected",
          ],
          ["Time stop", "Capital is recycled", "A correct thesis needs more time"],
        ],
        caption:
          "Pick a row by what the thesis must guarantee; the last column is the price you agreed to.",
      },
    },
    {
      kind: "interactive",
      id: "rp-l5-b4",
      title: "Match the exit to the thesis",
      takeaway:
        "The best exit is the one whose failure mode the trade can afford — each choice here pairs a thesis with the promise it actually needs.",
      interaction: {
        type: "scenario-decision",
        prompt: "Three positions, three theses. Which exit order fits each?",
        situation: [
          "Position 1: thin small-cap, wide spreads, you must be out if the level breaks overnight.",
          "Position 2: liquid index ETF, but you refuse to be filled below $400.00 under any circumstance.",
          "Position 3: trend position up 40%, thesis intact only while the trend persists.",
        ],
        choices: [
          {
            label: "1: stop-market · 2: stop-limit · 3: trailing stop",
            outcome:
              "Position 1 prioritises guaranteed exit, 2 prioritises the floor, 3 ratchets protection with the trend.",
            best: true,
            feedback:
              "Correct — each thesis names the guarantee it needs, and the exit type delivers exactly that promise.",
          },
          {
            label: "1: stop-limit · 2: stop-market · 3: time stop",
            outcome:
              "Position 1 risks non-fill on its own breakout level; 2 accepts any fill price it never wanted.",
            best: false,
            feedback:
              "The thin name is where non-fill risk bites; the ETF is where fills are reliable but price floors matter.",
          },
          {
            label: "All three: stop-market, the standard choice",
            outcome:
              "Uniform habit: acceptable fills everywhere, no floor anywhere, and the trend position gives back its lead.",
            best: false,
            feedback:
              "Habit ignores that the three theses guarantee different things. One order type cannot make three promises.",
          },
          {
            label: "1: trailing · 2: time stop · 3: stop-limit",
            outcome: "Each pairing answers a question the thesis never asked.",
            best: false,
            feedback:
              "The trail on a thin overnight risk abandons you at the open; time/limit exits do nothing for a trend's protection.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "rp-l5-b5",
      title: "Guided practice",
      assessment: {
        intro: "Work the trade-offs with numbers.",
        allowRetry: true,
        items: [
          {
            skill: "Realised risk after slippage",
            question: {
              id: "rp-l5-q1",
              type: "numeric",
              topic: "slippage",
              prompt:
                "Planned stop $50.00 on 80 shares; the stop-market fills at $49.50. What is the realised loss?",
              answer: 40,
              tolerance: 1,
              unit: "USD",
              explain:
                "80 × (50.00 − 49.50) = $40 — the fill at the trigger means zero slippage this time. A fill at $49.25 would have cost $60 instead.",
              hint: "quantity × (stop − fill price).",
            },
            feedbackByAnswer: {
              numeric:
                "80 × (50.00 − 49.50) = 40. A fill at the trigger means no slippage on this trade.",
            },
          },
          {
            skill: "The trailing stop's give-back",
            question: {
              id: "rp-l5-q2",
              type: "numeric",
              topic: "stops",
              prompt:
                "A 3%-trailing stop protects a position. It peaks at $130.00 before reversing. At what price does the trail exit you?",
              answer: 126.1,
              tolerance: 0.2,
              unit: "USD",
              explain:
                "130.00 × 0.97 = $126.10 — the fixed percentage below the best price reached.",
            },
            feedbackByAnswer: {
              numeric: "Take 3% off the peak: 130 × 0.97 = 126.1.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "rp-l5-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Stop-limit's failure mode",
            question: {
              id: "rp-l5-q3",
              type: "mcq",
              topic: "stops",
              prompt: "When does a stop-limit stop fail to protect you?",
              options: [
                "When the market gaps through both the trigger and the limit price, so no fill exists at the floor",
                "Whenever the stock moves against the position",
                "Only if the broker's software is slow",
                "Never — the limit price always guarantees an exit",
              ],
              answer: 0,
              explain:
                "The limit guarantees a price floor, not a fill. A move straight through the floor leaves the order resting unfilled.",
            },
            feedbackByAnswer: {
              "1": "Ordinary adverse movement still fills at the floor; the failure needs a jump through it.",
              "2": "Latency affects fill quality, not the fundamental no-bid condition.",
              "3": "A limit price guarantees a worst price, never that anyone trades with you.",
            },
          },
          {
            skill: "What a trailing stop promises",
            question: {
              id: "rp-l5-q4",
              type: "truefalse",
              topic: "stops",
              prompt:
                "A trailing stop both locks the best price reached and guarantees you exit at that best price.",
              answer: false,
              explain:
                "It trails at a distance below the peak — it protects a ratcheting floor, always some give-back below the best price.",
            },
            feedbackByAnswer: {
              false: "Correct — exits occur at peak minus the trail distance.",
              true: "No exit order sits at the peak itself; that would be a limit resting above the market.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "rp-l5-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You hold a breakout position in an ETF with entry $402.00 and a thesis-invalidation stop at $396.00.",
          "Your rule says never accept a fill below $395.50; the plan allows a maximum loss of $300 on the position.",
        ],
        assessment: {
          items: [
            {
              skill: "Sizing under a floor guarantee",
              question: {
                id: "rp-l5-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt:
                  "Using unit risk = 402.00 − 396.00 = $6.00 and a $300 budget, how many shares?",
                answer: 50,
                tolerance: 1,
                unit: "shares",
                explain:
                  "300 ÷ 6 = 50 shares. Risk at the stop = 50 × 6 = $300, exactly the budget.",
              },
              feedbackByAnswer: {
                numeric: "Budget ÷ unit risk: 300 ÷ 6 = 50.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "rp-l5-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Which exit type do you default to, and what is the specific failure mode you are accepting by defaulting to it?",
      ],
    },
    {
      kind: "summary",
      id: "rp-l5-b9",
      title: "Recap",
      points: [
        "Stop-market guarantees exit; stop-limit guarantees floor; neither guarantees both in a gap.",
        "Trailing stops ratchet protection below the best price — always a give-back, never the peak.",
        "Time stops recycle capital and can exit correct-but-slow theses.",
        "Choose the exit whose promise the thesis needs, and write down the failure mode you accepted.",
      ],
      nextStep: "Next: what actually happens when price jumps over your stop entirely.",
    },
  ],
};
