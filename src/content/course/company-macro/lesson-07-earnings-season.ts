import type { CourseLesson } from "../types";

export const lesson07EarningsSeason: CourseLesson = {
  id: "cm-l7",
  moduleId: "c6-m3",
  title: "Earnings Season and Expectations",
  blurb: "Beats, misses, guidance and the move the market already expects.",
  objectives: [
    "Compute an earnings surprise in percent",
    "Translate an implied move into a dollar range",
    "Explain why a stock can fall after beating estimates",
  ],
  durationMinutes: 11,
  xp: 36,
  keyTakeaway:
    "Earnings reactions depend on the surprise, the guidance and what move was already priced in — not on 'beat' or 'miss' alone.",
  blocks: [
    {
      kind: "explain",
      id: "cm-l7-b1",
      explanation: {
        heading: "Four numbers behind every reaction",
        whyItMatters:
          "Earnings days produce some of the largest single-stock moves of the year, and they often surprise people who only read the headline.",
        paragraphs: [
          "Companies report quarterly results against analyst consensus for revenue and EPS. Surprise % = (actual − consensus) ÷ consensus.",
          "Guidance — management's outlook for coming quarters — often matters more than the past quarter, because prices look forward.",
          "Options markets price an expected move: the size of swing the market anticipates. A beat that produces a move smaller than expected can disappoint.",
          "So a stock can fall on a beat (weak guidance, high expectations) or rise on a miss (better outlook than feared).",
        ],
        keyTerms: [
          { term: "Earnings surprise", definition: "(Actual EPS − consensus) ÷ consensus." },
          { term: "Guidance", definition: "Management's forecast for future results." },
          { term: "Implied move", definition: "The price swing options markets are pricing in around an event." },
        ],
        callouts: [
          {
            tone: "pitfall",
            title: "Gap risk",
            body: "Results come out when the market is closed, so prices can open far from the prior close — past any stop.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "cm-l7-b2",
      example: {
        title: "A beat with a cut to guidance",
        setup: "Consensus EPS $1.00; actual $1.10. Stock at $50 with an implied move of ±6%. Guidance for next year is lowered.",
        steps: [
          { label: "Surprise", detail: "(1.10 − 1.00) ÷ 1.00 = 10% beat." },
          { label: "Expected range", detail: "6% × $50 = $3, so the market priced roughly $47 to $53." },
          { label: "Guidance", detail: "Lower outlook reduces expected future earnings." },
          { label: "Reaction", detail: "The stock opens at $46.50 — below the implied range despite the beat." },
        ],
        takeaway: "The past quarter beat; the future looked worse. Prices follow the future.",
      },
    },
    {
      kind: "visual",
      id: "cm-l7-b3",
      title: "Earnings scorecard",
      visual: {
        type: "table",
        label: "Illustrative report",
        columns: ["Item", "Expected", "Actual"],
        rows: [
          ["EPS", "$1.00", "$1.10"],
          ["Surprise", "—", "+10%"],
          ["Guidance", "Maintained", "Lowered"],
          ["Implied move", "±$3.00 (6%)", "−$3.50 (−7%)"],
        ],
        caption: "Educational example, not a real company.",
      },
    },
    {
      kind: "interactive",
      id: "cm-l7-b4",
      title: "Holding through earnings",
      interaction: {
        type: "scenario-decision",
        prompt: "You hold a position with a stop 4% below price. Earnings are tonight with a 9% implied move. What is the disciplined response?",
        situation: ["Results arrive after the close.", "Your stop cannot execute while the market is closed."],
        choices: [
          {
            label: "Decide in advance: reduce size or exit so a gap past the stop stays within your risk limit",
            outcome: "The stock gaps 10%; your loss is within plan because size was reduced.",
            best: true,
            feedback: "Right — you planned for the gap instead of relying on a stop that cannot fill.",
          },
          {
            label: "Keep full size; the stop limits the loss to 4%",
            outcome: "The stock opens 10% lower and the stop fills there, not at 4%.",
            best: false,
            feedback: "Stops become market orders at the next available price; gaps skip them.",
          },
          {
            label: "Double the position because results will probably beat",
            outcome: "Even a beat can fall; your loss doubles.",
            best: false,
            feedback: "A probable beat is not a predictable reaction. Sizing up adds risk, not edge.",
          },
        ],
      },
      takeaway: "Around earnings, the implied move — not your stop — describes your realistic risk.",
    },
    {
      kind: "practice",
      id: "cm-l7-b5",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "Earnings surprise",
            question: {
              id: "cm-l7-q1",
              type: "numeric",
              topic: "events",
              prompt: "Consensus EPS is $1.00 and actual EPS is $1.10. What is the surprise in percent?",
              answer: 10,
              tolerance: 0.1,
              unit: "%",
              explain: "(1.10 − 1.00) ÷ 1.00 = 0.10 = 10%.",
            },
            feedbackByAnswer: { numeric: "Difference ÷ consensus: 0.10 ÷ 1.00 = 10%." },
          },
          {
            skill: "Implied move",
            question: {
              id: "cm-l7-q2",
              type: "numeric",
              topic: "events",
              prompt: "A $50 stock has an implied earnings move of ±6%. How many dollars is that either way?",
              answer: 3,
              tolerance: 0.05,
              unit: "USD",
              explain: "6% × $50 = $3, giving a rough range of $47 to $53.",
            },
            feedbackByAnswer: { numeric: "0.06 × 50 = 3." },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "cm-l7-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Reading the reaction",
            question: {
              id: "cm-l7-q3",
              type: "mcq",
              topic: "events",
              prompt: "A company beats EPS estimates, yet the stock falls 8%. Which explanation fits best?",
              options: [
                "Management lowered guidance for future quarters",
                "Beating estimates is always bad news",
                "The share count doubled overnight",
                "Stock prices ignore earnings",
              ],
              answer: 0,
              explain:
                "Prices are forward-looking. A weaker outlook can outweigh a beat on the quarter just finished.",
            },
            feedbackByAnswer: {
              "1": "Beats are not inherently bad — the context and outlook decide the reaction.",
              "2": "Share counts do not change overnight on an earnings release.",
              "3": "Earnings expectations are a major input to stock prices.",
            },
          },
          {
            skill: "Beat ≠ rise",
            question: {
              id: "cm-l7-q4",
              type: "truefalse",
              topic: "events",
              prompt: "Beating analyst estimates guarantees the share price will rise.",
              answer: false,
              explain:
                "Guidance, the size of the beat versus expectations, and what was already priced in all influence the reaction.",
            },
            feedbackByAnswer: {
              true: "Many beats are followed by declines; nothing guarantees a direction.",
              false: "Correct — a beat is one input, not a prediction.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "cm-l7-b7",
      title: "Application scenario",
      scenario: {
        situation: ["A stock trades at $80 ahead of earnings.", "Options imply a ±5% move."],
        assessment: {
          items: [
            {
              skill: "Dollar implied move",
              question: {
                id: "cm-l7-q5",
                type: "numeric",
                topic: "events",
                prompt: "What dollar move either way is the market pricing in?",
                answer: 4,
                tolerance: 0.05,
                unit: "USD",
                explain: "5% × $80 = $4, so roughly $76 to $84.",
              },
              feedbackByAnswer: { numeric: "0.05 × 80 = 4." },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "cm-l7-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: ["What is your personal rule for holding (or not holding) positions through earnings?"],
    },
    {
      kind: "summary",
      id: "cm-l7-b9",
      title: "Recap",
      points: [
        "Surprise % = (actual − consensus) ÷ consensus.",
        "Guidance often outweighs the reported quarter.",
        "The implied move shows what is already priced in — and your realistic gap risk.",
      ],
      nextStep: "Final lesson: planning around the whole economic calendar.",
    },
  ],
};
