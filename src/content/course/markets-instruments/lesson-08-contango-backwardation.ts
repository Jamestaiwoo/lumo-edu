import type { CourseLesson } from "../types";

export const lesson08ContangoBackwardation: CourseLesson = {
  id: "mk-l8",
  moduleId: "c4-m3",
  title: "Contango, Backwardation & Rolls",
  blurb: "The curve's slope taxes anyone who stays long.",
  objectives: [
    "Identify contango and backwardation from a futures curve",
    "Compute the roll cost of continuously rolling a long position",
    "Explain why spot ETFs tracking commodities drift from spot price",
    "Judge whether a curve's slope fits or fights your holding thesis",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "In contango the deferred months cost more — rolling a long position sells low and rebuys higher every cycle. The curve is a cost you pay for staying in.",
  blocks: [
    {
      kind: "explain",
      id: "mk-l8-b1",
      explanation: {
        heading: "The slope is a bill",
        whyItMatters:
          "A long commodity position that never closes must roll through the string. The curve's shape decides whether that roll is a discount, a fee, or a subsidy — independent of where spot goes.",
        paragraphs: [
          "Contango: deferred contracts trade above the front (the curve slopes up with maturity) — typical when storage, insurance and financing make future delivery costlier, and when speculators pay for the convenience of not handling physical goods. Backwardation: deferred below the front — supply tight today, immediate delivery commands a premium; producers pay to lock in the rich near price.",
          "The roll: as your front contract nears expiry, you close it and open the next month. In contango, the deferred costs more: you sell at the front's price and buy higher — a realized step-down that repeats every cycle. Over a year with quarterly rolls, the cumulative drag can rival or exceed the spot move you were betting on. In backwardation, the mirror works for longs: sell the rich front, buy the cheaper deferred — the roll pays you while you hold.",
          "This is why 'commodity ETFs' disappoint their headlines: a fund rolling a contango curve can lag spot oil by double digits over a year even when spot is flat-to-up. The tracking difference is structural, not fee-based (mk-l5's error sources, with roll drag as the dominant entry).",
          "For a trader: check the slope before entry. A long thesis in steep contango needs the spot move to first beat the roll bill; a short thesis in backwardation fights a roll subsidy that is working against your edge. The curve is context with a price tag — always read it.",
        ],
        keyTerms: [
          {
            term: "Contango",
            definition: "Curve sloping up with maturity — deferred above front; longs pay to roll.",
          },
          {
            term: "Backwardation",
            definition: "Curve sloping down — deferred below front; longs are paid to roll.",
          },
          {
            term: "Roll yield",
            definition:
              "The gain or loss from rolling relative to spot — the curve's contribution to your return.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "mk-l8-b2",
      example: {
        title: "A year of contango rolls",
        setup:
          "You hold a rolling long in a commodity fund. Front starts at $70, deferred at $71.50 (+2.1%); the pattern repeats across four quarterly rolls; spot ends the year at $70 (flat).",
        steps: [
          {
            label: "Read the bill",
            detail:
              "Each roll sells 70.0 and buys 71.50 — a ~2.1% step-back per cycle, paid regardless of spot's path.",
          },
          {
            label: "Compound four cycles",
            detail: "0.979⁴ ≈ 0.918 — about −8.2% cumulative drag from rolls alone.",
          },
          {
            label: "Compare to spot",
            detail:
              "Spot flat at $70; the fund's holder is ~8% down. The difference is the roll yield, not fees (fees add on top).",
          },
          {
            label: "The trader's takeaway",
            detail:
              "Your long needed +8.2% from spot merely to break even on the structure. In backwardation the sign flips: the same mechanics add.",
          },
        ],
        takeaway:
          "Structure can dominate direction — know the slope before you commit the direction.",
      },
    },
    {
      kind: "visual",
      id: "mk-l8-b3",
      title: "Two curves, two bills",
      visual: {
        type: "table",
        label: "Curve shapes",
        columns: ["Shape", "Front → deferred", "Long's roll", "Typical context"],
        rows: [
          [
            "Contango",
            "Deferred higher",
            "Pays each roll (sell low, buy high)",
            "Storage/financing costs; calm supply",
          ],
          [
            "Backwardation",
            "Deferred lower",
            "Collects each roll",
            "Tight immediate supply; shortage fear",
          ],
          ["Flat", "Equal", "No structural drag", "Neutral carry"],
        ],
        caption:
          "The roll column is paid or received whether or not price moves — it is the curve's standing contribution.",
      },
    },
    {
      kind: "interactive",
      id: "mk-l8-b4",
      title: "Slope before story",
      takeaway:
        "The defensible analyses price the roll into the thesis — direction without structure ignores a known, repeating cost.",
      interaction: {
        type: "scenario-decision",
        prompt: "Three commodity theses arrive. Which handle the curve correctly?",
        situation: [
          "(a) Long a rolling oil fund in 6% annualized contango, flat spot expected · (b) Long front-month oil in backwardation · (c) 'Only spot matters; curves are noise'.",
        ],
        choices: [
          {
            label:
              "a: requires >6% spot gain just to break even — likely skip · b: roll subsidy supports the long — proceed with structural edge added",
            outcome: "Each thesis is judged net of the known roll arithmetic.",
            best: true,
            feedback:
              "Correct — the bill in (a) must be beaten before any profit; the subsidy in (b) is a tailwind you get paid to wait for.",
          },
          {
            label: "Take (a) — oil 'must' recover",
            outcome:
              "A 6% structural headwind plus a forecast that may take years is a compounding loss plan.",
            best: false,
            feedback:
              "Conviction about direction does not cancel the roll; the structure levies first, opinions second.",
          },
          {
            label: "Take (b) but ignore the roll — spot direction is all that counts",
            outcome:
              "You leave a measurable subsidy out of the expectancy — the thesis is half-counted.",
            best: false,
            feedback:
              "Backwardation adds to long roll yield; ignoring it understates your edge — count both columns.",
          },
          {
            label: "Accept (c) — curves are noise",
            outcome: "The roll bill repeats quarterly and compounds; noise does not invoice.",
            best: false,
            feedback:
              "Roll drag is realized cash arithmetic on every cycle — documented, measurable, and never optional for a rolling holder.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "mk-l8-b5",
      title: "Guided practice",
      assessment: {
        intro: "Price the roll.",
        allowRetry: true,
        items: [
          {
            skill: "Roll cost percentage",
            question: {
              id: "mk-l8-q1",
              type: "numeric",
              topic: "costs",
              prompt:
                "Front contract at $65; the deferred contract you roll into costs $66.30. What is the roll cost in percent?",
              answer: 2,
              tolerance: 0.1,
              unit: "%",
              explain: "(66.30 − 65.00) ÷ 65.00 = 1.30 ÷ 65.00 = 2% paid on this roll.",
            },
            feedbackByAnswer: {
              numeric: "Difference ÷ front: 1.30 ÷ 65.00 = 0.02 = 2%.",
            },
          },
          {
            skill: "Identifying the shape",
            question: {
              id: "mk-l8-q2",
              type: "mcq",
              topic: "market-basics",
              prompt:
                "Front month trades at $52; the deferred three months out trades at $49. What is the curve and the long's roll experience?",
              options: [
                "Contango — the long pays each roll",
                "Backwardation — the long collects each roll",
                "Inverted only at expiry",
                "Flat carry",
              ],
              answer: 1,
              explain:
                "Deferred below front = backwardation; rolling a long sells the dear front and buys the cheap deferred — a subsidy.",
            },
            feedbackByAnswer: {
              "0": "Contango requires deferred above front — the opposite quote.",
              "2": "The whole string's slope is what defines the shape.",
              "3": "A $3 gap is not flat.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "mk-l8-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Who the roll charges",
            question: {
              id: "mk-l8-q3",
              type: "truefalse",
              topic: "costs",
              prompt:
                "In contango, a continuously rolled long pays a repeating structural cost even if spot price never moves.",
              answer: true,
              explain:
                "Each cycle sells the lower front and buys the higher deferred — realized drag compounding independently of spot.",
            },
            feedbackByAnswer: {
              true: "Correct — the bill is in the curve, not in the forecast.",
              false:
                "Flat spot with contango rolls still loses money — the classic fund-headline disappointment.",
            },
          },
          {
            skill: "Spot ETF tracking difference",
            question: {
              id: "mk-l8-q4",
              type: "mcq",
              topic: "costs",
              prompt: "Why can a 'spot oil' ETF lag spot oil by 10% in a year while spot rose 5%?",
              options: [
                "The fund's fees were 10%",
                "It must roll a contango curve repeatedly — structural roll drag dominates the fee",
                "Spot data is wrong",
                "The fund holds no exposure",
              ],
              answer: 1,
              explain:
                "A rolling fund converts the curve's slope into tracking difference; fees are the smaller line item.",
            },
            feedbackByAnswer: {
              "0": "Typical fees are tens of basis points, not 10%.",
              "2": "Spot is the reference being measured against — it is not the error.",
              "3": "The fund holds futures exposure — that is precisely how the drag arises.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "mk-l8-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Agricultural string: front $240/tonne, next quarter $234 (−2.5%), the quarter after $228. You plan a rolling long for two quarters while spot is forecast roughly flat.",
          "Spot lands at $240 — exactly where you started.",
        ],
        assessment: {
          items: [
            {
              skill: "Netting structure against direction",
              question: {
                id: "mk-l8-q5",
                type: "mcq",
                topic: "costs",
                prompt:
                  "The curve is backwardated; what is the long's approximate structural result over the two rolls?",
                options: [
                  "Roughly +5% from collecting the declining roll steps — a flat spot still ends profitable",
                  "Zero — spot flat means the structure cancels",
                  "Roughly −5% — backwardation charges longs",
                  "Depends only on the forecast",
                ],
                answer: 0,
                explain:
                  "Each roll sells the dear front and buys cheaper deferred (~2.5% steps compounding ≈ +5%) — backwardation pays longs to hold, so flat spot can still profit.",
              },
              feedbackByAnswer: {
                "1": "That would require a flat curve; the slope is doing real work here.",
                "2": "Backwardation subsidises longs — contango is the charging shape.",
                "3": "The forecast describes spot; the curve describes carry — both enter expectancy.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "mk-l8-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Pick a commodity fund or contract you know. Is its curve in contango or backwardation right now — and what does that charge or pay a long each roll?",
      ],
    },
    {
      kind: "summary",
      id: "mk-l8-b9",
      title: "Recap",
      points: [
        "Contango: deferred above front — rolling longs pay; backwardation: the mirror — longs collect.",
        "Roll yield compounds independently of spot direction and can dominate it.",
        "Rolling commodity funds inherit the curve — their tracking difference is structural.",
        "Read the slope before entry: the thesis must beat the bill (or enjoy the subsidy).",
      ],
      nextStep:
        "Next: what actually drives each commodity family — weather, rates, seasons and cycles.",
    },
  ],
};
