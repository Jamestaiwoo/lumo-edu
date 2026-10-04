import type { CourseLesson } from "../types";

export const lesson07CorrelationConcentration: CourseLesson = {
  id: "rp-l7",
  moduleId: "c2-m3",
  title: "Correlation & Concentration",
  blurb: "Five positions in one idea are one position, sized five times.",
  objectives: [
    "Distinguish position count from true risk exposure",
    "Identify correlated positions that behave as a single bet",
    "Estimate portfolio risk when positions share a driver",
    "Apply a concentration cap to a set of candidate trades",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Risk diversifies only across independent drivers. Correlated positions multiply one exposure; counting them as separate trades is how the ceiling gets silently broken.",
  blocks: [
    {
      kind: "explain",
      id: "rp-l7-b1",
      explanation: {
        heading: "Diversification is about drivers, not tickers",
        whyItMatters:
          "A portfolio can hold five positions, obey the 1% rule on each, and still carry the effective risk of a 4% single bet — because all five are the same claim wearing different symbols.",
        paragraphs: [
          "Correlation describes how positions move together. Perfect correlation (r = 1) means two positions are the same trade: if one loses, so does the other, always. Zero correlation means outcomes are independent. Negative correlation means one tends to gain when the other loses — the closest thing to a natural hedge.",
          "Real portfolios cluster. Two bank stocks, an index ETF heavy in banks, and a bond-short position can all be the same underlying bet: 'rates and credit stay strong'. A macro shock that disproves that claim hits every leg at once. Your per-trade ceilings were each 1%, but the portfolio loss on the shared driver can approach the sum of all of them.",
          "Concentration is the other face: the largest single position sets a floor on portfolio risk no matter how many small ones surround it. If 40% of capital sits in one idea, the portfolio's risk is dominated by that idea — the other positions are garnish.",
          "Practical treatment without a covariance matrix: tag each position with its primary driver ('US rates', 'crypto beta', 'single-company earnings'), then cap total risk per driver — a common rule of thumb is 2–3% of the account across all positions sharing one driver. The cap is coarse on purpose. It forces the question 'how many versions of this do I own?' before entry, not after the correlation goes to one.",
        ],
        keyTerms: [
          {
            term: "Correlation (r)",
            definition:
              "How closely two positions' moves track, from −1 (opposite) through 0 (independent) to 1 (identical).",
          },
          {
            term: "Driver",
            definition: "The shared economic or narrative force behind a position's expected move.",
          },
          {
            term: "Concentration cap",
            definition:
              "A per-driver ceiling on total risk, independent of how many tickers express it.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "rp-l7-b2",
      example: {
        title: "Five tickets, one bet",
        setup:
          "A $50,000 account, 1% per-trade ceiling ($500 each), takes five positions: two bank stocks, one insurance stock, a financials ETF, and a short on long-duration bonds.",
        steps: [
          {
            label: "Read each ticket on its own",
            detail: "Five trades × $500 planned risk = $2,500 if their failures were independent.",
          },
          {
            label: "Tag the driver",
            detail:
              "All five strengthen when credit conditions and rates stay benign, and all five weaken together when credit stress appears. Primary driver: 'financials health' — shared by all.",
          },
          {
            label: "Price the shared event",
            detail:
              "A credit scare correlates the book toward 1. Simultaneous ~1% adverse moves with correlated gaps can approach the sum: up to ~$2,500+, five times the per-trade ceiling on 'one' position.",
          },
          {
            label: "Apply the cap",
            detail:
              "Rule: max 3% ($1,500) of risk per driver. The book needs shrinking — e.g. keep two legs (say the ETF and one bank, $1,000 total driver risk) and reject or resize the rest.",
          },
        ],
        takeaway: "The ceiling is per idea, not per order ticket. Count drivers, not symbols.",
      },
    },
    {
      kind: "visual",
      id: "rp-l7-b3",
      title: "Independent risk versus shared-driver risk",
      visual: {
        type: "table",
        label: "Five positions, 1% risk each",
        columns: ["Structure", "Shared driver", "Effective portfolio risk"],
        rows: [
          ["5 uncorrelated trades", "None", "~1% at a time (diversified)"],
          ["5 trades, 2 drivers", "Split across ideas", "~2% worst case"],
          ["5 trades, 1 driver", "All the same bet", "Up to ~5% together"],
        ],
        caption:
          "Identical tickets, radically different survival math — only the driver structure changed.",
      },
    },
    {
      kind: "interactive",
      id: "rp-l7-b4",
      title: "Tag the hidden driver",
      takeaway:
        "The disciplined answer tags each book by its true driver before adding a position — exposure is counted in claims, not in orders.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Four candidate trades arrive on the same morning. Your current book already risks 2.5% on the driver 'US rates'. Which policy do you apply?",
        situation: [
          "The candidates: (a) long gold miners, (b) short Treasuries, (c) long regional banks, (d) long utilities.",
        ],
        choices: [
          {
            label: "Add whichever pass chart checks until per-driver risk hits the 3% cap",
            outcome:
              "With 2.5% already at risk, at most 0.5% more fits — so either one small new leg or none. The book stays inside its 3% worst case.",
            best: true,
            feedback:
              "Correct — the cap makes you prioritise: with 2.5% already at risk, only the least rate-correlated candidate has room.",
          },
          {
            label: "Add all four; they are four different positions",
            outcome:
              "Driver risk jumps toward 4.5% — a single macro reversal can cost several times one trade's ceiling.",
            best: false,
            feedback:
              "Four tickets can be one claim. Per-trade ceilings are not per-book ceilings.",
          },
          {
            label: "Add none ever; concentration is always fatal",
            outcome:
              "A hard zero ignores that some rate exposure may be the point of the thesis — the cap, not abstinence, manages it.",
            best: false,
            feedback:
              "The tool is a cap, not a ban. Controlled driver risk is allowed; uncounted driver risk is not.",
          },
          {
            label: "Size all four at 0.25% so each 'barely counts'",
            outcome:
              "Arithmetic: 2.5% + 4×0.25% = 3.5% — still over the cap, now hidden under many small numbers.",
            best: false,
            feedback:
              "Shrinking the pieces does not shrink the sum. The cap applies to total driver risk regardless of ticket size.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "rp-l7-b5",
      title: "Guided practice",
      assessment: {
        intro: "Compute driver-level risk.",
        allowRetry: true,
        items: [
          {
            skill: "Summing risk across one driver",
            question: {
              id: "rp-l7-q1",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "Three positions share the driver 'US rates', risking 1.0%, 1.5% and 0.5% of the account. Total risk on that driver?",
              answer: 3,
              tolerance: 0.05,
              unit: "%",
              explain: "1.0 + 1.5 + 0.5 = 3.0% of the account riding on one claim.",
            },
            feedbackByAnswer: {
              numeric: "Add the three percentages: 1.0 + 1.5 + 0.5 = 3.0.",
            },
          },
          {
            skill: "Dollars under the cap",
            question: {
              id: "rp-l7-q2",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "A $40,000 account with a 3% per-driver cap. What is the maximum dollar risk allowed across positions sharing one driver?",
              answer: 1200,
              tolerance: 5,
              unit: "USD",
              explain: "40,000 × 0.03 = $1,200 — the combined budget for that driver.",
            },
            feedbackByAnswer: {
              numeric: "40,000 × 0.03 = 1,200.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "rp-l7-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Why correlated positions multiply",
            question: {
              id: "rp-l7-q3",
              type: "mcq",
              topic: "risk-reward",
              prompt:
                "Five positions, 1% risk each, all driven by the same macro factor. Why is this riskier than five independent positions?",
              options: [
                "Their brokers report them on one statement",
                "A single factor move can trigger all five stops together, summing their losses",
                "Correlated positions have wider spreads",
                "Exchange rules limit losses on independent positions only",
              ],
              answer: 1,
              explain:
                "Correlation means failures arrive together: the combined loss approaches the sum of the individual risks instead of averaging out.",
            },
            feedbackByAnswer: {
              "0": "Statements have no effect on how positions co-move.",
              "2": "Spread width is unrelated to cross-position correlation.",
              "3": "No exchange rule distinguishes by correlation.",
            },
          },
          {
            skill: "Concentration versus position count",
            question: {
              id: "rp-l7-q4",
              type: "truefalse",
              topic: "risk-reward",
              prompt:
                "Holding twelve positions can still be a concentrated portfolio if most share one driver or one is much larger than the rest.",
              answer: true,
              explain:
                "Count measures paperwork, not exposure. Driver risk and the largest position decide concentration.",
            },
            feedbackByAnswer: {
              true: "Correct — exposure structure, not ticket count, is what compounds.",
              false: "Twelve clones of one idea are one idea with twelve entries.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "rp-l7-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Account: $60,000. Per-driver cap: 3% ($1,800). Open driver risk on 'crypto beta': two positions at $600 and $450.",
          "A third crypto-correlated trade offers a clean setup risking $700.",
        ],
        assessment: {
          items: [
            {
              skill: "Deciding fit under the cap",
              question: {
                id: "rp-l7-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt:
                  "Existing driver risk $1,050; cap $1,800. How many dollars of headroom remain for a new crypto-correlated position?",
                answer: 750,
                tolerance: 5,
                unit: "USD",
                explain: "1,800 − (600 + 450) = $750. The $700 candidate fits with $50 to spare.",
              },
              feedbackByAnswer: {
                numeric: "Sum existing risk (1,050), subtract from the cap: 1,800 − 1,050 = 750.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "rp-l7-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "If your open positions shared one unexpected driver, what would it be — and what would your total risk on it be today?",
      ],
    },
    {
      kind: "summary",
      id: "rp-l7-b9",
      title: "Recap",
      points: [
        "Correlated positions fail together; five tickets can be one bet.",
        "Tag positions by driver and cap total risk per driver (e.g. 2–3%).",
        "Concentration is set by the largest exposure, not by position count.",
        "The cap applies before entry — count claims, not orders.",
      ],
      nextStep: "Next: the drawdown arithmetic that a correlated miss feeds directly into.",
    },
  ],
};
