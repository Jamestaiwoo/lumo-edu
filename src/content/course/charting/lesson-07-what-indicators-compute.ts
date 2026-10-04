import type { CourseLesson } from "../types";

export const lesson07WhatIndicatorsCompute: CourseLesson = {
  id: "tc-l7",
  moduleId: "c3-m3",
  title: "What Indicators Actually Compute",
  blurb: "Open the box: every indicator is arithmetic on prices you already have.",
  objectives: [
    "Compute a simple moving average by hand",
    "Explain why smoothing creates lag",
    "Describe what an exponential average weights differently",
    "State the general form: derived, delayed, bounded by its inputs",
  ],
  durationMinutes: 11,
  xp: 33,
  keyTakeaway:
    "A moving average is the mean of the last N closes — nothing more. Once you can compute it by hand, its lag stops being a mystery and starts being arithmetic.",
  blocks: [
    {
      kind: "explain",
      id: "tc-l7-b1",
      explanation: {
        heading: "The whole trick is averaging",
        whyItMatters:
          "Indicators feel like external authority when you only ever see their curves. Compute one by hand and it becomes what it is: a summary statistic of prices you already read in tc-l1.",
        paragraphs: [
          "A simple moving average (SMA) of N closes is exactly their mean: add the last N closing prices, divide by N. A 5-period SMA on closes 10, 11, 12, 13, 14 is (10+11+12+13+14) ÷ 5 = 12. Tomorrow it becomes (11+12+13+14+15) ÷ 5 = 13 — the oldest value drops out, a new one enters. The curve you see is that computation redrawn each bar.",
          "Smoothing is the product and the cost. Averaging cancels noise — one odd bar moves the mean by 1/N of its deviation. But cancellation works in both directions: the average also cancels genuine turning points, arriving late to every change. The lag is not a defect to fix; it is the mathematical price of the smoothing you asked for. Longer N smooths harder and lags more; shorter N follows closely and passes more noise through.",
          "The exponential moving average (EMA) keeps the same idea with different weights: today's average = weight × today's close + (1 − weight) × yesterday's average. Recent closes count more, old ones fade geometrically. It reacts faster than an SMA of similar length — again, trading noise-reduction for timeliness, not creating new information.",
          "The general form applies beyond averages: RSI summarises recent up-days versus down-days; MACD differences two averages; Bollinger bands statisticise distance from the mean. All are functions of prices already printed. None knows anything the candles did not record — which is why the next lessons are about failure modes rather than magic.",
        ],
        keyTerms: [
          {
            term: "Simple moving average (SMA)",
            definition: "The arithmetic mean of the last N closes — each contributing 1/N.",
          },
          {
            term: "Lag",
            definition:
              "The delay between a price turn and the indicator's response — inherent to smoothing.",
          },
          {
            term: "EMA weighting",
            definition:
              "Exponential decay weights: recent closes matter more; old influence fades but never vanishes.",
          },
        ],
        callouts: [
          {
            tone: "info",
            title: "N is a choice, not a measurement",
            body: "There is no physically true period. 10, 20, 50 are conventions; each produces a different trade-off of noise versus lag.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "tc-l7-b2",
      example: {
        title: "A five-bar SMA, by hand",
        setup: "Closes: 10, 11, 12, 13, 14 — then a reversal to 12.",
        steps: [
          {
            label: "Compute",
            detail: "SMA5 = (10+11+12+13+14) ÷ 5 = 60 ÷ 5 = 12.0.",
          },
          {
            label: "Price turns",
            detail:
              "Next close = 12 (a $2 drop from 14). New SMA5 = (11+12+13+14+12) ÷ 5 = 62 ÷ 5 = 12.4.",
          },
          {
            label: "Measure the lag",
            detail:
              "Price just fell from 14 to 12 (−2.00), yet the average rose from 12.0 to 12.4 — because the window dropped its oldest value (10) and still contains 14.",
          },
          {
            label: "The lesson",
            detail:
              "One crash bar can coexist with a rising average — the window's history dominates. The average only turns down once enough lower closes have entered the window.",
          },
        ],
        takeaway:
          "The average lives in the past: the window decides what it remembers, and memory is exactly the lag.",
      },
    },
    {
      kind: "visual",
      id: "tc-l7-b3",
      title: "Window length versus responsiveness",
      visual: {
        type: "table",
        label: "Same turn, two window lengths",
        columns: ["Window", "On a sharp reversal", "In choppy sideways trade"],
        rows: [
          [
            "SMA-5",
            "Turns quickly; passes most noise through",
            "Frequent small crosses — whipsaw fuel",
          ],
          ["SMA-20", "Turns late; cancels most noise", "Fewer crosses; late on the real turn too"],
        ],
        caption:
          "One knob controls both columns: length trades timeliness against smoothness — there is no setting that wins both.",
      },
    },
    {
      kind: "interactive",
      id: "tc-l7-b4",
      title: "Compute before you trust",
      takeaway:
        "Each answer comes from arithmetic on printed closes — the indicator agrees with your hand because it has no other source.",
      interaction: {
        type: "chart-read",
        prompt: "Five closes are given. Compute what the average does.",
        label: "Close series",
        candles: [
          { open: 20.0, high: 21.0, low: 19.8, close: 20.6 },
          { open: 20.6, high: 21.6, low: 20.4, close: 21.2 },
          { open: 21.2, high: 21.4, low: 20.6, close: 20.9 },
          { open: 20.9, high: 22.2, low: 20.7, close: 22.0 },
          { open: 22.0, high: 23.1, low: 21.8, close: 23.0 },
        ],
        tasks: [
          {
            prompt: "Closes: 20.6, 21.2, 20.9, 22.0, 23.0. What is the SMA-5?",
            options: ["21.24", "21.54", "21.94", "22.00"],
            answer: 1,
            explain: "Sum = 107.7; 107.7 ÷ 5 = 21.54.",
          },
          {
            prompt:
              "Next close is 21.0 (a −2.0 drop from 23.0). New SMA-5 (21.2, 20.9, 22.0, 23.0, 21.0)?",
            options: [
              "It must fall below 21.0",
              "108.1 ÷ 5 = 21.62 — it barely moves while price plunges",
              "It stays exactly 21.54",
              "It doubles",
            ],
            answer: 1,
            explain:
              "Sum = 108.1 → 21.62. The average actually rose: the window dropped 20.6, and 23.0 still dominates. Lag made visible.",
          },
          {
            prompt: "What does this demonstrate about indicator signals?",
            options: [
              "Signals are new information beyond the candles",
              "The signal is delayed arithmetic — it can point the wrong way during fast turns",
              "Averages are broken and unusable",
              "Longer windows eliminate lag",
            ],
            answer: 1,
            explain:
              "The indicator can rise while price falls because its window is memory. Longer windows delay more, not less.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "tc-l7-b5",
      title: "Guided practice",
      assessment: {
        intro: "Hand-compute the averages.",
        allowRetry: true,
        items: [
          {
            skill: "SMA arithmetic",
            question: {
              id: "tc-l7-q1",
              type: "numeric",
              topic: "indicators",
              prompt: "Closes 55, 57, 56, 58, 60. What is the SMA-5?",
              answer: 57.2,
              tolerance: 0.1,
              unit: "USD",
              explain:
                "Sum = 55 + 57 + 56 + 58 + 60 = 286; 286 ÷ 5 = 57.2 — the plain mean of five closes.",
            },
            feedbackByAnswer: { numeric: "Add the five closes (286) and divide by 5." },
          },
          {
            skill: "Window slide arithmetic",
            question: {
              id: "tc-l7-q2",
              type: "numeric",
              topic: "indicators",
              prompt:
                "Previous SMA-5 was 57.2 (window sum 286). The oldest close (55) rolls out and 62 rolls in. What is the new SMA-5?",
              answer: 58.6,
              tolerance: 0.1,
              unit: "USD",
              explain: "New sum = 286 − 55 + 62 = 293; 293 ÷ 5 = 58.6.",
            },
            feedbackByAnswer: {
              numeric: "286 − 55 + 62 = 293; 293 ÷ 5 = 58.6.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tc-l7-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Lag as trade-off",
            question: {
              id: "tc-l7-q3",
              type: "mcq",
              topic: "indicators",
              prompt: "Why does a moving average lag?",
              options: [
                "Data feeds update slowly",
                "It averages past closes, so turns only register once enough new closes enter the window",
                "Brokers delay indicator rendering",
                "Lag can be removed by choosing a longer period",
              ],
              answer: 1,
              explain:
                "The window is memory: a turn is invisible until the window has rotated enough to contain it. Longer periods increase the lag.",
            },
            feedbackByAnswer: {
              "0": "Feed latency is measured in milliseconds; average lag is measured in bars.",
              "2": "Rendering has nothing to do with the arithmetic.",
              "3": "Longer periods smooth harder and turn later — the trade-off deepens, not disappears.",
            },
          },
          {
            skill: "Information content",
            question: {
              id: "tc-l7-q4",
              type: "truefalse",
              topic: "indicators",
              prompt:
                "An EMA contains information that is not already present in the price series it is computed from.",
              answer: false,
              explain:
                "It re-weights the same closes. No outside information enters — only a different summary of prices you already have.",
            },
            feedbackByAnswer: {
              false: "Correct — derived, not discovered.",
              true: "If it carried outside information, its inputs would not be sufficient to reproduce it.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tc-l7-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "A colleague claims their '20-day line always tells the truth'. You just computed an SMA-20 at 148.20 while price sits at 141.00 after four straight red days.",
        ],
        assessment: {
          items: [
            {
              skill: "Explaining divergence from the mean",
              question: {
                id: "tc-l7-q5",
                type: "mcq",
                topic: "indicators",
                prompt:
                  "The price is 7.2 points below a rising-ish average after a fast drop. What explains it?",
                options: [
                  "The indicator is broken",
                  "The window still holds the higher closes from before the drop — the average lags the new information",
                  "Price is wrong",
                  "Averages only update weekly",
                ],
                answer: 1,
                explain:
                  "Distance below the average after a fast fall is lag, literally: 148.20 − 141.00 = 7.20 points of memory the window has not yet flushed.",
              },
              feedbackByAnswer: {
                "0": "The computation is correct — it is answering a question about the past window.",
                "2": "Price is the primary data; the average is the derivative.",
                "3": "Averages update every bar by definition.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tc-l7-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Which indicator do you currently trust most? Write down, in one sentence, exactly what arithmetic it performs on which prices.",
      ],
    },
    {
      kind: "summary",
      id: "tc-l7-b9",
      title: "Recap",
      points: [
        "SMA = mean of the last N closes; slide the window, redraw the line.",
        "Smoothing cancels noise and turns alike — lag is the price paid.",
        "EMA re-weights the same closes toward the recent; faster, not smarter.",
        "All indicators are derived from prices already printed — open the box before you obey the curve.",
      ],
      nextStep:
        "Next: momentum and trend followers — RSI, MACD and what their crossings actually mean.",
    },
  ],
};
