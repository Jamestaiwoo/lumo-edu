import type { CourseLesson } from "../types";

export const lesson01WhatIsTrading: CourseLesson = {
  id: "tf-l1",
  moduleId: "c1-m1",
  title: "What Is Trading?",
  blurb: "Trading is an exchange of risk, not a shortcut to income.",
  objectives: [
    "Explain what actually happens when you buy or sell an asset",
    "Separate trading from investing by intent and time horizon",
    "Describe who takes the other side of your trade and why",
    "Recognise why frequent trading is a hard way to make money",
  ],
  durationMinutes: 9,
  xp: 30,
  keyTakeaway:
    "Every trade is a two-sided agreement to move risk from one person to another. You are paid for taking risk, not for being right.",
  blocks: [
    {
      kind: "explain",
      id: "tf-l1-b1",
      explanation: {
        heading: "A trade is an agreement, not an event you control",
        whyItMatters:
          "Almost every trading mistake starts with a wrong mental model. If you think buying a stock is like buying a lottery ticket, you will judge decisions by outcome instead of by process — and you will learn nothing from the winners or the losers.",
        paragraphs: [
          "Trading means buying or selling a financial asset in order to profit from a change in its price. You do not have to own anything for long, and you do not have to produce anything. You take a position, and the market either agrees with you or it does not.",
          "The moment you buy, someone sold to you. That person is not asleep at the wheel. They may be a market maker earning the spread, a fund rebalancing a portfolio, a company insider selling shares, or another trader who believes the opposite of what you believe. A price exists only because the two of you accepted the same number for opposite reasons.",
          "This is why trading is best described as an exchange of risk. The seller hands you the risk of the price falling, and in return takes the risk of the price rising. Neither of you is right by default. The market does not pay you for wanting something to happen; it pays you for being willing to be wrong, in a way you had already planned for.",
          "Investing is the same mechanics with a different intent. An investor buys a claim on future cash flows and expects to wait years. A trader buys movement, and expects to be in and out quickly. Both can work. They are different games with different skills, and mixing the two in one account is the fastest way to break your own rules.",
        ],
        keyTerms: [
          {
            term: "Position",
            definition:
              "The exposure you currently hold in an asset — long if you benefit from it rising, short if you benefit from it falling.",
          },
          { term: "Long", definition: "You bought something and profit if the price rises." },
          {
            term: "Short",
            definition:
              "You sold something you did not own first, and profit if the price falls. You are borrowing and repaying it.",
          },
          {
            term: "Counterparty",
            definition: "The person or system on the other side of your trade.",
          },
        ],
        callouts: [
          {
            tone: "pitfall",
            title: "Nobody is paying you to trade",
            body: "Trading is a competition with costs attached. Every order pays a spread, and sometimes commission. Treat a trading account as money you are spending to learn, never as an income plan. Lumo simulates an account for exactly this reason.",
          },
          {
            tone: "tip",
            title: "Judge the decision, then the result",
            body: "A good trade can lose money and a careless trade can make money. From here on, ask two separate questions: was the decision reasonable with the information available, and did the market cooperate?",
          },
        ],
      },
    },
    {
      kind: "visual",
      id: "tf-l1-b2",
      title: "One chart, two opportunities",
      visual: {
        type: "price-path",
        label: "NOVA · simulated daily closes",
        points: [40.0, 41.2, 39.6, 42.8, 41.5, 43.9, 42.1, 44.6, 43.2, 45.8, 44.9, 46.4],
        markers: [
          { index: 2, label: "pullback", tone: "down" },
          { index: 8, label: "higher low", tone: "up" },
          { index: 11, label: "new high", tone: "up" },
        ],
        caption:
          "The same 12 closes look like noise to a long-term investor and like a sequence of decisions to a trader. Neither view is wrong — but the trader must answer a question the investor does not: where am I wrong, and how much will that cost?",
      },
    },
    {
      kind: "example",
      id: "tf-l1-b3",
      example: {
        title: "Same price, two completely different trades",
        setup:
          "NOVA trades at $43.20. Aisha and Ben both buy 100 shares at that price on the same tick. Same asset, same moment, same number — but they are not doing the same thing.",
        steps: [
          {
            label: "Aisha's intent",
            detail:
              "She has read the company's filings, expects the business to grow over five years, and has no plan to sell before then. Her risk is that the business disappoints, and she accepts drawdowns along the way.",
          },
          {
            label: "Ben's intent",
            detail:
              "He thinks the price will be higher in two days because buyers have been stepping in above $42.80. His risk is defined: he will exit at $41.90 if the pattern fails.",
          },
          {
            label: "The same entry, different losses",
            detail:
              "If NOVA drops to $41.90, Ben's idea is proven wrong and he exits for about $130. Aisha's idea is not affected at all — her thesis was never about two days.",
          },
          {
            label: "Why this matters",
            detail:
              "The number on the screen says nothing about whether a trade is good. The plan behind the position is what makes a loss acceptable or unacceptable.",
          },
        ],
        takeaway:
          "A price is shared. A reason is not. Before any entry, know whether you are buying a business or buying movement — because that decides when you are wrong.",
      },
    },
    {
      kind: "interactive",
      id: "tf-l1-b4",
      title: "Decide like a learner",
      interaction: {
        type: "scenario-decision",
        prompt: "You have $500 saved and a free evening. What is the most reasonable next step?",
        situation: [
          "A friend told you that a small account can be doubled quickly with the right strategy.",
          "You have never placed an order and you have not read anything about how markets work.",
        ],
        choices: [
          {
            label: "Leave the $500 in savings and work through a beginner course first",
            outcome:
              "You spend the evening learning how prices form and how orders execute. Your savings are untouched.",
            best: true,
            feedback:
              "You cannot lose money on a lesson. Education first means your first real order is a decision you understand rather than a bet you copied.",
          },
          {
            label: "Deposit the $500 and buy something a stranger recommended",
            outcome:
              "You now hold a position you cannot explain, and you have no idea when you would be wrong.",
            best: false,
            feedback:
              "The problem is not the loss itself, it is that you have no way to evaluate it. Without a reason and an exit, a position is a coin flip with fees attached.",
          },
          {
            label: "Buy a $500 course that promises a 'proven system'",
            outcome: "You have less money and still no framework for making your own decisions.",
            best: false,
            feedback:
              "Anything sold as guaranteed is a warning sign, and it also skips the part that matters: learning to reason about a market yourself.",
          },
          {
            label: "Open a leveraged account so the $500 earns like $5,000",
            outcome:
              "Small price moves now cause very large swings in your equity. One bad day can end the account.",
            best: false,
            feedback:
              "Leverage multiplies the size of your mistakes as faithfully as your wins. Learning on leverage teaches you fear, not skill.",
          },
        ],
      },
      takeaway:
        "The first skill in trading is not prediction, it is recognising which decisions you are equipped to make.",
    },
    {
      kind: "practice",
      id: "tf-l1-b5",
      title: "Guided practice",
      assessment: {
        intro: "Take your time. A wrong answer here costs nothing and teaches plenty.",
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
                "Someone else agreed to sell at your price and handed you the risk of the price falling",
                "You have been given a loan against the asset",
                "The market has agreed that the price will rise",
              ],
              answer: 1,
              explain:
                "Every fill matches a buyer with a seller. The seller transfers the risk of falling prices to you in exchange for your cash.",
            },
            hint: "Ask who is on the other side of the fill.",
            feedbackByAnswer: {
              "0": "Exchanges do not create shares when you buy. They match your order against someone else's order.",
              "2": "That describes borrowing (used for short selling or margin), not a normal purchase.",
              "3": "The market is not making a prediction. It is only showing where two people agreed to transact.",
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
                "Traders seek to profit from price movement over a short horizon; investors expect to hold and be paid by the asset over years",
                "Investing is safe and trading is not",
              ],
              answer: 2,
              explain:
                "It is the intent and the time horizon that differ, not the buttons you press. Both pay costs and both carry risk.",
            },
            hint: "Think about what each person is waiting for.",
            feedbackByAnswer: {
              "0": "Tools overlap completely. A long-term investor may read a chart, and a day trader may read an annual report.",
              "1": "Both pay spreads and sometimes commission. Costs are part of every style.",
              "3": "Both can lose money. 'Safe' is about position size and time horizon, not about the label.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tf-l1-b6",
      title: "Knowledge check",
      assessment: {
        intro: "Your first attempt is what counts towards mastery.",
        items: [
          {
            skill: "Counterparties",
            question: {
              id: "tf-l1-q3",
              type: "mcq",
              topic: "participants",
              prompt: "Why does someone agree to take the other side of your trade?",
              options: [
                "Because they disagree with you about price, or because they need to trade for reasons that have nothing to do with you",
                "Because the exchange orders them to",
                "Because they know your order is wrong",
                "Because they are forced to accept every trade",
              ],
              answer: 0,
              explain:
                "Counterparties have their own views and obligations — hedging, rebalancing, taking profit. A trade happens when two different motivations accept one price.",
            },
            feedbackByAnswer: {
              "1": "Exchanges provide the venue and the rules. They do not assign a counterparty to your order.",
              "2": "Nobody has access to your reasoning. The other side is acting on their own reasons.",
              "3": "Only certain designated market makers quote continuously, and even they choose their prices.",
            },
          },
          {
            skill: "Realistic expectations",
            question: {
              id: "tf-l1-q4",
              type: "truefalse",
              topic: "market-basics",
              prompt:
                "Because trading needs no product and no customers, it is a reliable way to replace a salary quickly.",
              answer: false,
              explain:
                "Trading is a competitive activity with real costs. Frequent trading is a hard way to earn money, and promising otherwise is a hallmark of fraud.",
            },
            hint: "Separate how easy it is to start from how hard it is to win.",
            feedbackByAnswer: {
              "0": "Careful: no product and no customers makes an activity easy to start, not easy to win. Your competitors are professionals and every order pays the spread.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tf-l1-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Priya opens Lumo for the first time. She has $300 she can afford to lose in a simulated account, and a habit of buying things when friends talk about them.",
          "Over the weekend she hears that a small biotech stock 'always pops' after announcements.",
        ],
        assessment: {
          items: [
            {
              skill: "Applying the lesson",
              question: {
                id: "tf-l1-q5",
                type: "mcq",
                topic: "market-basics",
                prompt: "Which response best fits what you learned in this lesson?",
                options: [
                  "Buy immediately — the pattern has happened before",
                  "Write down why the price might move, where she would be wrong and what that mistake would cost, then decide whether to act",
                  "Wait for the announcement and buy at whatever price is showing",
                  "Avoid markets completely, because risk cannot be managed",
                ],
                answer: 1,
                explain:
                  "You cannot manage a risk you have not defined. Naming the reason and the invalidation comes first — and the honest conclusion may be that this trade is not for her.",
              },
              feedbackByAnswer: {
                "0": "A story about what happened before is not a reason. She would hold a position with no idea what would tell her to leave.",
                "2": "Buying after the news is not a plan either — the move may already be over, and there is still no exit.",
                "3": "Risk cannot be removed, but it can be sized and planned. That is exactly what this course teaches.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tf-l1-b8",
      title: "Reflection",
      helper:
        "One or two sentences is enough. This stays in your browser — it is never graded or sent to the server.",
      prompts: [
        "Think of something you bought or sold because of a feeling or a tip. Which piece of information would have changed your decision?",
      ],
    },
    {
      kind: "summary",
      id: "tf-l1-b9",
      title: "Recap",
      points: [
        "Every trade matches a buyer with a seller who accepted the same price for opposite reasons.",
        "Trading transfers risk; it does not remove it. You are paid for taking risk carefully, not for being right.",
        "Trading and investing differ by intent and time horizon, not by the tool you use.",
        "Nothing is a good trade until you know where you are wrong and what that costs.",
      ],
      nextStep:
        "Next up: where prices actually come from — exchanges, order books and the participants behind every quote.",
    },
  ],
};
