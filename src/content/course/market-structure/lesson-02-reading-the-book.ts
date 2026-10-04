import type { CourseLesson } from "../types";

export const lesson02ReadingTheBook: CourseLesson = {
  id: "ms-l2",
  moduleId: "c5-m1",
  title: "Reading the Order Book",
  blurb: "Displayed size is a floor, not a promise — and the depth behind it is the real story.",
  objectives: [
    "Read depth, touch size and level spacing from a book",
    "Explain hidden and iceberg liquidity, and how quotes flicker",
    "Use imbalance as a pressure gauge rather than a forecast",
    "Price a large order against the book before sending it",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "The inside quote tells you the price of a small order. Depth and its distance from the touch tell you the price of yours.",
  blocks: [
    {
      kind: "explain",
      id: "ms-l2-b1",
      explanation: {
        heading: "Depth is the market's real muscle",
        whyItMatters:
          "Most trading mistakes are sizing mistakes against a book nobody read. Two markets can show the same one-cent spread and cost you ten times as much to trade.",
        paragraphs: [
          "A book has three readable features: the touch (size resting at the best bid and offer), the depth (size at each level behind it), and the spacing (how many ticks apart those levels sit). The touch answers 'what does a small order cost?'. Depth and spacing answer 'what does my order cost?'.",
          "Displayed size is a floor, not a promise. Participating venues let large orders hide or display only a fraction — an iceberg shows 100 shares while 5,000 sit behind it — and some quotes are cancelled within milliseconds. A meaningful share of resting liquidity routinely disappears before an order can reach it, which is why aggressive fills are usually worse than the arithmetic on the screen suggests.",
          "Flickering quotes are a strategy, not a glitch. Large bids are sometimes posted to look like support and pulled the moment flow arrives; genuine market makers also cancel and re-post constantly to manage inventory. From outside you cannot tell intent, so treat any single level as a possibility rather than a promise.",
          "Imbalance — total bid size against ask size near the touch — is a pressure gauge. When bids visibly outweigh offers, a move meets more friction on the way down; when offers stack, it meets friction on the way up. It is not a forecast, because the sizes you can see can be withdrawn.",
          "Read the book for cost and structure, never for secrets: where is the first wall, how far away is the next level, and how much size must trade to move price one tick? Those three answers size your order honestly.",
        ],
        keyTerms: [
          {
            term: "Touch",
            definition: "The best bid and best ask, with the size resting at each.",
          },
          {
            term: "Depth",
            definition:
              "Aggregated size across the levels behind the touch — how much flow the book absorbs before price steps.",
          },
          {
            term: "Iceberg order",
            definition:
              "A large order that displays only a small portion while the remainder sits hidden.",
          },
          {
            term: "Imbalance",
            definition:
              "Near-touch bid size against ask size — a friction gauge, not a directional signal.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "The level you see may not be there",
            body: "Any displayed size can be cancelled before your order arrives. Plan the fill you can tolerate, not the fill the screen implies.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "ms-l2-b2",
      example: {
        title: "A 1,000-share buy on a thin touch",
        setup:
          "ORCA shows 42.10 bid / 42.12 ask. Only 100 shares are offered at 42.12, then 150 at 42.13, 400 at 42.14 and 1,500 at 42.15. You send a market order for 1,000 shares.",
        steps: [
          {
            label: "The touch empties instantly",
            detail: "100 shares fill at 42.12: 100 × 42.12 = $4,212.",
          },
          {
            label: "One tick higher",
            detail:
              "150 shares fill at 42.13: 150 × 42.13 = $6,319.50. Two levels consumed, 250 shares done.",
          },
          {
            label: "Two ticks higher",
            detail: "400 shares fill at 42.14: 400 × 42.14 = $16,856. That is 650 shares done.",
          },
          {
            label: "Finishing the order",
            detail:
              "The last 350 shares fill at 42.15: 350 × 42.15 = $14,802.50. The book never ran out — the order simply had to climb.",
          },
          {
            label: "Your average",
            detail:
              "$4,212 + $6,319.50 + $16,856 + $14,802.50 = $42,190 for 1,000 shares — an average of 42.19.",
          },
          {
            label: "The bill for impatience",
            detail:
              "$42,190 − (1,000 × 42.12) = $70 of slippage. The spread never changed; the depth did the damage.",
          },
        ],
        takeaway:
          "In a market where 1,000 shares rest at the touch, this order costs nothing extra. You did not pay the spread — you paid for a thin book.",
      },
    },
    {
      kind: "visual",
      id: "ms-l2-b3",
      title: "The book you just walked",
      visual: {
        type: "order-book",
        book: {
          label: "ORCA · simulated order book",
          unit: "shares",
          asks: [
            { price: 42.12, size: 100 },
            { price: 42.13, size: 150 },
            { price: 42.14, size: 400 },
            { price: 42.15, size: 1500 },
          ],
          bids: [
            { price: 42.1, size: 200 },
            { price: 42.09, size: 300 },
            { price: 42.08, size: 600 },
            { price: 42.07, size: 2400 },
          ],
        },
        caption:
          "A one-cent spread with almost nothing at the touch. Above the ask, the depth sits two and three ticks away — cheap for small orders, expensive for yours.",
      },
    },
    {
      kind: "interactive",
      id: "ms-l2-b4",
      title: "Read it before you send it",
      interaction: {
        type: "order-book-decision",
        prompt:
          "You need 1,000 ORCA shares within two minutes. The book above is what you see. Which instruction is consistent with it?",
        book: {
          label: "ORCA · live book",
          unit: "shares",
          asks: [
            { price: 42.12, size: 100 },
            { price: 42.13, size: 150 },
            { price: 42.14, size: 400 },
            { price: 42.15, size: 1500 },
          ],
          bids: [
            { price: 42.1, size: 200 },
            { price: 42.09, size: 300 },
            { price: 42.08, size: 600 },
            { price: 42.07, size: 2400 },
          ],
        },
        choices: [
          {
            label:
              "Send a limit at 42.14 for most of the size and lift only the part you must have today",
            outcome:
              "You take 250 shares immediately up to 42.13 and rest the balance at 42.14 — inside the level that already holds 400 shares.",
            best: true,
            feedback:
              "Correct — you priced the depth. Your cap is one level into the thickest near-side size, and the remainder works for you instead of chasing.",
          },
          {
            label: "Send one market order for 1,000 shares",
            outcome:
              "You fill 100 at 42.12, 150 at 42.13, 400 at 42.14 and 350 at 42.15 — an average of 42.19.",
            best: false,
            feedback:
              "The arithmetic is exactly what the book implies: $70 above the touch for speed you were not required to buy. If you must have the fill, this is the price of it — not a mistake, but a bill.",
          },
          {
            label: "Send a market order for 5,000 shares to fill the position in one go",
            outcome:
              "The visible book above 42.12 holds about 2,150 shares; the rest of your order walks into levels you never saw.",
            best: false,
            feedback:
              "This is how size destroys its own price. An order several times the visible depth is a market-moving event — slice it, or expect the market to charge you for it.",
          },
        ],
      },
      takeaway:
        "Compare your size to the size resting in front of you. When your order is a large fraction of the visible book, you are the market — and you will pay to be it.",
    },
    {
      kind: "practice",
      id: "ms-l2-b5",
      title: "Guided practice",
      assessment: {
        intro: "Walk the book before you send anything.",
        allowRetry: true,
        items: [
          {
            skill: "Slippage against a thin touch",
            question: {
              id: "ms-l2-q1",
              type: "numeric",
              topic: "slippage",
              prompt:
                "Using the ORCA book above, what is the slippage in dollars of a 1,000-share market buy measured against the 42.12 best ask?",
              answer: 70,
              tolerance: 1,
              unit: "USD",
              explain:
                "The order walks to 42.19 on average: $42,190 paid against 1,000 × 42.12 = $42,120 at the touch. The difference is $70.",
            },
            feedbackByAnswer: {
              numeric: "Average fill 42.19 versus 42.12 = 0.07 per share × 1,000 = $70.",
            },
          },
          {
            skill: "Average fill price",
            question: {
              id: "ms-l2-q2",
              type: "numeric",
              topic: "slippage",
              prompt: "What average price does that 1,000-share market buy actually fill at?",
              answer: 42.19,
              tolerance: 0.01,
              unit: "USD",
              explain:
                "$4,212 + $6,319.50 + $16,856 + $14,802.50 = $42,190 ÷ 1,000 = 42.19 — seven cents above the quote you looked at.",
            },
            feedbackByAnswer: {
              numeric:
                "Total cost $42,190 across 1,000 shares = 42.19. The touch price only applied to the first 100 shares.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "ms-l2-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Displayed vs available liquidity",
            question: {
              id: "ms-l2-q3",
              type: "mcq",
              topic: "liquidity",
              prompt: "Why is displayed depth treated as a floor rather than a promise?",
              options: [
                "Because prices are rounded to the nearest tick",
                "Because hidden orders can sit behind the display and displayed quotes can be cancelled before your order arrives",
                "Because the exchange removes orders at random to keep markets fair",
                "Because only market makers can see real size",
              ],
              answer: 1,
              explain:
                "Displayed size is a minimum of what may be there: icebergs hide most of a large order, and resting quotes are routinely cancelled in milliseconds. Real available liquidity can therefore be better or worse than the screen — never assumed equal to it.",
            },
            feedbackByAnswer: {
              "0": "Tick size affects price increments, not how much size is genuinely available.",
              "2": "There is no random removal — cancellations are made by the participants who posted the orders.",
              "3": "Everyone sees broadly the same public book; the advantage is speed and order-type access, not a secret feed.",
            },
          },
          {
            skill: "Support that is displayed",
            question: {
              id: "ms-l2-q4",
              type: "truefalse",
              topic: "liquidity",
              prompt: "A large bid resting in the book guarantees that price will hold as support.",
              answer: false,
              explain:
                "A displayed bid can be cancelled the instant selling arrives, and it only absorbs size up to its own quantity. Treat big levels as information about friction, not as a floor under your position.",
            },
            feedbackByAnswer: {
              true: "Big displayed bids are withdrawn in milliseconds all the time — sizing your risk on a quote you do not control is the classic mistake.",
              false:
                "Correct — a resting bid only tells you what someone was willing to do until they changed their mind.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "ms-l2-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "A fund holds 3,000 ORCA shares and must liquidate them into the same book: bids 42.10 (200), 42.09 (300), 42.08 (600), 42.07 (2,400).",
          "There is no time to work the order — it has to go as one market sell.",
        ],
        assessment: {
          items: [
            {
              skill: "Average exit price on size",
              question: {
                id: "ms-l2-q5",
                type: "numeric",
                topic: "slippage",
                prompt:
                  "What average price does the 3,000-share market sell achieve? Give your answer to two decimal places.",
                answer: 42.08,
                tolerance: 0.01,
                unit: "USD",
                explain:
                  "Fills: 200 × 42.10 = $8,420; 300 × 42.09 = $12,627; 600 × 42.08 = $25,248; 1,900 × 42.07 = $79,933. Total $126,228 ÷ 3,000 = 42.076, which rounds to 42.08 — about 2.4 cents below the best bid it started at.",
              },
              feedbackByAnswer: {
                numeric:
                  "Total proceeds $126,228 across 3,000 shares = 42.076. The last 1,900 shares filled at 42.07, which pulls the average below the touch.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "ms-l2-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Write the order size at which you will stop using market orders, expressed as a fraction of the visible size at the touch.",
      ],
    },
    {
      kind: "summary",
      id: "ms-l2-b9",
      title: "Recap",
      points: [
        "Read three things: touch size, depth behind it, and how many ticks away that depth sits.",
        "Displayed size is a floor — icebergs hide liquidity and quotes flicker away before you reach them.",
        "Imbalance near the touch measures friction for a move; it never predicts direction.",
        "Price your order against the book: average fill, not the touch, is your real entry or exit.",
        "When your order is large relative to the visible book, you are the market — and you pay to be it.",
      ],
      nextStep:
        "Next lesson: liquidity in three dimensions — depth, spread and how fast the book heals after a shock.",
    },
  ],
};
