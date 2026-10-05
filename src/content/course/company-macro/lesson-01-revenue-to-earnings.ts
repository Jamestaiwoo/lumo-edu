import type { CourseLesson } from "../types";

export const lesson01RevenueToEarnings: CourseLesson = {
  id: "cm-l1",
  moduleId: "c6-m1",
  title: "From Revenue to Earnings",
  blurb: "Follow one dollar of sales down the income statement to the profit that is left.",
  objectives: [
    "Read the main lines of an income statement from revenue to net income",
    "Compute gross, operating and net margins",
    "Calculate earnings per share from net income and share count",
    "Explain why revenue growth does not guarantee profit growth",
  ],
  durationMinutes: 11,
  xp: 36,
  keyTakeaway:
    "Revenue is what customers pay; earnings are what survives costs, interest and tax. Margins tell you how much of each sales dollar the business keeps.",
  blocks: [
    {
      kind: "explain",
      id: "cm-l1-b1",
      explanation: {
        heading: "The income statement is a waterfall",
        whyItMatters:
          "Headlines quote revenue, but share prices track earnings expectations. Knowing which line moved tells you whether a business is actually getting better.",
        paragraphs: [
          "Revenue (sales) is the top line: everything customers paid in the period. Subtract the direct cost of producing what was sold — cost of goods sold — and you get gross profit.",
          "Subtract operating expenses such as salaries, marketing and research, and you reach operating income: the profit the core business earns before financing and tax.",
          "Subtract interest on debt and then tax, and what remains is net income — the bottom line. Divide it by the number of shares and you have earnings per share (EPS), the figure analysts forecast.",
          "Each profit line divided by revenue is a margin. Margins make companies of different sizes comparable and show whether growth is profitable or bought with ever-rising costs.",
        ],
        keyTerms: [
          { term: "Gross margin", definition: "Gross profit ÷ revenue." },
          { term: "Operating margin", definition: "Operating income ÷ revenue." },
          { term: "EPS", definition: "Net income ÷ shares outstanding." },
        ],
        callouts: [
          {
            tone: "pitfall",
            title: "Growth is not profit",
            body: "Sales can rise while margins shrink fast enough that profit falls. Always check the margin, not just the top line.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "cm-l1-b2",
      example: {
        title: "A company with $500m of sales",
        setup:
          "Revenue $500m, cost of goods sold $300m, operating expenses $120m, interest $10m, tax rate 25%, 50m shares outstanding.",
        steps: [
          { label: "Gross profit", detail: "$500m − $300m = $200m. Gross margin 200 ÷ 500 = 40%." },
          {
            label: "Operating income",
            detail: "$200m − $120m = $80m. Operating margin 80 ÷ 500 = 16%.",
          },
          { label: "Pre-tax income", detail: "$80m − $10m interest = $70m." },
          {
            label: "Net income",
            detail: "Tax 25% × $70m = $17.5m, so net income = $52.5m. Net margin 10.5%.",
          },
          { label: "EPS", detail: "$52.5m ÷ 50m shares = $1.05 per share." },
        ],
        takeaway:
          "Of every $1.00 of sales, 40 cents survives production, 16 cents survives operations and 10.5 cents reaches shareholders.",
      },
    },
    {
      kind: "visual",
      id: "cm-l1-b3",
      title: "The waterfall in one table",
      visual: {
        type: "table",
        label: "Simplified income statement ($m)",
        columns: ["Line", "Amount", "% of revenue"],
        rows: [
          ["Revenue", "500.0", "100%"],
          ["Cost of goods sold", "−300.0", "60%"],
          ["Gross profit", "200.0", "40%"],
          ["Operating expenses", "−120.0", "24%"],
          ["Operating income", "80.0", "16%"],
          ["Interest", "−10.0", "2%"],
          ["Tax (25%)", "−17.5", "3.5%"],
          ["Net income", "52.5", "10.5%"],
        ],
        caption: "Educational example with illustrative figures, not a real company.",
      },
    },
    {
      kind: "interactive",
      id: "cm-l1-b4",
      title: "Which headline matters?",
      interaction: {
        type: "scenario-decision",
        prompt: "A company reports revenue up 20%. What do you check before calling it good news?",
        situation: [
          "The press release leads with record sales.",
          "Margins are reported further down the page.",
        ],
        choices: [
          {
            label: "Check whether margins held, rose or fell",
            outcome:
              "You see operating margin fell from 16% to 9%, so operating income actually dropped.",
            best: true,
            feedback:
              "Right — growth is only good news if enough of it reaches the profit lines. Margins answer that.",
          },
          {
            label: "Treat 20% sales growth as proof profits rose",
            outcome: "You assume higher earnings and are surprised when EPS falls.",
            best: false,
            feedback: "Revenue is the top of the waterfall. Costs can grow faster than sales.",
          },
          {
            label: "Ignore the report — fundamentals never matter for prices",
            outcome: "You miss the single biggest scheduled driver of the stock this quarter.",
            best: false,
            feedback:
              "Earnings expectations are a major input to share prices, even for short-term traders.",
          },
        ],
      },
      takeaway: "Read past the top line: margins show whether growth is profitable.",
    },
    {
      kind: "practice",
      id: "cm-l1-b5",
      title: "Guided practice",
      assessment: {
        intro: "Use the $500m example.",
        allowRetry: true,
        items: [
          {
            skill: "Gross margin",
            question: {
              id: "cm-l1-q1",
              type: "numeric",
              topic: "fundamentals",
              prompt:
                "Revenue is $500m and cost of goods sold is $300m. What is the gross margin in percent?",
              answer: 40,
              tolerance: 0.1,
              unit: "%",
              explain: "Gross profit = 500 − 300 = $200m. Gross margin = 200 ÷ 500 = 40%.",
            },
            feedbackByAnswer: { numeric: "Gross profit ÷ revenue: 200 ÷ 500 = 0.40 = 40%." },
          },
          {
            skill: "Earnings per share",
            question: {
              id: "cm-l1-q2",
              type: "numeric",
              topic: "fundamentals",
              prompt: "Net income is $52.5m and there are 50m shares. What is EPS in dollars?",
              answer: 1.05,
              tolerance: 0.01,
              unit: "USD",
              explain: "EPS = net income ÷ shares = 52.5 ÷ 50 = $1.05 per share.",
            },
            feedbackByAnswer: { numeric: "Divide net income by shares: 52.5 ÷ 50 = 1.05." },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "cm-l1-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Reading the lines",
            question: {
              id: "cm-l1-q3",
              type: "mcq",
              topic: "fundamentals",
              prompt: "Which line shows the profit of the core business before interest and tax?",
              options: ["Revenue", "Gross profit", "Operating income", "Net income"],
              answer: 2,
              explain:
                "Operating income subtracts production costs and operating expenses but not interest or tax, so it isolates the core business.",
            },
            feedbackByAnswer: {
              "0": "Revenue is before any costs at all.",
              "1": "Gross profit still ignores salaries, marketing and other operating expenses.",
              "3": "Net income is after interest and tax — it mixes in financing choices.",
            },
          },
          {
            skill: "Growth versus profit",
            question: {
              id: "cm-l1-q4",
              type: "truefalse",
              topic: "fundamentals",
              prompt: "If revenue grows, net income must grow too.",
              answer: false,
              explain:
                "If costs rise faster than revenue, margins shrink and profit can fall even while sales grow.",
            },
            feedbackByAnswer: {
              true: "Costs can grow faster than sales — margins decide whether growth reaches profit.",
              false: "Correct — profit depends on margins, not on sales alone.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "cm-l1-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Next year revenue grows 10% from $500m to $550m.",
          "Competition forces price cuts, so operating margin falls from 16% to 12%.",
        ],
        assessment: {
          items: [
            {
              skill: "Margin compression",
              question: {
                id: "cm-l1-q5",
                type: "numeric",
                topic: "fundamentals",
                prompt: "What is the new operating income in $m?",
                answer: 66,
                tolerance: 0.5,
                unit: "$m",
                explain: "12% × $550m = $66m — down from $80m (−17.5%) even though sales grew 10%.",
              },
              feedbackByAnswer: {
                numeric: "Operating income = margin × revenue = 0.12 × 550 = 66.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "cm-l1-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Think of a company you know. Would you guess its margins are high or low, and what in the business makes you think so?",
      ],
    },
    {
      kind: "summary",
      id: "cm-l1-b9",
      title: "Recap",
      points: [
        "Revenue → gross profit → operating income → net income → EPS.",
        "Margins = each profit line ÷ revenue; they make companies comparable.",
        "Sales growth with falling margins can mean falling profit.",
      ],
      nextStep: "Next lesson: what the market pays for those earnings — valuation multiples.",
    },
  ],
};
