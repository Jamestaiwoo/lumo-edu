import type { CourseLesson } from "../types";

export const lesson02ValuationMultiples: CourseLesson = {
  id: "cm-l2",
  moduleId: "c6-m1",
  title: "What the Market Pays: Valuation Multiples",
  blurb: "A price only means something next to the earnings it buys.",
  objectives: [
    "Compute a price-to-earnings ratio and its earnings yield",
    "Explain what a high or low multiple implies about expectations",
    "Estimate how price changes when earnings change at a constant multiple",
  ],
  durationMinutes: 10,
  xp: 36,
  keyTakeaway:
    "A multiple is the price of expectations. A low P/E is not automatically cheap and a high P/E is not automatically expensive — both depend on what earnings do next.",
  blocks: [
    {
      kind: "explain",
      id: "cm-l2-b1",
      explanation: {
        heading: "Price divided by what you get",
        whyItMatters:
          "A $500 stock can be cheaper than a $20 stock. Multiples turn raw prices into a comparable measure of what investors are paying for.",
        paragraphs: [
          "The price-to-earnings ratio (P/E) is share price ÷ earnings per share. A P/E of 20 means investors pay $20 for each $1 of annual earnings.",
          "Flip it and you get the earnings yield: EPS ÷ price. A P/E of 20 is an earnings yield of 5% — a handy way to compare a stock with bond yields.",
          "A high multiple usually means the market expects earnings to grow; a low one often means it expects stagnation or decline. The multiple reflects expectations, not a verdict on quality.",
          "If the multiple stays constant, price moves in proportion to earnings. Most large moves combine both: earnings change and the multiple re-rates as expectations shift.",
        ],
        keyTerms: [
          { term: "P/E ratio", definition: "Share price ÷ earnings per share." },
          { term: "Earnings yield", definition: "EPS ÷ share price — the inverse of P/E." },
          {
            term: "Re-rating",
            definition: "A change in the multiple investors are willing to pay.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "Value traps",
            body: "A stock can look cheap at P/E 8 because earnings are about to fall. Ask why the multiple is low.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "cm-l2-b2",
      example: {
        title: "Pricing the $1.05 of EPS",
        setup: "The company from the last lesson earns $1.05 per share and trades at $21.",
        steps: [
          { label: "P/E", detail: "$21 ÷ $1.05 = 20." },
          { label: "Earnings yield", detail: "$1.05 ÷ $21 = 0.05 = 5%." },
          {
            label: "Constant multiple",
            detail: "If EPS rises 10% to $1.155 and P/E stays 20, price = 20 × 1.155 = $23.10.",
          },
          {
            label: "Re-rating",
            detail:
              "If EPS rises to $1.155 but P/E falls to 16, price = 16 × 1.155 = $18.48 — a loss despite growth.",
          },
        ],
        takeaway: "Price = multiple × earnings. Either factor can move the stock.",
      },
    },
    {
      kind: "visual",
      id: "cm-l2-b3",
      title: "Two stocks, two stories",
      visual: {
        type: "table",
        label: "Illustrative comparison",
        columns: ["", "Stock A", "Stock B"],
        rows: [
          ["Price", "$21.00", "$10.00"],
          ["EPS", "$1.05", "$1.00"],
          ["P/E", "20", "10"],
          ["Earnings yield", "5%", "10%"],
          ["Expected EPS trend", "Growing", "Shrinking"],
        ],
        caption:
          "Educational figures. B looks cheaper on P/E, but the market is pricing in falling earnings.",
      },
    },
    {
      kind: "interactive",
      id: "cm-l2-b4",
      title: "Is P/E 10 a bargain?",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Stock B trades at P/E 10 while peers sit at 20. What is the most useful next step?",
        situation: [
          "B's last two earnings reports showed falling sales.",
          "Analysts have cut next year's EPS estimates by 30%.",
        ],
        choices: [
          {
            label: "Find out why the multiple is low before judging it",
            outcome:
              "You learn estimates are falling; on next year's EPS the P/E is about 14, not 10.",
            best: true,
            feedback:
              "Good process — a low multiple is information about expectations, not a buy signal on its own.",
          },
          {
            label: "Conclude it is half price versus peers",
            outcome: "Earnings keep shrinking and the 'cheap' stock gets cheaper.",
            best: false,
            feedback:
              "Multiples compare price to earnings that may not last. That is the value trap.",
          },
          {
            label: "Ignore valuation entirely",
            outcome: "You lose an easy way to see what the market already expects.",
            best: false,
            feedback: "Valuation shows what is priced in — useful context for any decision.",
          },
        ],
      },
      takeaway:
        "A multiple tells you what is expected. The question is whether reality will differ.",
    },
    {
      kind: "practice",
      id: "cm-l2-b5",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "P/E ratio",
            question: {
              id: "cm-l2-q1",
              type: "numeric",
              topic: "valuation",
              prompt: "A stock trades at $21 with EPS of $1.05. What is its P/E?",
              answer: 20,
              tolerance: 0.1,
              explain: "P/E = price ÷ EPS = 21 ÷ 1.05 = 20.",
            },
            feedbackByAnswer: { numeric: "Divide price by EPS: 21 ÷ 1.05 = 20." },
          },
          {
            skill: "Earnings yield",
            question: {
              id: "cm-l2-q2",
              type: "numeric",
              topic: "valuation",
              prompt: "What earnings yield, in percent, corresponds to a P/E of 20?",
              answer: 5,
              tolerance: 0.05,
              unit: "%",
              explain: "Earnings yield = 1 ÷ P/E = 1 ÷ 20 = 0.05 = 5%.",
            },
            feedbackByAnswer: { numeric: "Invert the multiple: 1 ÷ 20 = 5%." },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "cm-l2-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Reading a high multiple",
            question: {
              id: "cm-l2-q3",
              type: "mcq",
              topic: "valuation",
              prompt:
                "A company trades at P/E 45 while its sector averages 15. What does that most likely reflect?",
              options: [
                "The market expects much faster earnings growth",
                "The stock is guaranteed to fall",
                "The company has no earnings",
                "The share price is above $45",
              ],
              answer: 0,
              explain:
                "A high multiple means investors pay more per dollar of today's earnings, usually because they expect those earnings to grow quickly.",
            },
            feedbackByAnswer: {
              "1": "Nothing is guaranteed — high multiples can persist if growth delivers.",
              "2": "A P/E can only be computed when earnings are positive.",
              "3": "P/E is a ratio; it says nothing about the absolute share price.",
            },
          },
          {
            skill: "Low P/E",
            question: {
              id: "cm-l2-q4",
              type: "truefalse",
              topic: "valuation",
              prompt: "A low P/E always means a stock is undervalued.",
              answer: false,
              explain:
                "A low P/E often reflects expected earnings declines. If earnings fall, the stock may not be cheap at all.",
            },
            feedbackByAnswer: {
              true: "Low multiples often price in shrinking earnings — the value trap.",
              false: "Correct — always ask why the multiple is low.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "cm-l2-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "A stock trades at $40 with EPS of $2.00, so its P/E is 20.",
          "Next year EPS grows to $2.50 and the market keeps paying the same multiple.",
        ],
        assessment: {
          items: [
            {
              skill: "Constant-multiple price",
              question: {
                id: "cm-l2-q5",
                type: "numeric",
                topic: "valuation",
                prompt: "What would the share price be, in dollars?",
                answer: 50,
                tolerance: 0.1,
                unit: "USD",
                explain:
                  "Price = P/E × EPS = 20 × 2.50 = $50, a 25% rise matching the 25% EPS growth. In reality the multiple can change too.",
              },
              feedbackByAnswer: {
                numeric: "Multiply the unchanged P/E by new EPS: 20 × 2.50 = 50.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "cm-l2-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: ["When you see a stock called 'cheap', what question will you ask first now?"],
    },
    {
      kind: "summary",
      id: "cm-l2-b9",
      title: "Recap",
      points: [
        "P/E = price ÷ EPS; earnings yield = EPS ÷ price.",
        "Multiples reflect expectations about future earnings.",
        "Price = multiple × earnings — either can move the stock.",
      ],
      nextStep: "Next lesson: the balance sheet and cash flow — what profit hides.",
    },
  ],
};
