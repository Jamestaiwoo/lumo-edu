import type { CourseLesson } from "../types";

export const lesson03BalanceSheetCash: CourseLesson = {
  id: "cm-l3",
  moduleId: "c6-m1",
  title: "Debt, Cash and Free Cash Flow",
  blurb: "Profit is an opinion; cash is a fact. Learn to check both.",
  objectives: [
    "Compute net debt and a simple leverage ratio",
    "Calculate free cash flow from operating cash flow and capex",
    "Explain why net income and cash flow can diverge",
  ],
  durationMinutes: 11,
  xp: 36,
  keyTakeaway:
    "Debt raises the stakes of every bad quarter, and only cash pays the bills. Check net debt and free cash flow alongside earnings.",
  blocks: [
    {
      kind: "explain",
      id: "cm-l3-b1",
      explanation: {
        heading: "What the company owns, owes, and actually collects",
        whyItMatters:
          "Companies rarely fail for lack of reported profit — they fail when they run out of cash or cannot refinance debt.",
        paragraphs: [
          "The balance sheet lists what a company owns (assets), what it owes (liabilities) and the remainder belonging to shareholders (equity).",
          "Net debt = total debt − cash. Comparing it with yearly operating profit before depreciation (EBITDA) gives a quick leverage ratio: net debt ÷ EBITDA. Higher means less room for error.",
          "The cash flow statement shows money actually received and spent. Operating cash flow minus capital expenditure (capex) is free cash flow (FCF) — cash available for debt repayment, dividends or buybacks.",
          "Net income uses accounting accruals, so a firm can book sales it has not collected yet. If profit keeps rising while cash flow does not, ask why.",
        ],
        keyTerms: [
          { term: "Net debt", definition: "Total debt minus cash." },
          { term: "Free cash flow", definition: "Operating cash flow minus capital expenditure." },
          {
            term: "Leverage ratio",
            definition: "Net debt ÷ EBITDA, in years of operating profit.",
          },
        ],
        callouts: [
          {
            tone: "tip",
            title: "Follow the cash",
            body: "Persistent gaps between earnings and cash flow are worth investigating before anything else.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "cm-l3-b2",
      example: {
        title: "Same company, balance sheet view",
        setup:
          "Debt $260m, cash $60m, EBITDA $100m, operating cash flow $90m, capex $40m, 50m shares.",
        steps: [
          { label: "Net debt", detail: "$260m − $60m = $200m." },
          { label: "Leverage", detail: "$200m ÷ $100m = 2.0× EBITDA." },
          { label: "Free cash flow", detail: "$90m − $40m = $50m." },
          { label: "Per share", detail: "$50m ÷ 50m shares = $1.00 of FCF per share." },
        ],
        takeaway:
          "Two years of operating profit would clear the net debt; $1 per share of real cash is generated each year.",
      },
    },
    {
      kind: "visual",
      id: "cm-l3-b3",
      title: "Balance sheet and cash snapshot",
      visual: {
        type: "table",
        label: "Illustrative figures ($m)",
        columns: ["Item", "Value"],
        rows: [
          ["Total debt", "260"],
          ["Cash", "60"],
          ["Net debt", "200"],
          ["EBITDA", "100"],
          ["Net debt ÷ EBITDA", "2.0×"],
          ["Operating cash flow", "90"],
          ["Capex", "40"],
          ["Free cash flow", "50"],
        ],
        caption: "Educational example, not a real company.",
      },
    },
    {
      kind: "interactive",
      id: "cm-l3-b4",
      title: "Profit up, cash down",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Net income rose 30% but operating cash flow fell 20% and receivables doubled. How do you read it?",
        situation: [
          "Receivables are sales booked but not yet paid by customers.",
          "Management calls it 'timing'.",
        ],
        choices: [
          {
            label: "Treat it as a warning to investigate collection quality",
            outcome:
              "You dig in and find large customers paying slower — a real risk the headline hid.",
            best: true,
            feedback: "Right — rising receivables can mean aggressive booking or weak customers.",
          },
          {
            label: "Trust net income; cash will catch up",
            outcome: "Two quarters later the company writes off unpaid invoices.",
            best: false,
            feedback:
              "Accruals can be optimistic. Cash confirms profit; it does not follow automatically.",
          },
          {
            label: "Assume fraud and short it immediately",
            outcome: "Collections recover and the stock rises against you.",
            best: false,
            feedback: "A divergence is a question to investigate, not proof of anything.",
          },
        ],
      },
      takeaway: "When earnings and cash disagree, investigate before trusting either.",
    },
    {
      kind: "practice",
      id: "cm-l3-b5",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "Net debt",
            question: {
              id: "cm-l3-q1",
              type: "numeric",
              topic: "fundamentals",
              prompt: "Debt is $260m and cash is $60m. What is net debt in $m?",
              answer: 200,
              tolerance: 0.5,
              unit: "$m",
              explain: "Net debt = debt − cash = 260 − 60 = $200m.",
            },
            feedbackByAnswer: { numeric: "Subtract cash from debt: 260 − 60 = 200." },
          },
          {
            skill: "Leverage ratio",
            question: {
              id: "cm-l3-q2",
              type: "numeric",
              topic: "fundamentals",
              prompt: "With net debt of $200m and EBITDA of $100m, what is net debt ÷ EBITDA?",
              answer: 2,
              tolerance: 0.05,
              unit: "×",
              explain: "200 ÷ 100 = 2.0× — about two years of operating profit.",
            },
            feedbackByAnswer: { numeric: "Divide net debt by EBITDA: 200 ÷ 100 = 2." },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "cm-l3-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Free cash flow",
            question: {
              id: "cm-l3-q3",
              type: "mcq",
              topic: "fundamentals",
              prompt: "Which calculation gives free cash flow?",
              options: [
                "Revenue − cost of goods sold",
                "Operating cash flow − capital expenditure",
                "Net income + debt",
                "Cash − debt",
              ],
              answer: 1,
              explain:
                "Free cash flow is the cash left from operations after reinvesting in equipment and facilities.",
            },
            feedbackByAnswer: {
              "0": "That is gross profit, an accounting figure from the income statement.",
              "2": "Adding debt confuses borrowing with cash generated by the business.",
              "3": "That is negative net debt, a balance sheet position — not a flow.",
            },
          },
          {
            skill: "Accruals versus cash",
            question: {
              id: "cm-l3-q4",
              type: "truefalse",
              topic: "fundamentals",
              prompt: "Net income always equals the cash a company collected in the period.",
              answer: false,
              explain:
                "Accounting records sales when earned, not when paid, and spreads costs like depreciation over years, so net income and cash differ.",
            },
            feedbackByAnswer: {
              true: "Accruals and depreciation make profit and cash diverge.",
              false: "Correct — that is why the cash flow statement exists.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "cm-l3-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "The company generates $50m of free cash flow a year.",
          "Its market capitalisation (share price × shares) is $1,000m.",
        ],
        assessment: {
          items: [
            {
              skill: "FCF yield",
              question: {
                id: "cm-l3-q5",
                type: "numeric",
                topic: "valuation",
                prompt: "What is the free cash flow yield in percent?",
                answer: 5,
                tolerance: 0.05,
                unit: "%",
                explain: "FCF yield = FCF ÷ market cap = 50 ÷ 1,000 = 5%.",
              },
              feedbackByAnswer: { numeric: "50 ÷ 1,000 = 0.05 = 5%." },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "cm-l3-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: ["Why might a heavily indebted company react more violently to a weak quarter?"],
    },
    {
      kind: "summary",
      id: "cm-l3-b9",
      title: "Recap",
      points: [
        "Net debt = debt − cash; net debt ÷ EBITDA measures leverage.",
        "FCF = operating cash flow − capex.",
        "Profit and cash can diverge; persistent gaps deserve scrutiny.",
      ],
      nextStep:
        "Next module: the macro forces that move every company at once, starting with interest rates.",
    },
  ],
};
