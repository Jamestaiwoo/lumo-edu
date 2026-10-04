import type { CourseLesson } from "../types";

export const lesson01ContinuousAuctions: CourseLesson = {
  id: "ms-l1",
  moduleId: "c5-m1",
  title: "The Auction That Never Stops",
  blurb: "Price is the last trade — the two-sided quote is the real market.",
  objectives: [
    "Explain how a continuous market forms prices order by order",
    "Describe what an opening or closing auction actually does",
    "Walk a book and compute the true average fill of a market order",
    "Explain why the open is the noisiest and most expensive window",
  ],
  durationMinutes: 11,
  xp: 34,
  keyTakeaway:
    "A quote is an offer; a price is a receipt. Every fill is an average you walked to, and the open auction is where that walk is longest.",
  blocks: [
    {
      kind: "explain",
      id: "ms-l1-b1",
      explanation: {
        heading: "Price is a receipt, not a promise",
        whyItMatters:
          "Every chart, indicator and stop you will ever use is built on the last traded price. Knowing what that number hides — and what the quote really offers — is the foundation of market-structure thinking.",
        paragraphs: [
          "A continuous market has no single price: it has a queue of resting orders and the trades that hit them. Your screen shows the last trade, or the midpoint between the best bid (the highest resting buy) and the best ask (the lowest resting sell). Both are receipts for agreements that already happened. What is actually available right now is only the quote.",
          "Orders take turns. A market buy lifts the cheapest resting sell orders from the bottom up; a market sell hits the highest resting bids from the top down. Each trade removes resting size and nudges the best quote one step. When buyers exhaust the top level of offers, the ask steps up — the printed price rises because cheap supply ran out, not because everyone suddenly agreed the stock was worth more.",
          "Auctions are the exception. At the open and the close — and after a trading halt — the venue batches orders and computes one clearing price that matches the greatest volume. Every order in the batch trades at that single price. The closing auction is the heaviest print of the day in many large stocks precisely because index funds are obliged to trade at the close.",
          "That is also why the open is noisy. The auction prints whatever price balances the batch, then continuous trading restarts on a thin book. Spreads are widest, quotes flicker, and market orders are at their most expensive in the first minutes of the session.",
        ],
        keyTerms: [
          {
            term: "Best bid / best ask",
            definition:
              "The highest resting buy and the lowest resting sell — the only two prices you can trade at immediately.",
          },
          {
            term: "Clearing price",
            definition:
              "The single auction price that matches the most volume; every matched order in the batch trades at it.",
          },
          {
            term: "Continuous market",
            definition:
              "Order-by-order trading where every fill happens at the resting price it consumed.",
          },
        ],
        callouts: [
          {
            tone: "tip",
            title: "Read the quote, not the price",
            body: "If the screen says 20.15 / 20.16, the market's only firm opinions are those two numbers. The last print is history.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "ms-l1-b2",
      example: {
        title: "One minute of price formation",
        setup:
          "A stock is quoted 20.15 bid / 20.16 ask with 400 shares bid and 100 offered. Buyers arrive with market orders. Above the ask the book holds 300 shares at 20.17, 900 at 20.18 and 500 at 20.19.",
        steps: [
          {
            label: "First 100 shares",
            detail:
              "The first market buy pays 100 × 20.16 = $2,016. The 20.16 level is now empty and the ask moves to 20.17.",
          },
          {
            label: "Next 300 shares",
            detail: "The next buyer sweeps that level: 300 × 20.17 = $6,051. The ask is now 20.18.",
          },
          {
            label: "Next 500 shares",
            detail: "The tape prints 20.18 for 500 shares: 500 × 20.18 = $10,090.",
          },
          {
            label: "What the chart shows",
            detail:
              "The last price on screen is now 20.18 — three ticks above where the minute began — while the bid has not moved from 20.15.",
          },
          {
            label: "What buyers actually paid",
            detail:
              "900 shares cost $2,016 + $6,051 + $10,090 = $18,157 — an average of 20.174, even though the tape says 20.18.",
          },
          {
            label: "The friction nobody quotes",
            detail:
              "Crossing that book cost them $18,157 − (900 × 20.16) = $13 above the offer they reacted to.",
          },
        ],
        takeaway:
          "The chart's price is the edge of the queue. Size moves through the queue, so the fill you get is always an average — never the print.",
      },
    },
    {
      kind: "visual",
      id: "ms-l1-b3",
      title: "The book behind a 20.18 print",
      visual: {
        type: "order-book",
        book: {
          label: "NOVA · simulated order book",
          unit: "shares",
          asks: [
            { price: 20.16, size: 100 },
            { price: 20.17, size: 300 },
            { price: 20.18, size: 900 },
            { price: 20.19, size: 500 },
          ],
          bids: [
            { price: 20.15, size: 400 },
            { price: 20.14, size: 700 },
            { price: 20.13, size: 1100 },
          ],
        },
        caption:
          "The 20.18 print came from the third level. The bid never moved: price 'rose' because offers were consumed, not because buyers outnumbered sellers everywhere.",
      },
    },
    {
      kind: "interactive",
      id: "ms-l1-b4",
      title: "Price the same 1,800 shares two ways",
      interaction: {
        type: "order-book-decision",
        prompt:
          "It is 09:31 and this is the book you see. You want 1,800 NOVA shares. Which instruction fits the structure in front of you?",
        book: {
          label: "NOVA · live book",
          unit: "shares",
          asks: [
            { price: 20.16, size: 100 },
            { price: 20.17, size: 300 },
            { price: 20.18, size: 900 },
            { price: 20.19, size: 500 },
          ],
          bids: [
            { price: 20.15, size: 400 },
            { price: 20.14, size: 700 },
            { price: 20.13, size: 1100 },
          ],
        },
        choices: [
          {
            label:
              "Work it: rest limit buys at 20.16 and 20.17 for most of the size, and lift only what you need filled today",
            outcome:
              "You take the 400 shares resting up to 20.17 and leave the balance working at your limits; the rest fills only if sellers come to you.",
            best: true,
            feedback:
              "Correct — the structure pays patience. You cap your price at 20.17 and accept fill risk on the remainder instead of paying the whole ladder.",
          },
          {
            label: "Send one market order for 1,800 shares and be done with it",
            outcome:
              "You fill 100 at 20.16, 300 at 20.17, 900 at 20.18 and 500 at 20.19 — an average of exactly 20.18.",
            best: false,
            feedback:
              "The visible book is 1,800 shares deep to 20.19, so you buy the entire ladder and your average lands two ticks above the screen price you reacted to.",
          },
          {
            label: "Bid 20.16 for all 1,800 and wait as long as it takes",
            outcome:
              "You sit at the top of the book; if the stock never trades back down to you, you own nothing.",
            best: false,
            feedback:
              "Patience is only free if the trade still makes sense unfilled. If the reason you wanted it is intact, unfilled is a real cost too.",
          },
        ],
      },
      takeaway:
        "The book tells you what size costs at a given speed. The same order sent two ways is two completely different trades.",
    },
    {
      kind: "practice",
      id: "ms-l1-b5",
      title: "Guided practice",
      assessment: {
        intro: "Price the walk before you take it.",
        allowRetry: true,
        items: [
          {
            skill: "Slippage of a market order",
            question: {
              id: "ms-l1-q1",
              type: "numeric",
              topic: "price-formation",
              prompt:
                "Using the book above, what is the slippage in dollars of a single 1,800-share market order measured against the 20.16 best ask?",
              answer: 36,
              tolerance: 0.5,
              unit: "USD",
              explain:
                "The walk fills 100 @ 20.16, 300 @ 20.17, 900 @ 20.18 and 500 @ 20.19 = $36,324, an average of 20.18. Slippage = (20.18 − 20.16) × 1,800 = $36.",
            },
            feedbackByAnswer: {
              numeric:
                "Average fill 20.18 against the 20.16 you saw: (20.18 − 20.16) × 1,800 = $36.",
            },
          },
          {
            skill: "What the tape prints",
            question: {
              id: "ms-l1-q2",
              type: "numeric",
              topic: "price-formation",
              prompt: "What price does the tape print after that 1,800-share buy?",
              answer: 20.19,
              tolerance: 0.005,
              unit: "USD",
              explain:
                "The order finishes inside the 20.19 level, so the last trade — and therefore the chart — reads 20.19 while the average fill was 20.18.",
            },
            feedbackByAnswer: {
              numeric:
                "The order ends in the 20.19 level: the print is where the last share filled, not where the order started.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "ms-l1-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "What a price means",
            question: {
              id: "ms-l1-q3",
              type: "mcq",
              topic: "market-basics",
              prompt: "What does the last traded price actually tell you?",
              options: [
                "It is the price you can buy at right now",
                "It is a receipt for a past trade — the firm prices available now are the bid and the ask",
                "It is the fair value of the company",
                "It is the average price paid so far today",
              ],
              answer: 1,
              explain:
                "A print records one agreement at one instant. The only prices you can still trade at are the resting bid and ask, which is why you plan around the quote rather than the last print.",
            },
            feedbackByAnswer: {
              "0": "The price you can buy at now is the ask — the last trade may have happened at a level that no longer exists.",
              "2": "One trade tells you the terms of one agreement, not what the business is worth.",
              "3": "The day's average is a different statistic (VWAP); the last trade is a single point on the tape.",
            },
          },
          {
            skill: "Auction mechanics",
            question: {
              id: "ms-l1-q4",
              type: "truefalse",
              topic: "market-basics",
              prompt:
                "An opening auction prints one single price for every order it matches, unlike continuous trading.",
              answer: true,
              explain:
                "The auction computes one clearing price that matches the greatest volume, so every matched order trades at that price — which is why the open print can sit far from where continuous trading resumes.",
            },
            feedbackByAnswer: {
              true: "Correct — one clearing price for the whole batch, then continuous trading takes over on a thin book.",
              false:
                "That is the defining feature of an auction: many orders, one price, maximum volume matched.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "ms-l1-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Your setup triggers on the open. The quote is 20.13 bid / 20.16 ask — three ticks wide — instead of the usual 20.15 / 20.16.",
          "You intend to trade 1,800 shares and to exit the same day, crossing the quote on both sides.",
        ],
        assessment: {
          items: [
            {
              skill: "Cost of a widened open",
              question: {
                id: "ms-l1-q5",
                type: "numeric",
                topic: "costs",
                prompt:
                  "What does the widened spread cost you in dollars compared with a normal one-tick spread, for one round trip (entry plus exit)?",
                answer: 72,
                tolerance: 1,
                unit: "USD",
                explain:
                  "Wide spread: 0.03 on entry plus 0.03 on exit = 0.06 per share × 1,800 = $108. Normal spread: 0.01 + 0.01 = 0.02 × 1,800 = $36. The difference is $72 for the same trade.",
              },
              feedbackByAnswer: {
                numeric:
                  "Cost at three ticks is 6 cents a share; at one tick it is 2 cents. The 4-cent difference × 1,800 = $72.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "ms-l1-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Name the two windows you will stop chasing price in — the open auction and the first minutes after it — and write what you will do instead when a setup fires there.",
      ],
    },
    {
      kind: "summary",
      id: "ms-l1-b9",
      title: "Recap",
      points: [
        "A quote is an offer; the last trade is a receipt. Plan from the bid and the ask.",
        "Continuous prices move because resting size is consumed level by level, not because everyone re-prices at once.",
        "Auctions batch orders into one clearing price — the open is noisy, the close is heavy.",
        "Any market order is an average you walked to: check the depth before you send size.",
        "A widened open is a scheduled cost, not bad luck.",
      ],
      nextStep:
        "Next lesson: reading the book itself — depth, imbalance, and the orders you cannot see.",
    },
  ],
};
