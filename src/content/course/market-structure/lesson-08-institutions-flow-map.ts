import type { CourseLesson } from "../types";

export const lesson08InstitutionsFlowMap: CourseLesson = {
  id: "ms-l8",
  moduleId: "c5-m3",
  title: "Institutions & the Flow Map",
  blurb: "Price is discovered by large, scheduled, often visible flow — learn to read the map.",
  objectives: [
    "Describe how index funds, active funds and corporates create flow",
    "Explain the announcement effect and why the event often disappoints",
    "Read closing-auction imbalance as structural demand",
    "Run a six-question structural checklist before any trade",
  ],
  durationMinutes: 13,
  xp: 40,
  keyTakeaway:
    "Most price discovery comes from institutional flow that is scheduled, sizeable and sometimes public. Map who must trade, when, and where the liquidity sits — before you take a side.",
  blocks: [
    {
      kind: "explain",
      id: "ms-l8-b1",
      explanation: {
        heading: "Flow has fingerprints",
        whyItMatters:
          "Structure stops being abstract the moment you can name who must transact and when. Most of the market's biggest, most predictable moves are the execution of other people's obligations.",
        paragraphs: [
          "Four kinds of flow dominate. Passive and index funds are price-insensitive by design: they must buy or sell a fixed basket to track an index, and they mostly do it at the close or on scheduled rebalance dates. Active institutions must trade size without moving price, so they slice, cap participation, cross in blocks and use dark venues. Market makers supply liquidity and hedge continuously. Retail flow is small, heavily internalised, and rarely the reason price moves — although it is often the counterparty that funds the spread everyone trades on.",
          "Because index flow is scheduled, it is anticipated. When a stock is announced for index inclusion, the buyers are known, the size is estimable and the date is public: the price usually moves on the announcement, not on the effective date. By the time the funds must transact, the move has often been made — and the effective-day auction can mark the local high before the pressure fades. This is the announcement effect, and it explains why 'trading the event' is so often buying someone else's exit.",
          "The closing auction is the visible trace of all this. It is the largest single print of the day in many large stocks, because it is where funds are obliged to trade and where index changes are implemented. Auction volume and imbalance are published in many markets in the minutes before the close — a rare case of institutional intent being readable in advance.",
          "The honest limits: you cannot see actual order flow, only its traces — auction imbalance, block prints, spread behaviour, volume clustering, the way a stock responds to news. Readings can reverse: an announced imbalance can be withdrawn, and a fade after an event is a tendency, not a law.",
          "So use flow as structure, not as a signal. Before you take any side, ask the six checklist questions: what is this instrument; who must buy or sell it and when; where does the liquidity sit; what will execution cost; how will I exit; and who is likely to be on the other side of my exit? A trade that cannot answer those is a guess dressed as a plan.",
        ],
        keyTerms: [
          {
            term: "Price-insensitive flow",
            definition:
              "Demand or supply that must transact regardless of the price — index funds being the clearest case.",
          },
          {
            term: "Announcement effect",
            definition:
              "The price move that happens when predictable flow becomes public, before the flow itself trades.",
          },
          {
            term: "Closing auction",
            definition:
              "The end-of-day auction where index funds and rebalance trades are executed; often the largest print of the day.",
          },
          {
            term: "Block trade",
            definition:
              "A large negotiated trade, usually printed off the public book to limit market impact.",
          },
        ],
        callouts: [
          {
            tone: "info",
            title: "The calendar is part of the chart",
            body: "Index rebalance dates, expiries, auctions and scheduled events create predictable structural demand. Knowing them changes where you choose to be filled.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "ms-l8-b2",
      example: {
        title: "The index addition: who got paid, and when",
        setup:
          "A stock trades at 25.00. On Monday it is announced for index inclusion. Tracker funds will need roughly 2,000,000 shares, and the change is implemented at Friday's close. You are choosing where to be.",
        steps: [
          {
            label: "Announcement day",
            detail:
              "The price gaps to 25.50 — a 2.0% move on the news that the buyers now exist. A holder of 500 shares is up 0.50 × 500 = $250.",
          },
          {
            label: "The days between",
            detail:
              "Anticipating flow, other participants position. The stock grinds higher on lighter volume; the buyers still have to buy.",
          },
          {
            label: "Effective-day close",
            detail:
              "The closing auction absorbs the tracker demand and prints 0.3% above the prior close: 25.50 × 1.003 ≈ 25.576.",
          },
          {
            label: "What the auction buyer owns",
            detail:
              "A buyer at 25.576 has paid 0.576 above Monday's pre-announcement price — they bought the whole expected effect and then some.",
          },
          {
            label: "The fade",
            detail:
              "With the obliged flow finished, price fades about 1.5%: 25.576 × 0.985 ≈ 25.192 — a loss of 25.576 − 25.192 = $0.384 per share.",
          },
          {
            label: "The arithmetic of joining late",
            detail:
              "On 500 shares that fade is 0.384 × 500 = $192. The event was the exit liquidity; the opportunity was the announcement.",
          },
        ],
        takeaway:
          "Predictable flow gets priced before it trades. Whoever acts after the flow is public is providing the counterparty for someone else's completed plan.",
      },
    },
    {
      kind: "visual",
      id: "ms-l8-b3",
      title: "The flow map",
      visual: {
        type: "table",
        label: "Who trades, why, and what it leaves behind",
        columns: ["Flow", "Horizon", "Price sensitivity", "When they trade", "Structural trace"],
        rows: [
          [
            "Index / passive fund",
            "Years",
            "None — must replicate",
            "At the close, on rebalance dates",
            "Huge closing auction volume on known dates",
          ],
          [
            "Active institution",
            "Weeks to months",
            "High — but must manage impact",
            "Sliced all day, blocks off-book",
            "Steady one-sided pressure, block prints",
          ],
          [
            "Market maker",
            "Seconds to minutes",
            "Quotes both sides, hedges",
            "Continuously",
            "Flickering depth, spread behaviour",
          ],
          ["Retail", "Days", "High", "Session-dependent", "Small prints, internalised fills"],
          [
            "Corporate / insider",
            "Quarters",
            "Buybacks and issuance are scheduled",
            "On announced programmes",
            "Volume spikes, shelf registrations, filings",
          ],
        ],
        caption:
          "Your job is not to out-trade any single row. It is to know which rows are active in the instrument you are about to trade.",
      },
    },
    {
      kind: "interactive",
      id: "ms-l8-b4",
      title: "Two minutes before the close",
      interaction: {
        type: "order-book-decision",
        prompt:
          "It is 15:58. Index trackers must transact at the close, and the published auction imbalance is heavily to the buy side. You want 500 shares. What is the disciplined action?",
        book: {
          label: "NOVA · 15:58, into the closing auction",
          unit: "shares",
          asks: [
            { price: 25.62, size: 3000 },
            { price: 25.63, size: 1200 },
            { price: 25.64, size: 900 },
          ],
          bids: [
            { price: 25.6, size: 9000 },
            { price: 25.59, size: 1500 },
            { price: 25.58, size: 1000 },
          ],
        },
        choices: [
          {
            label:
              "Buy the 500 shares now with a limit inside the current offer, and do not wait for the auction",
            outcome:
              "You own the position at a known price before the imbalance is executed — no exposure to whatever the auction print becomes.",
            best: true,
            feedback:
              "Correct — imbalance is public information. Waiting puts you in the same queue as the obliged buyers, and auction prints can land well above the pre-close quote or gap on the open.",
          },
          {
            label: "Send a market buy into the closing auction to get the official price",
            outcome:
              "You join the buy-side queue at the moment the biggest demand of the day is executed; the clearing price can print above the pre-close offer.",
            best: false,
            feedback:
              "The 'official' price is not a discount — it is the price set by the crowd you just joined, and the biggest participant in that crowd has no choice about being there.",
          },
          {
            label: "Wait for the post-close fade and buy tomorrow's open",
            outcome:
              "You might buy lower if the fade arrives — or watch the stock continue higher with no position and a spoilt plan.",
            best: false,
            feedback:
              "The fade is a tendency, not a rule, and published imbalance can reverse before the close. A conditional edge is not the same as a plan you can rely on.",
          },
        ],
      },
      takeaway:
        "If the flow is public, you are not the only one reading it. Decide whether you want to be filled before, during, or after someone else's obligation — and price your plan accordingly.",
    },
    {
      kind: "practice",
      id: "ms-l8-b5",
      title: "Guided practice",
      assessment: {
        intro: "Size the structural effects for yourself.",
        allowRetry: true,
        items: [
          {
            skill: "The announcement move",
            question: {
              id: "ms-l8-q1",
              type: "numeric",
              topic: "participants",
              prompt:
                "A stock gaps from 25.00 to 25.50 on index-inclusion news. How many dollars is that worth to a holder of 500 shares?",
              answer: 250,
              tolerance: 2,
              unit: "USD",
              explain:
                "The move is priced when the flow becomes public: 0.50 × 500 = $250. Acting on the announcement is structurally different from acting on the event itself.",
            },
            feedbackByAnswer: {
              numeric: "Half a dollar per share × 500 shares = $250.",
            },
          },
          {
            skill: "Participation over days",
            question: {
              id: "ms-l8-q2",
              type: "numeric",
              topic: "volume",
              prompt:
                "A fund caps participation at 15% of daily volume. Volume is 40,000 shares a day. How many days does a 30,000-share order take?",
              answer: 5,
              tolerance: 0.2,
              unit: "days",
              explain:
                "15% of 40,000 = 6,000 shares a day. 30,000 ÷ 6,000 = 5 days of working the order — the institutional answer to the impact/cost trade-off you met in the previous module.",
            },
            feedbackByAnswer: {
              numeric: "6,000 shares a day at a 15% cap; 30,000 ÷ 6,000 = 5 days.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "ms-l8-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Why the close is heavy",
            question: {
              id: "ms-l8-q3",
              type: "mcq",
              topic: "volume",
              prompt: "Why is the closing auction often the largest single print of the day?",
              options: [
                "Because retail traders prefer to trade at the close",
                "Because index funds are obliged to transact at the close to track their benchmarks",
                "Because exchanges require all orders to be placed at the close",
                "Because volatility is always highest at the close",
              ],
              answer: 1,
              explain:
                "Price-insensitive tracker demand is executed at the close, which concentrates enormous volume into one auction and makes the closing print a structural event rather than a sentiment reading.",
            },
            feedbackByAnswer: {
              "0": "Retail is small and heavily internalised — it cannot explain auction volumes of that scale.",
              "2": "No exchange requires it: the close is simply the reference point funds are benchmarked against.",
              "3": "Volatility at the close is a consequence of concentrated flow, not the reason it exists.",
            },
          },
          {
            skill: "Reading institutional flow",
            question: {
              id: "ms-l8-q4",
              type: "truefalse",
              topic: "participants",
              prompt:
                "If a large fund is known to be buying an instrument, its price must rise immediately.",
              answer: false,
              explain:
                "Institutions manage impact deliberately — slicing over days, capping participation, crossing in blocks — so their flow can be absorbed without a large move. And when the buying is public in advance, the move has often already happened.",
            },
            feedbackByAnswer: {
              true: "This is the assumption behind every disappointed 'buy the event' trade: flow is worked quietly, and the public news is usually the exit.",
              false:
                "Correct — institutions are paid to trade size without moving price, which is why the flow is invisible until the market is already positioned.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "ms-l8-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You bought 500 shares in the effective-day closing auction at 25.576, on the theory that index demand would keep pushing the price up.",
          "With the obliged flow finished, the price fades about 1.5% over the following days.",
        ],
        assessment: {
          items: [
            {
              skill: "Cost of joining the event late",
              question: {
                id: "ms-l8-q5",
                type: "numeric",
                topic: "participants",
                prompt:
                  "Approximately how many dollars did the fade cost you on 500 shares? Use a 1.5% fade from 25.576.",
                answer: 192,
                tolerance: 4,
                unit: "USD",
                explain:
                  "25.576 × 0.985 ≈ 25.192, a fall of 0.384 per share. 0.384 × 500 = $192 — the price of being the exit liquidity for a plan that was public days earlier.",
              },
              feedbackByAnswer: {
                numeric: "1.5% of 25.576 is about 0.384 per share; × 500 shares ≈ $192.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "ms-l8-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Run the six-question structural checklist on the instrument you actually trade: instrument, flow, liquidity, cost, exit, counterparty. Write the weakest answer.",
      ],
    },
    {
      kind: "summary",
      id: "ms-l8-b9",
      title: "Recap",
      points: [
        "Index funds are price-insensitive and trade at the close; active institutions slice and cross blocks; makers hedge; retail is small.",
        "Predictable flow is priced on announcement — the event itself is often the exit.",
        "Closing auctions are the visible trace of obliged flow; imbalance is readable and rarely a discount.",
        "Flow can only be inferred from traces: auction volume, block prints, spread behaviour, response to news.",
        "Six questions before every trade: instrument, who must trade and when, where the liquidity is, cost, exit, counterparty.",
      ],
      nextStep:
        "Course 5 ends here: you can now read a book, price your own impact, and name who is on the other side. Next: Company & Macro Analysis — what actually drives the instruments you now understand structurally.",
    },
  ],
};
