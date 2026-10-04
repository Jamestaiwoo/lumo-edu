import type { CourseLesson } from "../types";

export const lesson07PhysicalMarkets: CourseLesson = {
  id: "mk-l7",
  moduleId: "c4-m3",
  title: "Physical Markets & Futures Strings",
  blurb: "Why you cannot actually buy 'oil' — only a dated contract to.",
  objectives: [
    "Explain why commodities trade as dated futures contracts",
    "Read a futures string: front month, deferred months, settlement",
    "Distinguish paper exposure from physical delivery obligations",
    "Connect contract size and tick value to position sizing",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "A commodity price is always a price for a specific delivery month. Traders hold paper contracts that expire; only hedgers ever meet the barrels.",
  blocks: [
    {
      kind: "explain",
      id: "mk-l7-b1",
      explanation: {
        heading: "Every quote carries a date",
        whyItMatters:
          "Stocks are perpetual claims; commodities are perishable, storable things. That single fact creates expiry, rolls, and the whole futures-string architecture the next lessons price.",
        paragraphs: [
          "Crude oil, wheat, copper — these are physical goods with storage costs, seasonal flows and location. A 'price' for them is meaningless without a delivery month: oil for January differs from oil for June because storage, insurance and financing (the cost of carry) differ. So the market quotes strings: a series of contracts — front month (nearest expiry, most liquid), then successive months out.",
          "Participants differ from equity markets. Producers (a wheat farmer) sell futures to lock in a price for harvest they physically own; consumers (an airline buying jet fuel) buy futures to fix input costs. Both intend eventual physical settlement or offset. Speculators — including you — trade the price without any intention of delivering or receiving; our futures-string position is closed before expiry, or rolled (mk-l8).",
          "Contract specifications are the instrument's grammar: contract size (1,000 barrels for WTI crude, 5,000 bushels for corn), tick size and tick value (the smallest price move and its dollar effect: a 0.01 tick on a 1,000-barrel contract = $10), expiry, and settlement method (physical delivery vs cash-settled index). These numbers feed Course 2 directly: unit risk per contract = stop distance × dollars-per-point — sizing is the same division, with the contract's arithmetic.",
          "The equity habit to unlearn: 'buy and hold' has no meaning here. Every futures position carries a countdown; after expiry your broker's forced-liquidation letter is not a suggestion. The countdown is why roll mechanics (next lesson) and curve shape (the lesson after) matter even to short-term traders.",
        ],
        keyTerms: [
          {
            term: "Futures string",
            definition:
              "The ladder of dated contracts for one commodity — front month through deferred.",
          },
          {
            term: "Tick value",
            definition:
              "Dollar effect of the smallest price increment on one contract — the atom of P&L arithmetic.",
          },
          {
            term: "Physical vs cash settlement",
            definition:
              "Delivery of the actual good versus final cash transfer — determines who can hold to expiry.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "Expiry is a hard wall",
            body: "Retail accounts do not take delivery of crude oil. Close or roll before expiry — the calendar enforces it, not your opinion.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "mk-l7-b2",
      example: {
        title: "Reading a string and sizing a contract",
        setup:
          "WTI crude: Jan $78.40, Feb $78.65, Mar $78.90, Apr $79.05. Contract = 1,000 barrels; tick = $0.01 = $10 per contract.",
        steps: [
          {
            label: "Read the curve's slope",
            detail:
              "Later months cost more than earlier — deferred prices exceed the front (the shape's name comes next lesson).",
          },
          {
            label: "Convert ticks to money",
            detail:
              "A $0.50 move = 50 ticks × $10 = $500 per contract. Your stop 0.80 away = $800 unit risk on one contract.",
          },
          {
            label: "Apply the ceiling",
            detail:
              "Budget $400: one contract at $800 stop is twice the ceiling → 0 contracts at that stop. A tighter, structurally valid stop of 0.40 ($400) fits exactly one.",
          },
          {
            label: "Note the countdown",
            detail:
              "Front month (Jan) expires first; your diary carries the roll date before entry, not after.",
          },
        ],
        takeaway:
          "Specs → dollar-per-point → ceiling division → expiry date. Four lines, every futures trade.",
      },
    },
    {
      kind: "visual",
      id: "mk-l7-b3",
      title: "A futures string",
      visual: {
        type: "table",
        label: "WTI crude — the front of the curve",
        columns: ["Contract", "Price", "Settlement", "Trader's note"],
        rows: [
          ["Jan (front)", "$78.40", "Physical (WTI grade)", "Most liquid; your trading month"],
          ["Feb", "$78.65", "Physical", "+$0.25 over front"],
          ["Mar", "$78.90", "Physical", "+$0.50 over front"],
          ["Apr", "$79.05", "Physical", "+$0.65 over front"],
        ],
        caption:
          "One commodity, four prices — each for a different delivery month. The slope's sign is the next lesson's subject.",
      },
    },
    {
      kind: "interactive",
      id: "mk-l7-b4",
      title: "Contract mechanics triage",
      takeaway:
        "Every correct answer converts specifications into dollars or dates before touching the trade idea — the spec sheet is part of the thesis.",
      interaction: {
        type: "scenario-decision",
        prompt: "Four futures-desk questions. Which responses handle the mechanics correctly?",
        situation: [
          "Corn contract: 5,000 bushels, tick ¼ cent = $12.50 per tick, front expiry in six weeks. Your budget is $300.",
        ],
        choices: [
          {
            label:
              "Price stops in dollars-per-contract, diary the expiry, and divide budget by unit risk before ordering",
            outcome:
              "Unit risk (stop distance × $50 per cent per contract) ÷ $300 decides the contract count; the roll date is entered with the order.",
            best: true,
            feedback:
              "Correct — tick arithmetic, ceiling division, and the calendar are one checklist, not three topics.",
          },
          {
            label: "Buy two contracts 'to diversify' without converting the stop to dollars",
            outcome:
              "The stop's dollar cost per contract was never computed; two contracts may hold six ceilings of risk.",
            best: false,
            feedback:
              "Contract count without dollars-per-point is not sizing — it is a number picked from nothing.",
          },
          {
            label: "Hold past expiry to 'see where it settles' — it is paper anyway",
            outcome:
              "Delivery or forced liquidation: the broker acts, and paper or not, at prices you did not choose.",
            best: false,
            feedback:
              "Retail accounts cannot take delivery; expiry is enforced by the exchange calendar, not by your intent.",
          },
          {
            label: "Assume all commodities expire like stocks — they do not",
            outcome:
              "Stocks are perpetual; commodities are dated. The assumption breaks the entire countdown logic.",
            best: false,
            feedback:
              "The dated contract IS the instrument — dropping the date removes the feature that defines it.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "mk-l7-b5",
      title: "Guided practice",
      assessment: {
        intro: "Convert specifications into money.",
        allowRetry: true,
        items: [
          {
            skill: "Tick value arithmetic",
            question: {
              id: "mk-l7-q1",
              type: "numeric",
              topic: "market-basics",
              prompt:
                "A contract moves 0.25 in price with a tick of 0.01 worth $10. What is the dollar move per contract?",
              answer: 250,
              tolerance: 2,
              unit: "USD",
              explain: "0.25 ÷ 0.01 = 25 ticks × $10 = $250 per contract.",
            },
            feedbackByAnswer: {
              numeric: "Ticks: 0.25 ÷ 0.01 = 25; 25 × 10 = 250.",
            },
          },
          {
            skill: "Dollar-per-cent conversion",
            question: {
              id: "mk-l7-q2",
              type: "numeric",
              topic: "market-basics",
              prompt:
                "A 5,000-bushel grain contract: how many dollars is a 1-cent price move worth per contract?",
              answer: 50,
              tolerance: 1,
              unit: "USD",
              explain: "5,000 × $0.01 = $50 — one cent is fifty dollars of contract P&L.",
            },
            feedbackByAnswer: {
              numeric: "5,000 × 0.01 = 50.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "mk-l7-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Why dates matter",
            question: {
              id: "mk-l7-q3",
              type: "mcq",
              topic: "market-basics",
              prompt: "Why does crude oil have many simultaneous prices?",
              options: [
                "Different exchanges quote different oils",
                "Each price is for a different delivery month — storage, financing and scarcity differ by date",
                "The quotes are mistakes",
                "Prices differ by currency only",
              ],
              answer: 1,
              explain:
                "A dated good prices by date: cost of carry and expected scarcity separate January from June.",
            },
            feedbackByAnswer: {
              "0": "Different benchmarks exist too, but the string's dates are the primary reason.",
              "2": "The string is the market's design, not an error.",
              "3": "Currency differences are the FX lesson, not this one.",
            },
          },
          {
            skill: "Who settles physically",
            question: {
              id: "mk-l7-q4",
              type: "truefalse",
              topic: "market-basics",
              prompt:
                "Speculators trade futures for price exposure and must close or roll before expiry; hedgers are the participants designed for physical settlement.",
              answer: true,
              explain:
                "Producers and consumers use futures to lock real flows; speculators provide liquidity and take price risk without delivery intent.",
            },
            feedbackByAnswer: {
              true: "Correct — two participant classes, one contract.",
              false:
                "Retail speculators taking delivery of 1,000 barrels is exactly what brokers prevent.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "mk-l7-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You want long gold exposure. GC contract: 100 troy ounces, tick $0.10 = $10 per tick, front month expires in five weeks.",
          "Your stop is $12.00 away; budget is $250.",
        ],
        assessment: {
          items: [
            {
              skill: "Full spec-to-size pipeline",
              question: {
                id: "mk-l7-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt:
                  "GC contract = 100 troy ounces. With a $12.00 stop, one contract risks $1,200. What contract count fits a $250 budget?",
                answer: 0,
                tolerance: 0,
                unit: "contracts",
                explain:
                  "Unit risk = 100 × 12 = $1,200 — nearly five budgets. Zero contracts fit; re-plan the stop or the instrument, never round up.",
              },
              feedbackByAnswer: {
                numeric: "100 oz × $12 = 1,200 per contract vs 250 budget → 0 contracts fit.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "mk-l7-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Look up one futures contract you find interesting. Write its size, tick value and expiry — the three numbers every trade starts from.",
      ],
    },
    {
      kind: "summary",
      id: "mk-l7-b9",
      title: "Recap",
      points: [
        "Commodity prices are dated: a string of contracts by delivery month.",
        "Tick size × contract size = dollars per tick — the unit of futures risk.",
        "Hedgers settle physically; speculators close or roll before the hard expiry wall.",
        "Sizing is unchanged Course-2 division with contract arithmetic plugged in.",
      ],
      nextStep: "Next: the curve's slope — contango, backwardation, and what rolling costs you.",
    },
  ],
};
