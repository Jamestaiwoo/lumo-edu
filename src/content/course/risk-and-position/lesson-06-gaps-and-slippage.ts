import type { CourseLesson } from "../types";

export const lesson06GapsAndSlippage: CourseLesson = {
  id: "rp-l6",
  moduleId: "c2-m2",
  title: "Gaps & Slippage vs Stops",
  blurb: "Your stop is an intention; the market decides the fill.",
  objectives: [
    "Compute realised risk when a stop fills away from its trigger",
    "Explain why gaps make stops advisory rather than binding",
    "Budget for slippage in high-risk event situations",
    "Recognise when the only honest response is a smaller size or no trade",
  ],
  durationMinutes: 11,
  xp: 33,
  keyTakeaway:
    "A stop guarantees you will try to exit at a price, not that anyone will trade with you there. Plan the size for the realised loss, not the intended one.",
  blocks: [
    {
      kind: "explain",
      id: "rp-l6-b1",
      explanation: {
        heading: "Between your level and the fill stands the whole market",
        whyItMatters:
          "Every risk calculation so far assumed the stop fills exactly where placed. That assumption holds in calm, liquid markets — and quietly stops holding exactly when losses matter most.",
        paragraphs: [
          "Slippage is the distance between the stop's trigger price and the price you are actually filled at. In calm conditions it is negligible: you trigger at $50.00, fill at $49.98. In fast markets it widens. In a gap — when the next trade happens entirely below your stop — it can be the dominant term in the loss.",
          "A gap is not the market 'ignoring' your stop; it is the market having no trades between your stop and the open. Your stop-market converts to a market order and fills wherever liquidity exists: a $75 stop on stock opening at $68 fills near $68. Planned unit risk $2.50 became $9.50 — nearly four times the budget. The stop worked (you exited) and still failed (the loss was not the plan's).",
          "Two defenses exist, and neither is 'place the stop anyway and hope'. First, event awareness: scheduled announcements, earnings, and macro prints are known gap windows. Either size for the gap scenario (much smaller quantity), avoid holding through it, or accept the larger loss explicitly as the plan's real worst case — not the stop's number.",
          "Second, structural honesty: in thinly traded instruments, the spread itself is a guaranteed slippage tax on any exit. A stock trading 49.90/50.10 fills a market exit at 49.90 even with zero drama — 20 cents of slippage is part of the unit risk whether you wrote it down or not.",
          "The discipline: risk the budget, but know the plausible realised loss. If realised could be 3× planned and that breaks the account rules, the position is too big before you enter it.",
        ],
        keyTerms: [
          {
            term: "Gap",
            definition:
              "A jump between consecutive trades such that no prints exist at your stop's price.",
          },
          {
            term: "Realised unit risk",
            definition:
              "Stop distance plus realistic slippage — the number your size should survive.",
          },
          {
            term: "Event risk",
            definition:
              "Heightened gap probability around scheduled news; a known window, not a surprise.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "Stops are instructions, not walls",
            body: "The market never agreed to trade at your number. Stops manage your reaction, not the market's path.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "rp-l6-b2",
      example: {
        title: "Planned loss versus realised loss",
        setup:
          "Entry $77.50, stop $75.00 (planned unit risk $2.50), 100 shares, budget $250. Earnings print overnight; the stock opens at $68.00.",
        steps: [
          {
            label: "The plan as written",
            detail:
              "Unit risk 2.50 × 100 shares = $250 — exactly the budget, if the stop filled at 75.00.",
          },
          {
            label: "What the gap actually delivered",
            detail:
              "Stop-market triggers on the open and fills near $68.20: realised unit risk = 77.50 − 68.20 = $9.30 → loss = $930.",
          },
          {
            label: "Measure the miss",
            detail:
              "930 ÷ 250 = 3.7× the budget. One trade consumed nearly four trades' worth of risk.",
          },
          {
            label: "The fix is pre-entry, not post-entry",
            detail:
              "Holding through earnings at the original size was never plan-consistent. Either size 100 ÷ 3.7 ≈ 27 shares for the gap scenario, or accept that this position cannot be held through the print.",
          },
        ],
        takeaway:
          "If the realised loss can be several multiples of the stop's loss, the honest budget uses the realised number.",
      },
    },
    {
      kind: "visual",
      id: "rp-l6-b3",
      title: "One event, four exit outcomes",
      visual: {
        type: "table",
        label: "Stop at $75.00, entered at $77.50",
        columns: ["Scenario", "Fill", "Unit risk", "Loss on 100 shares"],
        rows: [
          ["Calm tape", "$74.95", "$2.55", "$255"],
          ["Fast tape", "$74.40", "$3.10", "$310"],
          ["Mild gap", "$71.00", "$6.50", "$650"],
          ["Full gap", "$68.20", "$9.30", "$930"],
        ],
        caption:
          "The stop never moved; the fill did. Only the calm row matches the $250 budget the plan assumed.",
      },
    },
    {
      kind: "interactive",
      id: "rp-l6-b4",
      title: "Hold, shrink or skip",
      takeaway:
        "Each defensible choice re-prices the position for the gap scenario; every indefensible one pretends the calm-tape row is the only row that exists.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Your $25,000 account risks 1% ($250). The position gaps wildly in backtests: planned loss $250, plausible realised loss $750. The event is in two days.",
        situation: [
          "The thesis is intact and the setup is among the better ones you have seen this quarter.",
        ],
        choices: [
          {
            label: "Keep the size; stops work well enough",
            outcome: "A single gap converts $250 of budget into $750 — three trades' worth.",
            best: false,
            feedback:
              "'Stops work' was never in question — the fill did work. The question is whether the account tolerates the fill it actually delivers.",
          },
          {
            label: "Size down to about a third so a gap risks ≈ $250",
            outcome:
              "At one-third the original quantity, the gap scenario risks ≈ $750 ÷ 3 ≈ $250 — the realised worst case lands on the ceiling instead of three times over it.",
            best: true,
            feedback:
              "Correct — re-price the position so the plausible realised loss respects the ceiling, keeping the trade inside the rules.",
          },
          {
            label: "Widen the stop to $68 so it 'never gaps'",
            outcome:
              "The wider stop is still filled wherever the market opens; only the pre-gap sizing math ever changes.",
            best: false,
            feedback:
              "Stop width cannot prevent a gap — there are simply no prints to execute against between the levels.",
          },
          {
            label: "Skip the event and re-enter after the dust settles",
            outcome:
              "No exposure to the gap at all; possibly a worse entry, certainly a known risk.",
            best: false,
            feedback:
              "Defensible in practice, but it abandons a ready setup. The rule-consistent ways to keep this trade are the smaller size — or skipping it if the gap risk itself is unacceptable.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "rp-l6-b5",
      title: "Guided practice",
      assessment: {
        intro: "Compute realised risk from fills.",
        allowRetry: true,
        items: [
          {
            skill: "Realised loss when the stop slips",
            question: {
              id: "rp-l6-q1",
              type: "numeric",
              topic: "slippage",
              prompt:
                "Entry $33.00, stop $32.00, 150 shares. The stop-market fills at $31.60. What is the realised loss?",
              answer: 210,
              tolerance: 2,
              unit: "USD",
              explain: "150 × (33.00 − 31.60) = 150 × 1.40 = $210, versus the $150 planned.",
            },
            feedbackByAnswer: {
              numeric: "Unit risk realised = 33.00 − 31.60 = 1.40; × 150 shares = 210.",
            },
          },
          {
            skill: "Sizing for the gap scenario",
            question: {
              id: "rp-l6-q2",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "Your ceiling is $200. Backtests show a realistic gap fill $9.00 below entry. What quantity keeps the gap loss within the ceiling?",
              answer: 22,
              tolerance: 1,
              unit: "shares",
              explain: "200 ÷ 9 = 22.2, so 22 shares — gap loss 22 × 9 = $198, within the ceiling.",
            },
            feedbackByAnswer: {
              numeric: "Budget ÷ gap unit risk: 200 ÷ 9 = 22.2 → round down to 22.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "rp-l6-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "What a stop actually promises",
            question: {
              id: "rp-l6-q3",
              type: "mcq",
              topic: "slippage",
              prompt: "What does a stop-market order guarantee?",
              options: [
                "A fill exactly at the trigger price",
                "An attempt to exit at market once the trigger prints — the fill price is not guaranteed",
                "That the position cannot lose more than the planned risk",
                "That the exchange will honour your price during a gap",
              ],
              answer: 1,
              explain:
                "The trigger is a signal, not a contract. Execution happens at whatever prices exist after it.",
            },
            feedbackByAnswer: {
              "0": "Only a stop-limit constrains price — and it may not fill at all.",
              "2": "That is the plan's claim; the market's answer depends on available liquidity.",
              "3": "Exchanges match orders; they do not guarantee prices to retail stop orders.",
            },
          },
          {
            skill: "Gaps versus wide stops",
            question: {
              id: "rp-l6-q4",
              type: "truefalse",
              topic: "stops",
              prompt:
                "Placing the stop further away can eliminate gap risk on a holding through a scheduled announcement.",
              answer: false,
              explain:
                "A gap can jump any price level. Distance changes the size of the jump, not whether it can occur.",
            },
            feedbackByAnswer: {
              false: "Correct — only size or avoidance changes the loss distribution.",
              true: "There are no prints between your stop and the open; 'further away' is still inside the jump.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "rp-l6-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "A position entered at $21.00 carries a stop at $20.00, sized at 400 shares — planned risk 400 × $1.00 = $400.",
          "Overnight news gaps the stock to $17.50; your stop-market fills at $17.60. The plan promised $400.",
        ],
        assessment: {
          items: [
            {
              skill: "Auditing a gap fill",
              question: {
                id: "rp-l6-q5",
                type: "numeric",
                topic: "slippage",
                prompt: "What was the realised loss on 400 shares filled at $17.60?",
                answer: 1360,
                tolerance: 5,
                unit: "USD",
                explain: "400 × (21.00 − 17.60) = 400 × 3.40 = $1,360 — 3.4× the promised $400.",
              },
              feedbackByAnswer: {
                numeric: "Find unit risk (21.00 − 17.60 = 3.40) and multiply by 400: 1,360.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "rp-l6-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Name the next scheduled event your current watchlist trades through. What fill would turn its stop loss into a breach of your ceiling?",
      ],
    },
    {
      kind: "summary",
      id: "rp-l6-b9",
      title: "Recap",
      points: [
        "Slippage and gaps make realised unit risk larger than planned unit risk.",
        "A gap executes nothing between your stop and the open — no stop width prevents it.",
        "Size for the plausible realised fill when holding through known event risk, or don't hold.",
        "Thin liquidity taxes every exit via the spread, even without drama.",
      ],
      nextStep:
        "Next: moving from one position to many — correlation, concentration and portfolio risk.",
    },
  ],
};
