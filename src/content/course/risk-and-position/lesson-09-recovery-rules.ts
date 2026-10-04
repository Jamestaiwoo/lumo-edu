import type { CourseLesson } from "../types";

export const lesson09RecoveryRules: CourseLesson = {
  id: "rp-l9",
  moduleId: "c2-m3",
  title: "Recovery Rules",
  blurb: "What to do — and refuse to do — when the equity curve turns down.",
  objectives: [
    "Apply a drawdown-triggered risk reduction policy",
    "Explain why raising risk after losses deepens drawdowns",
    "Design a written rule for pausing, reducing and resuming",
    "Separate process review from outcome reactions in a losing streak",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Write the response to losses before you take them: a drawdown steps risk down, a review follows the journal, and recovery comes from process — never from size.",
  blocks: [
    {
      kind: "explain",
      id: "rp-l9-b1",
      explanation: {
        heading: "A policy written in advance survives contact with losses",
        whyItMatters:
          "The moment equity is falling is the worst possible moment to invent your response to equity falling. Everything you believe about your discipline at 2 a.m. is a hypothesis you have never tested.",
        paragraphs: [
          "A recovery rule is a pre-committed ladder that links drawdown depth to risk level. Example: at −5% from peak, risk halves (1% → 0.5%); at −10%, risk halves again; resuming full risk requires equity to regain the prior high-water mark. The exact rungs are personal — the mechanism is not: deeper drawdown triggers less risk, never more.",
          "Why down-shift works: drawdown depth correlates with regime surprise, execution breaks, or both. Cutting size reduces exposure exactly when your model of the market is most in doubt, and it puts a floor under rp-l3's compounding table. It also converts an emotional experience ('I am losing') into a procedural one ('rung two of my ladder says 0.5%'), which is the only format in which discipline reliably fires.",
          "What the ladder is paired with: a review, not a reaction. The review inspects process — did every trade follow thesis→stop→size? Are stops at invalidation? Is the journal complete? Only after the process audit does the question of edge get asked, and edge verdicts require a sample (dozens of trades, not days).",
          "What is forbidden by the ladder: size increases to 'make it back' (rp-l3 priced that exact decision), unpaused trading while tilt is observable (bigger size after a miss, trading off-journal, anger at the screen), and moving the ladder rungs because 'this time is different'. A rule you edit while losing is a rule you do not have.",
        ],
        keyTerms: [
          {
            term: "Drawdown ladder",
            definition:
              "Pre-committed risk levels keyed to drawdown depth, stepped down as losses deepen.",
          },
          {
            term: "High-water resumption",
            definition:
              "Restoring full risk only after equity regains the previous peak — proving the trough was survivable.",
          },
          {
            term: "Process audit",
            definition:
              "Checking rule adherence trade by trade before questioning the strategy's edge.",
          },
        ],
        callouts: [
          {
            tone: "info",
            title: "Cutting risk is not pessimism",
            body: "A halved risk at −5% still compounds normally when the edge returns — it only caps how much the doubt costs while you investigate.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "rp-l9-b2",
      example: {
        title: "A ladder in practice",
        setup:
          "Baseline risk 1% on a $40,000 account. Ladder: −5% → 0.5%, −10% → 0.25%, resumption at prior peak.",
        steps: [
          {
            label: "Drawdown reaches −5%",
            detail:
              "Peak $44,000 → equity $41,800. Risk steps to 0.5%: budget falls from $440 to $209 per trade.",
          },
          {
            label: "The review runs alongside",
            detail:
              "Last 20 trades audited: thesis documented 20/20, stop at invalidation 19/20, sizing within ceiling 20/20. One stop moved manually — noted, corrected, journaled.",
          },
          {
            label: "Decline halts; edge sample says hold",
            detail:
              "Equity stabilises at $41,800. The sample is too small to condemn the method; the ladder keeps risk at 0.5%.",
          },
          {
            label: "Recovery to the peak",
            detail:
              "Equity reaches $44,000 again: ladder rung resets to baseline 1%. Full risk never had to be increased — the peak came back to the rule, not the rule to the peak.",
          },
        ],
        takeaway:
          "Ladder down, audit honestly, resume at the high-water mark — the four moves are all written before the first loss.",
      },
    },
    {
      kind: "visual",
      id: "rp-l9-b3",
      title: "A sample ladder",
      visual: {
        type: "table",
        label: "Drawdown ladder at baseline 1%",
        columns: ["From peak", "Risk steps to", "Resumption"],
        rows: [
          ["0% to −5%", "1% (baseline)", "—"],
          ["−5% to −10%", "0.5%", "Prior peak regained"],
          ["−10% or deeper", "0.25% + full pause until audit", "Prior peak regained"],
        ],
        caption:
          "Every rung reduces exposure as doubt grows; full size returns only when the peak does.",
      },
    },
    {
      kind: "interactive",
      id: "rp-l9-b4",
      title: "Run the ladder",
      takeaway:
        "The ladder's answer is the same at every rung: less risk, process audit, no edits to the rule — each deviation here deepens or distracts from the drawdown.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Baseline 1% risk. Equity is down 7% from peak on a valid sample. The ladder says 0.5% until the prior peak returns.",
        situation: ["Mid-drawdown, three simultaneous pressures arrive."],
        choices: [
          {
            label: "Trade at the ladder's 0.5% and run the process audit this weekend",
            outcome:
              "Exposure is halved while the model is in doubt; the audit either clears execution or finds the break.",
            best: true,
            feedback:
              "Correct — the rung already decided sizing; the audit answers process, and neither requires forecasting the market.",
          },
          {
            label: "Temporarily raise to 2% — the sample deserves a decisive recovery",
            outcome:
              "A short adverse run at 2% pushes the drawdown far past where the ladder sits.",
            best: false,
            feedback:
              "This is the rp-l3 curve entered voluntarily: sizing up mid-drawdown multiplies the hole that recovery must climb out of.",
          },
          {
            label: "Stop trading for three months to 'reset mentally'",
            outcome:
              "Time passes, the sample does not grow, and the rule's ladder never gets exercised.",
            best: false,
            feedback:
              "The pause at deeper rungs is meant to be short — review, then continue at reduced size. An open-ended halt avoids the process instead of auditing it.",
          },
          {
            label: "Lower the ladder's resumption target to −3% from peak since you 'feel close'",
            outcome: "Editing the rule mid-drawdown means the rule no longer constrains anything.",
            best: false,
            feedback:
              "Rungs written while calm are the only ones with authority while losing. Moving the target is how 0.5% quietly becomes baseline again.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "rp-l9-b5",
      title: "Guided practice",
      assessment: {
        intro: "Apply the ladder arithmetic.",
        allowRetry: true,
        items: [
          {
            skill: "Risk budget at a lower rung",
            question: {
              id: "rp-l9-q1",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "Peak equity $52,000, now down 8% (ladder rung: 0.5% risk). What is the per-trade budget?",
              answer: 239.2,
              tolerance: 2,
              unit: "USD",
              explain: "Equity = 52,000 × 0.92 = $47,840; budget = 0.5% × 47,840 = $239.20.",
            },
            feedbackByAnswer: {
              numeric: "Find equity first (52,000 × 0.92 = 47,840), then 47,840 × 0.005 = 239.20.",
            },
          },
          {
            skill: "When resumption is allowed",
            question: {
              id: "rp-l9-q2",
              type: "truefalse",
              topic: "psychology",
              prompt:
                "Under a high-water resumption rule, full baseline risk returns when equity regains the prior peak — not when the losing streak merely ends.",
              answer: true,
              explain:
                "A few wins after the trough leave equity still underwater; the ladder keys to the peak, not to the last loss.",
            },
            feedbackByAnswer: {
              true: "Correct — the peak is the trigger, so partial bounces keep risk reduced.",
              false: "Ending the streak does not restore the equity the rule is measuring.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "rp-l9-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Direction of the ladder",
            question: {
              id: "rp-l9-q3",
              type: "mcq",
              topic: "psychology",
              prompt: "What must a recovery rule do as drawdown deepens?",
              options: [
                "Increase position size to recover faster",
                "Reduce risk and audit process, resuming only at the prior peak",
                "Move stops wider so fewer positions exit",
                "Switch to uncorrelated markets automatically",
              ],
              answer: 1,
              explain:
                "Deeper drawdown → less exposure, process review, high-water resumption. The other options all raise risk or hide it.",
            },
            feedbackByAnswer: {
              "0": "Size increases after losses are what rp-l3 prices as the route to ruin.",
              "2": "Wider stops raise unit risk exactly when sizing discipline is being tested.",
              "3": "Market-hopping mid-drawdown changes the system while it is under audit.",
            },
          },
          {
            skill: "Review order: process before edge",
            question: {
              id: "rp-l9-q4",
              type: "mcq",
              topic: "psychology",
              prompt: "The first question after an abnormal drawdown should be:",
              options: [
                "Is my strategy fundamentally broken?",
                "Did every trade follow thesis → invalidation → stop → size?",
                "What does the chart predict for next week?",
                "Should I double risk to return to baseline sooner?",
              ],
              answer: 1,
              explain:
                "Execution is knowable now and auditable trade by trade. Edge verdicts need a sample; forecasts are guesses.",
            },
            feedbackByAnswer: {
              "0": "Edge is the second question, after execution passes and only with enough trades.",
              "2": "Prediction is not a review; it re-enters the market instead of examining it.",
              "3": "That is the forbidden rung — sizing up mid-drawdown.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "rp-l9-b7",
      title: "Application scenario — course capstone",
      scenario: {
        situation: [
          "Peak equity $36,000; current equity $32,400 (a 10% drawdown). Your ladder: below −10%, risk steps to 0.25% and a full process audit is required before resuming.",
          "Your journal shows 60 trades this quarter, all with documented thesis, invalidation-derived stops and sizing within the 1% ceiling.",
        ],
        assessment: {
          items: [
            {
              skill: "Full-ladder arithmetic",
              question: {
                id: "rp-l9-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt:
                  "At the −10% rung, risk is 0.25% of $32,400. What is the per-trade budget now?",
                answer: 81,
                tolerance: 2,
                unit: "USD",
                explain: "32,400 × 0.0025 = $81 — down from the $360 baseline budget at the peak.",
              },
              feedbackByAnswer: {
                numeric: "32,400 × 0.0025 = 81.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "rp-l9-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Write your own ladder in one sentence: at what drawdown does risk step down, and what has to happen before it steps back up?",
      ],
    },
    {
      kind: "summary",
      id: "rp-l9-b9",
      title: "Recap",
      points: [
        "A recovery rule pre-commits risk steps to drawdown depth: deeper means smaller, never larger.",
        "The review audits process before it questions edge; edge needs a sample.",
        "Full risk resumes at the high-water mark, not at the first win after the trough.",
        "Editing ladder rungs mid-drawdown destroys the authority of every rung.",
        "Course 2 takeaway: ceiling → stop → size → driver caps → drawdown ladder — one connected system of arithmetic that survives losing streaks.",
      ],
      nextStep:
        "Course complete. Next up: Charting & Technical Analysis — reading the structure where these stops actually sit.",
    },
  ],
};
