import type { CourseLesson } from "../types";

export const lesson05OrderTypes: CourseLesson = {
  id: "tf-l5",
  moduleId: "c1-m2",
  title: "Market Orders vs Limit Orders",
  blurb: "Certainty of price, or certainty of a fill. You choose one.",
  objectives: [
    "Describe exactly what a market order does and does not guarantee",
    "Describe exactly what a limit order does and does not guarantee",
    "Match the order type to how much urgency you actually have",
    "Predict when a limit order will not fill at all",
  ],
  durationMinutes: 11,
  xp: 34,
  keyTakeaway:
    "A market order guarantees you are filled and leaves the price open. A limit order guarantees the price you are willing to accept and leaves the fill open. Pick the uncertainty you can live with.",
  blocks: [
    {
      kind: "explain",
      id: "tf-l5-b1",
      explanation: {
        heading: "Two orders, two different uncertainties",
        whyItMatters:
          "Most avoidable losses come from using the wrong order type for the situation: a market order into a thin market, or a limit order that never fills while the move leaves without you. Understanding the trade-off takes five minutes and saves real money.",
        paragraphs: [
          "A market order says: trade now, at whatever price the book offers. It is aggressive by definition, so it crosses the spread and consumes resting orders. What it guarantees is execution. What it does not guarantee is the price — the price you saw is a historical fact by the time your order arrives, and in a thin or fast market your average fill can be several levels away.",
          "A limit order says: trade only at this price or better. A limit buy at 20.10 will not pay 20.11; a limit sell at 20.30 will not accept 20.29. What it guarantees is your price ceiling or floor. What it does not guarantee is that it will ever trade. If the market never comes to your price, the order simply rests in the book, and the move you wanted happens without you.",
          "Limit orders are not only about patience. A limit buy priced at or above the current ask behaves like a market order but caps the worst price you can receive — useful when you must trade but want protection against a bad print. A limit sell priced at or below the bid does the same for exits. The limit is a boundary, not a prediction.",
          "There is a third tool worth knowing about, because it is a risk tool rather than an entry tool: the stop order. A stop order sits dormant until the market trades at your trigger, then becomes a market order. That is how exits enforce a maximum loss — and also why stops can fill away from the trigger when price gaps or moves fast. It is protection, not a guarantee of the exact level.",
          "The practical question is not which order is better but which uncertainty you can tolerate. If you must be positioned — because the plan depends on being in before a session closes — accept the price risk of a market order, and consider sizing down so the impact is small. If you are willing to miss the trade, use a limit order and define in advance what you will do if it never fills.",
        ],
        keyTerms: [
          {
            term: "Market order",
            definition:
              "Trades immediately against resting orders. Guarantees a fill, not a price.",
          },
          {
            term: "Limit order",
            definition:
              "Trades only at your price or better. Guarantees your worst price, not a fill.",
          },
          {
            term: "Partial fill",
            definition:
              "Only part of your order is matched, because there was not enough size at your price.",
          },
          {
            term: "Price improvement",
            definition:
              "A fill better than your limit, usually because the market gapped through your price.",
          },
          {
            term: "Stop order",
            definition:
              "Dormant until a trigger price trades, then becomes a market order. Used for exits, not entries.",
          },
          {
            term: "Time in force",
            definition:
              "How long an order stays alive: for the day, until cancelled, or immediate-or-cancel.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "Market orders and thin books do not mix",
            body: "The wider the spread and the emptier the levels, the more a market order costs you. In markets with poor liquidity, consider whether you need to trade at all today.",
          },
          {
            tone: "tip",
            title: "Write the 'no fill' plan",
            body: "Before placing a limit order ask: if this never fills, what do I do? Answering that question in advance is the difference between patience and being left behind.",
          },
        ],
      },
    },
    {
      kind: "visual",
      id: "tf-l5-b2",
      title: "Where each order type acts",
      visual: {
        type: "price-path",
        label: "NOVA · simulated bid path during one session",
        points: [20.15, 20.14, 20.13, 20.11, 20.1, 20.09, 20.12, 20.15],
        markers: [
          { index: 0, label: "ask 20.16", tone: "neutral" },
          { index: 4, label: "your limit 20.10", tone: "down" },
          { index: 6, label: "price recovers", tone: "up" },
        ],
        caption:
          "A market order at the start pays 20.16 immediately. A limit order at 20.10 waits until tick 5, fills — and then has to cope with price drifting to 20.09 before recovering. A fill is not the same thing as a good price.",
      },
    },
    {
      kind: "interactive",
      id: "tf-l5-b3",
      title: "Order type simulator",
      interaction: {
        type: "order-type-simulator",
        prompt:
          "NOVA is quoted 20.15 bid / 20.16 ask. Choose an order, then step the market forward tick by tick and watch what happens to your order.",
        symbol: "NOVA",
        unit: "shares",
        bid: 20.15,
        ask: 20.16,
        ticks: [20.15, 20.14, 20.13, 20.11, 20.1, 20.09, 20.12, 20.15, 20.18],
      },
      takeaway:
        "A market order is decided by the market. A limit order is decided by the market too — you only choose which risk you are taking.",
    },
    {
      kind: "example",
      id: "tf-l5-b4",
      example: {
        title: "Two ways to buy the same 500 shares",
        setup:
          "NOVA is quoted 20.15 bid / 20.16 ask, with 400 shares resting at 20.16 and 900 above it. Priya needs the position before the close. Sam is happy to wait for a price.",
        steps: [
          {
            label: "Priya sends a market order",
            detail:
              "She fills 400 shares at 20.16 ($8,064) and 100 shares at 20.17 ($2,017). Total $10,081 for 500 shares — an average of 20.162.",
          },
          {
            label: "Sam sends a limit at 20.16",
            detail:
              "He fills the same 400 shares at 20.16 immediately and leaves 100 resting. Those 100 fill only if sellers come down to him.",
          },
          {
            label: "What they paid for their choice",
            detail:
              "Priya's certainty cost her about $1 on the order. That is cheap, because this book is deep. She is filled and done.",
          },
          {
            label: "What Sam gave up",
            detail:
              "Sam may never get the last 100 shares. If price lifts away, he owns 400 and watches the move without him — the risk he chose.",
          },
          {
            label: "Now repeat it on a thin market",
            detail:
              "ORCA is quoted 3.40 bid / 3.75 ask with a few hundred shares at each level. The same market-order instinct costs roughly 10% of the position, while the limit order waits for the price to come to it.",
          },
        ],
        takeaway:
          "Match the order to your actual urgency, not to your mood. In a deep market speed is cheap; in a thin one, speed is the trade.",
      },
    },
    {
      kind: "practice",
      id: "tf-l5-b5",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "What each type guarantees",
            question: {
              id: "tf-l5-q1",
              type: "mcq",
              topic: "orders",
              prompt: "Which pair of statements is correct?",
              options: [
                "A market order guarantees a fill; a limit order guarantees your price or better",
                "A market order guarantees your price; a limit order guarantees a fill",
                "Both guarantee a fill and a price",
                "Neither guarantees anything",
              ],
              answer: 0,
              explain:
                "Market trades now at the market's price. Limit insists on your price and may never trade. Each solves one problem and hands you the other.",
            },
            hint: "Write down what you give up for each order type.",
            feedbackByAnswer: {
              "1": "That is the mirror image. Market orders are the aggressive ones — they accept whatever price the book offers.",
              "2": "If both were guaranteed, there would be no decisions to make. The trade-off is the lesson.",
              "3": "Both guarantee something specific, just not the same thing.",
            },
          },
          {
            skill: "Quantifying the trade-off",
            question: {
              id: "tf-l5-q2",
              type: "numeric",
              topic: "execution",
              prompt:
                "You want 500 shares. A market buy fills at the ask of 20.16. A limit buy at 20.10 would have filled at 20.10. How many dollars more did the market order pay?",
              answer: 30,
              tolerance: 0.01,
              unit: "dollars",
              explain:
                "You paid 6 cents more per share: 0.06 × 500 = $30. That is the cost of certainty on this order.",
            },
            hint: "Difference per share times the size.",
            feedbackByAnswer: {
              numeric: "20.16 − 20.10 = 0.06 per share. Multiply by 500 shares to get $30.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tf-l5-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Unfilled limits",
            question: {
              id: "tf-l5-q3",
              type: "mcq",
              topic: "orders",
              prompt:
                "You place a limit sell at 21.00 while the market is 20.00 bid / 20.05 ask, and price never reaches 21.00. What happens?",
              options: [
                "It fills at 20.05 because that is the nearest price",
                "It rests, unfilled, until it is triggered, cancelled or expires",
                "The broker converts it into a market order",
                "It fills at 20.00 at the end of the day",
              ],
              answer: 1,
              explain:
                "A limit is a standing instruction, not a queue position you can skip. Nothing happens until the market reaches your price.",
            },
            feedbackByAnswer: {
              "0": "A limit sell never fills below its price. It cannot be filled at the bid just because the clock is ticking.",
              "2": "Brokers do not convert limit orders into market orders — that would defeat the purpose of setting a limit.",
              "3": "Unfilled day orders expire. They are not filled at a worse price to clear them.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tf-l5-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "A company you follow reports results after the close. In the after-hours session the price is jumping between 18.00 and 22.00 on very little volume.",
          "Your plan was to buy at 20.00 if the results were solid. They were solid.",
        ],
        assessment: {
          items: [
            {
              skill: "Order choice under uncertainty",
              question: {
                id: "tf-l5-q4",
                type: "mcq",
                topic: "execution",
                prompt: "What is the most defensible action?",
                options: [
                  "Send a market order now — the news is good and you want the position",
                  "Wait for the regular session to open and see where the price actually settles before deciding",
                  "Send a market order with double the size to average a better price",
                  "Place a stop order above the market to make sure you get in on strength",
                ],
                answer: 1,
                explain:
                  "Thin after-hours books produce prices that are not representative. Waiting for liquidity to return means you trade at a price other people are also accepting, and you can still decide not to trade.",
              },
              feedbackByAnswer: {
                "0": "A market order in an illiquid after-hours book can fill far from the 20.00 you intended, and the price you get is the price you own.",
                "2": "Larger size in an illiquid market means paying even more for the same uncertainty.",
                "3": "A stop order is a trigger, not a strategy. Buying 'on strength' above a gapping price is chasing, not planning.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tf-l5-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Which uncertainty would bother you more on your own account — being filled at a price you did not expect, or missing a move entirely? Why?",
      ],
    },
    {
      kind: "summary",
      id: "tf-l5-b9",
      title: "Recap",
      points: [
        "Market orders buy execution at the market's price; limit orders buy price certainty at the risk of never filling.",
        "A limit is a boundary, not a prediction: it can fill partially, and it can fill better than you asked.",
        "Stop orders are exits that become market orders, so they can fill away from the trigger.",
        "Match the order to your real urgency, and decide in advance what you will do if a limit never fills.",
      ],
      nextStep: "Next: reading a price chart so that quotes and candles finally mean something.",
    },
  ],
};
