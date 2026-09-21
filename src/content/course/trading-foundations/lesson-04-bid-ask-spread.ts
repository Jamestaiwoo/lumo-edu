import type { CourseLesson } from "../types";

export const lesson04BidAskSpread: CourseLesson = {
  id: "tf-l4",
  moduleId: "c1-m2",
  title: "Bid, Ask, Spread & Liquidity",
  blurb: "Two prices, one decision — and a cost you pay on every round trip.",
  objectives: [
    "Say precisely what the bid and the ask represent",
    "Explain why the two prices are different and who stands on each side",
    "Calculate the spread and what it costs on a round trip",
    "Explain how liquidity changes that cost",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "The bid is what a seller receives now. The ask is what a buyer pays now. The gap is not a fee you can argue with — it is the price of immediacy, and it is charged on entry and exit.",
  blocks: [
    {
      kind: "explain",
      id: "tf-l4-b1",
      explanation: {
        heading: "You never trade at 'the price'. You trade at one of two prices.",
        whyItMatters:
          "This is the lesson that quietly decides whether a strategy can work at all. A method that looks profitable on a chart can be unprofitable the moment you account for paying the spread twice on every trade. Costs are not a detail; they are part of the decision.",
        paragraphs: [
          "Every quoted market has two prices. The bid is the highest price a buyer is currently willing to pay. The ask (also called the offer) is the lowest price a seller is currently willing to accept. If you want to sell right now, you can have the bid. If you want to buy right now, you must pay the ask.",
          "Why are they different? Because whoever is quoting is doing you a service with a cost attached. On the other side of your impatient order is usually a market maker who must hold inventory, take the risk that price moves against them, and pay their own costs to hedge or exit. The spread is what they charge for being ready to trade the instant you arrive. Without that compensation they would not quote at all, and you would have nobody to trade with.",
          "The gap between them is the spread. Bid 20.15 and ask 20.16 means a one-cent spread. Buy at 20.16 and the market immediately values your position at the bid, 20.15 — you are down one cent per share before price has done anything at all. Sell 1,000 shares back at the bid and you have paid $10 for a round trip that took seconds and made no prediction about anything.",
          "Who touches which side? Impatient buyers lift the ask. Impatient sellers hit the bid. Patient participants post limits and join the queue: a limit buy at 20.15 adds to the bid, a limit sell at 20.16 adds to the ask. This is why the spread is really a competition between urgency and patience. When many people are willing to wait, spreads compress. When everyone wants out at once, the ask side empties, quotes move away and the spread widens.",
          "Liquidity is the name for that depth. A liquid market has many resting orders at each price and a tight spread: you can trade size quickly, at a price close to what you saw. An illiquid market has thin levels: the spread is wide, and even a small order can move the quote several cents. In an illiquid market your costs are not a rounding error — they can be larger than the move you are trying to capture.",
          "The practical consequence is that the spread is a hurdle you must clear on every trade. If you buy at 20.16 and sell at 20.15, you need the market to move in your favour just to break even. Frequent traders pay this hurdle again and again, which is why turnover and costs are so tightly linked to whether a strategy is viable.",
        ],
        keyTerms: [
          {
            term: "Bid",
            definition:
              "The highest price currently offered by buyers. Sellers who act immediately receive it.",
          },
          {
            term: "Ask (offer)",
            definition:
              "The lowest price currently offered by sellers. Buyers who act immediately pay it.",
          },
          {
            term: "Spread",
            definition:
              "Ask minus bid. The immediate cost of crossing the market, paid per share or unit.",
          },
          {
            term: "Mid price",
            definition:
              "Halfway between bid and ask. Useful as a reference, but not a price you can trade at.",
          },
          {
            term: "Market maker",
            definition:
              "A participant who continuously quotes both a bid and an ask, earning the spread in exchange for providing liquidity and taking inventory risk.",
          },
          {
            term: "Round trip",
            definition: "One entry and one exit. A round trip crosses the spread twice.",
          },
        ],
        callouts: [
          {
            tone: "pitfall",
            title: "The midpoint is not a price you can have",
            body: "With a bid of 20.15 and an ask of 20.16, a long position is marked against the bid and a short against the ask. 'It is only half a cent away' is true for one share and false for a position.",
          },
          {
            tone: "info",
            title: "Costs are stated per unit, not per trade",
            body: "One cent sounds trivial until you multiply by size and by the number of times you trade. Costs scale with size and frequency, which is exactly what a beginner does most.",
          },
        ],
      },
    },
    {
      kind: "visual",
      id: "tf-l4-b2",
      title: "One quote, two prices",
      visual: {
        type: "spread",
        label: "NOVA · live quote",
        bid: 20.15,
        ask: 20.16,
        unit: "USD per share",
        caption:
          "Sell now and you receive 20.15. Buy now and you pay 20.16. The one cent in between is not a fee on a statement — it is built into the price you get.",
      },
    },
    {
      kind: "example",
      id: "tf-l4-b3",
      example: {
        title: "A round trip that predicted nothing",
        setup:
          "NOVA is quoted 20.15 bid / 20.16 ask. You want to see what happens if you buy 1,000 shares and then sell them back a minute later, with the market completely unchanged.",
        steps: [
          { label: "Buy", detail: "A market buy pays the ask: 1,000 × 20.16 = $20,160.00." },
          {
            label: "The position is marked down instantly",
            detail:
              "Your 1,000 shares are valued at the bid, 20.15, which is $20,150.00. You are already down $10.",
          },
          { label: "Sell", detail: "A market sell receives the bid: 1,000 × 20.15 = $20,150.00." },
          {
            label: "Result",
            detail:
              "You paid $10 for a round trip in a flat market. To break even, the bid must rise by at least one cent while you hold.",
          },
          {
            label: "Same trade on 20 different days",
            detail:
              "Twenty such round trips cost about $200 — roughly 1% of the $20,000 you cycled through. That is the entire margin many strategies are fighting for.",
          },
        ],
        takeaway:
          "You cannot evaluate a trading idea without subtracting the spread twice. A chart that ignores it is not a plan, it is a wish.",
      },
    },
    {
      kind: "interactive",
      id: "tf-l4-b4",
      title: "Spread explorer",
      interaction: {
        type: "spread-explorer",
        prompt:
          "Switch between markets and watch what the same immediacy costs. Pay attention to the spread as a percentage of price — that is the number that matters for your account.",
        unit: "USD",
        caption:
          "A one-cent spread on a $420 ETF is noise. A thirteen-cent spread on a $1.02 stock is a 12% haircut on a round trip. Same action, completely different consequence.",
        levels: [
          { name: "US large-cap index ETF", note: "Extremely deep book", bid: 420.1, ask: 420.11 },
          { name: "Large-cap share", note: "Deep, competitive quotes", bid: 185.4, ask: 185.42 },
          { name: "Mid-cap share", note: "Reasonable depth", bid: 42.18, ask: 42.28 },
          { name: "Small-cap share", note: "Thin book, wide quotes", bid: 3.4, ask: 3.75 },
          { name: "Micro-cap share", note: "Very little resting size", bid: 1.02, ask: 1.15 },
        ],
      },
      takeaway:
        "Judge costs in percentage terms, not in cents. The percentage is what your trades have to overcome.",
    },
    {
      kind: "practice",
      id: "tf-l4-b5",
      title: "Guided practice",
      assessment: {
        intro: "Use the quote 20.15 bid / 20.16 ask for these questions.",
        allowRetry: true,
        items: [
          {
            skill: "Which side you get",
            question: {
              id: "tf-l4-q1",
              type: "mcq",
              topic: "spread",
              prompt: "You need to sell 500 shares immediately. Which price do you receive?",
              options: [
                "The ask, 20.16",
                "The bid, 20.15",
                "The midpoint, 20.155",
                "Whichever the broker prefers",
              ],
              answer: 1,
              explain:
                "Impatient sellers hit the bid. The ask belongs to the buyers who are willing to pay it.",
            },
            hint: "Ask who is acting impatiently and who is waiting.",
            feedbackByAnswer: {
              "0": "20.16 is the ask — the price you pay to buy immediately, not what you receive to sell.",
              "2": "The midpoint is an average of two prices you can trade at. It is a reference, not a fill.",
              "3": "Brokers route orders; they do not choose your side of the quote.",
            },
          },
          {
            skill: "Costing a round trip",
            question: {
              id: "tf-l4-q2",
              type: "numeric",
              topic: "costs",
              prompt:
                "Bid 20.15, ask 20.16. You buy 1,000 shares as a market order, then sell 1,000 shares as a market order moments later with the quote unchanged. What is your loss in dollars?",
              answer: 10,
              tolerance: 0.01,
              unit: "dollars",
              explain:
                "Buy at 20.16 = $20,160. Sell at 20.15 = $20,150. You lost $10 to the spread, and you never made a prediction about the market.",
            },
            hint: "You pay the ask, then receive the bid. The difference is one cent per share.",
            feedbackByAnswer: {
              numeric:
                "Multiply the spread by the size: 0.01 × 1,000 = $10. Remember the loss is per share, so size multiplies it.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tf-l4-b6",
      title: "Knowledge check",
      assessment: {
        intro: "First attempt counts. Read carefully — two options are close.",
        items: [
          {
            skill: "Who provides liquidity",
            question: {
              id: "tf-l4-q3",
              type: "mcq",
              topic: "spread",
              prompt: "Why does a market maker quote a bid below the ask instead of one price?",
              options: [
                "Because regulators require a spread",
                "Because holding inventory and being ready to trade instantly carries risk that the spread compensates",
                "Because they do not know the true price",
                "Because the exchange keeps the difference",
              ],
              answer: 1,
              explain:
                "Quoting both sides means accepting inventory risk and adverse selection. The spread is the fee for that service — and it is why quotes disappear when risk rises.",
            },
            feedbackByAnswer: {
              "0": "Rules require quotes to be honest, not to be wide. The width is a commercial decision.",
              "2": "Market makers update constantly precisely because they care about price. The spread reflects compensation, not ignorance.",
              "3": "The exchange earns transaction fees and data revenue. It does not pocket the spread, which goes to whoever was quoting.",
            },
          },
          {
            skill: "Liquidity and spread",
            question: {
              id: "tf-l4-q4",
              type: "truefalse",
              topic: "liquidity",
              prompt:
                "Spreads usually narrow when liquidity improves, and widen when it disappears.",
              answer: true,
              explain:
                "More rested orders mean more competition to supply immediacy, which compresses the spread. Thin, anxious markets do the opposite.",
            },
            hint: "Think about what competition between patient participants does to a price gap.",
            feedbackByAnswer: {
              "0": "Consider two markets: one with hundreds of resting orders at every level, one with barely any. Which do you think charges more for immediacy?",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tf-l4-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You decide to buy 400 shares of a mid-cap company. The quote has been 42.18 bid / 42.28 ask all morning.",
          "You do not need the position today. Your plan says the idea is invalid if price closes below 40.50.",
        ],
        assessment: {
          items: [
            {
              skill: "Choosing how to cross the spread",
              question: {
                id: "tf-l4-q5",
                type: "mcq",
                topic: "orders",
                prompt: "Which approach best fits the situation?",
                options: [
                  "Pay the ask with a market order — speed matters more than ten cents",
                  "Post a limit buy at or slightly above the bid and accept that you may only fill partially, or not at all",
                  "Post a limit buy at 40.50 so you never pay more than your invalidation level",
                  "Buy twice the size to make the wider spread worth it",
                ],
                answer: 1,
                explain:
                  "You are not in a hurry and the spread is a meaningful fraction of the move you are targeting. A patient limit order converts your patience into a better entry price.",
              },
              feedbackByAnswer: {
                "0": "Ten cents of spread on 400 shares is $40 — the same as a 1% move on a $4,000 position. Speed you do not need is expensive.",
                "2": "That price is your invalidation level, not an entry. If it filled, you would own the position at the exact point your plan says the idea is dead.",
                "3": "Size does not make a wide spread cheaper; it multiplies what you pay for it.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tf-l4-b8",
      title: "Reflection",
      helper: "Two sentences is enough. Stays in your browser.",
      prompts: [
        "Pick a market you have looked at before. Roughly what did the spread cost on a round trip, as a percentage of price?",
      ],
    },
    {
      kind: "summary",
      id: "tf-l4-b9",
      title: "Recap",
      points: [
        "The bid is what an immediate seller receives; the ask is what an immediate buyer pays.",
        "The spread compensates whoever is willing to trade instantly and hold the resulting risk.",
        "A round trip crosses the spread twice, so you need the market to move just to break even.",
        "Liquidity decides how wide the spread is and how much your own size moves the price.",
        "Judge costs in percentage terms and match your order type to how much urgency you actually have.",
      ],
      nextStep: "Next: choosing the order type that matches your urgency — market versus limit.",
    },
  ],
};
