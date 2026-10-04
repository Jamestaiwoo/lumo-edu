import type { CourseLesson } from "../types";

export const lesson01AnatomyOfCandle: CourseLesson = {
  id: "tc-l1",
  moduleId: "c3-m1",
  title: "Anatomy of a Candle",
  blurb: "Four prices, one interval — the atom of every chart you will read.",
  objectives: [
    "Identify open, high, low and close on any candle",
    "Read body and wick as evidence of who won the interval",
    "Compare two candles to infer which side controlled",
    "Distinguish what a candle records from what people claim it predicts",
  ],
  durationMinutes: 11,
  xp: 33,
  keyTakeaway:
    "A candle is a compressed verdict: the open shows where the auction started, the close where it ended, and the wicks the ground neither side could hold.",
  blocks: [
    {
      kind: "explain",
      id: "tc-l1-b1",
      explanation: {
        heading: "Four prices in one box",
        whyItMatters:
          "Every pattern, level and indicator downstream is built from these four numbers. Traders who skip this layer end up memorising shape names without understanding the contest the shape records.",
        paragraphs: [
          "Within one interval — a minute, an hour, a day — trading happened across a range of prices. The candle compresses that history into four values: open (the first trade), close (the last trade), high (the top of the interval's range), low (the bottom). The body spans open to close; the wicks (or shadows) reach from the body out to the high and low.",
          "Colour (or filled/hollow) tells you the direction: a candle closing above its open is bullish — buyers controlled the finish. Closing below the open is bearish — sellers did. A small body means the auction ended near where it began: indecision, or a balanced fight. A long body means one side moved price decisively and held the ground.",
          "The wicks record contested territory. A long upper wick says price pushed higher and was rejected back down before the close — sellers absorbed the attempt. A long lower wick says a dip was bought. Wicks are attempts; bodies are settlements. When people say a candle 'shows indecision', they mean the settlement barely moved despite the attempts.",
          "What a candle is not: a forecast. It is a record of one interval's auction. A bullish candle says buyers won the last round — nothing about the next. Prediction frameworks built on candle shapes (engulfing, hammers, dojis) are claims about how often past winners keep winning; they need statistics, not reverence. We will treat them as hypotheses with hit rates, never as signals with guarantees.",
        ],
        keyTerms: [
          {
            term: "Body",
            definition: "The span between open and close — the interval's net settlement.",
          },
          {
            term: "Wick / shadow",
            definition:
              "The thin lines reaching to the high and low — the ground tested but not held.",
          },
          {
            term: "Bullish / bearish",
            definition:
              "Closing above the open (bullish) or below it (bearish) — direction of the settlement only.",
          },
        ],
        callouts: [
          {
            tone: "info",
            title: "Same four numbers, any timeframe",
            body: "A daily candle is one trading day's auction; a five-minute candle is five minutes'. Reading is identical — only the span changes.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "tc-l1-b2",
      example: {
        title: "Reading one day's auction",
        setup:
          "A stock trades: opens at $50.00, dips to $48.80, rallies to $52.40, closes at $51.90.",
        steps: [
          {
            label: "Locate the four prices",
            detail: "Open 50.00 · Low 48.80 · High 52.40 · Close 51.90.",
          },
          {
            label: "Read the body",
            detail:
              "Close − open = +$1.90: a bullish body. Buyers settled the interval above where it started.",
          },
          {
            label: "Read the wicks",
            detail:
              "Lower wick = 50.00 − 48.80 = $1.20: an early selloff that was bought. Upper wick = 52.40 − 51.90 = $0.50: a late push that faded slightly.",
          },
          {
            label: "Assemble the story",
            detail:
              "Sellers tried first and failed; buyers took control and mostly held it. That is the entire claim — a description, not a promise about tomorrow.",
          },
        ],
        takeaway: "Open tells you the start, close the verdict, wicks the arguments in between.",
      },
    },
    {
      kind: "visual",
      id: "tc-l1-b3",
      title: "Three candles, three verdicts",
      visual: {
        type: "candles",
        label: "Settlement stories",
        candles: [
          { open: 50.0, high: 52.4, low: 48.8, close: 51.9 },
          { open: 51.9, high: 52.2, low: 49.4, close: 49.7 },
          { open: 49.7, high: 50.1, low: 49.6, close: 49.8 },
        ],
        caption:
          "Left: buyers settle higher after absorbing a dip. Middle: sellers take the round. Right: tiny body — the auction ended where it began.",
      },
    },
    {
      kind: "interactive",
      id: "tc-l1-b4",
      title: "Read the close, not the noise",
      takeaway:
        "Each prompt asks what the four prices actually establish — every defensible answer describes the settlement and stops before predicting the next interval.",
      interaction: {
        type: "chart-read",
        prompt:
          "Three candles from one session. For each, what does the settlement (open → close) establish?",
        label: "Five-minute candles",
        candles: [
          { open: 30.0, high: 31.4, low: 29.8, close: 31.2 },
          { open: 31.2, high: 31.3, low: 29.9, close: 30.1 },
          { open: 30.1, high: 30.2, low: 30.0, close: 30.1 },
        ],
        tasks: [
          {
            prompt: "First candle: open 30.00, close 31.20. What is the verdict?",
            options: [
              "Buyers settled well above the open — a bullish interval",
              "Sellers controlled because price fell intraday at some point",
              "Tomorrow will be bullish",
              "The wick proves the rally was fake",
            ],
            answer: 0,
            explain:
              "Close − open = +1.20: a large bullish body. The small lower wick shows an early dip that was bought; the settlement is the claim.",
          },
          {
            prompt: "Second candle: open 31.20, close 30.10. What is the verdict?",
            options: [
              "Indecision — the candle barely moved",
              "Buyers won the interval",
              "Sellers settled the interval below the open — a bearish interval",
              "The market closed for the day",
            ],
            answer: 2,
            explain:
              "A −1.10 body: sellers pushed and held price below the open. The wick to 31.30 shows a failed push higher first.",
          },
          {
            prompt:
              "Third candle: open 30.10, high 30.20, low 30.00, close 30.10. What is established?",
            options: [
              "A violent reversal is forming",
              "The auction went nowhere — a near-zero body signals balance",
              "Volume has dried up entirely",
              "Price will break out next",
            ],
            answer: 1,
            explain:
              "Open equals close: a doji-like balance. It establishes only that this interval resolved flat — nothing about the next one.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "tc-l1-b5",
      title: "Guided practice",
      assessment: {
        intro: "Extract the four prices and their meaning.",
        allowRetry: true,
        items: [
          {
            skill: "Computing body size",
            question: {
              id: "tc-l1-q1",
              type: "numeric",
              topic: "candles",
              prompt:
                "A candle opens at $74.20 and closes at $76.05. What is the body size in dollars?",
              answer: 1.85,
              tolerance: 0.02,
              unit: "USD",
              explain:
                "Close − open = 76.05 − 74.20 = $1.85, and it is bullish since the close is higher.",
            },
            feedbackByAnswer: {
              numeric: "Subtract the open from the close: 76.05 − 74.20 = 1.85.",
            },
          },
          {
            skill: "Wick from high to close",
            question: {
              id: "tc-l1-q2",
              type: "numeric",
              topic: "candles",
              prompt:
                "High of the interval is $63.40 and the close is $62.15. What is the upper wick?",
              answer: 1.25,
              tolerance: 0.02,
              unit: "USD",
              explain:
                "High − close = 63.40 − 62.15 = $1.25 of upward ground that faded before the settle.",
            },
            feedbackByAnswer: {
              numeric: "Upper wick = high − close: 63.40 − 62.15 = 1.25.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tc-l1-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Bullish versus bearish by settlement",
            question: {
              id: "tc-l1-q3",
              type: "mcq",
              topic: "candles",
              prompt: "What makes a candle bearish?",
              options: [
                "It has a long lower wick",
                "It closed below its open",
                "It traded below the previous day's low",
                "Its body is red rather than green",
              ],
              answer: 1,
              explain:
                "Direction is defined by open versus close: settling below the open means sellers held the ground they took.",
            },
            feedbackByAnswer: {
              "0": "A long lower wick often shows buying pressure — the opposite of the claim.",
              "2": "Comparing to yesterday's range is a different (valid) observation, not the candle's own direction.",
              "3": "Colour is just a rendering of close-below-open, not the definition itself.",
            },
          },
          {
            skill: "Record versus forecast",
            question: {
              id: "tc-l1-q4",
              type: "truefalse",
              topic: "candles",
              prompt: "A bullish candle guarantees that the next interval will also close higher.",
              answer: false,
              explain:
                "A candle records one completed auction. Any claim that winners keep winning is a statistical hypothesis needing a hit rate — never a guarantee.",
            },
            feedbackByAnswer: {
              false: "Correct — the record ends at the close; the next auction is a new one.",
              true: "If this were true, pattern recognition would be an ATM — no reading course would be needed.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tc-l1-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You watch a stock open at $41.00. During the day it falls to $39.60, rallies to $42.30, and closes at $42.10.",
          "A chatroom member claims the day was 'basically bearish because it dropped to 39.60'.",
        ],
        assessment: {
          items: [
            {
              skill: "Body versus intraday extremes",
              question: {
                id: "tc-l1-q5",
                type: "numeric",
                topic: "candles",
                prompt: "What was the candle's body in dollars, and which direction?",
                answer: 1.1,
                tolerance: 0.02,
                unit: "USD",
                explain:
                  "42.10 − 41.00 = +$1.10: a bullish body. The dip to 39.60 lives in the lower wick — an attempt buyers absorbed.",
              },
              feedbackByAnswer: {
                numeric: "Close − open: 42.10 − 41.00 = 1.10, positive → bullish.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tc-l1-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Open any chart and find one candle with a long wick. In one sentence, describe what the wick records — without predicting anything.",
      ],
    },
    {
      kind: "summary",
      id: "tc-l1-b9",
      title: "Recap",
      points: [
        "Every candle compresses one interval into open, high, low, close.",
        "Body = settlement (close vs open); wicks = tested but unheld ground.",
        "Bullish/bearish describes the completed interval only.",
        "Pattern-based predictions are hypotheses with hit rates, not signals.",
      ],
      nextStep:
        "Next: chaining candles into swings — the structure labels everything else depends on.",
    },
  ],
};
