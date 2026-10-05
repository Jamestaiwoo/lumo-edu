import type { CourseLesson } from "../types";

export const lesson06GrowthDataSurprises: CourseLesson = {
  id: "cm-l6",
  moduleId: "c6-m2",
  title: "Growth, Jobs and Data Surprises",
  blurb: "Markets trade the gap between what was expected and what arrived.",
  objectives: [
    "Compute a data surprise against consensus",
    "Include revisions when reading a report",
    "Explain why strong data can push markets lower",
  ],
  durationMinutes: 10,
  xp: 34,
  keyTakeaway:
    "Surprise = actual − consensus, plus revisions to earlier data. The same number can be good or bad depending on what it implies for rates.",
  blocks: [
    {
      kind: "explain",
      id: "cm-l6-b1",
      explanation: {
        heading: "Expectations are the benchmark",
        whyItMatters:
          "Traders who react to a headline number without the consensus beside it often trade the wrong direction.",
        paragraphs: [
          "Key growth data include GDP (total output), employment reports and business surveys. Before each release, economists publish a consensus forecast.",
          "The surprise is actual − consensus. A strong number that matched consensus is often already priced in and moves little.",
          "Reports also revise earlier months. A headline beat paired with a large downward revision can be weaker overall than it looks.",
          "Context decides the reaction. When inflation is a worry, very strong growth data can raise rate expectations and push stocks down — 'good news is bad news'.",
        ],
        keyTerms: [
          { term: "Consensus", definition: "The median economist forecast before a release." },
          { term: "Surprise", definition: "Actual figure minus consensus." },
          { term: "Revision", definition: "A correction to a previously published figure." },
        ],
        callouts: [
          {
            tone: "warning",
            title: "First moves can reverse",
            body: "Initial reactions to data are fast and noisy; prices often swing both ways as details are digested.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "cm-l6-b2",
      example: {
        title: "A jobs report, line by line",
        setup: "Consensus expects 180,000 new jobs. The report shows 120,000, and last month is revised from 200,000 to 150,000.",
        steps: [
          { label: "Headline surprise", detail: "120k − 180k = −60k." },
          { label: "Revision", detail: "150k − 200k = −50k." },
          { label: "Combined", detail: "−60k + (−50k) = −110k fewer jobs than the market believed." },
        ],
        takeaway: "The report is weaker than the headline alone suggests once revisions are counted.",
      },
    },
    {
      kind: "visual",
      id: "cm-l6-b3",
      title: "Reading the release",
      visual: {
        type: "table",
        label: "Illustrative employment report (thousands)",
        columns: ["Figure", "Expected / prior", "Actual / revised", "Difference"],
        rows: [
          ["This month", "180", "120", "−60"],
          ["Last month", "200", "150", "−50"],
          ["Total vs belief", "—", "—", "−110"],
        ],
        caption: "Educational example, not a real release.",
      },
    },
    {
      kind: "interactive",
      id: "cm-l6-b4",
      title: "Strong data, falling stocks",
      interaction: {
        type: "scenario-decision",
        prompt: "GDP growth beats consensus by a wide margin while inflation is above target. Stocks drop. Why?",
        situation: ["Bond yields rise sharply after the release.", "The central bank has been signalling concern about inflation."],
        choices: [
          {
            label: "Strong growth raised expectations of higher rates",
            outcome: "The yield jump explains the equity move — valuations compressed.",
            best: true,
            feedback: "Right — the data mattered through what it implied for policy.",
          },
          {
            label: "The data must have been misreported",
            outcome: "You miss the rate channel entirely.",
            best: false,
            feedback: "No error needed: the reaction follows from rate expectations.",
          },
          {
            label: "Markets are random; data never matters",
            outcome: "You ignore a clear, explainable link between yields and stocks.",
            best: false,
            feedback: "Short-term noise is real, but this move has a coherent explanation.",
          },
        ],
      },
      takeaway: "Ask what a number implies for rates, not just whether it is 'good'.",
    },
    {
      kind: "practice",
      id: "cm-l6-b5",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "Headline surprise",
            question: {
              id: "cm-l6-q1",
              type: "numeric",
              topic: "macro",
              prompt: "Consensus is 180k jobs and the actual is 120k. What is the surprise in thousands?",
              answer: -60,
              tolerance: 0.5,
              unit: "k",
              explain: "Surprise = actual − consensus = 120 − 180 = −60k.",
            },
            feedbackByAnswer: { numeric: "Actual minus consensus: 120 − 180 = −60." },
          },
          {
            skill: "Including revisions",
            question: {
              id: "cm-l6-q2",
              type: "numeric",
              topic: "macro",
              prompt: "Add a revision from 200k to 150k. What is the combined difference in thousands?",
              answer: -110,
              tolerance: 0.5,
              unit: "k",
              explain: "Revision = 150 − 200 = −50k. Combined = −60 + (−50) = −110k.",
            },
            feedbackByAnswer: { numeric: "−60 headline plus −50 revision = −110." },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "cm-l6-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "What moves prices",
            question: {
              id: "cm-l6-q3",
              type: "mcq",
              topic: "macro",
              prompt: "A data release matches consensus exactly. What usually happens?",
              options: [
                "A small reaction, because the number was largely priced in",
                "A huge rally, because the number was good",
                "A crash, because consensus is always wrong",
                "Trading stops until the next release",
              ],
              answer: 0,
              explain: "Prices already reflect the consensus, so an in-line number contains little new information.",
            },
            feedbackByAnswer: {
              "1": "'Good' is measured against expectations; an in-line number adds little news.",
              "2": "Consensus is often close; an exact match is no surprise at all.",
              "3": "Markets keep trading; there is simply less to react to.",
            },
          },
          {
            skill: "Good news, bad reaction",
            question: {
              id: "cm-l6-q4",
              type: "truefalse",
              topic: "macro",
              prompt: "Stronger-than-expected economic data always lifts stock prices.",
              answer: false,
              explain:
                "When inflation is a concern, strong data can raise rate expectations and weigh on stocks.",
            },
            feedbackByAnswer: {
              true: "The rate channel can make strong data negative for stocks.",
              false: "Correct — context determines the reaction.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "cm-l6-b7",
      title: "Application scenario",
      scenario: {
        situation: ["Consensus expects GDP growth of 2.0%.", "The release shows 2.6%."],
        assessment: {
          items: [
            {
              skill: "GDP surprise",
              question: {
                id: "cm-l6-q5",
                type: "numeric",
                topic: "macro",
                prompt: "What is the surprise in percentage points?",
                answer: 0.6,
                tolerance: 0.01,
                unit: "pp",
                explain: "2.6 − 2.0 = +0.6 percentage points above consensus.",
              },
              feedbackByAnswer: { numeric: "2.6 − 2.0 = 0.6." },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "cm-l6-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: ["Before the next big release, what would you write down so you can judge the surprise afterwards?"],
    },
    {
      kind: "summary",
      id: "cm-l6-b9",
      title: "Recap",
      points: [
        "Surprise = actual − consensus.",
        "Revisions can change the overall message.",
        "The rate implications decide whether data is 'good' for markets.",
      ],
      nextStep: "Next module: scheduled events — earnings season and the economic calendar.",
    },
  ],
};
