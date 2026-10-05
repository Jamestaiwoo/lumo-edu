import type { CourseLesson } from "../types";

export const lesson08EventRiskCalendar: CourseLesson = {
  id: "cm-l8",
  moduleId: "c6-m3",
  title: "The Calendar and Event Risk",
  blurb: "Plan size around scheduled events so a gap cannot break your risk rules.",
  objectives: [
    "Identify the scheduled events that matter for a position",
    "Size a position so a plausible gap stays within your risk limit",
    "Explain why a stop-loss does not cap gap losses",
  ],
  durationMinutes: 11,
  xp: 38,
  keyTakeaway:
    "Before a scheduled event, size for the gap, not the stop: shares = risk budget ÷ plausible gap per share.",
  blocks: [
    {
      kind: "explain",
      id: "cm-l8-b1",
      explanation: {
        heading: "Known dates, unknown outcomes",
        whyItMatters:
          "Scheduled events concentrate risk into seconds. Checking the calendar is the cheapest risk control a trader has.",
        paragraphs: [
          "An economic calendar lists release times for rate decisions, inflation, jobs, GDP and company earnings. You cannot know the outcome, but you always know the date.",
          "Around these events, price can jump past your stop. Your normal sizing — risk ÷ stop distance — assumes the stop fills near its level, which may not happen.",
          "A practical rule: estimate a plausible gap per share (for example from the implied move) and size so that gap × shares stays within your risk budget.",
          "Alternatives include reducing size, closing before the event, or simply waiting for the event to pass and the market to settle.",
        ],
        keyTerms: [
          {
            term: "Economic calendar",
            definition: "Schedule of upcoming data releases and policy decisions.",
          },
          {
            term: "Event risk",
            definition: "The chance of a large, sudden move around a scheduled event.",
          },
          {
            term: "Gap",
            definition: "A jump between one price and the next with no trading in between.",
          },
        ],
        callouts: [
          {
            tone: "tip",
            title: "Waiting is a position",
            body: "Choosing not to hold through an event is a legitimate decision, not a missed opportunity.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "cm-l8-b2",
      example: {
        title: "Normal size versus event size",
        setup:
          "Account $20,000, risk rule 1% per trade. Stop distance $2 per share. Before a rate decision, a gap of $5 per share is plausible.",
        steps: [
          { label: "Risk budget", detail: "1% × $20,000 = $200." },
          { label: "Normal size", detail: "$200 ÷ $2 = 100 shares." },
          { label: "Gap loss at normal size", detail: "100 × $5 = $500 — 2.5× the budget." },
          {
            label: "Event size",
            detail: "$200 ÷ $5 = 40 shares, so a $5 gap still costs only $200.",
          },
        ],
        takeaway:
          "Same rule, different input: around events the gap, not the stop, defines the risk.",
      },
    },
    {
      kind: "visual",
      id: "cm-l8-b3",
      title: "Sizing for the gap",
      visual: {
        type: "table",
        label: "$200 risk budget",
        columns: ["Risk per share used", "Shares", "Loss if $5 gap"],
        rows: [
          ["$2 (stop distance)", "100", "$500"],
          ["$4", "50", "$250"],
          ["$5 (plausible gap)", "40", "$200"],
        ],
        caption: "Educational calculation for a simulated position.",
      },
    },
    {
      kind: "interactive",
      id: "cm-l8-b4",
      title: "Week ahead",
      interaction: {
        type: "scenario-decision",
        prompt:
          "You plan a new swing trade on Monday. The calendar shows a rate decision on Wednesday. What do you do?",
        situation: [
          "Your normal hold is three to five days.",
          "The decision could move your instrument several stops' worth.",
        ],
        choices: [
          {
            label: "Size for a plausible gap, or wait until after the decision",
            outcome:
              "The decision causes a big swing; your loss, had it gone against you, stays within plan.",
            best: true,
            feedback: "Right — you accounted for a known risk on a known date.",
          },
          {
            label: "Enter at normal size and rely on the stop",
            outcome: "Price gaps through the stop on the announcement.",
            best: false,
            feedback: "Stops cannot guarantee a fill price during fast or gapping markets.",
          },
          {
            label: "Ignore the calendar — events are unpredictable anyway",
            outcome: "You hold full size into the biggest risk of the week without noticing.",
            best: false,
            feedback: "The outcome is uncertain, but the timing is not. Plan for the timing.",
          },
        ],
      },
      takeaway: "Check the calendar before every entry; let known event dates shape your size.",
    },
    {
      kind: "practice",
      id: "cm-l8-b5",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "Normal sizing",
            question: {
              id: "cm-l8-q1",
              type: "numeric",
              topic: "position-sizing",
              prompt: "Account $20,000, risk 1%, stop distance $2. How many shares is normal size?",
              answer: 100,
              tolerance: 0.5,
              unit: "shares",
              explain: "Risk = $200. $200 ÷ $2 = 100 shares.",
            },
            feedbackByAnswer: { numeric: "1% of 20,000 = 200; 200 ÷ 2 = 100." },
          },
          {
            skill: "Event sizing",
            question: {
              id: "cm-l8-q2",
              type: "numeric",
              topic: "events",
              prompt:
                "Same $200 budget, but a $5 gap per share is plausible. How many shares keep the gap loss within budget?",
              answer: 40,
              tolerance: 0.5,
              unit: "shares",
              explain: "$200 ÷ $5 = 40 shares; a $5 gap then costs $200.",
            },
            feedbackByAnswer: { numeric: "Divide the budget by the gap: 200 ÷ 5 = 40." },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "cm-l8-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Stops and gaps",
            question: {
              id: "cm-l8-q3",
              type: "mcq",
              topic: "stops",
              prompt:
                "Price gaps from $50 to $44 overnight. Your stop was at $48. Where does it most likely fill?",
              options: [
                "Near $44, the first available price",
                "Exactly $48",
                "At $50",
                "It is cancelled automatically",
              ],
              answer: 0,
              explain:
                "A triggered stop becomes a market order and fills at the next available price — here near $44.",
            },
            feedbackByAnswer: {
              "1": "There was no trading at $48; the price jumped straight past it.",
              "2": "The stop sells below the prior price, not at it.",
              "3": "The stop is triggered, not cancelled — it fills at the gap price.",
            },
          },
          {
            skill: "Stop guarantees",
            question: {
              id: "cm-l8-q4",
              type: "truefalse",
              topic: "stops",
              prompt: "A standard stop-loss order guarantees your exit price.",
              answer: false,
              explain:
                "Standard stops guarantee an attempt to exit, not the price. Gaps and fast markets cause slippage.",
            },
            feedbackByAnswer: {
              true: "Only the trigger level is fixed; the fill price is not.",
              false: "Correct — that is why event sizing matters.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "cm-l8-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Your simulated account is $10,000 and you risk 1% per trade.",
          "An earnings release could gap the stock by $4 per share.",
        ],
        assessment: {
          items: [
            {
              skill: "Gap-based size",
              question: {
                id: "cm-l8-q5",
                type: "numeric",
                topic: "events",
                prompt: "What is the maximum number of shares so a $4 gap stays within your risk?",
                answer: 25,
                tolerance: 0.5,
                unit: "shares",
                explain: "Risk = 1% × $10,000 = $100. $100 ÷ $4 = 25 shares.",
              },
              feedbackByAnswer: { numeric: "100 ÷ 4 = 25." },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "cm-l8-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: ["Which recurring events will you now check before entering a trade?"],
    },
    {
      kind: "summary",
      id: "cm-l8-b9",
      title: "Recap",
      points: [
        "Event dates are known; outcomes are not.",
        "Around events, size for the plausible gap: shares = risk ÷ gap.",
        "Reducing size, exiting or waiting are all valid plans.",
      ],
      nextStep:
        "You've finished Company & Macro Analysis. Next up: Crypto Foundations, when it becomes available.",
    },
  ],
};
