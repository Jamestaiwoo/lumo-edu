import type { CourseLesson } from "../types";

export const lesson09IndicatorFailureModes: CourseLesson = {
  id: "tc-l9",
  moduleId: "c3-m3",
  title: "Indicator Failure Modes",
  blurb: "Whipsaw, lag, and curve-fitting: the three ways derived signals lose you money.",
  objectives: [
    "Identify whipsaw losses in flat markets from trend-following signals",
    "Explain why parameter tweaking after the fact fabricates performance",
    "Match indicator families to the market conditions they can survive",
    "Define the indicator's honest role inside a structural plan",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Trend signals die in ranges, oscillators die in trends, and hindsight-tuned parameters die everywhere. Use indicators for context; let structure carry the claims.",
  blocks: [
    {
      kind: "explain",
      id: "tc-l9-b1",
      explanation: {
        heading: "Every tool has a habitat — and a grave",
        whyItMatters:
          "The same signal that extracts money from a trend gives it back in a range. Traders blame the market or the indicator instead of the missing habitat check.",
        paragraphs: [
          "Whipsaw: a trend-following signal (average cross, MACD flip) fires repeatedly in a flat market, each entry immediately failing as price reverts. Ten small losses in a range can consume the one trend trade's eventual gain — the cost of a trend tool in a range habitat. The failure is predictable: tc-l7's table showed averaging signals crossing constantly in chop.",
          "The mirror failure: oscillators (RSI fading, band reversion) inside a strong trend. 'Overbought' keeps printing while price keeps rising; each fade fights the dominant chain. Ranges kill trend tools; trends kill range tools. Neither is broken — the habitat check was skipped.",
          "Curve-fitting: after seeing that 14-period RSI failed, you test 11, 12, 13 and find 12 'worked' on this exact history. You have not found a law; you have fitted noise. The more parameters searched, the more inevitable the 'perfect' one — and its out-of-sample life expectancy approaches zero. Honest evaluation fixes parameters before the test window, or validates on data never touched during tuning.",
          "The honest role: an indicator may filter context ('is this a trend habitat?'), time entries within a structure-defined claim ('pullback toward the zone'), or alert you to check the chart. What it may never do is supply the claim itself — because it cannot be invalidated in the Course 2 sense. If your stop location depends on an oscillator's future value, you have built a trade with no falsifiable premise.",
        ],
        keyTerms: [
          {
            term: "Whipsaw",
            definition: "Repeated small losses from trend signals firing inside a flat market.",
          },
          {
            term: "Curve-fitting",
            definition:
              "Tuning parameters until history looks profitable — fitting noise, not law.",
          },
          {
            term: "Out-of-sample",
            definition:
              "Data excluded from tuning; the only honest test of whether a signal generalises.",
          },
        ],
        callouts: [
          {
            tone: "pitfall",
            title: "The parameter search is the trap",
            body: "If a setting was chosen because it won on the chart you are looking at, its test is already contaminated.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "tc-l9-b2",
      example: {
        title: "One indicator, two habitats",
        setup:
          "A 20/50 moving-average cross system. Market A: trending 60 → 95 over two months. Market B: flat 44–47 for two months.",
        steps: [
          {
            label: "Market A (trend habitat)",
            detail:
              "Golden cross early in the run; price stays above the fast average; one signal, one large gain. The tool does what its shape implies.",
          },
          {
            label: "Market B (range habitat)",
            detail:
              "Crosses fire at the top and bottom of every wiggle: cross up at 47, fail to 45; cross down at 44, rally to 46.5. Six signals, six small losses.",
          },
          {
            label: "The wrong fix",
            detail:
              "After Market B, you 'optimize' to 35/70 — which now captures A's trend worse and B's chop differently. The tuning followed the last failure, not a law.",
          },
          {
            label: "The right fix",
            detail:
              "Habitat check first: is structure trending (tc-l2/tc-l4)? Only then use the cross as timing inside that frame — or don't use it at all.",
          },
        ],
        takeaway:
          "Same arithmetic, opposite environments: the habitat check decides whether the tool is evidence or expense.",
      },
    },
    {
      kind: "visual",
      id: "tc-l9-b3",
      title: "Failure mode matrix",
      visual: {
        type: "table",
        label: "Where each tool dies",
        columns: ["Tool", "Survives in", "Dies in", "Signature failure"],
        rows: [
          [
            "Trend follower (MA cross, MACD)",
            "Sustained directional moves",
            "Flat chop",
            "Whipsaw: many small losses, late trend entry",
          ],
          [
            "Range oscillator (RSI fade, bands)",
            "Balanced sideways markets",
            "Strong trends",
            "Fading a runner that never reverts",
          ],
          [
            "Any tuned parameter set",
            "The data it was tuned on",
            "New data",
            "Curve-fit: silent out-of-sample decay",
          ],
        ],
        caption:
          "Pick the row by habitat (structure first) — never by which row looked best last month.",
      },
    },
    {
      kind: "interactive",
      id: "tc-l9-b4",
      title: "Run the habitat check",
      takeaway:
        "The disciplined sequence names the structure, picks tools that survive it, and refuses post-hoc tuning — the failure modes all begin by skipping the first step.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Your backtest of a 14-period RSI fade lost money this quarter. The review meeting proposes four moves.",
        situation: ["Structure in the test window was mostly a wide, violent range."],
        choices: [
          {
            label:
              "Diagnose habitat first: range + oscillator should have worked — audit execution, then test untouched data with fixed parameters",
            outcome:
              "The review separates execution bugs from statistical noise without contaminating the parameter set.",
            best: true,
            feedback:
              "Correct — habitat, then execution, then validation on untouched data with parameters frozen before the test.",
          },
          {
            label: "Sweep RSI periods 5–30 and adopt whichever won historically",
            outcome: "Curve-fitting on contact: the winner is fitted to this window's noise.",
            best: false,
            feedback:
              "Searching parameters after a loss guarantees a 'best' setting whose out-of-sample life expectancy is near zero.",
          },
          {
            label: "Abandon indicators forever; only naked price works",
            outcome: "Over-correction: discards the legitimate context role along with the misuse.",
            best: false,
            feedback:
              "The failure was habitat and tuning discipline — not the existence of derived summaries.",
          },
          {
            label: "Invert the rule — fade the fade — and retest the same window",
            outcome: "Still fitted to the same window; sign-flipping does not create evidence.",
            best: false,
            feedback:
              "Same contamination, opposite direction. Any rule chosen because this window punished its mirror is still chosen by this window.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "tc-l9-b5",
      title: "Guided practice",
      assessment: {
        intro: "Name the failure mode and its fix.",
        allowRetry: true,
        items: [
          {
            skill: "Whipsaw recognition",
            question: {
              id: "tc-l9-q1",
              type: "mcq",
              topic: "indicators",
              prompt:
                "A trend-following system takes eight consecutive small losses during a two-month flat range. This is most likely:",
              options: [
                "Bad luck — the signals were valid",
                "Whipsaw: a trend tool operating outside its habitat",
                "A broker execution problem",
                "Proof the market is manipulated",
              ],
              answer: 1,
              explain:
                "Flat chop is precisely where average-cross signals fire and fail repeatedly — the predictable death of trend tools in ranges.",
            },
            feedbackByAnswer: {
              "0": "Eight consecutive signal losses in a flat tape is a pattern of habitat, not variance.",
              "2": "Execution errors produce erratic fills, not systematic small losses at signal cadence.",
              "3": "Conspiracy is unfalsifiable; habitat is checkable on the chart.",
            },
          },
          {
            skill: "Curve-fit detection",
            question: {
              id: "tc-l9-q2",
              type: "truefalse",
              topic: "indicators",
              prompt:
                "Choosing the 'best' parameter by sweeping options on the same history used to judge them contaminates the test.",
              answer: true,
              explain:
                "The sweep fits the winner to that window's noise; only untouched (out-of-sample) data can judge generalisation.",
            },
            feedbackByAnswer: {
              true: "Correct — fix parameters first, then test on data that never influenced the choice.",
              false: "Same-data selection and evaluation is textbook overfitting.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tc-l9-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Tool-habitat matching",
            question: {
              id: "tc-l9-q3",
              type: "mcq",
              topic: "indicators",
              prompt: "Which pairing correctly matches tool to habitat?",
              options: [
                "RSI fades in a violent range; average crosses in a sustained trend",
                "RSI fades in a trend; average crosses in a range",
                "Both work in all habitats",
                "Both should be abandoned in all habitats",
              ],
              answer: 0,
              explain:
                "Oscillators summarise reversion in balance; averages summarise direction in trends. Reverse them and each meets its signature failure.",
            },
            feedbackByAnswer: {
              "1": "That is the deliberate pairing of each tool with its grave.",
              "2": "Habitat independence is exactly what the failure matrix denies.",
              "3": "Wholesale abandonment discards the legitimate context roles.",
            },
          },
          {
            skill: "The indicator's allowed authority",
            question: {
              id: "tc-l9-q4",
              type: "truefalse",
              topic: "indicators",
              prompt:
                "An indicator may inform context or timing inside a structural plan, but it should not be the sole source of the claim and its invalidation.",
              answer: true,
              explain:
                "Oscillator thresholds cannot be 'falsified' the way a swing low can; a plan whose stop depends on a lagging statistic has no testable premise.",
            },
            feedbackByAnswer: {
              true: "Correct — annotation and timing, never the claim itself.",
              false:
                "That reverses the hierarchy and rebuilds the signal-following habit this module exists to break.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tc-l9-b7",
      title: "Application scenario — course capstone",
      scenario: {
        situation: [
          "You trade an uptrend's pullbacks (structure from tc-l2/tc-l4) and want an indicator for timing.",
          "Proposal: enter only when RSI-14 dips below 40 during the pullback, stop under the prior swing low.",
        ],
        assessment: {
          items: [
            {
              skill: "Integrating structure and indicator correctly",
              question: {
                id: "tc-l9-q5",
                type: "mcq",
                topic: "indicators",
                prompt: "What is the correct critique of this rule?",
                options: [
                  "It is invalid — indicators may never be used",
                  "The claim and stop are structural (good), but RSI < 40 may simply never print in a strong trend, silently skipping valid pullbacks — measure that miss rate before relying on it",
                  "RSI-14 is the wrong period; use 7",
                  "Stop under a swing low is too far away",
                ],
                answer: 1,
                explain:
                  "The structure carries the claim correctly. The added filter's cost is availability: in strong trends pullbacks may not reach RSI 40 — a false-skip rate you must measure, with parameters fixed in advance.",
              },
              feedbackByAnswer: {
                "0": "The module's conclusion is 'context, not command' — not prohibition.",
                "2": "Changing the period after seeing misses is the curve-fit move from the interactive.",
                "3": "The swing low is the falsification line — moving it would break the structural claim.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tc-l9-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "What is one indicator rule you have seen fail? Which failure mode from this lesson — whipsaw, habitat mismatch, or curve-fit — explains it?",
      ],
    },
    {
      kind: "summary",
      id: "tc-l9-b9",
      title: "Recap",
      points: [
        "Trend tools whipsaw in ranges; oscillators fail in trends — habitat first.",
        "Post-hoc parameter sweeps fit noise; fix parameters before untouched test data.",
        "Indicators are summaries of printed prices: context and timing, never the claim.",
        "Structure supplies claim, entry and invalidation — that hierarchy is the whole course.",
        "Course 3 takeaway: candles → structure → stages/ranges/zones → indicators as annotations, all with Course 2 invalidation attached.",
      ],
      nextStep:
        "Course complete. Next: Markets & Instruments — stocks, indices & ETFs, commodities, forex.",
    },
  ],
};
