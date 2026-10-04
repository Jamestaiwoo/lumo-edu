import type { CourseLesson } from "../types";

export const lesson03PriceFormation: CourseLesson = {
  id: "tf-l3",
  moduleId: "c1-m1",
  title: "Buyers, Sellers & Price Formation",
  blurb: "Prices move when one side becomes more aggressive than the other.",
  objectives: [
    "Explain what the 'last price' actually represents",
    "Tell the difference between aggressive and passive orders",
    "Describe why price can jump without any news",
    "Separate price from value",
  ],
  durationMinutes: 10,
  xp: 32,
  keyTakeaway:
    "Price is not a verdict on value. It is the most recent agreement between whoever was willing to act and whoever was willing to wait.",
  blocks: [
    {
      kind: "explain",
      id: "tf-l3-b1",
      explanation: {
        heading: "Every tick is a small negotiation that just ended",
        whyItMatters:
          "Half of the frustration beginners feel comes from treating price as a fact about a company. It is a record of the last deal, and the next deal can be very different — which is why a plan needs a price where you leave, not a belief that the market is wrong.",
        paragraphs: [
          "When you look at a chart you are looking at a list of trades. The last price is the price of the most recent matched order. It was not announced, calculated or approved by anyone: two participants accepted the same number and the engine recorded it. The next trade may happen at a different number a millisecond later.",
          "Orders come in two flavours, and this is the heart of price formation. A passive order rests in the book and waits — a limit buy at 20.10, a limit sell at 20.30. An aggressive order crosses the spread to trade immediately — a market order, or a limit order priced through the opposite side. Only aggressive orders change the last price, because only they accept a price nobody had accepted yet.",
          "So price moves when one side is more willing to be aggressive than the other. If buyers keep lifting the offer, each lift consumes the shares resting there, the next offer is higher, and the last price climbs. If sellers keep hitting the bid, the same happens in reverse. Nothing about the company has to change for this to occur; the balance of urgency is enough.",
          "Supply decides how easy that is. A thin offer above the current price means a modest buy can travel several levels — which is why small, quiet stocks can move 5% on an order that would not register in a large one. A deep book absorbs the same order with barely a flicker.",
          "Finally, price is not value. Value is an opinion about what an asset is worth over time; price is what someone paid for it just now, under whichever conditions happened to exist. They influence each other slowly and imperfectly, and a lot of trading mistakes are really disputes with a price rather than disagreements about value.",
        ],
        keyTerms: [
          {
            term: "Last price",
            definition:
              "The price of the most recent matched trade. It is a record, not a forecast.",
          },
          {
            term: "Aggressive order",
            definition:
              "An order that crosses the spread to trade immediately. It can move the last price.",
          },
          {
            term: "Passive order",
            definition: "An order that rests in the book and waits for someone to trade with it.",
          },
          {
            term: "Order flow",
            definition: "The stream of orders arriving at the market, and how aggressive they are.",
          },
          {
            term: "Value",
            definition:
              "An estimate of what an asset is worth over a longer horizon. It is an opinion, not a printed number.",
          },
        ],
        callouts: [
          {
            tone: "tip",
            title: "Two ways to ask 'what happened?'",
            body: "Price moved up means 'aggressive buyers consumed offers'. It does not mean 'the asset became more valuable'. Keeping those two sentences apart will improve your decisions more than any indicator.",
          },
          {
            tone: "warning",
            title: "Thin books exaggerate everything",
            body: "The same order that is invisible in a large market can travel several percent in a thin one. Volatility is often a statement about liquidity, not about news.",
          },
        ],
      },
    },
    {
      kind: "visual",
      id: "tf-l3-b2",
      title: "An unbalanced book",
      visual: {
        type: "order-book",
        book: {
          label: "NOVA · simulated order book, thin offers",
          unit: "shares",
          asks: [
            { price: 20.16, size: 100 },
            { price: 20.18, size: 200 },
            { price: 20.24, size: 300 },
          ],
          bids: [
            { price: 20.15, size: 900 },
            { price: 20.14, size: 1400 },
            { price: 20.13, size: 2100 },
          ],
        },
        caption:
          "There is very little offered above 20.16 and plenty being bid below. A single 500-share market buy has to reach 20.24 — a 0.4% move — just to get filled. That is price formation in one picture.",
      },
    },
    {
      kind: "example",
      id: "tf-l3-b3",
      example: {
        title: "Nine cents in one second, with no news",
        setup:
          "NOVA's last price is 20.15 and only 100 shares are offered at 20.16. A fund needs 600 shares immediately and sends a market order. Nothing has been announced and nothing about the company has changed.",
        steps: [
          {
            label: "The fund lifts the offer",
            detail: "It buys the 100 shares resting at 20.16. The last price prints 20.16.",
          },
          {
            label: "The offer is gone",
            detail:
              "Nothing is left at 20.16, so the next ask is 20.18 with 200 shares. The last price prints 20.18.",
          },
          {
            label: "Walking further",
            detail:
              "With 300 shares still to buy it takes 200 at 20.18, then 100 of the 300 sitting at 20.24. The last price prints 20.24.",
          },
          {
            label: "What the chart shows",
            detail:
              "A 0.4% jump in one second. A trader reading only the chart sees 'a breakout'. A trader reading the book sees a liquidity event.",
          },
          {
            label: "What happens next",
            detail:
              "Market makers now know offers are thin there. They either raise their prices or refill the book. If sellers return, price drifts back. If they do not, the move holds and becomes the new reference.",
          },
        ],
        takeaway:
          "Price moves because someone had to trade and there was not enough size waiting. Before calling a move meaningful, ask what it cost to cause it.",
      },
    },
    {
      kind: "interactive",
      id: "tf-l3-b4",
      title: "Read the tape",
      interaction: {
        type: "scenario-decision",
        prompt:
          "The last price ticks from 20.15 to 20.24 in a few seconds. Offers above 20.16 were tiny. What is the most reasonable reading?",
        situation: [
          "You have the order book in front of you. Above 20.16 there were only a few hundred shares on offer.",
          "There is no announcement, no earnings release and no news feed entry.",
        ],
        choices: [
          {
            label:
              "Buyers were aggressive into thin supply, so the move may not hold once more size appears",
            outcome:
              "You treat the move as an execution event rather than a change in value, and you wait for the book to refill.",
            best: true,
            feedback:
              "Correct reasoning. You cannot know why they bought, but you can see that little size was offered. Thin supply plus urgency explains the print without inventing a story.",
          },
          {
            label: "Something important must have been announced — buy before the news goes public",
            outcome: "You buy into a move that may have been caused purely by a lack of sellers.",
            best: false,
            feedback:
              "Assuming news because price moved is backwards. Most short bursts are order-flow effects. Acting on a guess about information you do not have is not a plan.",
          },
          {
            label: "The price is now higher, so it will keep going higher — momentum is guaranteed",
            outcome: "You are relying on one print, with no level at which you would be wrong.",
            best: false,
            feedback:
              "Nothing is guaranteed. If the move was caused by an empty book, returning sellers can unwind it just as quickly.",
          },
          {
            label: "Market makers must be manipulating the price, so the market is untradeable",
            outcome:
              "You avoid a market you could have understood by reading the same numbers everyone else can see.",
            best: false,
            feedback:
              "Thin liquidity really does produce odd-looking prints, but the mechanism above already explains it. Jumping to manipulation skips the explanation sitting in front of you.",
          },
        ],
      },
      takeaway:
        "You rarely get to know why a price moved. You can almost always know whether there was size there to absorb it — and that is the more useful question.",
    },
    {
      kind: "practice",
      id: "tf-l3-b5",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "What the last price is",
            question: {
              id: "tf-l3-q1",
              type: "mcq",
              topic: "price-formation",
              prompt: "What does the last price on a chart tell you?",
              options: [
                "The agreed price of the most recent matched trade",
                "The average price of all trades today",
                "The price the exchange believes is fair",
                "The highest price anyone is willing to pay",
              ],
              answer: 0,
              explain:
                "It is one completed transaction. The highest price anyone will pay right now is the best bid, which is usually different.",
            },
            hint: "The chart is a list of trades, not a list of intentions.",
            feedbackByAnswer: {
              "1": "Averages are a calculation you can do, but the last price is a single print — the most recent match.",
              "2": "Exchanges publish rules and match orders. They do not decide fair value.",
              "3": "The highest price anyone will pay is the best bid. It becomes the last price only if someone sells there.",
            },
          },
          {
            skill: "Aggressive versus passive",
            question: {
              id: "tf-l3-q2",
              type: "truefalse",
              topic: "price-formation",
              prompt:
                "A limit buy order resting below the market can move the last price on its own.",
              answer: false,
              explain:
                "Resting orders are passive. They cannot change the last price until someone trades with them, and the print reflects the aggressive side's urgency.",
            },
            feedbackByAnswer: {
              "0": "A resting order is an intention, not a trade. A price change needs a match, and a match needs an aggressive order crossing the spread.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tf-l3-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Supply and price movement",
            question: {
              id: "tf-l3-q3",
              type: "mcq",
              topic: "liquidity",
              prompt:
                "Why can the same 1,000-share order barely move a large stock but sharply move a small one?",
              options: [
                "Small companies are worth less",
                "The small stock has less size resting at each price, so the order consumes more levels",
                "Large stocks are exempt from supply and demand",
                "Small stocks never trade at the quoted price",
              ],
              answer: 1,
              explain:
                "Price impact is about how much size is waiting. Depth absorbs orders; thinness transmits them into price.",
            },
            feedbackByAnswer: {
              "0": "Market capitalisation is not the mechanism here. Depth of resting orders is.",
              "2": "No asset is exempt. Large markets are deep, which is exactly why they absorb orders quietly.",
              "3": "Quotes reflect real intentions, but in thin books those intentions cover very little size.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tf-l3-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "ORCA is a small company that trades a few thousand shares a day. Its last price is 3.40 and the book is nearly empty on both sides.",
          "You want 1,500 shares. The last investor who tried to buy this size filled at an average of 3.62.",
        ],
        assessment: {
          items: [
            {
              skill: "Planning around liquidity",
              question: {
                id: "tf-l3-q4",
                type: "mcq",
                topic: "liquidity",
                prompt: "Which approach best reflects what you learned?",
                options: [
                  "Send one market order and accept whatever average price results",
                  "Decide the highest average price you will accept, then work the order in smaller clips with limits",
                  "Buy 5,000 shares instead, since a bigger order is taken more seriously",
                  "Wait for the price to be 'fair' before buying anything",
                ],
                answer: 1,
                explain:
                  "Decide your worst acceptable price first, then let execution serve that decision. Working the order avoids paying for urgency you do not need.",
              },
              feedbackByAnswer: {
                "0": "A market order in an empty book is the single fastest way to pay a price you never intended.",
                "2": "Bigger size in a thin market means walking even further up an empty ladder.",
                "3": "Sharing your opinion about fair value with the market does not change the depth available.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tf-l3-b8",
      title: "Reflection",
      helper: "Keep it short. Nothing here leaves your browser.",
      prompts: [
        "Recall a price move you once found confusing. Can the aggressive-order / thin-supply idea explain it?",
      ],
    },
    {
      kind: "summary",
      id: "tf-l3-b9",
      title: "Recap",
      points: [
        "The last price is the most recent agreement between a buyer and a seller — a record, not a verdict.",
        "Only aggressive orders change price; passive orders wait to be traded with.",
        "Price impact depends on how much size is resting at each level.",
        "Price is not value, and a big move is often a statement about liquidity rather than about news.",
      ],
      nextStep:
        "Next: the two prices behind every quote — bid, ask and the spread that separates them.",
    },
  ],
};
