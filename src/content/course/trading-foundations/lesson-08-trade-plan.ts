import type { CourseLesson } from "../types";

export const lesson08TradePlan: CourseLesson = {
  id: "tf-l8",
  moduleId: "c1-m3",
  title: "Building a Basic Trade Plan",
  blurb: "Decide everything while you are calm, so you can follow it while you are not.",
  objectives: [
    "Write a trade plan containing the six decisions that matter",
    "Explain why a plan is not a prediction",
    "Spot the three rule-breaks that quietly destroy accounts",
    "Separate a losing trade from a bad decision",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "A trade plan is a decision made in advance. Its job is not to be right — its job is to make your behaviour reviewable.",
  blocks: [
    {
      kind: "explain",
      id: "tf-l8-b1",
      explanation: {
        heading: "Six decisions, written down before you click",
        whyItMatters:
          "Under pressure you will not reason well, and you will not be able to tell whether a loss came from bad luck or a bad decision. A written plan converts in-the-moment improvisation into something you can check and improve.",
        paragraphs: [
          "A trade plan answers six questions in writing. What am I trading, and in which direction? What is my reason, expressed in terms of supply and demand rather than a feeling? What would tell me the idea is dead? How much am I willing to lose? Where do I intend to take profit or manage the exit? And which timeframe am I trading, so that the stop and the target belong to the same horizon?",
          "Two more items make it complete. The trigger — the specific condition that turns 'interesting' into 'act now', such as a close above a level rather than a mere touch. And the conditions under which you will not trade at all: no setups in the first minutes of a session, no positions around an announcement you do not understand, no trading after two losing trades in a day.",
          "A plan is not a prediction. You are not claiming the market will do something; you are describing how you will behave across the range of things it might do. That is why a good plan can still produce a loss, and why a plan followed faithfully is a success even when the trade fails. The point is to make your decisions repeatable and reviewable.",
          "Three rule-breaks cause most of the damage. First, moving the stop away from price after entry, which turns a defined loss into an undefined one. Second, adding to a losing position because the price is 'better now', which increases risk exactly when the market is suggesting the idea may be wrong. Third, switching timeframes mid-trade — entering on one, holding on another — so that no single invalidation level applies. Each feels reasonable in the moment and destroys the arithmetic you did beforehand.",
          "The last piece is review. After the trade, compare what you did with what you wrote. If you followed the plan and lost, the plan may need adjusting — or the loss may simply be the cost of doing business. If you broke the plan and won, that is not a reason to celebrate; it is a warning that a bad habit just got rewarded. Over enough trades the only thing you can improve is your process, so the plan is also the thing you learn from.",
        ],
        keyTerms: [
          {
            term: "Thesis",
            definition:
              "Your reason for the trade, stated in terms of who is buying or selling and why price might move.",
          },
          {
            term: "Trigger",
            definition:
              "The specific condition that makes the trade actionable, e.g. a close above a level rather than a touch.",
          },
          {
            term: "Invalidation",
            definition: "The price or condition that proves the thesis wrong. It sets the stop.",
          },
          {
            term: "Risk ceiling",
            definition:
              "The maximum loss you accept on the trade, in money or as a percentage of the account.",
          },
          {
            term: "Exit plan",
            definition:
              "What you do at your target, and what you do if the market stalls before reaching it.",
          },
          {
            term: "Review",
            definition:
              "Comparing the executed trade with the written plan, to judge process rather than outcome.",
          },
        ],
        callouts: [
          {
            tone: "tip",
            title: "Write it as a sentence you could say out loud",
            body: "If you cannot explain the thesis in a sentence a friend would understand, it is not a plan — it is a mood.",
          },
          {
            tone: "pitfall",
            title: "A plan you did not write is not yours",
            body: "Copying someone else's entry means you do not know the invalidation, the horizon or the size, so you cannot follow it when it goes against you. Borrowed ideas cannot be managed.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "tf-l8-b2",
      example: {
        title: "Same idea, two very different afternoons",
        setup:
          "Both traders believe NOVA will rise from 20.10 towards 20.85. Both agree the idea is invalid on a close below 19.70.",
        steps: [
          {
            label: "Trader A writes it down",
            detail:
              "Thesis: buyers keep defending 19.70–19.80. Trigger: a daily close above 20.15. Stop: 19.68. Risk ceiling: 1% of $10,000 = $100, so size = $100 ÷ $0.42 ≈ 238 shares. Target: 20.85. Horizon: daily candles.",
          },
          {
            label: "Trader B improvises",
            detail:
              "Buys 500 shares at 20.10 because the chart 'looks strong', with no stop in mind and no target.",
          },
          {
            label: "Price falls to 19.60",
            detail:
              "A is stopped out for about $100 as planned, one percent of the account, and the idea is recorded as wrong. B is down $250 and must now decide under pressure whether to hold, cut or add.",
          },
          {
            label: "Price recovers to 20.85",
            detail:
              "A does not chase it — the trigger no longer applies, so the day ends flat and reviewable. B is profitable and concludes the drop was noise. That same conclusion will be repeated on a stock that never recovers.",
          },
          {
            label: "What was actually learned",
            detail:
              "A followed a process; B collected a result. Only one of them can improve on Tuesday.",
          },
        ],
        takeaway:
          "The plan is not there to guarantee an outcome. It is there so the loss is known in advance and the lesson is visible afterwards.",
      },
    },
    {
      kind: "interactive",
      id: "tf-l8-b3",
      title: "Build a plan",
      interaction: {
        type: "trade-plan-builder",
        prompt:
          "Fill in a plan for a long idea in NOVA. The builder checks that your levels are in a logical order and that the risk percent stays in a sane band. Then confirm each statement honestly before you call it finished.",
        symbols: ["NOVA", "HELI", "ORCA"],
        fields: [
          { label: "Entry", placeholder: "20.10", unit: "USD" },
          { label: "Stop (invalidation)", placeholder: "19.68", unit: "USD" },
          { label: "Target", placeholder: "20.85", unit: "USD" },
          { label: "Risk per trade", placeholder: "1", unit: "% of account" },
        ],
        defaults: {
          symbol: "NOVA",
          direction: "long",
          entry: 20.1,
          stop: 19.68,
          target: 20.85,
          riskPct: 1,
        },
        checklist: [
          "I can explain the reason for this trade in one sentence",
          "I know the price at which this idea is wrong",
          "The loss at my stop is an amount I accept before I enter",
          "I know what I will do if the price never reaches my entry",
          "I am trading one timeframe, and my stop and target belong to it",
        ],
      },
      takeaway:
        "A plan is finished when every box is filled and you would be content to be stopped out, because the loss was your decision.",
    },
    {
      kind: "practice",
      id: "tf-l8-b4",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "What belongs in a plan",
            question: {
              id: "tf-l8-q1",
              type: "mcq",
              topic: "trade-planning",
              prompt: "Which item does NOT belong in a written trade plan?",
              options: [
                "The price at which your idea is proven wrong",
                "The maximum loss you accept on the trade",
                "A prediction of where price will be in a month",
                "The condition that triggers your entry",
              ],
              answer: 2,
              explain:
                "Plans describe your behaviour, not the market's future. A forecast adds nothing you can act on and tempts you to defend a belief instead of following a rule.",
            },
            hint: "Which of these can you control and verify afterwards?",
            feedbackByAnswer: {
              "0": "That is the invalidation level, and it is the most important line in the plan.",
              "1": "The risk ceiling is what makes the plan survivable — always included.",
              "3": "A trigger turns an interesting observation into a decision with a clear moment of action.",
            },
          },
          {
            skill: "Trigger versus touch",
            question: {
              id: "tf-l8-q2",
              type: "truefalse",
              topic: "trade-planning",
              prompt:
                "Entering the moment price touches a level is the same as waiting for a close beyond it.",
              answer: false,
              explain:
                "A touch can be rejected immediately; a close is evidence that buyers or sellers were still willing to transact at the end of the period. Either can be your rule, but they are not equivalent.",
            },
            feedbackByAnswer: {
              "0": "A touch is a moment; a close is the outcome of the whole period. Confusing them changes how often you are wrong, and therefore your expectancy.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tf-l8-b5",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Discipline",
            question: {
              id: "tf-l8-q3",
              type: "mcq",
              topic: "trade-planning",
              prompt:
                "Price moves against you and is heading towards your stop. Which action breaks the plan?",
              options: [
                "Taking the loss at the price you wrote down",
                "Reviewing the thesis after the trade",
                "Moving the stop lower so the position can 'breathe'",
                "Writing down what you observed for your review",
              ],
              answer: 2,
              explain:
                "Widening a stop mid-trade discards the only number that defined your risk. It is the most common way a planned loss becomes an unplanned one.",
            },
            feedbackByAnswer: {
              "0": "Taking the planned loss is the plan working, not failing. It is the cost you agreed to in advance.",
              "1": "Reviewing afterwards is exactly how the process improves.",
              "3": "Notes made during a trade are legitimate evidence for the review.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tf-l8-b6",
      title: "Application scenario",
      scenario: {
        situation: [
          "You entered a long at 20.10 with a stop at 19.68 and a target of 20.85. Price fell to 19.66, hit your stop, and closed the day at 20.40.",
          "Your stop was executed exactly as planned.",
        ],
        assessment: {
          items: [
            {
              skill: "Judging process over outcome",
              question: {
                id: "tf-l8-q4",
                type: "mcq",
                topic: "psychology",
                prompt: "How should you treat this trade?",
                options: [
                  "As a mistake — the stop was too tight, so widen it next time",
                  "As a properly executed trade with an unfavourable outcome, reviewed on process",
                  "As proof that stops do not work",
                  "As a reason to re-enter immediately without a new trigger",
                ],
                answer: 1,
                explain:
                  "The loss was known and accepted in advance. Whether the stop distance is right is a question answered over many trades, not from one painful print — and a re-entry needs a fresh trigger and a fresh thesis.",
              },
              feedbackByAnswer: {
                "0": "One outcome cannot tell you whether the stop distance was correct. Reacting to it now is reacting to noise — and a wider stop means a smaller position for the same risk.",
                "2": "Stops made the loss predictable. That is their entire value.",
                "3": "Re-entering without a trigger is improvising on a plan you just broke, and it usually becomes chasing.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tf-l8-b7",
      title: "Reflection",
      helper: "Two sentences is plenty. Stays in your browser.",
      prompts: [
        "Think of a decision you made recently without a written rule. What would have been different if the rule had existed beforehand?",
      ],
    },
    {
      kind: "summary",
      id: "tf-l8-b8",
      title: "Recap",
      points: [
        "A plan names the instrument, the thesis, the trigger, the invalidation, the risk ceiling, the exit and the timeframe.",
        "A plan describes your behaviour, not the market's future — so it can succeed while the trade loses.",
        "Moving stops, adding to losers and switching timeframes are the three breaks that do the most damage.",
        "Review compares your actions with your plan, which is the only part of the process you can improve.",
      ],
      nextStep:
        "Next: the frictions that turn a good idea into a poor result — fees, slippage and execution.",
    },
  ],
};
