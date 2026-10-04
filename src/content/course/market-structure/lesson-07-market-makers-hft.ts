import type { CourseLesson } from "../types";

export const lesson07MarketMakersHft: CourseLesson = {
  id: "ms-l7",
  moduleId: "c5-m3",
  title: "Market Makers, HFT & Inventory",
  blurb:
    "Someone is on the other side of every fill — and their business model explains the price you get.",
  objectives: [
    "Name who takes the other side of a retail trade",
    "Explain how a market maker earns money and when it widens quotes",
    "Describe what high-frequency firms do with latency and cancels",
    "Recognise the moments when liquidity providers step away",
  ],
  durationMinutes: 12,
  xp: 38,
  keyTakeaway:
    "Quoted width is a liquidity provider's risk premium. When inventory, news or speed risk rises, the premium rises — and you pay it in the spread.",
  blocks: [
    {
      kind: "explain",
      id: "ms-l7-b1",
      explanation: {
        heading: "The counterparty you never meet",
        whyItMatters:
          "Most retail orders are not matched against another retail trader. Knowing who fills you explains both the tight spreads you enjoy and the disappearing depth you complain about.",
        paragraphs: [
          "When you send a small market order, it is usually routed to a wholesaler or internaliser that fills it immediately at or inside the public quote, or it is matched against a resting order by a high-frequency market maker. You almost never trade against another person clicking a chart. Your counterparty is a business with a balance sheet, a cost model and inventory limits.",
          "A market maker earns the spread on volume. It quotes both sides, hoping to buy at the bid and sell at the offer many times a day, and it aims to finish the day roughly flat rather than directional. Its profit is volume × average captured spread, minus hedging costs, exchange fees, technology, and losses to better-informed flow.",
          "Inventory is the maker's real risk. Buying 50,000 shares from a seller leaves the maker long and exposed; it will hedge or lay that risk off elsewhere — sometimes in a related ETF, future or another venue. That is why flow in one market shows up as pressure in another: inventory is being transferred, not opinions.",
          "Adverse selection is the cost of being wrong about who is trading with you. When a maker suspects the flow is informed — a headline, a large aggressive buyer, a pattern it recognises — it does the rational thing: widen quotes, reduce size, or step away entirely. The widest spreads you ever see are a risk premium being priced in real time, not a malfunction.",
          "High-frequency firms are the fastest participants in this business: quoting, cancelling and re-quoting thousands of times a second, arbitraging tiny price differences between venues, and detecting large orders early. Their effect on you is mixed — spreads have compressed dramatically because of them — but the same speed produces flickering quotes, thin displayed depth and a market where latency decides who trades at the better price.",
          "The practical stance for a learner is not competition. You rent liquidity from these firms and institutions. Keep size modest relative to depth, avoid racing in the fastest moments, use the auctions when they suit you, and never build a plan that requires displayed quotes to stay put.",
        ],
        keyTerms: [
          {
            term: "Market maker",
            definition:
              "A firm quoting both sides continuously, earning the spread while managing inventory risk.",
          },
          {
            term: "Wholesaler / internaliser",
            definition:
              "A venue that fills retail orders directly off-exchange, usually at or better than the public quote.",
          },
          {
            term: "Inventory risk",
            definition: "The exposure a maker accumulates from filling one side before the other.",
          },
          {
            term: "Adverse selection",
            definition:
              "Losses from trading against better-informed flow — the cost of quoting width too cheaply.",
          },
        ],
        callouts: [
          {
            tone: "info",
            title: "Wide spreads are information",
            body: "When a normally tight market quotes two or three times its usual width, providers are pricing risk they can see and you may not.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "ms-l7-b2",
      example: {
        title: "A market maker's day, in one ledger",
        setup:
          "A maker quotes a $100 stock one tick wide (0.01) and trades about 40,000 shares a day across both sides. It manages inventory by hedging whatever it does not re-offer.",
        steps: [
          {
            label: "Gross capture",
            detail:
              "It keeps roughly half the spread per share: 0.005 × 40,000 shares = $200 gross revenue for the day.",
          },
          {
            label: "Inventory hedging",
            detail:
              "It ends up holding 6,000 shares it must lay off at an average cost of 0.02 per share = $120.",
          },
          {
            label: "Fees and technology",
            detail: "Exchange access, clearing and infrastructure: $30.",
          },
          {
            label: "Adverse selection",
            detail:
              "Fills that ran against it before it could hedge: another $30. This line is invisible but constant.",
          },
          {
            label: "Net",
            detail:
              "$200 − $120 − $30 − $30 = $20 net on roughly $4,000,000 of turnover — 0.0005% of it.",
          },
          {
            label: "Then the headline lands",
            detail:
              "Hedging risk and adverse selection spike, so the maker widens to 10 cents — its risk premium has to cover a much bigger expected loss on the same flow.",
          },
        ],
        takeaway:
          "A market maker cannot quote a tight spread for long if its costs exceed its capture. The spread you see is a live pricing of inventory, information and speed risk.",
      },
    },
    {
      kind: "visual",
      id: "ms-l7-b3",
      title: "Who is on the other side",
      visual: {
        type: "table",
        label: "Participants and what their behaviour means for your fill",
        columns: ["Counterparty", "What they want", "How they trade", "What you notice"],
        rows: [
          [
            "Wholesaler / internaliser",
            "Retail flow to fill at or inside the quote",
            "Retail orders routed off-exchange",
            "Instant fills, small size, no market impact",
          ],
          [
            "Market maker",
            "Volume and the spread, flat inventory",
            "Quotes both sides, hedge the residual",
            "Depth that appears and disappears constantly",
          ],
          [
            "High-frequency firm",
            "Microsecond price differences and rebates",
            "Thousands of quotes and cancels per second",
            "Flickering quotes and compressed spreads",
          ],
          [
            "Institution",
            "Size without moving price",
            "Slices, participation caps, blocks",
            "Steady one-sided pressure, big closing prints",
          ],
          [
            "Index fund",
            "Replicate the index at any price",
            "Trades at the close, on rebalance dates",
            "Heavy auction volume on known dates",
          ],
        ],
        caption:
          "Read your own fills against this table: the structure of your execution tells you which row you are dealing with.",
      },
    },
    {
      kind: "interactive",
      id: "ms-l7-b4",
      title: "A stacked bid, one minute after a headline",
      interaction: {
        type: "order-book-decision",
        prompt:
          "One minute after a headline the book shows 9,000 shares bid at 99.90 and only 400 offered at 99.95. What is the disciplined read?",
        book: {
          label: "NOVA · one minute after a headline",
          unit: "shares",
          asks: [
            { price: 99.95, size: 400 },
            { price: 99.96, size: 700 },
            { price: 99.97, size: 1500 },
          ],
          bids: [
            { price: 99.9, size: 9000 },
            { price: 99.89, size: 1200 },
            { price: 99.88, size: 800 },
          ],
        },
        choices: [
          {
            label:
              "Treat the stacked bid as a quote you do not control: take only the size you need with a limit, and assume it can vanish",
            outcome:
              "You take 400 shares at 99.95 or better and work the rest — the visible bid is treated as information, not as a floor.",
            best: true,
            feedback:
              "Correct — a large displayed bid after news is often a maker managing inventory or waiting for balance flow, and quotes are withdrawn the moment risk changes. Size for it disappearing.",
          },
          {
            label: "Buy aggressively — with that much size bid, price cannot fall",
            outcome:
              "You lift the thin offer stack and push the price up; if the 9,000 bid is withdrawn, the support you relied on is gone.",
            best: false,
            feedback:
              "This is the trade the display invites and the one that punishes it. A quote is a willingness, not a guarantee, and it is cancelled in milliseconds.",
          },
          {
            label: "Sell into the stacked bid because it is 9,000 shares of demand",
            outcome:
              "You fill quickly at 99.90 — the best bid — and the remaining size slides down the ladder as the stack is consumed.",
            best: false,
            feedback:
              "Selling into it is defensible if you want to exit, but only the first 9,000 shares trade at that price. The queue is finite, and your fill competes with everyone else front of you.",
          },
        ],
      },
      takeaway:
        "After a headline, liquidity providers are re-pricing their risk. Read big quotes as evidence of an active business, never as a promise of support.",
    },
    {
      kind: "practice",
      id: "ms-l7-b5",
      title: "Guided practice",
      assessment: {
        intro: "Do the maker's arithmetic.",
        allowRetry: true,
        items: [
          {
            skill: "Spread capture",
            question: {
              id: "ms-l7-q1",
              type: "numeric",
              topic: "spread",
              prompt:
                "A maker keeps 0.005 per share of the spread across 40,000 shares a day. What is the gross capture in dollars?",
              answer: 200,
              tolerance: 1,
              unit: "USD",
              explain:
                "0.005 × 40,000 = $200 of gross revenue — before hedging, fees and adverse selection, which is why the net line is so much smaller.",
            },
            feedbackByAnswer: {
              numeric: "Half a cent per share × 40,000 shares = $200.",
            },
          },
          {
            skill: "Net of a liquidity provider",
            question: {
              id: "ms-l7-q2",
              type: "numeric",
              topic: "spread",
              prompt:
                "Gross capture is $200; hedging costs $120, fees $30 and adverse selection $30. What is the net profit in dollars?",
              answer: 20,
              tolerance: 1,
              unit: "USD",
              explain:
                "$200 − ($120 + $30 + $30) = $20. Narrow spreads survive only because volume is enormous — thin volume on a tight quote is a loss-making business.",
            },
            feedbackByAnswer: {
              numeric: "Total costs $180 against $200 of capture leaves $20.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "ms-l7-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "What keeps a maker quoting",
            question: {
              id: "ms-l7-q3",
              type: "mcq",
              topic: "participants",
              prompt: "What does a market maker need in order to keep quoting a tight spread?",
              options: [
                "A directional forecast that the price will rise",
                "Enough volume for spread capture to exceed inventory, hedging, fee and adverse-selection costs",
                "A guarantee that it never loses on any single trade",
                "Permission from the retail traders it fills",
              ],
              answer: 1,
              explain:
                "Market making is a volume business with a cost stack: capture must beat inventory risk, hedging, fees and informed flow. When it does not, the rational response is to widen the quote or withdraw from the market.",
            },
            feedbackByAnswer: {
              "0": "Makers aim to finish flat — a directional forecast is not their business model.",
              "2": "Individual losing trades are expected; the business only works in aggregate over huge volume.",
              "3": "No consent is required: prices are quoted for anyone willing to trade at them.",
            },
          },
          {
            skill: "Maker risk",
            question: {
              id: "ms-l7-q4",
              type: "truefalse",
              topic: "participants",
              prompt: "Market makers lose money mainly when the market falls.",
              answer: false,
              explain:
                "A maker hedges or offsets inventory to stay near flat, so a falling market is not its primary risk. Its real exposures are inventory it cannot lay off, adverse selection against informed flow, and fee and latency costs.",
            },
            feedbackByAnswer: {
              true: "Direction is what makers try to avoid; inventory, information and speed costs are what actually hurt them.",
              false:
                "Correct — the risk is inventory and informed flow, not the direction of the index.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "ms-l7-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You buy 1,500 shares at 99.95 from a maker. Thirty seconds later, to flatten its inventory, it has to buy them back at 99.98.",
        ],
        assessment: {
          items: [
            {
              skill: "Who paid for your fill",
              question: {
                id: "ms-l7-q5",
                type: "numeric",
                topic: "participants",
                prompt: "How many dollars did the maker lose on your 1,500 shares?",
                answer: 45,
                tolerance: 1,
                unit: "USD",
                explain:
                  "(99.98 − 99.95) × 1,500 = 0.03 × 1,500 = $45. Informed or well-timed flow costs liquidity providers money, and that cost is recovered from everyone through wider quotes — which is the real reason spreads widen after news.",
              },
              feedbackByAnswer: {
                numeric: "Three cents per share against its buy-back price × 1,500 shares = $45.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "ms-l7-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Write the one moment you will stop trading because spreads say liquidity providers are pricing risk you cannot see.",
      ],
    },
    {
      kind: "summary",
      id: "ms-l7-b9",
      title: "Recap",
      points: [
        "Your counterparty is usually a wholesaler, market maker or institution — a business with a cost model.",
        "Makers earn volume × captured spread and try to stay flat; inventory, not direction, is their risk.",
        "Adverse selection is why quotes widen: width is a risk premium, not a malfunction.",
        "High-frequency firms compress spreads and thin displayed depth — you rent their liquidity, you do not beat them.",
        "Never build a plan that assumes a displayed quote will still be there when you reach it.",
      ],
      nextStep:
        "Final lesson of the course: mapping institutional flow — index funds, rebalances and closing auctions — into a structural checklist.",
    },
  ],
};
