import type { CourseLesson } from "../types";

export const lesson01WhatIsTrading: CourseLesson = {
  id: "tf-l1",
  moduleId: "c1-m1",
  title: "What Is Trading?",
  blurb: "Your first mission: understand what you are actually doing when you trade.",
  objectives: [
    "Explain what actually happens when you buy or sell an asset",
    "Separate trading from investing by intent and time horizon",
    "Describe who takes the other side of your trade and why",
    "Recognise why frequent trading is a hard way to make money",
  ],
  durationMinutes: 10,
  xp: 30,
  keyTakeaway:
    "Every trade is a two-sided agreement to move risk from one person to another. A good decision is not the same thing as a profitable outcome.",
  blocks: [
    {
      kind: "explain",
      id: "tf-l1-b1",
      explanation: {
        heading: "MISSION 01 · What is actually happening?",
        whyItMatters:
          "Before you learn charts, indicators or strategies, you need the right mental model. Trading is not pressing a button and asking the market to make you money.",
        paragraphs: [
          "When you buy an asset, somebody else is willing to sell it to you at the agreed price. Your order is matched with another participant's order, and the position transfers from one side to the other.",
          "That other participant may be another trader, a market maker, a fund, or someone trading for a completely different reason. They are not required to agree with your view of the future.",
          "This is why trading is an exchange of risk. If you buy, you take exposure to the asset's price moving against you. If you sell, you give up that exposure in exchange for cash or another position.",
        ],
        keyTerms: [
          {
            term: "Position",
            definition:
              "The exposure you currently hold in an asset — long if you benefit from it rising, short if you benefit from it falling.",
          },
          {
            term: "Long",
            definition: "You bought an asset and generally benefit if its price rises.",
          },
          {
            term: "Short",
            definition:
              "You take a position that benefits if the asset falls, typically by borrowing and selling the asset before buying it back.",
          },
          {
            term: "Counterparty",
            definition: "The participant or liquidity provider on the other side of your trade.",
          },
        ],
        callouts: [
          {
            tone: "pitfall",
            title: "Starting is easy. Winning is not.",
            body:
              "A trading account can be opened quickly. That says nothing about how difficult it is to compete, manage risk and make decisions consistently.",
          },
          {
            tone: "tip",
            title: "Judge the decision before the result",
            body:
              "A sensible trade can lose money and a careless trade can make money. Separate the quality of the decision from what happened next.",
          },
        ],
      },
    },
    {
      kind: "visual",
      id: "tf-l1-b2",
      title: "See the trade from both sides",
      visual: {
        type: "table",
        label: "One transaction, two participants",
        columns: ["You", "Counterparty"],
        rows: [
          ["Buy the asset", "Sell the asset"],
          ["Take price risk", "Give up price exposure"],
          ["Want a reason to own it", "Have their own reason to sell"],
        ],
        caption:
          "The same price can make sense to both sides because they have different goals, information, time horizons or risk constraints.",
      },
    },
    {
      kind: "example",
      id: "tf-l1-b3",
      example: {
        title: "Same price. Different game.",
        setup:
          "NOVA trades at $43.20. Aisha and Ben both buy 100 shares at the same moment.",
        steps: [
          {
            label: "Aisha",
            detail:
              "She expects the business to grow over several years and is prepared for short-term price swings.",
          },
          {
            label: "Ben",
            detail:
              "He expects a short-term price move and has a predefined point where his trading idea is invalidated.",
          },
          {
            label: "The key difference",
            detail:
              "The asset and entry price are identical. Their time horizons, reasons and definitions of being wrong are different.",
          },
        ],
        takeaway:
          "Trading versus investing is not about which button you press. Intent and time horizon change the game you are playing.",
      },
    },
    {
      kind: "interactive",
      id: "tf-l1-b4",
      title: "DECISION 01 · Choose your next move",
      interaction: {
        type: "scenario-decision",
        prompt:
          "You have $500 saved, have never placed an order, and a friend says a small account can double quickly. What do you do next?",
        situation: [
          "You do not yet understand how orders execute or how you would know a trade has gone wrong.",
          "This is a simulated learning decision — there is no real money involved.",
        ],
        choices: [
          {
            label: "Learn the mechanics before risking money",
            outcome:
              "You keep the $500 untouched and spend the evening learning how markets, orders and risk actually work.",
            best: true,
            feedback:
              "Good starting decision. The goal is not to avoid every risk forever; it is to understand the decisions you are making before taking them.",
          },
          {
            label: "Buy whatever your friend recommends",
            outcome:
              "You enter a position without knowing why you are in it or what would make the idea invalid.",
            best: false,
            feedback:
              "The problem is not that the trade must lose. You have no process for evaluating either the decision or the result.",
          },
          {
            label: "Use leverage so $500 controls $5,000",
            outcome:
              "Small price moves now create much larger swings in your account.",
            best: false,
            feedback:
              "Leverage increases exposure. It can magnify losses as quickly as it magnifies gains, making a beginner's mistakes more expensive.",
          },
          {
            label: "Buy a course promising guaranteed profits",
            outcome:
              "You spend money on a promise instead of building your own decision-making framework.",
            best: false,
            feedback:
              "Guaranteed trading profits are a warning sign. A useful education teaches you how to reason, not what outcome is guaranteed.",
          },
        ],
      },
      takeaway:
        "Your first trading skill is recognising which decisions you are equipped to make.",
    },
    {
      kind: "explain",
      id: "tf-l1-b5",
      explanation: {
        heading: "LEVEL UP · What does the market do back?",
        whyItMatters:
          "A trading decision only becomes useful when you can imagine the possible response from the market.",
        paragraphs: [
          "Suppose you buy because you expect price to rise. There are at least two immediate possibilities: price moves in your favour, or it moves against you.",
          "The important question is not 'Will I win?' You cannot know that in advance. A better question is 'What would make my idea wrong, and what happens to my account if it is?'",
        ],
        callouts: [
          {
            tone: "tip",
            title: "Think in branches",
            body:
              "Before acting, imagine the main paths: the market agrees, the market disagrees, or the situation changes and your original reason no longer applies.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "tf-l1-b6",
      title: "CHALLENGE · Build the mental model",
      assessment: {
        intro:
          "Choose your answer, check it, read the explanation, then retry if you want to test yourself again.",
        allowRetry: true,
        items: [
          {
            skill: "What a trade is",
            question: {
              id: "tf-l1-q1",
              type: "mcq",
              topic: "market-basics",
              prompt: "When your buy order fills, what has actually happened?",
              options: [
                "The exchange has issued you a new share",
                "Someone else agreed to sell at your price and you took the asset's price exposure",
                "You have been given a loan against the asset",
                "The market has agreed that the price will rise",
              ],
              answer: 1,
              explain:
                "A fill matches a buyer with a seller or liquidity provider. You receive the position and its price exposure; the market makes no promise about what happens next.",
            },
            hint: "Ask who is on the other side of the fill.",
            feedbackByAnswer: {
              "0": "The exchange provides the marketplace and matching rules. A normal purchase does not mean the exchange created a share for you.",
              "2": "Borrowing is a different mechanism. A normal purchase is an exchange of cash for an asset position.",
              "3": "A transaction records an agreed price. It does not predict the next price.",
            },
          },
          {
            skill: "Trading versus investing",
            question: {
              id: "tf-l1-q2",
              type: "mcq",
              topic: "market-basics",
              prompt: "Which statement best separates trading from investing?",
              options: [
                "Traders use charts, investors use news",
                "Traders pay fees, investors do not",
                "Traders often focus on shorter-term price movement; investors often focus on longer-term ownership and the asset's underlying value or cash flows",
                "Investing is safe and trading is not",
              ],
              answer: 2,
              explain:
                "The distinction is mainly intent and time horizon. Tools overlap, both have costs, and both involve risk.",
            },
            hint: "Think about what each person is waiting for.",
            feedbackByAnswer: {
              "0": "The tools overlap. Traders can use fundamentals and investors can use charts.",
              "1": "Both can pay spreads, commissions or other costs.",
              "3": "Neither label removes risk. Risk depends on the asset, position, time horizon and decisions involved.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tf-l1-b7",
      title: "FINAL CHALLENGE · Can you reason through it?",
      scenario: {
        situation: [
          "Priya is using a $300 simulated account while learning. A friend tells her that a small biotech stock 'always pops' after announcements.",
          "Priya is tempted to buy immediately. She has not written down why the trade should work, what would prove her idea wrong, or how much she is willing to lose in the simulation.",
        ],
        assessment: {
          intro:
            "There is no timer. Treat this like a decision review: identify what you know, what you do not know and what could happen next.",
          items: [
            {
              skill: "Applying the lesson",
              question: {
                id: "tf-l1-q3",
                type: "mcq",
                topic: "market-basics",
                prompt: "Which response best applies what you learned?",
                options: [
                  "Buy immediately because the pattern happened before",
                  "Define the reason, possible invalidation and risk before deciding whether to act",
                  "Wait for the announcement and buy at whatever price appears",
                  "Avoid all markets because risk cannot be managed",
                ],
                answer: 1,
                explain:
                  "A decision needs a reason and a way to recognise when that reason no longer holds. The conclusion can still be 'do not trade' — planning comes before action.",
              },
              feedbackByAnswer: {
                "0": "A past pattern is not enough. You still need to know what you expect and what would invalidate that expectation.",
                "2": "Waiting for news is not a plan by itself. Price can move quickly, and you still need a defined decision process.",
                "3": "Risk cannot be eliminated, but learning to identify, size and manage it is a core trading skill.",
              },
            },
            {
              skill: "Realistic expectations",
              question: {
                id: "tf-l1-q4",
                type: "truefalse",
                topic: "market-basics",
                prompt:
                  "Because trading does not require a product or customers, it is a reliable way to replace a salary quickly.",
                answer: false,
                explain:
                  "Being easy to start is not the same as being easy to win. Trading is competitive, has real costs and carries the possibility of loss.",
              },
              hint: "Separate how easy it is to start from how hard it is to win.",
              feedbackByAnswer: {
                "0": "Starting an account can be easy. Producing consistent results is a different problem entirely.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tf-l1-b8",
      title: "BONUS · Lock in the lesson",
      helper:
        "One sentence is enough. This reflection stays in your browser — it is not graded or sent to the server.",
      prompts: [
        "If you had to explain trading to a friend in one sentence, what would you say now?",
      ],
    },
    {
      kind: "summary",
      id: "tf-l1-b9",
      title: "MISSION COMPLETE",
      points: [
        "A filled trade connects two sides that accepted the same price for their own reasons.",
        "Trading transfers price risk; it does not remove it.",
        "Trading and investing can use the same markets and tools but differ in intent and time horizon.",
        "A strong decision starts with a reason, an idea of what could go wrong and an understanding of the consequences.",
      ],
      nextStep:
        "Next mission: discover where prices actually come from — exchanges, order books and the participants behind every quote.",
    },
  ],
};
