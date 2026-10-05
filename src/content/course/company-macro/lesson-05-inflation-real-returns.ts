import type { CourseLesson } from "../types";

export const lesson05InflationRealReturns: CourseLesson = {
  id: "cm-l5",
  moduleId: "c6-m2",
  title: "Inflation and Real Returns",
  blurb: "A gain is only a gain if it buys more than before.",
  objectives: [
    "Convert a nominal return into an approximate real return",
    "Compute the purchasing power needed to keep pace with inflation",
    "Explain why inflation surprises move rates and markets",
  ],
  durationMinutes: 10,
  xp: 34,
  keyTakeaway:
    "Real return ≈ nominal return − inflation. Inflation surprises shift rate expectations, which is why markets watch every price report.",
  blocks: [
    {
      kind: "explain",
      id: "cm-l5-b1",
      explanation: {
        heading: "Nominal versus real",
        whyItMatters:
          "A positive account balance can still lose purchasing power. And inflation reports are among the most market-moving events on the calendar.",
        paragraphs: [
          "Inflation is the rate at which the general price level rises, often measured by a consumer price index (CPI).",
          "A nominal return is the raw percentage change. The real return adjusts for inflation; a quick approximation is nominal − inflation.",
          "Central banks typically raise rates to slow high inflation. So an inflation reading above expectations can push rate expectations and bond yields higher — feeding straight into the valuation logic of the last lesson.",
          "As with all data, markets react to the surprise relative to expectations, not to the number by itself.",
        ],
        keyTerms: [
          { term: "CPI", definition: "Consumer price index, a common inflation measure." },
          { term: "Real return", definition: "Return after adjusting for inflation." },
          { term: "Purchasing power", definition: "What a sum of money can actually buy." },
        ],
        callouts: [
          {
            tone: "tip",
            title: "Use the approximation carefully",
            body: "Nominal − inflation works well for small rates. The exact formula is (1 + nominal) ÷ (1 + inflation) − 1.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "cm-l5-b2",
      example: {
        title: "A savings account in an inflationary year",
        setup: "Your $10,000 savings earn 5% while inflation runs at 3%.",
        steps: [
          { label: "Nominal", detail: "$10,000 × 1.05 = $10,500." },
          { label: "Approximate real return", detail: "5% − 3% = 2%." },
          { label: "Exact real return", detail: "1.05 ÷ 1.03 − 1 ≈ 1.94%." },
          {
            label: "If inflation were 7%",
            detail: "5% − 7% = −2%: more dollars, less purchasing power.",
          },
        ],
        takeaway: "Always ask what a return buys, not just what it reads on screen.",
      },
    },
    {
      kind: "visual",
      id: "cm-l5-b3",
      title: "Same nominal return, different years",
      visual: {
        type: "table",
        label: "5% nominal return",
        columns: ["Inflation", "Approx. real return"],
        rows: [
          ["1%", "+4%"],
          ["3%", "+2%"],
          ["5%", "0%"],
          ["7%", "−2%"],
        ],
        caption: "Educational illustration using the nominal − inflation approximation.",
      },
    },
    {
      kind: "interactive",
      id: "cm-l5-b4",
      title: "Hot inflation print",
      interaction: {
        type: "scenario-decision",
        prompt:
          "CPI comes in at 4.1% versus 3.6% expected. What is the most reasonable context to consider?",
        situation: [
          "The central bank has said it will act if inflation stays elevated.",
          "Bond yields jump within seconds of the release.",
        ],
        choices: [
          {
            label: "Higher rate expectations may pressure valuations; reassess exposure",
            outcome: "You review rate-sensitive positions instead of reacting to the first tick.",
            best: true,
            feedback:
              "Good — the surprise changed rate expectations, which matters for many assets. Outcomes stay uncertain.",
          },
          {
            label: "Inflation is good for stocks, so buy everything",
            outcome: "Yields rise and valuations compress.",
            best: false,
            feedback:
              "Unexpected inflation usually raises rate expectations, which tends to weigh on valuations.",
          },
          {
            label: "Ignore it — only the level matters, not expectations",
            outcome: "You miss why the market moved so sharply.",
            best: false,
            feedback: "Markets price expectations; the 0.5-point surprise is the news.",
          },
        ],
      },
      takeaway: "Inflation surprises travel through rate expectations to almost every asset.",
    },
    {
      kind: "practice",
      id: "cm-l5-b5",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "Real return",
            question: {
              id: "cm-l5-q1",
              type: "numeric",
              topic: "macro",
              prompt:
                "Savings earn 5% while inflation is 3%. What is the approximate real return in percent?",
              answer: 2,
              tolerance: 0.1,
              unit: "%",
              explain: "Real ≈ nominal − inflation = 5 − 3 = 2%.",
            },
            feedbackByAnswer: { numeric: "Subtract inflation from the nominal return: 5 − 3 = 2." },
          },
          {
            skill: "Keeping pace",
            question: {
              id: "cm-l5-q2",
              type: "numeric",
              topic: "macro",
              prompt:
                "Inflation is 4% this year. How many dollars do you need next year to buy what $10,000 buys today?",
              answer: 10400,
              tolerance: 1,
              unit: "USD",
              explain: "$10,000 × 1.04 = $10,400.",
            },
            feedbackByAnswer: { numeric: "Grow the amount by inflation: 10,000 × 1.04 = 10,400." },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "cm-l5-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Inflation and rates",
            question: {
              id: "cm-l5-q3",
              type: "mcq",
              topic: "macro",
              prompt:
                "Inflation comes in well above expectations. What is a common first-order market effect?",
              options: [
                "Expectations of higher interest rates and higher bond yields",
                "Bond yields always fall",
                "Every stock rises",
                "Nothing, because the number was already published",
              ],
              answer: 0,
              explain:
                "Central banks fight inflation with higher rates, so an upside surprise raises rate expectations and yields.",
            },
            feedbackByAnswer: {
              "1": "Yields usually rise on higher inflation, as investors demand compensation and expect tighter policy.",
              "2": "Higher rate expectations tend to weigh on valuations, not lift everything.",
              "3": "The surprise relative to expectations is new information — that is what moves prices.",
            },
          },
          {
            skill: "Purchasing power",
            question: {
              id: "cm-l5-q4",
              type: "truefalse",
              topic: "macro",
              prompt: "A 6% gain during a year of 7% inflation increases your purchasing power.",
              answer: false,
              explain: "Real return ≈ 6% − 7% = −1%, so purchasing power fell.",
            },
            feedbackByAnswer: {
              true: "Prices rose faster than your money: about −1% in real terms.",
              false: "Correct — the real return was negative.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "cm-l5-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Your portfolio returned 8% this year.",
          "Inflation over the same year was 5%.",
        ],
        assessment: {
          items: [
            {
              skill: "Real portfolio return",
              question: {
                id: "cm-l5-q5",
                type: "numeric",
                topic: "macro",
                prompt: "What was the approximate real return in percent?",
                answer: 3,
                tolerance: 0.1,
                unit: "%",
                explain: "8% − 5% ≈ 3% (exact: 1.08 ÷ 1.05 − 1 ≈ 2.86%).",
              },
              feedbackByAnswer: { numeric: "8 − 5 = 3." },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "cm-l5-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "How would you judge a year's trading result differently now that you think in real terms?",
      ],
    },
    {
      kind: "summary",
      id: "cm-l5-b9",
      title: "Recap",
      points: [
        "Real return ≈ nominal − inflation.",
        "Inflation surprises shift rate expectations and yields.",
        "Markets react to the surprise, not the level.",
      ],
      nextStep: "Next lesson: growth and jobs data — and why 'good news' can move markets down.",
    },
  ],
};
