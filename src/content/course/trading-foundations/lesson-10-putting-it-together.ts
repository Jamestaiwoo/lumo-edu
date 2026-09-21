import type { CourseLesson } from "../types";

export const lesson10PuttingItTogether: CourseLesson = {
  id: "tf-l10",
  moduleId: "c1-m4",
  title: "Putting It All Together",
  blurb: "One repeatable process, from context to review.",
  objectives: [
    "Run a six-step decision process on any market",
    "Notice which step a failing trade was missing",
    "State honestly what a trading edge is and is not",
    "Decide what to practise next",
  ],
  durationMinutes: 13,
  xp: 40,
  keyTakeaway:
    "You cannot control the outcome of a trade. You can control whether a decision was made deliberately — and that is the only thing worth practising.",
  blocks: [
    {
      kind: "explain",
      id: "tf-l10-b1",
      explanation: {
        heading: "The same six questions, every time",
        whyItMatters:
          "Everything in this course is a component. A process is what turns components into a habit — and a habit is the only thing that survives a bad week, a loud opinion or an exciting chart.",
        paragraphs: [
          "Step one is context. What exactly am I trading, how liquid is it, what is the spread, and which timeframe am I using? This step costs two minutes and prevents most of the worst trades, because it filters out markets where the cost is larger than the opportunity.",
          "Step two is the thesis: who is likely to push price, and why now? A reason that mentions buyers defending a level, sellers running out of size, or a level being absorbed is testable. 'It looks strong' is not — it is a description of your own excitement.",
          "Step three is the plan: the trigger that makes it actionable, the invalidation that defines the loss, the risk ceiling, the exit intention and the size derived from those numbers. If any of the five is missing, the trade is not ready.",
          "Step four is execution: which order type does this situation deserve? If the market is thin or the idea is not urgent, a limit order protects you. If you must be positioned, accept the price risk and size accordingly — smaller, not larger.",
          "Step five is management, which mostly means doing nothing you did not plan. Let the invalidation decide whether you were wrong. If you find yourself wanting to move the stop, that is a signal about your position size, not about the market.",
          "Step six is review. Compare actions with the plan, keep a record of what you observed, and change one thing at a time. Over dozens of trades this loop is what produces improvement — not any single insight, and certainly not any single winner.",
          "One honest note to close on. Trading is a competition in which your edge, if you develop one, will be modest, while your costs are certain. That is why Lumo teaches mechanics, risk and process rather than promises: the skill being built here is the ability to reason carefully about uncertainty, and to keep doing it when the outcome is unflattering.",
        ],
        keyTerms: [
          {
            term: "Process",
            definition: "The fixed sequence of questions you apply before and after every trade.",
          },
          {
            term: "Edge",
            definition:
              "A repeatable, explainable reason your decisions are better than chance after costs. It is usually small and it can decay.",
          },
          {
            term: "Execution plan",
            definition:
              "How you will actually place the order: type, size, timing, and what to do if it does not fill.",
          },
          {
            term: "Feedback loop",
            definition:
              "Plan, execute, review, adjust one variable. The mechanism by which skill accumulates.",
          },
        ],
        callouts: [
          {
            tone: "info",
            title: "No advice, no guarantees",
            body: "Lumo is educational. Nothing here tells you what to buy or promises an outcome. Prices can gap, markets can be manipulated, and losses can exceed what any plan assumed.",
          },
          {
            tone: "tip",
            title: "One change at a time",
            body: "If you change your timeframe, your stop rule and your market all at once, you will learn nothing from the results. Change one variable, collect evidence, then decide.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "tf-l10-b2",
      example: {
        title: "One decision, six steps",
        setup:
          "NOVA is quoted 20.15 bid / 20.16 ask in a deep book. On the daily chart it has made higher lows and closed above 20.15 for the first time in three weeks. You have $10,000 and a 1% risk ceiling.",
        steps: [
          {
            label: "Context",
            detail:
              "Liquid large-cap, one-cent spread, daily timeframe. Cost of a round trip on a $2,000 position is about $2 — small relative to the move being considered. Proceed.",
          },
          {
            label: "Thesis",
            detail:
              "Sellers who were active at 20.15–20.45 have been absorbed, and each pullback has been bought higher. Evidence, stated in terms of supply and demand rather than a feeling.",
          },
          {
            label: "Plan",
            detail:
              "Trigger: a daily close above 20.20. Invalidation: a close below 19.70. Risk ceiling: $100. Target: 20.90 with a review at 20.60.",
          },
          {
            label: "Size",
            detail:
              "Entry 20.20, stop 19.68, distance $0.52. $100 ÷ $0.52 ≈ 192 shares. Position value ≈ $3,878, inside the account.",
          },
          {
            label: "Execution",
            detail:
              "Not urgent, one-cent spread — pay up slightly with a limit at 20.21 to be filled on the close rather than chasing. If it does not fill, the trigger has not been met anyway.",
          },
          {
            label: "Management and review",
            detail:
              "If price closes below 19.68 the idea is dead and the loss is $100. If it reaches 20.60 the plan says to review, not to celebrate. Afterwards, compare what happened with these six lines.",
          },
        ],
        takeaway:
          "The process is boring on purpose. Boring is repeatable, and repeatable is the only thing that can be improved.",
      },
    },
    {
      kind: "interactive",
      id: "tf-l10-b3",
      title: "Find the missing step",
      interaction: {
        type: "scenario-decision",
        prompt:
          "A trader describes a loss: 'NOVA was breaking out, so I bought 800 shares with everything I had. It dropped 4% and I held on, because the breakout was still valid on the weekly chart. I averaged down twice. It kept falling.' Which step was missing first?",
        situation: [
          "They had a reason to be interested: a level was being tested.",
          "They bought without a stop, with a size that was not derived from a risk ceiling, and they switched timeframe after entry.",
        ],
        choices: [
          {
            label: "Risk and plan — no risk ceiling, no invalidation, no size derived from either",
            outcome:
              "You identify the root cause: the decision was never converted into a plan, so every later choice was improvised under pressure.",
            best: true,
            feedback:
              "Exactly. Averaging down and timeframe-switching were symptoms. With a risk ceiling and an invalidation level neither would have been possible — the arithmetic would have forbidden the size in the first place.",
          },
          {
            label: "Thesis — they should have checked the news before buying",
            outcome:
              "You focus on information they did not have, rather than the decisions they could have controlled.",
            best: false,
            feedback:
              "Their thesis was thin, but a better thesis with the same missing plan would still have produced an unmanaged loss. The controllable failure is the plan.",
          },
          {
            label: "Execution — they should have used a limit order",
            outcome: "You improve a detail that would not have changed the outcome.",
            best: false,
            feedback:
              "Order type affects cost, not risk. An unplanned position of the wrong size loses money whether it was entered with a limit or a market order.",
          },
          {
            label: "Analysis — the breakout was simply a bad pattern",
            outcome: "You conclude the idea was doomed, which teaches nothing transferable.",
            best: false,
            feedback:
              "Some setups fail, always. Blaming the pattern hides the process failure: they had no defined loss, so failure had no boundary.",
          },
        ],
      },
      takeaway:
        "When you unpack a bad trade, keep asking 'which step would have prevented this?' until you reach the one you could have controlled.",
    },
    {
      kind: "practice",
      id: "tf-l10-b4",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "Running the process",
            question: {
              id: "tf-l10-q1",
              type: "mcq",
              topic: "trade-planning",
              prompt: "Which sequence matches the process in this course?",
              options: [
                "Find a pattern, size up, then decide when to exit",
                "Context, thesis, plan with invalidation and risk, execution, management, review",
                "Enter first to see if it works, then add risk controls",
                "Pick a market, buy, and review only if the trade loses",
              ],
              answer: 1,
              explain:
                "Every step you postpone is a decision you will end up making under pressure. Context and risk come before execution, and review happens whether the trade wins or loses.",
            },
            feedbackByAnswer: {
              "0": "Size never leads. It is derived from the risk ceiling and the invalidation level.",
              "2": "Entering before the risk controls exist is precisely the behaviour the process is designed to replace.",
              "3": "Reviewing only losses means you can never distinguish good process from a lucky outcome.",
            },
          },
          {
            skill: "Capstone arithmetic",
            question: {
              id: "tf-l10-q2",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "Balance $20,000, risk ceiling 0.5% per trade. Entry $80.00, stop $78.00. How many whole shares may you buy?",
              answer: 50,
              tolerance: 0.01,
              unit: "shares",
              explain:
                "Risk budget = 0.5% × $20,000 = $100. Distance per share = $2.00. $100 ÷ $2.00 = 50 shares.",
            },
            hint: "Find the budget in dollars first, then divide by the distance from entry to stop.",
            feedbackByAnswer: {
              numeric:
                "0.5% of $20,000 = $100. Distance = $80 − $78 = $2 per share. 100 ÷ 2 = 50 shares.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tf-l10-b5",
      title: "Knowledge check",
      assessment: {
        intro: "These two questions summarise the whole course.",
        items: [
          {
            skill: "Honest expectations",
            question: {
              id: "tf-l10-q3",
              type: "mcq",
              topic: "psychology",
              prompt: "Which statement is accurate?",
              options: [
                "A disciplined process guarantees a profit over a long enough period",
                "A disciplined process makes decisions reviewable and limits the damage of being wrong, while costs stay certain and outcomes do not",
                "A large enough account removes the need for risk control",
                "Learning more indicators removes the risk of loss",
              ],
              answer: 1,
              explain:
                "Process buys survival and learning, not a promise. Losses are a cost of doing business and no method removes them.",
            },
            feedbackByAnswer: {
              "0": "No process guarantees profit. Markets can move against a good decision for a long time, and an edge can decay.",
              "2": "Bigger accounts lose more in absolute terms when risk control is missing. Size is not a substitute for rules.",
              "3": "Indicators add information, not certainty. Risk comes from price uncertainty, which is permanent.",
            },
          },
          {
            skill: "Learning from a loss",
            question: {
              id: "tf-l10-q4",
              type: "truefalse",
              topic: "psychology",
              prompt:
                "If you followed your written plan and lost money, the plan must have been wrong.",
              answer: false,
              explain:
                "One outcome is not evidence about a process. Only a record of many trades executed faithfully can tell you whether the plan has positive expectancy.",
            },
            feedbackByAnswer: {
              "0": "Winning or losing one trade says almost nothing. Judge the plan across a series of trades, and judge each trade on whether you followed it.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tf-l10-b6",
      title: "Application scenario",
      scenario: {
        situation: [
          "You have $10,000 in the practice account and a plan: risk 1%, invalidation $0.52 below entry, target $0.70 above entry, liquid market, daily timeframe.",
          "Midway through the trade, an analyst on a video says the stock is about to double, and your position is currently down 0.4R.",
        ],
        assessment: {
          items: [
            {
              skill: "Capstone decision",
              question: {
                id: "tf-l10-q5",
                type: "mcq",
                topic: "trade-planning",
                prompt: "What does the process in this course tell you to do?",
                options: [
                  "Increase size, because a public endorsement confirms the thesis",
                  "Follow the plan you wrote: the loss and the exit were decided before the opinion existed",
                  "Close immediately, because any loss means the idea was wrong",
                  "Move the stop lower to give the position more room",
                ],
                answer: 1,
                explain:
                  "The plan already described what you would do in both directions. A video adds no testable information about supply and demand, and a position down 0.4R is inside its normal range — invalidation, not discomfort, decides the exit.",
              },
              feedbackByAnswer: {
                "0": "Public enthusiasm is not evidence, and adding size changes the risk ceiling you deliberately set.",
                "2": "Being down part of 1R is what normal variance looks like. Exiting on discomfort makes your stops noise-driven.",
                "3": "Moving the stop converts a defined loss into an undefined one — the single rule-break this course warns about most.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tf-l10-b7",
      title: "Reflection",
      helper: "Two or three sentences. Stays in your browser.",
      prompts: [
        "Which of the six steps is your weakest? What is the smallest change you could make this week to practise it?",
      ],
    },
    {
      kind: "summary",
      id: "tf-l10-b8",
      title: "Course recap",
      points: [
        "Context, thesis, plan, execution, management, review — the same six questions on every trade.",
        "Risk is decided first: risk ceiling, then invalidation, then size by division.",
        "Costs are certain and charged per trade; edge is uncertain and usually small.",
        "A losing trade is not a failed decision, and a winning trade is not proof of a good one.",
        "Markets involve risk of loss. Lumo is educational and never gives investment advice.",
      ],
      nextStep:
        "You have finished Trading Foundations. Next: use the Practice tab to drill your weakest topics, place a simulated trade with a defined stop, and journal what you learned.",
    },
  ],
};
