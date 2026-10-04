import type { CourseLesson } from "../types";

export const lesson02SwingStructure: CourseLesson = {
  id: "tc-l2",
  moduleId: "c3-m1",
  title: "Swing Highs, Lows & Structure",
  blurb: "Peaks and troughs are the grammar; trends are the sentences.",
  objectives: [
    "Define swing highs and swing lows from a candle series",
    "Classify structure as uptrend, downtrend or mixed from swing sequences",
    "Label higher highs, higher lows and their bearish mirrors",
    "Avoid calling every wiggle a swing by applying an offset rule",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Structure is a chain of peaks and troughs: higher highs with higher lows is an uptrend; lower highs with lower lows a downtrend; anything else is transition.",
  blocks: [
    {
      kind: "explain",
      id: "tc-l2-b1",
      explanation: {
        heading: "Peaks and troughs, in order",
        whyItMatters:
          "Levels, breakouts, trend stages — every structural concept is built by naming turning points. Without a consistent rule for what counts as a swing, two readers see two different charts.",
        paragraphs: [
          "A swing high is a bar whose high exceeds the highs of the bars immediately before and after it; a swing low mirrors that on the low side. The simplest robust rule needs two bars either side — a swing high at bar N requires bar N's high to be higher than the two before and the two after. The two-bar offset stops every one-bar wiggle from being labelled a turning point.",
          "The sequence of swings is the structure. An uptrend is a chain of higher highs and higher lows: each pullback holds above the prior trough, each push clears the prior peak. A downtrend is lower highs and lower lows. Neither pattern guarantees continuation — it describes who has been winning — but it decides which playbook applies: in an uptrend you buy pullbacks toward prior highs; in a downtrend shorts target prior lows.",
          "When the sequence breaks — a higher low violated, a prior peak reclaimed — structure has transitioned, and that is information, not failure. The break of structure (BOS) is precisely where Course 2's invalidation lives: if your thesis needs 'higher lows continue', the moment a low breaks is the moment the claim is false.",
          "Practical caution: swings are timeframe-relative. On a five-minute chart you may see five swings inside one daily candle. Always state the timeframe when you label structure, and never mix swing labels from different timeframes in one argument.",
        ],
        keyTerms: [
          {
            term: "Swing high / swing low",
            definition:
              "A local extreme flanked on both sides by lower highs (or higher lows) within the chosen offset.",
          },
          {
            term: "Higher high / higher low (HH/HL)",
            definition:
              "The repeating pattern of an uptrend: each peak and each trough exceeds its predecessor.",
          },
          {
            term: "Break of structure",
            definition:
              "When price violates the prior swing that defined the trend — the sequence changes character.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "State the timeframe",
            body: "Structure without a timeframe is ambiguous: the same bars read as trended or ranging depending on zoom.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "tc-l2-b2",
      example: {
        title: "Labelling a chain",
        setup:
          "Daily closes trace swings: low 92 → high 98 → low 95 → high 103 → low 99 → high 107.",
        steps: [
          {
            label: "List the turns",
            detail: "L 92, H 98, L 95, H 103, L 99, H 107 — alternating troughs and peaks.",
          },
          {
            label: "Compare highs",
            detail: "98 → 103 → 107: each peak higher. Higher highs confirmed.",
          },
          {
            label: "Compare lows",
            detail: "92 → 95 → 99: each trough higher. Higher lows confirmed.",
          },
          {
            label: "Verdict",
            detail:
              "Both conditions hold: an uptrend by definition. The trend remains valid while each pullback holds above the prior swing low — 99 is now the structural line.",
          },
        ],
        takeaway:
          "Structure is not a feeling about direction; it is an ordered comparison of named extremes.",
      },
    },
    {
      kind: "visual",
      id: "tc-l2-b3",
      title: "The swing chain of an uptrend",
      visual: {
        type: "price-path",
        label: "Higher highs and higher lows",
        points: [92, 98, 95, 103, 99, 107, 102, 111],
        caption:
          "Each trough (95, 99, 102) holds above the last; each peak (98, 103, 107, 111) clears the last — the two conditions of an uptrend, met in order.",
        markers: [
          { index: 2, label: "HL", tone: "up" },
          { index: 4, label: "HL", tone: "up" },
          { index: 5, label: "HH", tone: "up" },
          { index: 7, label: "HH", tone: "up" },
        ],
      },
    },
    {
      kind: "interactive",
      id: "tc-l2-b4",
      title: "Judge the structure",
      takeaway:
        "Structure verdicts come from comparing named swings in sequence — 'interesting' or 'obviously going up' are not labels the chart supports.",
      interaction: {
        type: "chart-read",
        prompt: "Read the swing sequences and classify the structure in each case.",
        label: "Daily swings",
        candles: [
          { open: 100.0, high: 104.0, low: 99.5, close: 103.4 },
          { open: 103.4, high: 106.0, low: 102.6, close: 105.2 },
          { open: 105.2, high: 105.8, low: 101.0, close: 101.6 },
          { open: 101.6, high: 108.0, low: 101.2, close: 107.3 },
          { open: 107.3, high: 109.5, low: 106.4, close: 108.9 },
        ],
        tasks: [
          {
            prompt: "Peaks at 106.0 then 109.5; troughs at 99.5 then 101.0. Structure?",
            options: [
              "Downtrend — the third bar fell sharply",
              "Uptrend — higher high and higher low in sequence",
              "Ranging — price did not move far",
              "Cannot be judged from two swings",
            ],
            answer: 1,
            explain:
              "109.5 > 106.0 and 101.0 > 99.5: both conditions met, so the chain is an uptrend by definition.",
          },
          {
            prompt: "What invalidates this uptrend's structure?",
            options: [
              "Any red candle appears",
              "A swing low breaks below the prior swing low (101.0)",
              "Volume declines",
              "Price stalls below 110 forever",
            ],
            answer: 1,
            explain:
              "The claim under test is 'lows keep getting higher'. A decisive print below the prior trough falsifies it — Course 2's invalidation, found in structure.",
          },
          {
            prompt: "Why must the timeframe be stated when labelling swings?",
            options: [
              "Longer timeframes are legally more significant",
              "The same bars can be one swing or several depending on zoom",
              "Indicators only work on daily charts",
              "Swings only exist above the 200-day average",
            ],
            answer: 1,
            explain:
              "Swing counts change with resolution; mixing timeframes in one argument produces contradictions.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "tc-l2-b5",
      title: "Guided practice",
      assessment: {
        intro: "Label the swings and compare them in order.",
        allowRetry: true,
        items: [
          {
            skill: "Comparing swing lows",
            question: {
              id: "tc-l2-q1",
              type: "numeric",
              topic: "trends",
              prompt:
                "Swing lows print at $22.40, $23.10 and $24.05. By how much did the latest low exceed the first?",
              answer: 1.65,
              tolerance: 0.02,
              unit: "USD",
              explain:
                "24.05 − 22.40 = $1.65 — a sequence of higher lows, the uptrend's lower condition.",
            },
            feedbackByAnswer: {
              numeric: "Subtract the earliest low from the latest: 24.05 − 22.40 = 1.65.",
            },
          },
          {
            skill: "Structural break",
            question: {
              id: "tc-l2-q2",
              type: "mcq",
              topic: "trends",
              prompt:
                "An uptrend's swing lows sit at 95, 99 and 102. Price then closes at 98.5. What changed?",
              options: [
                "Nothing — the close is above the first low",
                "The higher-low sequence is broken: structure has transitioned",
                "A new uptrend has begun",
                "The candle must be bearish",
              ],
              answer: 1,
              explain:
                "The claim was 'each low holds above the last' (102). A close at 98.5 violates it — the sequence that defined the trend is broken.",
            },
            feedbackByAnswer: {
              "0": "Comparing to the oldest low ignores the chain — the last link (102) is the one that broke.",
              "2": "A broken higher-low sequence is evidence against the uptrend, not for a new one.",
              "3": "The candle's colour is separate from the structural event it causes.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tc-l2-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Definition of an uptrend",
            question: {
              id: "tc-l2-q3",
              type: "truefalse",
              topic: "trends",
              prompt:
                "An uptrend is properly defined as a sequence of higher swing highs and higher swing lows.",
              answer: true,
              explain:
                "Both conditions together — peaks clearing peaks and troughs holding troughs — are the definition, not a guideline.",
            },
            feedbackByAnswer: {
              true: "Correct — this is the definition every other structural label builds on.",
              false:
                "Without both conditions, 'uptrend' becomes an opinion instead of a testable label.",
            },
          },
          {
            skill: "The offset rule's purpose",
            question: {
              id: "tc-l2-q4",
              type: "mcq",
              topic: "charts",
              prompt: "Why require neighbouring bars on both sides before calling a swing?",
              options: [
                "To make charts look cleaner",
                "To stop every one-bar wiggle from being labelled a turning point",
                "Because exchanges define swings that way",
                "To slow down automated traders",
              ],
              answer: 1,
              explain:
                "An offset filter separates structural turns from noise; without it, every bar is a 'swing' and the label carries no information.",
            },
            feedbackByAnswer: {
              "0": "Aesthetics are incidental; the rule creates a consistent, testable definition.",
              "2": "Exchanges do not define personal swing rules; you choose the offset.",
              "3": "Structure labels have no effect on market participants.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tc-l2-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Your thesis: 'the stock is in an uptrend; buy pullbacks toward prior highs.' Swing highs: $58.00 → $61.50 → $64.00. Swing lows: $55.00 → $57.25 → $60.10.",
          "The latest candle closes at $56.90.",
        ],
        assessment: {
          items: [
            {
              skill: "Testing the thesis against structure",
              question: {
                id: "tc-l2-q5",
                type: "mcq",
                topic: "trends",
                prompt: "What does the $56.90 close do to the thesis?",
                options: [
                  "Nothing — it is above the earliest low of $55.00",
                  "It breaks the latest higher low of $60.10, falsifying the uptrend claim",
                  "It confirms the uptrend because price did not fall to zero",
                  "It only matters if volume is high",
                ],
                answer: 1,
                explain:
                  "The sequence's last link was 60.10. A close at 56.90 sits below it — the higher-low chain is broken and the thesis's premise is gone.",
              },
              feedbackByAnswer: {
                "0": "The oldest low is history; the most recent swing low is the claim under test.",
                "2": "Irrelevant comparisons prove nothing about the chain.",
                "3": "Structure is defined by price sequence; volume adds evidence, not definition.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tc-l2-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Pick one market you watch. What timeframe are you labelling, and what swing low would falsify your read of its structure?",
      ],
    },
    {
      kind: "summary",
      id: "tc-l2-b9",
      title: "Recap",
      points: [
        "Swing highs and lows need an offset rule so wiggles do not become turns.",
        "Uptrend = higher highs + higher lows; downtrend = the mirror.",
        "A broken swing sequence is a break of structure — the natural invalidation line.",
        "Always state the timeframe; swings are resolution-relative.",
      ],
      nextStep: "Next: reading a chart with nothing but price — before any indicator is added.",
    },
  ],
};
