import type { CourseLesson } from "../types";

export const lesson07RiskBeforeReward: CourseLesson = {
  id: "tf-l7",
  moduleId: "c1-m3",
  title: "Risk Before Reward",
  blurb: "Decide the loss you accept, then let that decide your size.",
  objectives: [
    "Define the dollar risk of a trade before entering",
    "Derive position size from the stop distance, not from confidence",
    "Explain why a large loss is harder to recover from than it looks",
    "Judge a method by expectancy rather than win rate",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Everything in a trade plan is negotiable except the maximum loss. Fix that number first and the rest of the plan has a chance.",
  blocks: [
    {
      kind: "explain",
      id: "tf-l7-b1",
      explanation: {
        heading: "The order of operations is risk, then reward, then size",
        whyItMatters:
          "Traders do not usually blow up because their analysis was wrong. They blow up because one position was sized so that being wrong once mattered too much. Risk control is the only part of trading you can decide in advance with certainty.",
        paragraphs: [
          "Start with a number you can lose without it changing your life: commonly a small percentage of the account, such as 0.5% to 2% per trade. This is not a target, it is a ceiling. If you are not sure what a comfortable number is, that uncertainty is worth resolving before you trade anything.",
          "Next, find where the idea is wrong. That is the stop — logically, not emotionally. If your reason for the trade is that buyers keep defending a zone, the trade is invalid when price closes decisively below it. The stop distance then falls out of the analysis, and only then does size get calculated.",
          "The size follows from division, not from feeling. If you will risk $100 and your stop is $2 away from entry, you can hold 50 shares. If the stop has to be $4 away, you can hold 25. Widen the stop and the position must shrink, or the risk grows. There is no third option, which is why 'I will just buy more because I am confident' is the sentence that ends accounts.",
          "Losses compound in a way that feels unfair. Losing 10% needs an 11% gain to recover. Losing 50% needs a 100% gain. Losing 90% needs 900%. The arithmetic gets worse the deeper you go, which is why surviving a bad run matters more than maximising a good one. Ten losses in a row at 1% risk leaves you roughly 9.6% down — uncomfortable but recoverable. Ten losses at 25% risk leaves 5.6% of the account.",
          "Reward enters only after risk is fixed. Risk/reward is the ratio of what you stand to gain to what you stand to lose, usually expressed in R, where 1R is your risk. If a chart shows an obvious obstacle just above your entry, your realistic reward might be 1R; if the next real barrier is far away, it might be 3R. You then ask whether the idea wins often enough to be worth taking.",
          "That combination is expectancy: the average result per trade. A method with a 40% win rate and 3R winners has a positive expectancy, while a method winning 70% of the time with 0.3R winners can lose money after costs. Win rate alone tells you nothing, which is why 'I win most of my trades' is not an achievement.",
        ],
        keyTerms: [
          {
            term: "Risk per trade",
            definition:
              "The maximum amount you accept losing on one position, usually set as a small percentage of the account.",
          },
          {
            term: "Stop",
            definition:
              "The price at which your reason for the trade no longer holds. It defines the loss, so it must be decided by the analysis.",
          },
          {
            term: "Position size",
            definition:
              "Risk budget divided by the distance to your stop. Bigger stop distance means smaller size.",
          },
          {
            term: "R",
            definition: "One unit of risk. A 2R winner gains twice what a 1R loser costs.",
          },
          {
            term: "Risk/reward",
            definition: "The ratio of expected gain to accepted loss on a trade.",
          },
          {
            term: "Expectancy",
            definition:
              "Average result per trade once win rate and the size of wins and losses are combined.",
          },
          {
            term: "Drawdown",
            definition: "The fall from an account's peak to its lowest point afterwards.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "Recovery is not symmetric",
            body: "A 50% loss requires a 100% gain just to get back to where you started. This is why professionals obsess over the size of the worst case rather than the size of the best case.",
          },
          {
            tone: "pitfall",
            title: "Confidence is not a risk measure",
            body: "Feeling certain is information about you, not about the market. Size comes from the stop distance and your risk ceiling — never from conviction.",
          },
        ],
      },
    },
    {
      kind: "visual",
      id: "tf-l7-b2",
      title: "The same ten losses, four different sizes",
      visual: {
        type: "table",
        label: "Account value after ten consecutive losing trades of 1R each",
        columns: [
          "Risk per trade",
          "Loss per trade on $10,000",
          "Account after 10 losses",
          "Gain needed to recover",
        ],
        rows: [
          ["0.5%", "$50", "$9,511", "+5.1%"],
          ["1%", "$100", "$9,044", "+10.6%"],
          ["5%", "$500", "$5,987", "+67%"],
          ["25%", "$2,500", "$563", "+1,676%"],
        ],
        caption:
          "Losing streaks happen to every method. The only thing a trader controls in advance is how much each loss is allowed to matter — which is exactly what the risk ceiling decides.",
      },
    },
    {
      kind: "example",
      id: "tf-l7-b3",
      example: {
        title: "From risk ceiling to share count",
        setup:
          "You have $10,000 in your practice account and decide that no single trade may lose more than 1% of it. You are looking at a stock trading at $50.00 that would be invalid below $48.00.",
        steps: [
          {
            label: "Step 1 — the ceiling",
            detail: "1% of $10,000 = $100. That is the most you will lose if the stop is hit.",
          },
          {
            label: "Step 2 — the distance",
            detail: "Entry $50.00, stop $48.00. Distance per share = $2.00.",
          },
          { label: "Step 3 — the division", detail: "$100 ÷ $2.00 = 50 shares." },
          {
            label: "Step 4 — the check",
            detail:
              "50 shares × $2.00 of adverse movement = $100 of loss. Exactly the ceiling, which is why it is a ceiling.",
          },
          {
            label: "Step 5 — the variation",
            detail:
              "If the honest stop had to sit at $46.00, the distance becomes $4.00 and the size halves to 25 shares. Same risk, half the position.",
          },
        ],
        takeaway:
          "The stop is a statement about the idea. The size is arithmetic. Never let the desire for a bigger position change the stop.",
      },
    },
    {
      kind: "interactive",
      id: "tf-l7-b4",
      title: "Size the position",
      interaction: {
        type: "position-size-builder",
        prompt:
          "The defaults in this calculator are too aggressive on purpose. Adjust the risk until the position size sits in the mission range — notice how a smaller risk ceiling shrinks the position without changing the stop.",
        currency: "USD",
        defaults: { balance: 10000, riskPct: 5, entry: 50, stop: 48 },
        mission: {
          prompt:
            "Mission: land the position size between 45 and 55 shares, using a $100 risk budget.",
          minShares: 45,
          maxShares: 55,
          success:
            "That is 1% of the account with a $2 stop distance. You have just done the calculation that keeps ten losses survivable.",
          retry:
            "Not in range yet. The stop distance is fixed at $2.00, so the risk budget is the only lever — what risk percentage gives a $100 budget on $10,000?",
        },
      },
      takeaway:
        "Position size is risk divided by stop distance. Once you see it that way, 'how much should I buy?' stops being an opinion.",
    },
    {
      kind: "practice",
      id: "tf-l7-b5",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "Deriving size",
            question: {
              id: "tf-l7-q1",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "Balance $5,000. You accept 1.5% risk on one trade, so your risk budget is $75. Entry is $26.40 and the stop is $24.90. How many shares can you buy (round down to a whole number)?",
              answer: 50,
              tolerance: 0.01,
              unit: "shares",
              explain: "Risk per share = $26.40 − $24.90 = $1.50. $75 ÷ $1.50 = 50 shares.",
            },
            hint: "Find the distance from entry to stop for one share, then divide the budget by it.",
            feedbackByAnswer: {
              numeric:
                "Distance per share = 26.40 − 24.90 = $1.50. Budget ÷ distance = 75 ÷ 1.50 = 50 shares.",
            },
          },
          {
            skill: "Order of operations",
            question: {
              id: "tf-l7-q2",
              type: "mcq",
              topic: "stops",
              prompt:
                "You decide you want a bigger position in a trade. What is the defensible way to get one?",
              options: [
                "Move the stop further away so you can buy more shares",
                "Increase the risk you accept, then size from the unchanged stop",
                "Buy more shares and accept a bigger loss if it fails",
                "Skip the stop for this trade because you are confident",
              ],
              answer: 1,
              explain:
                "If you want more exposure you must consciously accept more risk. Widening the stop while keeping risk fixed reduces size — it never increases it.",
            },
            hint: "Ask which variable is allowed to change.",
            feedbackByAnswer: {
              "0": "Widening the stop with the same risk budget reduces the position size. It does the opposite of what you wanted — and it breaks the logic of the trade.",
              "2": "Buying more shares with the same stop means exceeding your risk ceiling without deciding to.",
              "3": "A trade without an invalidation point has an unlimited loss, which no position size can fix.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tf-l7-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Drawdown arithmetic",
            question: {
              id: "tf-l7-q3",
              type: "mcq",
              topic: "risk-reward",
              prompt:
                "Your account falls 50%. What gain is required to return to the starting balance?",
              options: ["50%", "75%", "100%", "It depends on the market"],
              answer: 2,
              explain:
                "From $5,000 you need to reach $10,000, which is a 100% gain. Losses compound against you, which is why the size of the worst case matters more than the size of the best case.",
            },
            feedbackByAnswer: {
              "0": "A 50% gain on $5,000 only reaches $7,500. The base you are recovering from is smaller.",
              "1": "A 75% gain reaches $8,750. Still short.",
              "3": "The arithmetic depends only on the percentage lost, not on the market.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tf-l7-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You risk 1% per trade and lose four trades in a row. Your account is down about 4%, and your process was followed properly on every trade.",
          "A friend suggests taking a 10% position on the next one to make it back quickly.",
        ],
        assessment: {
          items: [
            {
              skill: "Responding to a losing streak",
              question: {
                id: "tf-l7-q4",
                type: "mcq",
                topic: "psychology",
                prompt: "What is the most defensible choice?",
                options: [
                  "Take the larger position — losing streaks must end",
                  "Keep the risk ceiling where it is and review whether the process or market conditions deserve a change",
                  "Stop trading permanently, since four losses prove the method fails",
                  "Remove the stop so the trade has room to recover",
                ],
                answer: 1,
                explain:
                  "Four losses at 1% is a normal part of a probabilistic process. Increasing size to recover a loss converts a manageable drawdown into an account-threatening one.",
              },
              feedbackByAnswer: {
                "0": "Streaks have no memory. Four losses neither increase nor decrease the odds of the next trade.",
                "2": "A short losing run is not evidence about a method. You need many trades before expectancy means anything.",
                "3": "Removing the stop removes the only number you had controlled in advance.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tf-l7-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "What risk per trade would let you take ten losses in a row and still think clearly about the eleventh?",
      ],
    },
    {
      kind: "summary",
      id: "tf-l7-b9",
      title: "Recap",
      points: [
        "Set a risk ceiling per trade before you go looking for entries.",
        "The stop comes from where the idea is wrong. Size is risk divided by stop distance.",
        "Losses get harder to recover as they grow — a 50% drawdown needs a 100% gain.",
        "Risk/reward tells you what a win is worth; expectancy tells you whether the whole method is viable.",
      ],
      nextStep: "Next: turning all of this into one written trade plan you can actually follow.",
    },
  ],
};
