import type { CourseLesson } from "../types";

export const lesson08DrawdownArithmetic: CourseLesson = {
  id: "rp-l8",
  moduleId: "c2-m3",
  title: "Drawdown Arithmetic",
  blurb: "Peak, trough, equity curve — reading the number that judges the method.",
  objectives: [
    "Compute drawdown from a sequence of account balances",
    "Distinguish percentage drawdown from dollar drawdown",
    "Relate per-trade risk to expected worst-case drawdown streaks",
    "Interpret a drawdown as information about process and sizing together",
  ],
  durationMinutes: 11,
  xp: 33,
  keyTakeaway:
    "Drawdown = (peak − trough) ÷ peak. It is measured from the high-water mark, not from your starting balance — and it is the number that decides whether the method gets to keep running.",
  blocks: [
    {
      kind: "explain",
      id: "rp-l8-b1",
      explanation: {
        heading: "Measured from the summit, not from base camp",
        whyItMatters:
          "Accounts die at all-time highs relative to base camp but well below their personal peaks. Reporting gains from the start balance hides the climb-and-fall pattern that actually breaks people.",
        paragraphs: [
          "A drawdown is any decline from a running peak (high-water mark) to a subsequent trough, expressed as a percentage of that peak. An account starting at $10,000, rising to $18,000, then falling to $12,600 is still up 26% from base — but it is down 30% from its peak: (18,000 − 12,600) ÷ 18,000 = 0.30. Both numbers are true; only one describes how the equity felt.",
          "Why peaks matter psychologically and mathematically: the money you experienced existing was $18,000. Positions were sized against $18,000. The recovery arithmetic (rp-l3) now works from $12,600 back to $18,000 — a 42.9% gain, not 30%.",
          "Drawdown links directly to per-trade risk through streaks. At 1% risk, the rough worst realistic stretch — say 10 consecutive losses — costs about 9.6%. At 3%, that streak costs about 26%. At 5%, about 40%. The distribution of your future is set today by the ceiling, because trade outcomes arrive as a stream whose bad runs are known to be finite but not scheduled.",
          "Interpretation discipline: a drawdown has two possible stories — sizing or edge — and distinguishing them requires a trade sample. A few losses at proper size say nothing about edge. A deep drawdown at proper size says your process needs review. A drawdown larger than the risk rule predicts says the rule was broken, not unlucky.",
        ],
        keyTerms: [
          {
            term: "High-water mark",
            definition:
              "The highest equity level reached to date; the reference point for all drawdowns since.",
          },
          {
            term: "Underwater period",
            definition:
              "The span between a peak and the moment equity regains it — where discipline is tested.",
          },
          {
            term: "Peak-to-trough",
            definition: "The drawdown formula's path: (peak − trough) ÷ peak.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "rp-l8-b2",
      example: {
        title: "One equity curve, two truths",
        setup: "Balances: $20,000 start → $26,000 peak → $19,500 trough → $27,500 new peak.",
        steps: [
          {
            label: "Drawdown at the trough",
            detail: "(26,000 − 19,500) ÷ 26,000 = 6,500 ÷ 26,000 = 25%.",
          },
          {
            label: "From base camp",
            detail:
              "19,500 vs 20,000 start = −2.5%. A modest number that tells you nothing about the fall.",
          },
          {
            label: "The recovery the trader actually faced",
            detail: "19,500 → 26,000 needs 6,500 ÷ 19,500 = 33.3% — the underwater tax from rp-l3.",
          },
          {
            label: "At the new peak",
            detail:
              "Drawdown resets to 0%. The high-water mark ratchets up and becomes the new reference for every future decline.",
          },
        ],
        takeaway:
          "Always state which reference you mean: base-camp return and peak drawdown are different questions.",
      },
    },
    {
      kind: "visual",
      id: "rp-l8-b3",
      title: "Streak cost by risk level",
      visual: {
        type: "table",
        label: "Ten consecutive losses at various risk",
        columns: ["Risk per trade", "After 10 straight losses", "Gain to recover"],
        rows: [
          ["1%", "−9.6% (+10.6%)", "10.6%"],
          ["3%", "−26.3% (+35.6%)", "35.6%"],
          ["5%", "−40.1% (+66.9%)", "66.9%"],
          ["10%", "−65.1% (+186.5%)", "186.5%"],
        ],
        caption:
          "Same bad luck, four sizing policies. The right column is what rp-l3's table charges for each.",
      },
    },
    {
      kind: "interactive",
      id: "rp-l8-b4",
      title: "Read the equity curve honestly",
      takeaway:
        "Each response matches a diagnosis — the disciplined ones measure the drawdown first, then ask whether sizing or sample size explains it.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Your equity went $30,000 → $36,000 → $28,800. You risked 1% throughout and have taken 40 trades this quarter.",
        situation: ["You are reviewing the drop before placing trade 41."],
        choices: [
          {
            label:
              "Compute: drawdown = (36,000 − 28,800) ÷ 36,000 = 20%, then compare against the rule's expected streak damage",
            outcome:
              "20% at 1% risk is impossible from legitimate streaks — sizing or execution deviated somewhere, and the audit finds it.",
            best: true,
            feedback:
              "Correct — the arithmetic first: 7,200 ÷ 36,000 = 20%. At proper 1% sizing, ten straight losses ≈ 9.6%, so 20% implies broken sizing, a hidden correlated book, or slipped stops — an execution finding, not a luck finding.",
          },
          {
            label: "Note the drop is only 4% below the starting balance and shrug it off",
            outcome:
              "True and irrelevant: the recovery math charges against 36,000, and sizing decisions were made on it.",
            best: false,
            feedback:
              "Base-camp framing dodges the number that determines effort: 28,800 → 36,000 needs +25%.",
          },
          {
            label: "Change strategy after 40 losing trades",
            outcome:
              "40 trades with a viable edge routinely produce 20% swings; the verdict precedes the evidence.",
            best: false,
            feedback:
              "The sample may be too small to judge edge — but sizing audits come first, because rule violations are knowable now.",
          },
          {
            label: "Risk 2% going forward to recover the peak faster",
            outcome: "Converts a recoverable drawdown into the compounding hole rp-l3 priced out.",
            best: false,
            feedback:
              "Doubling risk after losses is the textbook route deeper: the next streak costs roughly double.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "rp-l8-b5",
      title: "Guided practice",
      assessment: {
        intro: "Measure drawdowns from the peak.",
        allowRetry: true,
        items: [
          {
            skill: "Peak-to-trough percentage",
            question: {
              id: "rp-l8-q1",
              type: "numeric",
              topic: "risk-reward",
              prompt:
                "Equity peaks at $54,000 and falls to $45,900. What is the drawdown, in percent?",
              answer: 15,
              tolerance: 0.5,
              unit: "%",
              explain: "(54,000 − 45,900) ÷ 54,000 = 8,100 ÷ 54,000 = 15%.",
            },
            feedbackByAnswer: {
              numeric: "Divide the decline by the peak: 8,100 ÷ 54,000 = 0.15 = 15%.",
            },
          },
          {
            skill: "Recovery required after the trough",
            question: {
              id: "rp-l8-q2",
              type: "numeric",
              topic: "risk-reward",
              prompt:
                "After that 15% drawdown, what percentage gain returns equity to the $54,000 peak?",
              answer: 17.6,
              tolerance: 0.5,
              unit: "%",
              explain:
                "8,100 ÷ 45,900 = 17.6%. The recovery is always larger than the drawdown — rp-l3 again.",
            },
            feedbackByAnswer: {
              numeric: "Gap ÷ trough base: 8,100 ÷ 45,900 = 17.6%.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "rp-l8-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "The drawdown reference point",
            question: {
              id: "rp-l8-q3",
              type: "mcq",
              topic: "risk-reward",
              prompt: "What is a drawdown measured against?",
              options: [
                "The account's starting balance",
                "The highest equity reached before the decline",
                "The average equity over the period",
                "The sum of all open positions' risk",
              ],
              answer: 1,
              explain:
                "The high-water mark is the reference: (peak − trough) ÷ peak. Starting balance gives a different, less useful number.",
            },
            feedbackByAnswer: {
              "0": "That is total return from base — a valid statistic, not the drawdown.",
              "2": "Averages hide the peak-to-trough path that defines the experience.",
              "3": "Open risk is exposure, not realised decline.",
            },
          },
          {
            skill: "Drawdown larger than the rule allows",
            question: {
              id: "rp-l8-q4",
              type: "truefalse",
              topic: "position-sizing",
              prompt:
                "A 25% drawdown on a book that risked 1% per trade and never exceeded its per-driver caps is most likely an execution or sizing deviation rather than bad luck.",
              answer: true,
              explain:
                "Ten straight 1% losses ≈ 9.6%. To reach 25%, some trades must have risked far more than 1%, or correlated stops fired together beyond the cap — either way, a rule audit first.",
            },
            feedbackByAnswer: {
              true: "Correct — compare realised damage against what the rule can legally produce.",
              false: "At 1% risk the maths does not reach 25% from ordinary streaks.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "rp-l8-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Your account ran from $8,000 to a peak of $10,400, then fell to $8,840 after a correlated sector stop-out.",
          "You need to report the damage in both the ways your trading journal asks for.",
        ],
        assessment: {
          items: [
            {
              skill: "Drawdown from peak",
              question: {
                id: "rp-l8-q5",
                type: "numeric",
                topic: "risk-reward",
                prompt: "Peak $10,400, trough $8,840. Drawdown in percent?",
                answer: 15,
                tolerance: 0.5,
                unit: "%",
                explain: "(10,400 − 8,840) ÷ 10,400 = 1,560 ÷ 10,400 = 15%.",
              },
              feedbackByAnswer: {
                numeric: "Decline ÷ peak: 1,560 ÷ 10,400 = 0.15 = 15%.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "rp-l8-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "What is the largest drawdown percentage you could watch happen with your rules fully followed — and still not change the rules?",
      ],
    },
    {
      kind: "summary",
      id: "rp-l8-b9",
      title: "Recap",
      points: [
        "Drawdown = (peak − trough) ÷ peak, referenced to the high-water mark.",
        "Recovery after a drawdown always exceeds the drawdown itself.",
        "Per-trade risk fixes the expected damage of future losing streaks before they arrive.",
        "A drawdown beyond what the sizing rule can produce points to execution, not luck.",
      ],
      nextStep: "Next: the recovery rules that turn the arithmetic into a workable policy.",
    },
  ],
};
