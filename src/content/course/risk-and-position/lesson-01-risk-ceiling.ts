import type { CourseLesson } from "../types";

export const lesson01RiskCeiling: CourseLesson = {
  id: "rp-l1",
  moduleId: "c2-m1",
  title: "The Risk Ceiling",
  blurb: "Pick the largest loss you accept before you know whether the trade works.",
  objectives: [
    "State your per-trade risk as a percentage of the account",
    "Convert that percentage into a dollar ceiling for one trade",
    "Explain why the ceiling is fixed before entry, not adjusted after",
    "Recognise when a suggested risk size is a gamble disguised as confidence",
  ],
  durationMinutes: 11,
  xp: 33,
  keyTakeaway:
    "The risk ceiling is the only number in a trade you can guarantee in advance. Fix it as a small percentage of the account and let every later decision obey it.",
  blocks: [
    {
      kind: "explain",
      id: "rp-l1-b1",
      explanation: {
        heading: "A ceiling you choose, not a loss you discover",
        whyItMatters:
          "Most blown accounts trace back to one avoidable mistake: the size of the loss was decided by the market instead of by the trader. A ceiling turns risk from something that happens to you into something you authorise.",
        paragraphs: [
          "Your risk ceiling is the maximum percentage of your trading account you are willing to lose on any single trade, decided before you place it. Common practice sits between 0.5% and 2% per trade. The 'right' number is the largest one you can lose without flinching — the number at which a loss is a line item rather than an event.",
          "Two properties make it work. First, it is a percentage, not a dollar amount, so it scales with the account: on $10,000 a 1% ceiling is $100, on $50,000 it is $500, and when the account shrinks the ceiling shrinks with it automatically. Second, it is fixed before entry. The moment you widen the ceiling because a trade 'looks strong', you are no longer following a rule — you are negotiating with a position that has your money in it.",
          "The ceiling also sets your survivability. At 1% risk, ten consecutive losses cost about 9.6% of the account — a bad week, not an ending. At 5% risk the same streak costs about 40%; at 10%, about 65%. The trade ideas did not change across those three traders. Only the ceiling did.",
          "What the ceiling is not: it is not a target, not a stop price, and not a prediction. It is a budget. The stop price and position size in the next lesson are derived from it. This lesson only fixes the number and defends it.",
        ],
        keyTerms: [
          {
            term: "Risk ceiling",
            definition:
              "The maximum percentage of the account you accept losing on one trade, set before entry.",
          },
          {
            term: "Fixed-fractional risk",
            definition:
              "Sizing that risks the same percentage of the current account on every trade, so exposure grows and shrinks with equity.",
          },
          {
            term: "Unit risk",
            definition:
              "The dollar risk per share or contract — the distance between entry and stop. Distinct from the ceiling, which is the total budget.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "The ceiling is a maximum, not an instruction",
            body: "Risking the full 1% on every trade is allowed, not required. A weaker setup can risk less. Nothing ever risks more.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "rp-l1-b2",
      example: {
        title: "Turning a percentage into a dollar budget",
        setup:
          "An account holds $25,000. The trader's ceiling is 1% per trade. What is the budget, and what happens to it as the account changes?",
        steps: [
          {
            label: "Read the ceiling as a percentage",
            detail: "1% of $25,000 = 0.01 × 25,000 = $250. That is the most this trade may lose.",
          },
          {
            label: "Check a smaller and larger ceiling for contrast",
            detail:
              "0.5% would be $125 — the cautious end. 2% would be $500 — the aggressive end. All three are defensible; picking one and deviating mid-trade is not.",
          },
          {
            label: "Let the ceiling follow the account",
            detail:
              "After a losing stretch the account sits at $20,000. The same 1% rule now budgets $200. The rule automatically de-risks when you are behind, which is the opposite of the instinct to size up and recover.",
          },
          {
            label: "Confirm what $250 does and does not fix",
            detail:
              "It fixes the total loss. It does not fix the stop price or the number of shares — those come next, from dividing the budget by the stop distance.",
          },
        ],
        takeaway:
          "Percentage first, dollars second: 1% of $25,000 is a $250 budget that shrinks to $200 when the account does.",
      },
    },
    {
      kind: "visual",
      id: "rp-l1-b3",
      title: "The same rule, three account sizes",
      visual: {
        type: "table",
        label: "Dollar risk at a 1% ceiling",
        columns: ["Account", "0.5% ceiling", "1% ceiling", "2% ceiling"],
        rows: [
          ["$10,000", "$50", "$100", "$200"],
          ["$25,000", "$125", "$250", "$500"],
          ["$50,000", "$250", "$500", "$1,000"],
        ],
        caption:
          "One rule, expressed as a percentage, prices itself for every account size without being re-decided.",
      },
    },
    {
      kind: "interactive",
      id: "rp-l1-b4",
      title: "Defend the ceiling",
      takeaway:
        "A ceiling that bends to accommodate a conviction has stopped being a ceiling — every choice here that keeps the percentage fixed is the disciplined one.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "You trade a $20,000 account with a 1% ceiling. Three moments test the rule. Choose your response to each.",
        situation: [
          "You have taken three losses in a row. The next setup looks textbook-perfect.",
          "A trading community insists a low-quality idea will double overnight.",
          "Your account has grown to $30,000 after a strong month.",
        ],
        choices: [
          {
            label: "Raise the next trade to 3% to recover the streak faster",
            outcome:
              "The setup loses (it was average, like most). The account is now down roughly 4.6% instead of 1.6%.",
            best: false,
            feedback:
              "Streaks do not change the odds of the next trade. Enlarging risk after losses is how a normal drawdown becomes a crisis.",
          },
          {
            label: "Keep the ceiling at 1% and take the trade at the standard size",
            outcome:
              "Whether it wins or loses, the account stays inside the budget the rule promised.",
            best: true,
            feedback:
              "Correct. The rule was written when you were calm precisely so it would still apply when you are not.",
          },
          {
            label: "Skip the trade because three losses prove a bad run",
            outcome:
              "You avoid a valid risk-budgeted trade out of fear, letting the last three outcomes rewrite the plan.",
            best: false,
            feedback:
              "Three losses at proper size carry little information. The ceiling exists so losses do not have to be judged emotionally.",
          },
          {
            label: "Take the idea with 10% because a double is guaranteed",
            outcome:
              "A loss here erases roughly five trades' worth of budget and typically triggers revenge sizing next.",
            best: false,
            feedback:
              "No setup guarantees anything. 'Guaranteed' is the word that usually accompanies the worst sizing decision available.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "rp-l1-b5",
      title: "Guided practice",
      assessment: {
        intro: "Apply the ceiling to real account numbers.",
        allowRetry: true,
        items: [
          {
            skill: "Converting a percentage ceiling to dollars",
            question: {
              id: "rp-l1-q1",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "Your account holds $42,000 and your ceiling is 1%. What is the dollar risk budget for one trade?",
              answer: 420,
              tolerance: 1,
              unit: "USD",
              explain: "1% of $42,000 = 0.01 × 42,000 = $420 — one percent of the current balance.",
            },
            feedbackByAnswer: {
              numeric: "Multiply the balance by 0.01: 42,000 × 0.01 = 420.",
            },
          },
          {
            skill: "Letting the ceiling scale down with drawdown",
            question: {
              id: "rp-l1-q2",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "After losses the account is $16,500. Under the same 1% rule, what is the new per-trade budget?",
              answer: 165,
              tolerance: 1,
              unit: "USD",
              explain:
                "The percentage rule is unchanged, so the budget recalculates: 0.01 × 16,500 = $165. It shrinks because the account did.",
            },
            feedbackByAnswer: {
              numeric: "Recompute from the new balance: 16,500 × 0.01 = 165.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "rp-l1-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Why the ceiling is a percentage",
            question: {
              id: "rp-l1-q3",
              type: "mcq",
              topic: "position-sizing",
              prompt:
                "Why express the risk ceiling as a percentage rather than a fixed dollar amount?",
              options: [
                "Percentages are taxed more favourably than dollar losses",
                "It scales with the account, so risk automatically shrinks in drawdown and grows with equity",
                "Brokers reject orders whose dollar risk is not proportional to the balance",
                "A fixed dollar amount makes position sizing impossible",
              ],
              answer: 1,
              explain:
                "A percentage tracks equity: $250 on $25,000 becomes $200 on $20,000 with no re-decision, automatically de-risking when behind.",
            },
            feedbackByAnswer: {
              "0": "Tax treatment has nothing to do with how a risk rule is expressed.",
              "2": "Brokers never see your personal risk rule; sizing is your own constraint.",
              "3": "Position sizing divides the budget by stop distance — a dollar budget works fine; it just will not scale.",
            },
          },
          {
            skill: "Reading the ceiling as a maximum",
            question: {
              id: "rp-l1-q4",
              type: "truefalse",
              topic: "position-sizing",
              prompt:
                "If your ceiling is 2%, a rule-consistent trader must risk close to 2% on every trade.",
              answer: false,
              explain:
                "The ceiling is a maximum, not a mandate. Weaker setups may risk less; none may risk more.",
            },
            feedbackByAnswer: {
              false: "Correct — the ceiling caps risk, it does not demand it.",
              true: "The ceiling is a budget, not a target. Underspending it is always allowed.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "rp-l1-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You manage $30,000 with a 1% ceiling. A volatile stock sets up with an entry at $54.00 and a logical stop at $52.50 — the last swing low.",
          "Your broker platform shows you a 'recommended' quantity of 200 shares, which would risk $300 if the stop is hit.",
        ],
        assessment: {
          items: [
            {
              skill: "Checking a broker suggestion against your ceiling",
              question: {
                id: "rp-l1-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt:
                  "Your ceiling is 1% of $30,000. The suggestion risks $300. How many dollars above your ceiling is it?",
                answer: 0,
                tolerance: 0.5,
                unit: "USD",
                explain:
                  "Your ceiling is 0.01 × 30,000 = $300, and the suggested quantity risks exactly $300. The suggestion sits at — not above — the ceiling.",
              },
              feedbackByAnswer: {
                numeric:
                  "Compute the ceiling first: 30,000 × 0.01 = 300. The suggestion is 300, so the difference is zero.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "rp-l1-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "What percentage risk would let you take five losses in a row and still place the sixth trade without hesitation?",
      ],
    },
    {
      kind: "summary",
      id: "rp-l1-b9",
      title: "Recap",
      points: [
        "The risk ceiling is the maximum percentage of the account you accept losing on one trade.",
        "Expressed as a percentage, it shrinks automatically in drawdown and grows with equity.",
        "It is a maximum, not a target — underspending it is always allowed, exceeding it never is.",
        "The ceiling is decided before entry so it cannot be renegotiated under the influence of a position.",
      ],
      nextStep: "Next: dividing that budget by the stop distance to get the position size.",
    },
  ],
};
