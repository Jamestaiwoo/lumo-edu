import type { CourseLesson } from "../types";

export const lesson02HowMarketsWork: CourseLesson = {
  id: "tf-l2",
  moduleId: "c1-m1",
  title: "How Financial Markets Work",
  blurb: "An exchange is an organised auction, not a shop with fixed prices.",
  objectives: [
    "Describe what an exchange actually does with your order",
    "Tell the difference between the primary and secondary market",
    "Name the main participants and what each one is trying to achieve",
    "Separate liquidity from volatility",
  ],
  durationMinutes: 10,
  xp: 32,
  keyTakeaway:
    "A market is a matching system for competing orders. Prices are discovered, not set — and buying shares on an exchange does not send money to the company.",
  blocks: [
    {
      kind: "explain",
      id: "tf-l2-b1",
      explanation: {
        heading: "Prices are discovered by an auction that never stops",
        whyItMatters:
          "Understanding the machinery explains almost everything that frustrates beginners: why your order did not fill, why a big order moved the price, why a stock jumps on news, and why a market can look 'expensive' and keep rising.",
        paragraphs: [
          "An exchange does not buy or sell anything. It publishes rules, keeps a list of who owns what, and runs a matching engine that pairs buy orders with sell orders. When your order arrives, the engine looks for the best available opposite order and executes against it. If nothing suitable is there, your order waits in the order book until something arrives or you cancel it.",
          "The order book is the visible part of that auction: resting buy orders (bids) on one side, resting sell orders (asks) on the other. The best bid is the highest price anyone is currently willing to pay, and the best ask is the lowest price anyone is currently willing to accept. The gap between them is the spread. Everything you see quoted is somebody's live intention, not an official valuation.",
          "It helps to separate two markets. In the primary market a company issues new shares and receives the cash — for example during an initial public offering. After that, shares change hands in the secondary market between investors and traders like you. When you buy a share on an exchange, the company receives nothing. You are buying from another participant, and they are leaving the position you are entering.",
          "Who is on the other side? Retail traders making discretionary decisions. Institutional funds that must buy or sell regardless of timing. Market makers who quote both sides all day and earn the spread. Hedgers reducing exposure elsewhere. High-frequency systems competing for fractions of a cent. Each has a different objective, and none of them cares about your thesis. That mix is what makes prices move continuously.",
        ],
        keyTerms: [
          {
            term: "Exchange",
            definition:
              "A regulated venue that publishes rules, lists instruments and matches orders in an electronic order book.",
          },
          {
            term: "Order book",
            definition: "The live collection of resting bids and asks, ordered by price then time.",
          },
          {
            term: "Primary market",
            definition:
              "Where new securities are issued and the cash goes to the issuer, e.g. an IPO.",
          },
          {
            term: "Secondary market",
            definition:
              "Where already-issued securities trade between participants. You and I trade here.",
          },
          {
            term: "Price discovery",
            definition:
              "The process by which competing orders establish a price the market accepts.",
          },
          {
            term: "Liquidity",
            definition:
              "How much size can trade without moving the price much, and how tightly bids and asks are quoted.",
          },
          {
            term: "Volatility",
            definition:
              "How much and how fast price moves. Direction is irrelevant: volatility measures movement, not outcome.",
          },
        ],
        callouts: [
          {
            tone: "pitfall",
            title: "Buying shares rarely funds the company",
            body: "On an exchange you are buying from a seller, not from the company. That remains true even when the price is rising fast. The exception is specific events such as an IPO or a secondary offering.",
          },
          {
            tone: "info",
            title: "Liquidity and volatility are different questions",
            body: "A market can be liquid and volatile (lots of size changing hands while price swings) or illiquid and calm (thin trading in a tight range). And a thin market can have very wide spreads with barely any movement.",
          },
        ],
      },
    },
    {
      kind: "visual",
      id: "tf-l2-b2",
      title: "The order book for NOVA",
      visual: {
        type: "order-book",
        book: {
          label: "NOVA · simulated order book",
          unit: "shares",
          asks: [
            { price: 20.16, size: 100 },
            { price: 20.17, size: 100 },
            { price: 20.18, size: 500 },
          ],
          bids: [
            { price: 20.15, size: 400 },
            { price: 20.14, size: 700 },
            { price: 20.13, size: 1100 },
          ],
        },
        caption:
          "The best ask (20.16) is what an impatient buyer pays. The best bid (20.15) is what an impatient seller receives. Notice the sizes: only 100 shares are offered at 20.16, so a 300-share market buy cannot fill at a single price.",
      },
    },
    {
      kind: "example",
      id: "tf-l2-b3",
      example: {
        title: "What happens to a 300-share market buy",
        setup:
          "NOVA shows a best ask of 20.16 with only 100 shares offered at that level. You send a market order to buy 300 shares, and the engine works through the resting sell orders from the cheapest upward.",
        steps: [
          {
            label: "First 100 shares",
            detail: "Filled at 20.16 — the best ask. Cost: 100 × 20.16 = $2,016.00.",
          },
          {
            label: "Next 100 shares",
            detail:
              "The 20.16 level is empty, so the engine takes the next level. Cost: 100 × 20.17 = $2,017.00.",
          },
          {
            label: "Last 100 shares",
            detail: "The next level is 20.18. Cost: 100 × 20.18 = $2,018.00.",
          },
          {
            label: "Your average fill",
            detail: "($2,016 + $2,017 + $2,018) ÷ 300 = $6,051 ÷ 300 = $20.17 per share.",
          },
          {
            label: "The cost of impatience",
            detail:
              "You paid an average of 20.17 while the screen said 20.16. On 300 shares that is one cent per share — $3 — gone immediately, and you now need the price to rise just to get back to even.",
          },
        ],
        takeaway:
          "A market order buys certainty of execution and sells you uncertainty of price. Size is what makes it expensive: the same order for 100 shares would have filled entirely at 20.16.",
      },
    },
    {
      kind: "interactive",
      id: "tf-l2-b4",
      title: "Work the book",
      interaction: {
        type: "order-book-decision",
        prompt:
          "You want 300 NOVA shares and you are not in a hurry. What is the most reasonable action?",
        book: {
          label: "NOVA · simulated order book",
          unit: "shares",
          asks: [
            { price: 20.16, size: 100 },
            { price: 20.17, size: 100 },
            { price: 20.18, size: 500 },
          ],
          bids: [
            { price: 20.15, size: 400 },
            { price: 20.14, size: 700 },
            { price: 20.13, size: 1100 },
          ],
        },
        choices: [
          {
            label: "Place a limit buy at 20.16 for 300 shares and let it work",
            outcome:
              "You fill 100 shares immediately at 20.16. The remaining 200 rest in the book at 20.16 and fill only if sellers come to you.",
            best: true,
            feedback:
              "This is price control. You may end up with a partial position or no further fill at all — that is the trade-off, and it is the right one when you are not in a hurry. You never pay more than 20.16.",
          },
          {
            label: "Send a market order for 300 shares now",
            outcome: "You fill 100 at 20.16, 100 at 20.17 and 100 at 20.18. Average price 20.17.",
            best: false,
            feedback:
              "It works, but you paid 1 cent per share above the best ask for the privilege of speed you did not need. Impatience has a price, and it is visible here.",
          },
          {
            label: "Send a market order for 3,000 shares",
            outcome:
              "Your order eats through 20.16, 20.17 and 20.18 and keeps climbing into levels above. Your average price is far away from the 20.16 you saw.",
            best: false,
            feedback:
              "Size is the single biggest cause of bad execution. This is why professionals slice large orders — and why you should size positions to what the book can absorb.",
          },
          {
            label: "Place a limit buy at 20.15 for 300 shares",
            outcome:
              "Your order joins the back of a queue that already has 400 shares bidding at 20.15. It only fills if sellers hit the bid and your turn comes.",
            best: false,
            feedback:
              "Not wrong, just lower probability. You are demanding a better price than anyone else is paying, so the market has to come to you. Perfectly reasonable — as long as you accept that it may never fill.",
          },
        ],
      },
      takeaway:
        "Every order is a trade-off between price certainty, fill certainty and speed. There is no order type that gives you all three.",
    },
    {
      kind: "practice",
      id: "tf-l2-b5",
      title: "Guided practice",
      assessment: {
        intro: "Use the order book above while you answer.",
        allowRetry: true,
        items: [
          {
            skill: "The exchange's job",
            question: {
              id: "tf-l2-q1",
              type: "mcq",
              topic: "participants",
              prompt: "What does an exchange do with the order you send?",
              options: [
                "It buys the security from you and holds it as inventory",
                "It matches your order against opposing orders using published rules",
                "It sets a fair price each morning and enforces it",
                "It guarantees you will not lose money",
              ],
              answer: 1,
              explain:
                "Exchanges publish rules, keep records and match orders. They do not take the other side of your trade and they do not set prices.",
            },
            hint: "Think about who is actually on the other side.",
            feedbackByAnswer: {
              "0": "Exchanges are not dealers sitting on inventory. Market makers and other participants are the ones taking the other side.",
              "2": "There is no morning fair price. The last matched order is simply the most recent agreement.",
              "3": "No venue insures your trades. Risk management is your responsibility.",
            },
          },
          {
            skill: "Primary vs secondary market",
            question: {
              id: "tf-l2-q2",
              type: "truefalse",
              topic: "market-basics",
              prompt:
                "When you buy a share on an exchange, your money goes to the company that issued it.",
              answer: false,
              explain:
                "Company funding happens in the primary market. Once shares are listed they trade between participants, so your cash goes to a seller.",
            },
            feedbackByAnswer: {
              "0": "This is one of the most common misconceptions. Only new issuance (an IPO, a follow-on offering) sends cash to the company. Everyday exchange trading is second-hand.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tf-l2-b6",
      title: "Knowledge check",
      assessment: {
        intro: "Your first attempt counts towards your mastery of this topic.",
        items: [
          {
            skill: "Liquidity versus volatility",
            question: {
              id: "tf-l2-q3",
              type: "mcq",
              topic: "liquidity",
              prompt: "A market is described as illiquid. What does that mean?",
              options: [
                "The price is falling",
                "There is a lot of uncertainty about the future",
                "Only a small amount of size can trade without moving the price, and spreads tend to be wider",
                "The exchange is closed",
              ],
              answer: 2,
              explain:
                "Liquidity is about depth and spread: how much you can trade and how tightly bids and asks sit together. Direction has nothing to do with it.",
            },
            feedbackByAnswer: {
              "0": "Falling prices are a direction, not a liquidity condition. Illiquid markets can rise too — often violently, on small orders.",
              "1": "That is closer to uncertainty, which feeds volatility. Liquidity describes the mechanics of getting filled.",
              "3": "Even when an exchange is closed you can sometimes trade elsewhere. Illiquidity is about the depth of resting orders.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tf-l2-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "A small company, HELI, trades on a minor exchange with a best bid of 4.00 and a best ask of 4.12. Only a few hundred shares sit at each price.",
          "You want 2,000 shares. You believe the business is worth far more than 4.12 and you are happy to hold for a year.",
        ],
        assessment: {
          items: [
            {
              skill: "Applying execution knowledge",
              question: {
                id: "tf-l2-q4",
                type: "mcq",
                topic: "liquidity",
                prompt: "What is the main risk in sending a single market order for 2,000 shares?",
                options: [
                  "Nothing — market orders always fill at the displayed price",
                  "Your order could clear many levels and fill at an average price far above 4.12",
                  "The exchange will reject any order that moves the price",
                  "The company will issue you new shares at 4.12",
                ],
                answer: 1,
                explain:
                  "In a thin book there is not much size at the best ask, so a large market order climbs the ladder. Your average fill can be dramatically worse than the quote you saw.",
              },
              feedbackByAnswer: {
                "0": "Market orders guarantee a fill, never a price. That distinction is the whole lesson here.",
                "2": "Exchanges generally allow price movement; some have limit-up/limit-down bands, but they will not protect your average fill.",
                "3": "You are buying from sellers in the secondary market, not from the company.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tf-l2-b8",
      title: "Reflection",
      helper: "Two sentences is plenty. Private to your browser, never graded.",
      prompts: [
        "Which participant do you think most often takes the other side of a beginner's order, and why does that matter for how you place orders?",
      ],
    },
    {
      kind: "summary",
      id: "tf-l2-b9",
      title: "Recap",
      points: [
        "Exchanges publish rules and match orders; they do not set prices or take the other side.",
        "The order book shows the best bid, the best ask and the sizes available at each level.",
        "You trade in the secondary market, so your cash goes to another participant, not to the company.",
        "A market order buys certainty of a fill and gives up certainty of price — the bigger your order, the more that costs.",
        "Liquidity (depth and spread) and volatility (size and speed of movement) are different things.",
      ],
      nextStep: "Next: how individual buyers and sellers actually push a price around.",
    },
  ],
};
