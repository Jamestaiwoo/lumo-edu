import type { CourseLesson } from "../types";

export const lesson04SlippageMechanics: CourseLesson = {
  id: "ms-l4",
  moduleId: "c5-m2",
  title: "Slippage Mechanics",
  blurb: "Slippage is not bad luck — it is size, speed and depth meeting at the worst moment.",
  objectives: [
    "Define slippage against a measurable arrival price",
    "Split a real fill into spread cost and impact cost",
    "Explain adverse selection and why fills are worst when you need them most",
    "Quantify the extra loss a stop suffers in a fast move",
  ],
  durationMinutes: 12,
  xp: 37,
  keyTakeaway:
    "Slippage = spread cost + impact cost, and impact is the part you control by how much size you demand relative to the depth resting in front of you.",
  blocks: [
    {
      kind: "explain",
      id: "ms-l4-b1",
      explanation: {
        heading: "Where the missing money goes",
        whyItMatters:
          "Traders track their entry, their stop and their P&L in the same journal and still cannot explain the gap. Slippage is the gap — and it is measurable.",
        paragraphs: [
          "Slippage is the difference between the price you expected and the average price you actually got, measured against a fixed reference. The standard reference is the arrival price: the mid-market price at the instant you decided to trade, before your order touched the book. Measuring a fill against the price you saw later is how traders fool themselves.",
          "Every immediate fill pays two things. First, the spread: crossing from the mid to the far side costs roughly half a spread. Second, impact: your own order consumes resting size level by level, so the average fill drifts past the best quote. Impact is proportional to your size relative to the depth resting in front of you — double the order against the same book and the impact roughly doubles, not linearly but decisively.",
          "Then there is adverse selection. You are most likely to be filled instantly at a good-looking price exactly when someone better informed is taking the other side, and most likely to be left unfilled when the price is about to run without you. This is why limit orders that always seem to fill are the ones that preceded a move against you, while the ones that would have been brilliant never filled.",
          "Stops are the worst offenders. A stop is dormant until price touches it, then becomes a market order during the very moment liquidity thins — fast moves, thin windows, gap opens. The size that was resting when you placed the stop has often been withdrawn by the time it triggers.",
          "The fix is not a better order type but an honest measurement habit: record the arrival mid, the average fill, and split the difference into spread and impact. Once your own numbers show where cost accumulates, execution decisions stop being a matter of taste.",
        ],
        keyTerms: [
          {
            term: "Arrival price",
            definition:
              "The mid-market price at the moment you decided to trade — the reference for measuring slippage.",
          },
          {
            term: "Impact cost",
            definition: "The part of slippage caused by your own order consuming resting depth.",
          },
          {
            term: "Adverse selection",
            definition:
              "Systematically trading against better-informed flow: you fill when you should not, and miss when you should fill.",
          },
          {
            term: "Spread cost",
            definition: "The half-spread you pay to cross the quote immediately.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "Stops do not protect against slippage",
            body: "A stop becomes a market order when it triggers, precisely when the book is thinnest. It caps your plan, not your loss.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "ms-l4-b2",
      example: {
        title: "A 2,000-share buy, split into its two costs",
        setup:
          "ACME is quoted 49.99 bid / 50.01 ask; the arrival mid is 50.00. The book holds 800 shares at 50.01, 700 at 50.02 and 500 at 50.03. You send a market order for 2,000 shares.",
        steps: [
          {
            label: "The arrival reference",
            detail:
              "Arrival mid = 50.00 (the midpoint of 49.99 and 50.01), fixed the moment you pressed buy. Everything is measured from here.",
          },
          {
            label: "Spread cost",
            detail:
              "You cross from the mid to the ask: 0.01 × 2,000 = $20. That is the price of immediacy, paid by every market order.",
          },
          {
            label: "The walk",
            detail:
              "800 shares fill at 50.01 ($40,008), 700 at 50.02 ($35,014) and 500 at 50.03 ($25,015) — total $100,037 for 2,000 shares.",
          },
          {
            label: "Average fill",
            detail: "$100,037 ÷ 2,000 = 50.0185 — 1.85 cents above your arrival mid.",
          },
          {
            label: "Impact cost",
            detail:
              "$100,037 − (2,000 × 50.01) = $17 beyond the best ask. Impact is the price of demanding 2,000 shares from a book whose touch held 800.",
          },
          {
            label: "The two parts add up",
            detail:
              "$20 spread + $17 impact = $37 total slippage, which is exactly 2,000 × (50.0185 − 50.00).",
          },
        ],
        takeaway:
          "Spread is a toll you always pay. Impact is a bill you choose — it scales with your size against the depth in front of you, and it is the part you can shrink.",
      },
    },
    {
      kind: "visual",
      id: "ms-l4-b3",
      title: "The book that produced the 50.0185 average",
      visual: {
        type: "order-book",
        book: {
          label: "ACME · simulated order book",
          unit: "shares",
          asks: [
            { price: 50.01, size: 800 },
            { price: 50.02, size: 700 },
            { price: 50.03, size: 500 },
          ],
          bids: [
            { price: 49.99, size: 900 },
            { price: 49.98, size: 1300 },
            { price: 49.97, size: 2000 },
          ],
        },
        caption:
          "The touch held 800 shares; the order asked for 2,000. The remaining 1,200 shares had to buy their way two ticks up the ladder — that is impact.",
      },
    },
    {
      kind: "interactive",
      id: "ms-l4-b4",
      title: "Watch a stop become a market order",
      interaction: {
        type: "order-type-simulator",
        prompt:
          "ACME is quoted 49.99 bid / 50.01 ask. You hold a long position with a stop at 49.95. Step the market forward tick by tick and watch what your stop actually does.",
        symbol: "ACME",
        unit: "shares",
        bid: 49.99,
        ask: 50.01,
        ticks: [50.0, 50.02, 50.05, 50.09, 50.04, 50.01, 49.97, 49.95, 49.92, 49.96],
      },
      takeaway:
        "The stop only becomes an order once price is already moving against you — and by then the depth it needs has usually stepped away. Size for the fill you may get, not the price you typed.",
    },
    {
      kind: "practice",
      id: "ms-l4-b5",
      title: "Guided practice",
      assessment: {
        intro: "Split the fill into the two costs that produced it.",
        allowRetry: true,
        items: [
          {
            skill: "Total slippage against arrival",
            question: {
              id: "ms-l4-q1",
              type: "numeric",
              topic: "slippage",
              prompt:
                "ACME's arrival mid is 50.00. Your 2,000-share market buy averages 50.0185. How many dollars of total slippage did you pay?",
              answer: 37,
              tolerance: 0.5,
              unit: "USD",
              explain:
                "Slippage = (50.0185 − 50.00) × 2,000 = $37 — the combined cost of crossing the spread and walking the book.",
            },
            feedbackByAnswer: {
              numeric: "1.85 cents per share × 2,000 shares = $37.",
            },
          },
          {
            skill: "Isolating impact cost",
            question: {
              id: "ms-l4-q2",
              type: "numeric",
              topic: "slippage",
              prompt:
                "Of that $37, how many dollars are impact — the cost of walking above the 50.01 best ask — rather than spread?",
              answer: 17,
              tolerance: 0.5,
              unit: "USD",
              explain:
                "$100,037 paid − 2,000 × 50.01 = $17 sits above the best ask. The remaining $20 is the half-spread crossed on all 2,000 shares.",
            },
            feedbackByAnswer: {
              numeric:
                "Take the total $37 and remove the half-spread: 0.01 × 2,000 = $20, so impact = 37 − 20 = $17.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "ms-l4-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Drivers of slippage",
            question: {
              id: "ms-l4-q3",
              type: "mcq",
              topic: "slippage",
              prompt: "What mainly determines how much slippage your market order suffers?",
              options: [
                "The direction you predicted correctly",
                "Your order size relative to the depth resting in the book, plus the spread you cross",
                "The commission schedule of your broker",
                "The number of indicators on your chart",
              ],
              answer: 1,
              explain:
                "Impact scales with size against resting depth and the spread toll is fixed by the quote. Neither depends on your forecast being right — which is why two identical opinions can produce very different execution costs.",
            },
            feedbackByAnswer: {
              "0": "Being right improves your P&L, not your fill quality; slippage is paid either way.",
              "2": "Commission is a separate, usually smaller line item — slippage shows up in the average fill price.",
              "3": "Indicators describe the market, not the depth your order has to consume.",
            },
          },
          {
            skill: "Stops and slippage",
            question: {
              id: "ms-l4-q4",
              type: "truefalse",
              topic: "execution",
              prompt: "A stop order guarantees the price at which you exit a losing trade.",
              answer: false,
              explain:
                "A stop only becomes an order once price reaches it, and it then fills at whatever the book offers. In fast moves and thin windows that is measurably worse than the stop price, so the loss can exceed your plan.",
            },
            feedbackByAnswer: {
              true: "This is the assumption that breaks account plans: the stop is an instruction, not a guaranteed price.",
              false:
                "Correct — stops convert to market orders at the moment depth is most likely to have vanished.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "ms-l4-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You are long 1,200 ACME shares with a stop resting at 49.95. A fast move triggers it.",
          "The stop becomes a market order and fills at an average of 49.91 across the thin book.",
        ],
        assessment: {
          items: [
            {
              skill: "Cost of a slipped stop",
              question: {
                id: "ms-l4-q5",
                type: "numeric",
                topic: "slippage",
                prompt: "How many dollars beyond your stop price did the fill cost you?",
                answer: 48,
                tolerance: 0.5,
                unit: "USD",
                explain:
                  "(49.95 − 49.91) × 1,200 = 0.04 × 1,200 = $48. Your planned risk ended at the stop; $48 of it happened after the trigger, which is why sizing uses the fill you might get, not the price you typed.",
              },
              feedbackByAnswer: {
                numeric: "Four cents of slippage per share × 1,200 shares = $48.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "ms-l4-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "In your last trade, write down where the loss actually went: spread, impact, or a stop that filled past its price.",
      ],
    },
    {
      kind: "summary",
      id: "ms-l4-b9",
      title: "Recap",
      points: [
        "Measure slippage against the arrival mid, not against the price you remember seeing.",
        "Every fill carries spread cost; only impact scales with your size against resting depth.",
        "Adverse selection means good-looking instant fills cluster around bad information.",
        "Stops become market orders in the thinnest moments — plan for a worse fill, or exit before the crowd.",
        "Log arrival price, average fill, and the two cost components; that ledger is your execution edge.",
      ],
      nextStep:
        "Next lesson: the full cost ledger — spread, commission, slippage, financing and fees in one account.",
    },
  ],
};
