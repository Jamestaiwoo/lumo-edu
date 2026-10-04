import type { CourseLesson } from "../types";

export const lesson03MathOfRuin: CourseLesson = {
  id: "rp-l3",
  moduleId: "c2-m1",
  title: "The Math of Ruin",
  blurb: "Why losses grow harder to recover the deeper they go.",
  objectives: [
    "Compute the gain required to recover a given loss",
    "Explain the asymmetry between losing and recovering in percentage terms",
    "Compare drawdowns at several depths and read the pattern",
    "Argue why ruin avoidance dominates return maximisation",
  ],
  durationMinutes: 10,
  xp: 30,
  keyTakeaway:
    "Losses and recoveries are not symmetric: −50% needs +100%, −75% needs +300%. Every point of extra risk you take is a point taken from your future recovery curve.",
  blocks: [
    {
      kind: "explain",
      id: "rp-l3-b1",
      explanation: {
        heading: "The same dollar, two directions, unequal percentages",
        whyItMatters:
          "Risk talk often treats a 10% loss and a 10% gain as cancel-outs. They do not. Basing decisions on the symmetric intuition is the single most common arithmetic error in position sizing.",
        paragraphs: [
          "Percentages are taken from a moving base. After a loss, the base is smaller — so every subsequent gain is calculated on less capital. After a loss of 20%, you hold 80 cents of the original dollar; recovering that 20 cents requires gaining 25% (20 ÷ 80), not 20%.",
          "The asymmetry compounds with depth. A 50% loss leaves half; recovering the missing half requires doubling. A 75% loss leaves a quarter; recovering needs +300%. A 90% loss needs +900%. The table is not merely educational — it is the reason professional risk rules keep losses in the single digits. At 1% risk, the worst consecutive run you can face is a curiosity; at 20%, it is an exit from the game.",
          "There is a second, quieter effect: variance. Small accounts can survive many small losses because the recovery arithmetic stays gentle — 10 losses at 1% leaves ~9.6% down, needing only ~10.6% to get back. The same count at 25% risk leaves 5.6% of the account, needing +1,686% — a number no process reliably produces.",
          "This reframes the purpose of the ceiling from 'prudence' to arithmetic: the ceiling keeps drawdowns in the region of the recovery curve where ordinary returns can undo them. Ruin avoidance is not conservatism for its own sake; it is refusing to move into the part of the table where recovery requires luck.",
        ],
        keyTerms: [
          {
            term: "Drawdown",
            definition: "The percentage decline from a peak equity level to a subsequent trough.",
          },
          {
            term: "Recovery gain",
            definition:
              "The percentage gain required to return to the prior peak after a given loss.",
          },
          {
            term: "Ruin",
            definition:
              "A loss deep enough that recovery would require returns the process cannot produce.",
          },
        ],
        callouts: [
          {
            tone: "pitfall",
            title: "Recovery is not the inverse",
            body: "Recovery % = loss ÷ (100% − loss). A 50% loss requires a 100% gain, not a 50% one — the base shrank.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "rp-l3-b2",
      example: {
        title: "Three drawdowns, three recovery bills",
        setup:
          "An account peaks at $40,000. It falls three separate times. Compute what each recovery requires.",
        steps: [
          {
            label: "Drawdown 1: −10%",
            detail:
              "Equity: 40,000 × 0.90 = $36,000. Missing $4,000. Recovery = 4,000 ÷ 36,000 = 11.1%.",
          },
          {
            label: "Drawdown 2: −50%",
            detail:
              "Equity: 40,000 × 0.50 = $20,000. Missing $20,000. Recovery = 20,000 ÷ 20,000 = 100%.",
          },
          {
            label: "Drawdown 3: −75%",
            detail:
              "Equity: 40,000 × 0.25 = $10,000. Missing $30,000. Recovery = 30,000 ÷ 10,000 = 300%.",
          },
          {
            label: "Read the pattern",
            detail:
              "The loss tripled from the first to the third, but the required recovery grew from 11% to 300% — nearly thirty-fold. Recovery cost accelerates while loss size merely grows.",
          },
        ],
        takeaway:
          "Each deeper drawdown charges geometrically, not proportionally, for the trip back to peak.",
      },
    },
    {
      kind: "visual",
      id: "rp-l3-b3",
      title: "The recovery table",
      visual: {
        type: "table",
        label: "Loss versus required gain",
        columns: ["Loss", "Equity remaining", "Gain needed to recover"],
        rows: [
          ["−5%", "95%", "5.3%"],
          ["−10%", "90%", "11.1%"],
          ["−20%", "80%", "25%"],
          ["−33%", "67%", "49%"],
          ["−50%", "50%", "100%"],
          ["−75%", "25%", "300%"],
          ["−90%", "10%", "900%"],
        ],
        caption:
          "Recovery = loss ÷ (1 − loss). The right column accelerates while the left grows steadily.",
      },
    },
    {
      kind: "interactive",
      id: "rp-l3-b4",
      title: "Choose the streak that can be survived",
      takeaway:
        "Every choice that keeps per-trade risk in the low single digits stays inside the survivable region of the table; the recovery-from-75% option is the ruinous one.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Your process has been flat for a month. A risk question arrives for the next quarter. Which policy do you commit to?",
        situation: [
          "You are choosing the risk percentage your sizing rule will use going forward.",
          "You must also decide how to respond to a recent 40% account drawdown on a leveraged position you closed.",
        ],
        choices: [
          {
            label: "Risk 25% per trade until the drawdown is recovered",
            outcome:
              "Four losses in a row leaves the account near 32% of its trough value — the drawdown deepens past the table's useful region.",
            best: false,
            feedback:
              "Compounding losses at high risk after a loss is the classic route to ruin: the recovery requirement explodes with each hit.",
          },
          {
            label: "Keep risk at 1% and rebuild from the current, smaller base",
            outcome:
              "Even a mediocre run compounds gently; a 10-trade losing streak costs under 10% of the trough.",
            best: true,
            feedback:
              "Correct. The base is already smaller — percentage risk recalculates automatically, keeping recovery within ordinary-return reach.",
          },
          {
            label: "Stop trading until you 'feel ready', then size at 10%",
            outcome:
              "The pause helps; the 10% sizing still converts an ordinary losing streak into a compounding hole.",
            best: false,
            feedback:
              "Pausing is fine, but sizing at 10% puts a four-loss streak at −34% and its recovery bill above 50%.",
          },
          {
            label: "Add a second account and risk 1% on each, doubling effective risk",
            outcome:
              "Two accounts at 1% risk is one account at 2%; the split hides the same arithmetic.",
            best: false,
            feedback:
              "Renaming the exposure does not change it. Effective risk is what compounds against recovery.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "rp-l3-b5",
      title: "Guided practice",
      assessment: {
        intro: "Compute recovery gains from losses.",
        allowRetry: true,
        items: [
          {
            skill: "Recovery from a moderate loss",
            question: {
              id: "rp-l3-q1",
              type: "numeric",
              topic: "risk-reward",
              prompt:
                "An account falls 20%. What percentage gain is needed to return to the prior peak?",
              answer: 25,
              tolerance: 0.5,
              unit: "%",
              explain:
                "Recovery = 20 ÷ (100 − 20) = 20 ÷ 80 = 25%. The base after the loss is 80%.",
            },
            feedbackByAnswer: {
              numeric: "Divide the loss by what remains: 20 ÷ 80 = 25.",
            },
          },
          {
            skill: "Recovery from a severe loss",
            question: {
              id: "rp-l3-q2",
              type: "numeric",
              topic: "risk-reward",
              prompt: "An account falls 60%. What percentage gain is required to recover?",
              answer: 150,
              tolerance: 1,
              unit: "%",
              explain:
                "60 ÷ (100 − 60) = 60 ÷ 40 = 150%. A majority loss needs a gain larger than the original loss.",
            },
            feedbackByAnswer: {
              numeric: "60 ÷ 40 = 150. The remaining 40% must triple to restore the peak.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "rp-l3-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "The asymmetry itself",
            question: {
              id: "rp-l3-q3",
              type: "mcq",
              topic: "risk-reward",
              prompt: "Why does a 50% loss require a 100% gain rather than a 50% one?",
              options: [
                "Brokerage fees consume roughly half of any recovery attempt",
                "The gain is calculated on a base that has been halved",
                "Markets rise faster than they fall on average",
                "It does not — 50% always recovers a 50% loss",
              ],
              answer: 1,
              explain:
                "From $5,000 you need $10,000 — doubling, i.e. +100%. Percentages act on the current balance, not the original one.",
            },
            feedbackByAnswer: {
              "0": "Fees matter but are nowhere near 50% of a round trip.",
              "2": "Market drift is irrelevant to the arithmetic identity.",
              "3": "50% of $5,000 is only $2,500 — half the hole.",
            },
          },
          {
            skill: "Streak arithmetic at small risk",
            question: {
              id: "rp-l3-q4",
              type: "truefalse",
              topic: "risk-reward",
              prompt:
                "Ten consecutive losses at 1% risk per trade leave the account down roughly 9.6%, needing about a 10.6% gain to recover.",
              answer: true,
              explain:
                "0.99¹⁰ ≈ 0.904, so ~9.6% down; 9.6 ÷ 90.4 ≈ 10.6% to recover. Comfortably inside the gentle region of the table.",
            },
            feedbackByAnswer: {
              true: "Correct — compounding at 1% barely dents equity even over ten straight losses.",
              false: "The compounding arithmetic gives ≈ −9.6%, not a larger figure.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "rp-l3-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "A colleague's account dropped from $12,000 to $3,000 on a leveraged blowup — a 75% loss.",
          "They ask what return their remaining capital must now produce to reach the old peak.",
        ],
        assessment: {
          items: [
            {
              skill: "Recovery from the trough of a severe drawdown",
              question: {
                id: "rp-l3-q5",
                type: "numeric",
                topic: "risk-reward",
                prompt:
                  "The account is at $3,000 and the peak was $12,000. What percentage gain is required?",
                answer: 300,
                tolerance: 2,
                unit: "%",
                explain:
                  "Missing $9,000 on a $3,000 base: 9,000 ÷ 3,000 = 3 = +300%. The quarter that remains must quadruple.",
              },
              feedbackByAnswer: {
                numeric:
                  "Compute the gap (12,000 − 3,000 = 9,000) and divide by the base: 9,000 ÷ 3,000 = 300%.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "rp-l3-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "What is the largest drawdown you could absorb while still believing your next fifty trades? Write the percentage.",
      ],
    },
    {
      kind: "summary",
      id: "rp-l3-b9",
      title: "Recap",
      points: [
        "Recovery = loss ÷ (1 − loss) — never simply equal to the loss.",
        "−50% needs +100%; −75% needs +300%; −90% needs +900%.",
        "Compounding at small risk keeps drawdowns in the region where ordinary returns recover them.",
        "Ruin avoidance is arithmetic: refuse the part of the table where recovery needs luck.",
      ],
      nextStep: "Next: putting the stop itself under a microscope — where ideas actually go wrong.",
    },
  ],
};
