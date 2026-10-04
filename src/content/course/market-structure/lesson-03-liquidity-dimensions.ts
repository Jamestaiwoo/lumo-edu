import type { CourseLesson } from "../types";

export const lesson03LiquidityDimensions: CourseLesson = {
  id: "ms-l3",
  moduleId: "c5-m1",
  title: "Liquidity: Depth, Spread, Resilience",
  blurb: "A tight spread is one third of the story — depth and healing speed are the rest.",
  objectives: [
    "Measure liquidity on three axes: spread, depth and resilience",
    "Quantify how much size it takes to move price one or two ticks",
    "Show why the same order costs far more when a book thins",
    "Time your order to liquidity instead of demanding it now",
  ],
  durationMinutes: 12,
  xp: 37,
  keyTakeaway:
    "Liquidity is not a number — it is a shape that changes with news, session and time. Depth tells you the price of your size; resilience tells you whether waiting is cheaper.",
  blocks: [
    {
      kind: "explain",
      id: "ms-l3-b1",
      explanation: {
        heading: "Three axes, one market",
        whyItMatters:
          "You will be told a market is 'very liquid'. That sentence is only useful if you can ask which axis is being measured — and it is usually just the spread.",
        paragraphs: [
          "Spread is the price of immediacy: one tick means a small order crosses cheaply, ten ticks means it does not. Depth is how much size must trade before price steps one tick — the book's shock absorber. Resilience is how quickly depth returns after it has been eaten. A market can be excellent on one axis and terrible on another: a two-cent spread with 100 shares at the touch is a trap for anyone sending size.",
          "Depth and spread usually deteriorate together, and fast. News, an unusual order, the open, the close, lunchtime in a seasonal market, or a holiday when one centre is closed — all thin the book and widen the quote at the same moment. This correlation is why stress costs you twice: the quote you cross is worse, and the depth that would have absorbed your order is gone.",
          "Resilience is the axis retail traders ignore. After a shock, market makers need time and information to re-quote: some venues refill in seconds, others take minutes. If your order is patient, resilience is your ally — the same 3,000 shares cost far less worked over five minutes than dumped in the first ten seconds.",
          "Practical reading: convert liquidity into three numbers you can plan with — ticks of spread, shares needed to move price one tick, and the minutes of volume it takes to fill your size at a participation cap. Those three numbers, not a label, decide your size and your execution.",
        ],
        keyTerms: [
          {
            term: "Spread",
            definition: "The cost of crossing the quote — the price of immediacy.",
          },
          {
            term: "Depth",
            definition: "Size required to move the price one tick — the book's shock absorber.",
          },
          {
            term: "Resilience",
            definition: "How fast depth returns after a shock — the axis that rewards patience.",
          },
          {
            term: "Participation cap",
            definition:
              "The maximum share of market volume you allow your own order to be, e.g. 20% of traded volume.",
          },
        ],
        callouts: [
          {
            tone: "pitfall",
            title: "'Tight spread, deep market' is a phrase, not a measurement",
            body: "Measure depth yourself. The size at the touch says almost nothing about the size you can trade without moving price.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "ms-l3-b2",
      example: {
        title: "The same 1,000 shares, before and after a headline",
        setup:
          "Calm book: bids 100.00 (900), 99.99 (1,200), 99.98 (2,400). A shock hits. Stressed book: bids 99.95 (100), 99.94 (150), 99.92 (200), 99.90 (900). You are selling 1,000 shares.",
        steps: [
          {
            label: "Calm: what depth costs",
            detail:
              "Moving the bid two ticks takes 900 + 1,200 = 2,100 shares. Your 1,000 shares are absorbed entirely at 100.00 — no damage.",
          },
          {
            label: "Calm: the fill",
            detail:
              "1,000 × 100.00 = $100,000, plus commission. The quote never moves against you.",
          },
          {
            label: "Stressed: what depth costs",
            detail:
              "Now moving the bid two ticks takes only 100 + 150 = 250 shares. The same order is four times the near depth.",
          },
          {
            label: "Stressed: the fill",
            detail:
              "100 @ 99.95 = $9,995; 150 @ 99.94 = $14,991; 200 @ 99.92 = $19,984; 550 @ 99.90 = $54,945. Total $99,915 — an average of 99.915.",
          },
          {
            label: "The shock's bill",
            detail:
              "The bid had already moved 5 cents away from you, and the walk cost another 3.5 cents: $100,000 − $99,915 = $85 for the same 1,000 shares.",
          },
          {
            label: "Resilience decides the rest",
            detail:
              "Half the normal depth returned in 30 seconds and full depth in about five minutes. Waiting was the cheapest liquidity provider in the building.",
          },
        ],
        takeaway:
          "Nothing about your order changed — the book did. Spread, depth and resilience move together, and the moment they all deteriorate is the moment you least want to send size.",
      },
    },
    {
      kind: "visual",
      id: "ms-l3-b3",
      title: "Liquidity on three axes",
      visual: {
        type: "table",
        label: "Calm versus stressed, same instrument",
        columns: ["Measure", "Calm book", "After the shock"],
        rows: [
          ["Spread", "2 cents (100.00 / 100.02)", "17 cents (99.95 / 100.12)"],
          ["Size to move the bid two ticks", "2,100 shares", "250 shares"],
          [
            "Proceeds on a 1,000-share market sell",
            "$100,000 — all at 100.00",
            "$99,915 — $85 worse",
          ],
          ["Time to restore normal depth", "Seconds", "About 5 minutes"],
          ["Typical cause", "Normal two-way flow", "News, halts, session edges"],
        ],
        caption:
          "One headline moved all three axes at once. Depth fell 88%, the spread widened eightfold, and the market needed minutes to heal.",
      },
    },
    {
      kind: "interactive",
      id: "ms-l3-b4",
      title: "Click through the liquidity states",
      interaction: {
        type: "spread-explorer",
        prompt:
          "Step through the same instrument in four states. Watch the spread — then ask what the depth behind it is doing.",
        unit: "USD",
        caption:
          "The spread is the visible axis. Every state here also changes depth and healing speed, and the widest spreads come with the thinnest books.",
        levels: [
          {
            name: "Calm, mid-session",
            note: "2-cent spread, 2,100 shares to move the bid two ticks. Normal two-way flow; depth refills instantly.",
            bid: 100.0,
            ask: 100.02,
          },
          {
            name: "Active news day",
            note: "3-cent spread on heavier volume. More trades, slightly thinner near depth — activity is not the same as depth.",
            bid: 100.0,
            ask: 100.03,
          },
          {
            name: "Headline shock",
            note: "17-cent spread and 250 shares of near depth. Spreads and depth collapse together; market makers are re-pricing risk.",
            bid: 99.95,
            ask: 100.12,
          },
          {
            name: "Recovery, five minutes later",
            note: "5-cent spread with depth rebuilding. Resilience is doing the work — a patient order pays less than an impatient one.",
            bid: 99.98,
            ask: 100.03,
          },
        ],
      },
      takeaway:
        "Spread is one axis of three. Before you judge a market liquid, ask how much size moves price and how long the book takes to heal.",
    },
    {
      kind: "practice",
      id: "ms-l3-b5",
      title: "Guided practice",
      assessment: {
        intro: "Turn 'liquidity' into numbers you can act on.",
        allowRetry: true,
        items: [
          {
            skill: "Depth measurement",
            question: {
              id: "ms-l3-q1",
              type: "numeric",
              topic: "liquidity",
              prompt:
                "In the calm book (bids 100.00/900, 99.99/1,200, 99.98/2,400), how many shares must be sold at market to move the bid two ticks?",
              answer: 2100,
              tolerance: 1,
              unit: "shares",
              explain:
                "The 100.00 and 99.99 levels together hold 900 + 1,200 = 2,100 shares. That total is the book's depth to two ticks.",
            },
            feedbackByAnswer: {
              numeric: "Add the two top bid levels: 900 + 1,200 = 2,100 shares.",
            },
          },
          {
            skill: "Cost of a thinned book",
            question: {
              id: "ms-l3-q2",
              type: "numeric",
              topic: "costs",
              prompt:
                "The calm book would return $100,000 on a 1,000-share sell. In the stressed book the same order returns $99,915. How many dollars worse off is the seller?",
              answer: 85,
              tolerance: 1,
              unit: "USD",
              explain:
                "The stressed fills average 99.915 rather than 100.00: $100,000 − $99,915 = $85 for the identical order. Part is the moved bid (5 cents) and part is the walk (3.5 cents).",
            },
            feedbackByAnswer: {
              numeric:
                "100,000 − 99,915 = 85. The quote moved 5 cents and the walk cost 3.5 cents per share.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "ms-l3-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Defining liquidity",
            question: {
              id: "ms-l3-q3",
              type: "mcq",
              topic: "liquidity",
              prompt: "Which combination best describes a genuinely liquid market?",
              options: [
                "A narrow spread on its own",
                "High daily volume on its own",
                "A narrow spread, depth that absorbs size without moving price, and fast recovery after shocks",
                "A market that only ever moves in one direction",
              ],
              answer: 2,
              explain:
                "Liquidity has three axes. Spread is the cost of immediacy, depth is how much size price absorbs before moving, and resilience is how quickly depth returns. A market can look cheap on one axis and be unusable on the others.",
            },
            feedbackByAnswer: {
              "0": "A one-tick spread with 100 shares at the touch is the classic trap: cheap for a small order, expensive for yours.",
              "1": "Volume counts trades, not resting depth. A busy but thin market still moves sharply on modest size.",
              "3": "One-way moves are usually thin books being walked, not liquidity — they are the symptom of its absence.",
            },
          },
          {
            skill: "Reading a quote",
            question: {
              id: "ms-l3-q4",
              type: "truefalse",
              topic: "liquidity",
              prompt:
                "If a market shows a very tight spread, you can assume there is deep liquidity behind it.",
              answer: false,
              explain:
                "The spread describes the top of the book only. Depth can be a few hundred shares even with a one-cent spread — the two axes are measured separately.",
            },
            feedbackByAnswer: {
              true: "That assumption is exactly what makes thin books expensive: the quote looks cheap, the book is not.",
              false: "Correct — spread is the price of the first share, not of your order.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "ms-l3-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You must sell 3,000 shares after a shock. The book is still healing: half depth for the first 30 seconds, full depth after about five minutes.",
          "Traded volume is running at 6,000 shares per minute, and you cap your own order at 20% of volume.",
        ],
        assessment: {
          items: [
            {
              skill: "Timing an order to liquidity",
              question: {
                id: "ms-l3-q5",
                type: "numeric",
                topic: "execution",
                prompt:
                  "Working at the 20% participation cap, how many minutes does the 3,000-share order take to fill?",
                answer: 2.5,
                tolerance: 0.1,
                unit: "minutes",
                explain:
                  "20% of 6,000 shares a minute is 1,200 shares a minute. 3,000 ÷ 1,200 = 2.5 minutes — comfortably past the 30-second half-depth window, so most of the order fills into healed liquidity.",
              },
              feedbackByAnswer: {
                numeric:
                  "Participation = 0.20 × 6,000 = 1,200 shares a minute. 3,000 ÷ 1,200 = 2.5 minutes of working time.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "ms-l3-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Pick the one instrument you trade most. Write the participation cap you will use so your own order never becomes a market event.",
      ],
    },
    {
      kind: "summary",
      id: "ms-l3-b9",
      title: "Recap",
      points: [
        "Liquidity has three axes: spread (cost of immediacy), depth (shock absorber), resilience (healing speed).",
        "Spread and depth deteriorate together — in stress you pay twice.",
        "Depth is measurable: count the shares needed to move price a tick or two.",
        "Resilience rewards patience: the same order worked over minutes costs less than the same order dumped in seconds.",
        "Set a participation cap so your size never becomes its own market event.",
      ],
      nextStep:
        "Next lesson: slippage itself — where it comes from, how to measure it, and how stops make it worse.",
    },
  ],
};
