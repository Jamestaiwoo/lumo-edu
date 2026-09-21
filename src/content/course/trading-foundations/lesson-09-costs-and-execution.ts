import type { CourseLesson } from "../types";

export const lesson09CostsAndExecution: CourseLesson = {
  id: "tf-l9",
  moduleId: "c1-m3",
  title: "Fees, Slippage & Execution",
  blurb: "Costs are the only part of trading that is certain. Budget them.",
  objectives: [
    "Name the four costs attached to a round trip",
    "Define slippage and explain what causes it",
    "Estimate what costs do to a strategy over many trades",
    "Choose execution that lowers cost without changing the idea",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Every cost is charged per trade, so costs scale with how often you trade. Frequency multiplies friction far faster than it multiplies edge.",
  blocks: [
    {
      kind: "explain",
      id: "tf-l9-b1",
      explanation: {
        heading: "Four costs, and only one of them appears on a statement",
        whyItMatters:
          "Beginners evaluate trades on the price move alone and are puzzled when a profitable-looking month ends flat. Costs are not an afterthought — they are a subtraction you can estimate before you ever place the order.",
        paragraphs: [
          "The first cost is the spread, and it is invisible because it is embedded in the price you receive. It is charged when you enter and again when you exit, so any round trip pays it twice. The second is commission, an explicit fee per order or per share. The third is slippage: the difference between the price you expected and the price you actually got. The fourth appears in some markets only — financing or overnight funding charges, borrow fees for short positions, and currency conversion.",
          "Slippage has three main causes and they usually arrive together. Size: your order consumes more levels than you assumed. Speed: the market moved between your decision and your fill. Thinness: there was not much resting size to begin with. A fourth cause is a gap — an event that repriced the asset while markets were closed, so your stop triggered far from its level and your fill was nothing like it.",
          "Execution is the craft of managing those costs. It includes choosing the order type, deciding whether to slice a large order, avoiding the first and last minutes of a session when spreads are widest, and knowing whether you are trading something deep enough for your size. A useful habit is to ask, before every order: what does the spread cost me in money and as a percentage, and how much of the visible depth does my order eat?",
          "The compounding effect is what makes this lesson important. Costs are charged per trade, so a strategy that trades twice a day pays ten times the friction of one that trades twice a week, with no guarantee of ten times the edge. A small average advantage per trade can be completely consumed by friction, and this is the most common reason that a method which looks profitable on a chart does not survive contact with a live account.",
          "Reducing cost rarely requires cleverness. Trade less frequently, choose instruments with tight spreads and real depth, prefer limit orders when you are not in a hurry, avoid trading into scheduled announcements you do not understand, and size positions relative to what the book can absorb. None of these change your analysis. Together they can decide whether your analysis ever gets a chance to pay.",
        ],
        keyTerms: [
          {
            term: "Commission",
            definition:
              "An explicit fee charged per order, per share or per contract. It is the only cost printed on a statement.",
          },
          {
            term: "Slippage",
            definition: "The gap between the price you expected and the price you received.",
          },
          {
            term: "Market impact",
            definition: "The movement your own order causes as it consumes resting liquidity.",
          },
          {
            term: "Gap",
            definition:
              "A price jump caused by news arriving while the market was closed, skipping over levels entirely.",
          },
          {
            term: "Cost drag",
            definition: "The cumulative effect of all trading costs on returns over many trades.",
          },
          {
            term: "Depth",
            definition:
              "The size resting at each price level. Depth determines how much you can trade before you move the price.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "High-frequency ideas die of friction",
            body: "A method that requires dozens of trades a day must clear the spread, any commission and slippage on every one of them. Most retail approaches cannot.",
          },
          {
            tone: "info",
            title: "Estimate before you trade",
            body: "Spread in dollars, plus commission, plus a realistic slippage estimate, gives you the break-even move for that trade. If the target is smaller than the cost, the trade is already a loss.",
          },
        ],
      },
    },
    {
      kind: "visual",
      id: "tf-l9-b2",
      title: "What a single round trip costs",
      visual: {
        type: "table",
        label: "Estimated cost of one round trip on a $1,000 position",
        columns: ["Market", "Spread cost", "Commission", "Slippage", "Total", "% of position"],
        rows: [
          ["Deep large-cap ETF", "$0.05", "$0.00", "$0.00", "$0.05", "0.01%"],
          ["Large-cap share", "$0.22", "$1.00", "$0.05", "$1.27", "0.13%"],
          ["Mid-cap share", "$4.74", "$1.00", "$0.60", "$6.34", "0.63%"],
          ["Small-cap share", "$196", "$1.00", "$18", "$215", "21.5%"],
        ],
        caption:
          "The same decision, four different markets. Spread cost here is counted twice, because a round trip crosses the spread on entry and again on exit. The move you are trying to capture has not changed at all.",
      },
    },
    {
      kind: "example",
      id: "tf-l9-b3",
      example: {
        title: "Sixty round trips, one thousand dollars",
        setup:
          "A trader commits $1,000 of capital per trade and takes about three trades a day. Spread, commission and slippage together cost roughly $10 per round trip in the market they use.",
        steps: [
          { label: "Daily cost", detail: "3 round trips × $10 = $30 per day." },
          { label: "Weekly cost", detail: "$30 × 5 sessions = $150." },
          {
            label: "Monthly cost",
            detail:
              "$150 × 4 = $600 on $1,000 of capital — 60% of the capital committed, every month.",
          },
          {
            label: "The gross gain that was needed",
            detail:
              "The trader's analysis has to produce more than $600 a month before they break even. That is a 60% monthly return on the capital in use, which almost nothing achieves.",
          },
          {
            label: "The fix that is not cleverness",
            detail:
              "Halving the number of trades halves the cost. Choosing a market where the same trade costs $1 rather than $10 removes 90% of it. Neither change touches the analysis.",
          },
        ],
        takeaway:
          "Frequency is a cost multiplier, not a skill. Before adding trades, work out what the existing ones already cost you.",
      },
    },
    {
      kind: "interactive",
      id: "tf-l9-b4",
      title: "Cost-aware execution",
      interaction: {
        type: "order-type-simulator",
        prompt:
          "ORCA is quoted 3.40 bid / 3.75 ask — a 10% spread. Run an order and watch how differently a market order and a limit order behave in a market this thin.",
        symbol: "ORCA",
        unit: "shares",
        bid: 3.4,
        ask: 3.75,
        ticks: [3.4, 3.38, 3.35, 3.3, 3.34, 3.42, 3.5],
      },
      takeaway:
        "In a wide market, the order type is not a preference — it is most of the trade's cost. Crossing a 10% spread twice is a 20% handicap.",
    },
    {
      kind: "practice",
      id: "tf-l9-b5",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "Defining slippage",
            question: {
              id: "tf-l9-q1",
              type: "mcq",
              topic: "slippage",
              prompt: "Which description of slippage is accurate?",
              options: [
                "The commission a broker charges per order",
                "The difference between the price you expected and the price you actually received",
                "The interest charged on borrowed funds",
                "A penalty the exchange applies to large orders",
              ],
              answer: 1,
              explain:
                "Slippage is an outcome, not a fee. It grows with your size, with market speed and with how thin the book is — which is why it is hardest to control exactly when you need control most.",
            },
            hint: "Think about what you expected versus what the fill says.",
            feedbackByAnswer: {
              "0": "Commission is a stated fee. Slippage is the unstated difference between plan and execution.",
              "2": "That is financing, a separate cost that applies to borrowed positions and some derivatives.",
              "3": "No venue fines you for size, but your own order can move the market against itself.",
            },
          },
          {
            skill: "Counting the cost drag",
            question: {
              id: "tf-l9-q2",
              type: "numeric",
              topic: "costs",
              prompt:
                "Forty round trips cost $7.50 each in spread, commission and slippage. What is the total cost drag for the month, in dollars?",
              answer: 300,
              tolerance: 0.5,
              unit: "dollars",
              explain:
                "40 × $7.50 = $300. That amount has to be earned back by the analysis before any of it becomes profit.",
            },
            hint: "Multiply the number of round trips by the cost of one.",
            feedbackByAnswer: {
              numeric:
                "40 round trips × $7.50 = $300. Costs scale with trade count, not with how good the idea was.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tf-l9-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Lowering cost",
            question: {
              id: "tf-l9-q3",
              type: "mcq",
              topic: "execution",
              prompt: "Which change reduces cost drag without altering your analysis?",
              options: [
                "Trading a more liquid instrument with a tighter spread",
                "Taking more trades to make back the costs",
                "Increasing position size so costs are a smaller percentage",
                "Removing your stop so fewer orders are placed",
              ],
              answer: 0,
              explain:
                "Cost is proportional to how much you cross the spread, in which market and how often. Choosing a deeper market attacks the cause rather than the symptom.",
            },
            feedbackByAnswer: {
              "1": "More trades means more cost, not less. Frequency is the multiplier you are trying to reduce.",
              "2": "Bigger size usually means more slippage and market impact, so the percentage does not fall the way you hope.",
              "3": "Removing the stop changes your risk, not your costs — and it removes the number that made the trade survivable.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tf-l9-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You have a method that produces many small trades a day in small-cap stocks, where the spread is often 8% and there is very little resting size.",
          "Backtests of the pattern look encouraging because they measure price movement only.",
        ],
        assessment: {
          items: [
            {
              skill: "Diagnosing cost drag",
              question: {
                id: "tf-l9-q4",
                type: "mcq",
                topic: "fees",
                prompt:
                  "What is the most likely explanation for the gap between the backtest and live results?",
                options: [
                  "The pattern stopped working because other traders found it",
                  "Every round trip pays a wide spread and meaningful slippage, and the edge per trade is smaller than that cost",
                  "Commissions are the entire difference",
                  "The backtest used different candles",
                ],
                answer: 1,
                explain:
                  "When costs per trade exceed the average edge per trade, a high-frequency method loses money no matter how good the pattern looks. Estimating costs before trading is what separates a promising idea from a viable one.",
              },
              feedbackByAnswer: {
                "0": "Crowded patterns do degrade, but that explanation skips the arithmetic you can check today.",
                "2": "Commissions are usually the smallest of the three costs. The spread and slippage dominate in thin markets.",
                "3": "Chart settings do not change what a round trip costs in a market with an 8% spread.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tf-l9-b8",
      title: "Reflection",
      helper: "Two sentences is enough. Stays in your browser.",
      prompts: [
        "For a market you are interested in, estimate the spread on one round trip in dollars and as a percentage of a $1,000 position. Is the move you would be targeting bigger than that?",
      ],
    },
    {
      kind: "summary",
      id: "tf-l9-b9",
      title: "Recap",
      points: [
        "A round trip pays the spread twice, plus commission, plus whatever slippage the market gives you.",
        "Slippage comes from size, speed, thinness and gaps — and no stop can protect you from a gap.",
        "Costs are charged per trade, so they scale with frequency and can overwhelm a real but small edge.",
        "Liquid markets, fewer trades and limit orders lower cost without changing your analysis.",
      ],
      nextStep: "Final lesson: putting every piece together into one repeatable decision process.",
    },
  ],
};
