import type { CourseLesson } from "../types";

export const lesson04InterestRates: CourseLesson = {
  id: "cm-l4",
  moduleId: "c6-m2",
  title: "Interest Rates and Asset Prices",
  blurb: "Why a change in rates reprices bonds, stocks and currencies at once.",
  objectives: [
    "Discount a future cash flow to today's value",
    "Explain why bond prices fall when yields rise",
    "Describe why rate changes hit long-duration assets hardest",
  ],
  durationMinutes: 11,
  xp: 36,
  keyTakeaway:
    "A dollar tomorrow is worth less today, and how much less depends on the interest rate. When rates rise, the present value of future cash falls.",
  blocks: [
    {
      kind: "explain",
      id: "cm-l4-b1",
      explanation: {
        heading: "The price of time",
        whyItMatters:
          "Interest rates are the gravity of finance. A central bank decision can move every asset you watch within minutes.",
        paragraphs: [
          "Present value = future cash ÷ (1 + rate). At 5%, $105 received in a year is worth $100 today, because $100 invested at 5% grows into $105.",
          "A bond pays fixed cash. If market yields rise, those fixed payments are worth less today, so the bond's price falls. Prices and yields move in opposite directions.",
          "Stocks are claims on future cash too. Companies whose profits lie far in the future — 'long-duration' growth stocks — lose the most present value when rates rise.",
          "Higher rates also attract capital into a currency and raise borrowing costs for companies and households, which can slow growth.",
        ],
        keyTerms: [
          { term: "Present value", definition: "Today's worth of a future cash flow, discounted at a rate." },
          { term: "Yield", definition: "The return implied by a bond's price and payments." },
          { term: "Duration", definition: "How sensitive an asset's price is to changes in rates." },
        ],
        callouts: [
          {
            tone: "info",
            title: "Expectations move first",
            body: "Markets often move when rate expectations change, before the central bank actually acts.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "cm-l4-b2",
      example: {
        title: "A one-year bond when yields rise",
        setup: "A bond pays $1,040 in one year (face $1,000 plus a $40 coupon).",
        steps: [
          { label: "At a 4% yield", detail: "Price = 1,040 ÷ 1.04 = $1,000.00." },
          { label: "Yields rise to 5%", detail: "Price = 1,040 ÷ 1.05 = $990.48." },
          { label: "Change", detail: "The bondholder loses $9.52 on paper — about 0.95%." },
        ],
        takeaway: "The payment did not change; only the rate used to value it did. That alone moved the price.",
      },
    },
    {
      kind: "visual",
      id: "cm-l4-b3",
      title: "Same payment, different yields",
      visual: {
        type: "table",
        label: "Value today of $1,040 paid in one year",
        columns: ["Yield", "Price today"],
        rows: [
          ["3%", "$1,009.71"],
          ["4%", "$1,000.00"],
          ["5%", "$990.48"],
          ["6%", "$981.13"],
        ],
        caption: "Educational calculation. Higher yield → lower price.",
      },
    },
    {
      kind: "interactive",
      id: "cm-l4-b4",
      title: "Rate surprise",
      interaction: {
        type: "scenario-decision",
        prompt: "The central bank signals rates will stay higher for longer than markets expected. What is the most reasonable reading?",
        situation: [
          "You hold a mix of short-term bonds and fast-growing tech stocks.",
          "Nothing about the companies' businesses has changed today.",
        ],
        choices: [
          {
            label: "Expect pressure on long-duration assets and review your risk",
            outcome: "Growth stocks and long bonds drop more than short bonds; your plan already sized for it.",
            best: true,
            feedback: "Right — higher discount rates hit distant cash flows hardest. This is context, not a forecast.",
          },
          {
            label: "Assume nothing changes because company earnings did not change",
            outcome: "Prices reprice anyway, because the rate used to value those earnings changed.",
            best: false,
            feedback: "Value depends on both cash flows and the discount rate.",
          },
          {
            label: "Conclude higher rates are always good for stocks",
            outcome: "Valuations compress across the market.",
            best: false,
            feedback: "Higher rates generally lower present values; effects vary, but 'always good' is wrong.",
          },
        ],
      },
      takeaway: "Rates are an input to every valuation. Know which of your positions are most rate-sensitive.",
    },
    {
      kind: "practice",
      id: "cm-l4-b5",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "Bond price after a yield rise",
            question: {
              id: "cm-l4-q1",
              type: "numeric",
              topic: "macro",
              prompt: "A bond pays $1,040 in one year. What is its price at a 5% yield, in dollars?",
              answer: 990.48,
              tolerance: 0.5,
              unit: "USD",
              explain: "Price = 1,040 ÷ 1.05 = $990.48.",
            },
            feedbackByAnswer: { numeric: "Divide the payment by 1 + yield: 1,040 ÷ 1.05 ≈ 990.48." },
          },
          {
            skill: "Present value",
            question: {
              id: "cm-l4-q2",
              type: "numeric",
              topic: "macro",
              prompt: "What is $105 received in one year worth today at a 5% rate, in dollars?",
              answer: 100,
              tolerance: 0.1,
              unit: "USD",
              explain: "105 ÷ 1.05 = $100, because $100 at 5% grows to $105.",
            },
            feedbackByAnswer: { numeric: "105 ÷ 1.05 = 100." },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "cm-l4-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Duration",
            question: {
              id: "cm-l4-q3",
              type: "mcq",
              topic: "macro",
              prompt: "Rates rise unexpectedly. Which asset's value is typically most sensitive?",
              options: [
                "A company whose profits are expected mostly a decade from now",
                "A bond maturing next month",
                "Cash in a savings account",
                "A company with steady profits paid out now",
              ],
              answer: 0,
              explain:
                "Cash flows far in the future are discounted over many years, so a higher rate cuts their present value most.",
            },
            feedbackByAnswer: {
              "1": "A bond maturing next month barely discounts at all — very low duration.",
              "2": "Cash keeps its nominal value and often earns the higher rate.",
              "3": "Near-term cash flows are discounted for a short time, so they move less.",
            },
          },
          {
            skill: "Price and yield",
            question: {
              id: "cm-l4-q4",
              type: "truefalse",
              topic: "macro",
              prompt: "When bond yields rise, existing bond prices rise too.",
              answer: false,
              explain:
                "Fixed payments discounted at a higher rate are worth less, so prices fall when yields rise.",
            },
            feedbackByAnswer: {
              true: "Prices and yields move in opposite directions.",
              false: "Correct — higher yield, lower price.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "cm-l4-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "A project will return $1,100 one year from now.",
          "Your required rate of return is 10%.",
        ],
        assessment: {
          items: [
            {
              skill: "Discounting",
              question: {
                id: "cm-l4-q5",
                type: "numeric",
                topic: "macro",
                prompt: "What is that $1,100 worth today, in dollars?",
                answer: 1000,
                tolerance: 1,
                unit: "USD",
                explain: "1,100 ÷ 1.10 = $1,000.",
              },
              feedbackByAnswer: { numeric: "1,100 ÷ 1.10 = 1,000." },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "cm-l4-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: ["Which assets you follow would you expect to be most sensitive to rate changes, and why?"],
    },
    {
      kind: "summary",
      id: "cm-l4-b9",
      title: "Recap",
      points: [
        "Present value = future cash ÷ (1 + rate).",
        "Bond prices and yields move in opposite directions.",
        "Distant cash flows are the most rate-sensitive.",
      ],
      nextStep: "Next lesson: inflation, and the difference between nominal and real returns.",
    },
  ],
};
