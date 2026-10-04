import type { CourseLesson } from "../types";

export const lesson03ReadingWithoutIndicators: CourseLesson = {
  id: "tc-l3",
  moduleId: "c3-m1",
  title: "Reading a Chart Without Indicators",
  blurb: "Price, structure, volume — the raw evidence, described before it is interpreted.",
  objectives: [
    "Describe a chart using only observable facts: swings, ranges, volume",
    "Separate observation from interpretation in a chart commentary",
    "Use the describe-then-decide sequence before choosing a playbook",
    "Recognise indicator-free analysis as the foundation indicators sit on",
  ],
  durationMinutes: 11,
  xp: 33,
  keyTakeaway:
    "A chart description and a trade idea are different sentences. Describe in facts first — swings, ranges, volume — then decide what, if anything, to do.",
  blocks: [
    {
      kind: "explain",
      id: "tc-l3-b1",
      explanation: {
        heading: "Observation first, interpretation second",
        whyItMatters:
          "Most bad chart arguments are observations smuggled in as interpretations: 'it looks strong' is a feeling; 'the last two pullbacks held above prior highs' is a fact you can check.",
        paragraphs: [
          "A pure price description answers only what happened: where the swings are, whether they ascend or descend, where price stalled before, how volume behaved. Every word should survive a sceptical reader with the same chart. 'Three peaks stalled between 104 and 106' passes; 'strong resistance overhead' is already an interpretation (that the stalls will continue).",
          "Why the discipline matters: interpretation without observation is unanchored, and observation without interpretation is tradable. The sequence is describe → frame → decide. Frame = which structure label applies (uptrend, range, transition — tc-l2). Decide = whether that frame gives you a setup with defined invalidation, i.e. a Course 2 trade, or no trade at all.",
          "Volume is part of the raw record: it says how much changed hands, not why. Expanding volume on a breakout is a fact supporting 'more participation'; 'smart money is buying' is fiction dressed as fact. Keep volume descriptive.",
          "Indicators, when they arrive later (Module 3), are derived from these same prices — a moving average is a summary of closes, RSI a summary of recent up-vs-down movement. Reading the raw chart first means you will know exactly what any indicator can and cannot tell you: nothing the candles did not already record.",
        ],
        keyTerms: [
          {
            term: "Observation",
            definition: "A statement checkable by any reader on the same chart — facts only.",
          },
          {
            term: "Interpretation",
            definition:
              "A claim about what the facts imply — always carrying a forecast or judgement.",
          },
          {
            term: "Describe-then-decide",
            definition:
              "The habit: full factual description, structural frame, then — only then — a playbook decision.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "tc-l3-b2",
      example: {
        title: "Same chart, two commentaries",
        setup:
          "A stock: rallies 88 → 96, pulls to 92, rallies to 101, pulls to 97, stalls at 104 twice.",
        steps: [
          {
            label: "Interpretation-first (the bad habit)",
            detail:
              "'Bullish momentum, resistance will break soon.' Nothing here can be checked; if it fails, nothing was learned.",
          },
          {
            label: "Observation pass",
            detail:
              "Swings: 88 → 96 → 92 → 101 → 97 → 104, 104. Higher highs and higher lows. Two stalls at 104. Volume above average on both 104 tests.",
          },
          {
            label: "Frame pass",
            detail:
              "Structure label: uptrend (both conditions met). Nearest unresolved feature: the 104 shelf, tested twice.",
          },
          {
            label: "Decide pass",
            detail:
              "Playbook options with invalidation: pullback buyers reference 97 (break of it = structure broken); 104-breakout buyers need a close above 104 with their stop below the last swing. If neither triggers — no trade. The frame chose the plays; the facts set the stops.",
          },
        ],
        takeaway:
          "Observations constrain interpretations; the frame picks the playbook; invalidation picks the stop.",
      },
    },
    {
      kind: "visual",
      id: "tc-l3-b3",
      title: "Observation or interpretation?",
      visual: {
        type: "table",
        label: "Sorting sentences",
        columns: ["Sentence", "Type", "Checkable?"],
        rows: [
          ["Price closed above the 104 shelf twice", "Observation", "Yes — on the chart"],
          ["Volume was 1.8× the 20-day average", "Observation", "Yes — in the data"],
          ["Momentum is building", "Interpretation", "No — undefined metric"],
          ["Institutionals are accumulating", "Interpretation", "No — invisible actor"],
          ["Lows rose 92 → 97 while highs rose 96 → 104", "Observation", "Yes — swing labels"],
        ],
        caption:
          "If a sentence cannot be verified on the shared chart, it belongs in the interpretation column — and needs evidence before it drives a trade.",
      },
    },
    {
      kind: "interactive",
      id: "tc-l3-b4",
      title: "Sort the commentary",
      takeaway:
        "Every defensible split keeps checkable facts on one side and claims about meaning on the other — the habit that makes indicators accountable later.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Your trading partner sends a stream of commentary about one chart. Which response keeps the review honest?",
        situation: [
          "Chart: an ETF in an uptrend, recently stalled three days at $412 on rising volume.",
        ],
        choices: [
          {
            label: "Ask for the observation/interpretation split, then frame the structure",
            outcome:
              "'Stalled 3 days at 412, volume 1.5× average' (facts) → range near highs (frame) → breakout or pullback setups with stops (decide).",
            best: true,
            feedback:
              "Correct — describe, frame, decide: every claim ends up checkable or discarded before capital is risked.",
          },
          {
            label: "Agree — 'looks super strong' sounds right",
            outcome: "An unanchored feeling now shares a portfolio with your money.",
            best: false,
            feedback:
              "'Strong' is undefined: which metric? Without a checkable claim there is nothing to verify or learn from when it fails.",
          },
          {
            label: "Add an oscillator to settle the argument",
            outcome:
              "A derived number now argues with an undefined feeling — both still unanchored.",
            best: false,
            feedback:
              "Indicators summarise the same prices; they cannot adjudicate a claim that never pinned down the prices first.",
          },
          {
            label: "Ignore commentary; price action alone always decides",
            outcome: "Facts without a frame never become setups; the review produces no playbook.",
            best: false,
            feedback:
              "The observation pass is step one, not the whole sequence — the frame and decision steps are where trades come from.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "tc-l3-b5",
      title: "Guided practice",
      assessment: {
        intro: "Separate what the chart records from what people say it means.",
        allowRetry: true,
        items: [
          {
            skill: "Classifying sentences",
            question: {
              id: "tc-l3-q1",
              type: "mcq",
              topic: "charts",
              prompt: "Which sentence is an observation, not an interpretation?",
              options: [
                "Breakout is imminent",
                "Buyers are in control",
                "The last three lows each printed higher: 44.10, 44.80, 45.35",
                "The stock looks ready to fly",
              ],
              answer: 2,
              explain:
                "It lists checkable swing values a sceptical reader can verify on the same chart; the others assert meanings without metrics.",
            },
            feedbackByAnswer: {
              "0": "'Imminent' forecasts a future event — interpretation.",
              "1": "'In control' needs a definition before it can be checked.",
              "3": "'Ready to fly' is a feeling wearing a chart label.",
            },
          },
          {
            skill: "Volume as description",
            question: {
              id: "tc-l3-q2",
              type: "truefalse",
              topic: "volume",
              prompt:
                "'Volume ran 2× its average on the breakout' is an observation; 'smart money entered' is an interpretation.",
              answer: true,
              explain:
                "Volume counts trades — checkable. Attributing them to a hidden actor's intent is a claim about who and why, which the tape does not record.",
            },
            feedbackByAnswer: {
              true: "Correct — countable facts versus a story about invisible people.",
              false: "Both sentences would then be facts, and no review could ever be wrong.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tc-l3-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "The sequence",
            question: {
              id: "tc-l3-q3",
              type: "mcq",
              topic: "charts",
              prompt: "What is the correct order of a disciplined chart read?",
              options: [
                "Interpret → observe → decide",
                "Describe the facts → frame the structure → decide with invalidation",
                "Decide → describe → explain to yourself",
                "Add indicators → observe → interpret",
              ],
              answer: 1,
              explain:
                "Describe (facts) → frame (structure label) → decide (playbook with invalidation, or no trade). Each step grounds the next.",
            },
            feedbackByAnswer: {
              "0": "Interpreting first contaminates what you claim to observe.",
              "2": "Deciding first turns observations into justifications — confirmation bias on schedule.",
              "3": "Indicators are Module 3 tools, and they summarise prices rather than precede them.",
            },
          },
          {
            skill: "Why raw reading precedes indicators",
            question: {
              id: "tc-l3-q4",
              type: "truefalse",
              topic: "indicators",
              prompt:
                "A moving average contains information that does not already exist in the price series it averages.",
              answer: false,
              explain:
                "It is a derived summary of past closes — nothing new enters; smoothing trades timeliness for lag (explored in Module 3).",
            },
            feedbackByAnswer: {
              false: "Correct — indicators transform prices; they do not add evidence.",
              true: "If an indicator created new information, it would be reporting events outside the chart.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tc-l3-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "A crypto chart: low 1.02 → high 1.31 → low 1.14 → high 1.44 → low 1.26, current price 1.40, volume on the last push 3× average.",
          "Your group chat is split between 'mooning' and 'distribution'.",
        ],
        assessment: {
          items: [
            {
              skill: "Full three-pass read",
              question: {
                id: "tc-l3-q5",
                type: "mcq",
                topic: "charts",
                prompt: "Which response runs all three passes correctly?",
                options: [
                  "Long now — volume says the crowd agrees",
                  "Observe: HH 1.31→1.44, HL 1.02→1.14→1.26 (uptrend frame). Decide: pullback setups reference 1.26; a close below it ends the frame",
                  "Short — after big volume, price always reverses",
                  "Wait for the indicator to confirm the moon",
                ],
                answer: 1,
                explain:
                  "It states checkable swings, applies the structure frame, and defines both the setup anchor and its invalidation — describe, frame, decide.",
              },
              feedbackByAnswer: {
                "0": "'Crowd agrees' is interpretation; volume alone neither forecasts nor orders a trade.",
                "2": "'Always reverses after volume' is an unsourced law, not an observation.",
                "3": "Waiting for confirmation defers the decision to a derived number without stating a setup.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tc-l3-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Describe your most-watched market in two purely observational sentences — no adjectives that imply a future.",
      ],
    },
    {
      kind: "summary",
      id: "tc-l3-b9",
      title: "Recap",
      points: [
        "Observations are checkable on the shared chart; interpretations claim meaning.",
        "The sequence is describe → frame → decide, with invalidation attached to every decision.",
        "Volume describes participation, not identity or intent.",
        "Indicators later summarise these same prices — raw reading is their foundation.",
      ],
      nextStep: "Next: Module 2 — classifying the condition: trend stages, ranges and levels.",
    },
  ],
};
