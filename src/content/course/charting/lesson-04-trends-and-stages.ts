import type { CourseLesson } from "../types";

export const lesson04TrendsAndStages: CourseLesson = {
  id: "tc-l4",
  moduleId: "c3-m2",
  title: "Trends & Their Stages",
  blurb: "Every trend is born, matures and dies — the stage picks the playbook.",
  objectives: [
    "Identify accumulation, advance, distribution and decline stages",
    "Explain why the same pattern trades differently by stage",
    "Locate the current stage from swing structure and range behaviour",
    "Match a playbook to the stage and define its invalidation",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Stage decides playbook: breakout continuation in the advance behaves nothing like a range fade in distribution — the candles are identical, the odds are not.",
  blocks: [
    {
      kind: "explain",
      id: "tc-l4-b1",
      explanation: {
        heading: "One tape, four regimes",
        whyItMatters:
          "A pattern learned in one stage stops working in another, and traders rarely blame the stage. Knowing which regime you are in is the cheapest edge available.",
        paragraphs: [
          "The stage framework describes where a market sits in a cycle of position building and unwinding. Accumulation: price stops falling and bases sideways as supply is absorbed — swings flatten, volatility contracts. Advance: demand exceeds supply; higher highs and higher lows carry price out of the base. Distribution: the advance stalls as prior buyers sell to new entrants — swings get choppy near the highs, ranges widen. Decline: supply wins; lower highs and lower lows take over.",
          "These are descriptions of supply/demand balance through structure, not calendar phases — markets skip stages, repeat them, and transition without warning. The label earns its keep by choosing playbooks. In the advance, pullbacks toward prior highs are the setup; shorting the first range after an extended run is a distribution-era idea; buying breakdowns below a distribution range is decline-era.",
          "The same candle pattern demonstrates this: a flat three-day stall at highs reads as healthy pausing in an early advance (fuel for leg two) and as stalling supply in late distribution (the exit door). Context — the stage — carries the meaning; the candles alone never do.",
          "Transition signals are structural, borrowed from tc-l2: the advance ends when the higher-low chain breaks; distribution ends when the range floor gives way. Because stages are judged from completed swings, expect confirmation lag — you will often label a stage only after part of it has run. That is the honest cost of using facts instead of feelings.",
        ],
        keyTerms: [
          {
            term: "Accumulation",
            definition: "A basing stage where falling supply is absorbed and swings flatten.",
          },
          {
            term: "Distribution",
            definition:
              "A stalling stage where satisfied buyers sell into continued demand near highs.",
          },
          {
            term: "Stage transition",
            definition:
              "When the structure defining the current stage breaks — the signal to switch playbooks.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "Stages are labels, not clocks",
            body: "Nothing guarantees a stage completes or arrives on time. They describe the current balance; they do not schedule the future.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "tc-l4-b2",
      example: {
        title: "Reading the stage from swings",
        setup:
          "A stock's recent swings: 62 → 71 → 66 → 74 → 69 → 73 → 68 — then two weeks of 68–72 overlap.",
        steps: [
          {
            label: "Phase one: what the chain said",
            detail: "62 → 66 → 69 rising troughs with rising peaks: an advance, textbook.",
          },
          {
            label: "Phase two: the chain stops advancing",
            detail:
              "The last peak (73) failed to clear 74, and the last trough (68) sits below 69: the higher-high/higher-low sequence has stopped — transition.",
          },
          {
            label: "Phase three: describe the new behaviour",
            detail:
              "Overlapping 68–72 closes for two weeks: price is no longer advancing or declining — it is balancing near the highs.",
          },
          {
            label: "Frame and decide",
            detail:
              "Label: distribution/range near highs (a hypothesis, testable). Playbook: fade the range edges or wait for a breakout with invalidation — not the pullback-buying playbook the advance justified.",
          },
        ],
        takeaway:
          "The stage changed when the structure changed — and the playbook changed with it.",
      },
    },
    {
      kind: "visual",
      id: "tc-l4-b3",
      title: "Stages and their playbooks",
      visual: {
        type: "table",
        label: "The four stages",
        columns: ["Stage", "Structure signature", "Playbook", "Invalidation"],
        rows: [
          [
            "Accumulation",
            "Falling swings flatten into overlap",
            "Range buy low / breakout wait",
            "Floor of the base breaks",
          ],
          [
            "Advance",
            "Higher highs + higher lows",
            "Buy pullbacks toward prior highs",
            "Prior swing low breaks",
          ],
          [
            "Distribution",
            "Peaks stall, ranges widen near highs",
            "Fade range edges or stand aside",
            "Range floor breaks",
          ],
          [
            "Decline",
            "Lower highs + lower lows",
            "Avoid or short rallies to prior lows",
            "Prior swing high reclaimed",
          ],
        ],
        caption:
          "Each row is a structure label plus a conditional playbook — never a prediction that the stage must continue.",
      },
    },
    {
      kind: "interactive",
      id: "tc-l4-b4",
      title: "Pick the stage, pick the playbook",
      takeaway:
        "The stage is read from structure, and only matching playbooks are defensible — 'same as always' is the mistake this lesson exists to prevent.",
      interaction: {
        type: "scenario-decision",
        prompt: "Four structural readings arrive in sequence. Which response fits each?",
        situation: [
          "(a) Base building after a long decline · (b) Clean HH/HL off the base · (c) Choppy overlapping highs after a 60% run · (d) Lower highs breaking the range floor.",
        ],
        choices: [
          {
            label:
              "a: accumulate/wait · b: buy pullbacks · c: distribution caution · d: decline rules",
            outcome:
              "Each playbook is anchored to the structure signature and carries its own invalidation line.",
            best: true,
            feedback:
              "Correct — stage labels earn their keep by selecting playbooks, and each stage's exit condition is structural.",
          },
          {
            label: "Buy pullbacks in all four — trends always resume",
            outcome: "In (d) that buys every lower high straight into a decline.",
            best: false,
            feedback:
              "The pullback-buying playbook requires the higher-low chain; stage (d) is precisely its absence.",
          },
          {
            label: "Short every range in (b)",
            outcome: "Fading an advance's shallow pause fights the dominant flow.",
            best: false,
            feedback:
              "Range-fading belongs to mature/distribution contexts; in an advance, ranges are typically fuel.",
          },
          {
            label: "Wait for indicators to name the stage",
            outcome:
              "The stage is defined by swing structure — a derived number would only restate it with lag.",
            best: false,
            feedback:
              "Indicators summarise price; the structure test (HH/HL, overlap, LH/LL) is already the definition.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "tc-l4-b5",
      title: "Guided practice",
      assessment: {
        intro: "Name the stage and its exit line.",
        allowRetry: true,
        items: [
          {
            skill: "Stage from the swing chain",
            question: {
              id: "tc-l4-q1",
              type: "mcq",
              topic: "trends",
              prompt: "Swings: 40 → 47 → 43 → 51 → 46 → 55. Which stage signature is present?",
              options: [
                "Distribution — price stalled at the highs",
                "Advance — higher highs and higher lows in sequence",
                "Decline — the 46 pullback was deep",
                "Accumulation — swings are close together",
              ],
              answer: 1,
              explain:
                "Peaks 47→51→55 and troughs 40→43→46 both ascend: the two-condition definition of an advance is met.",
            },
            feedbackByAnswer: {
              "0": "No stall yet — each peak clears the last.",
              "2": "Pullback depth does not make lower highs; the chain still ascends.",
              "3": "Accumulation flattens swings after a decline — these expand upward.",
            },
          },
          {
            skill: "The transition trigger",
            question: {
              id: "tc-l4-q2",
              type: "truefalse",
              topic: "trends",
              prompt:
                "An advance's stage label flips to distribution or transition when the higher-low chain breaks, not when an indicator crosses.",
              answer: true,
              explain:
                "The stage is defined by structure; its end is the structural event — a violated prior swing low.",
            },
            feedbackByAnswer: {
              true: "Correct — structure defines and ends the stage.",
              false:
                "Indicator crossovers are summaries of the same prices, arriving later than the structural break.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tc-l4-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Why stage changes playbook",
            question: {
              id: "tc-l4-q3",
              type: "mcq",
              topic: "trends",
              prompt:
                "Why does an identical candle pattern trade differently in an advance versus distribution?",
              options: [
                "Different candle colours are luckier in trends",
                "The surrounding structure gives the pattern different odds of continuation",
                "Exchange rules differ by stage",
                "It does not — patterns are stage-independent",
              ],
              answer: 1,
              explain:
                "A stall at highs in an early advance has supply absorbing into demand; in distribution, the stall is supply itself. Same shape, different mechanics.",
            },
            feedbackByAnswer: {
              "0": "Colour has no stage-dependent magic.",
              "2": "No exchange regulation knows what 'distribution' means.",
              "3": "If patterns were stage-independent, stage analysis would be pointless — and it demonstrably changes outcomes.",
            },
          },
          {
            skill: "Honesty about lag",
            question: {
              id: "tc-l4-q4",
              type: "truefalse",
              topic: "charts",
              prompt:
                "Stage labels are confirmed only after part of the stage has already happened, because they are read from completed swings.",
              answer: true,
              explain:
                "Swing confirmation needs bars either side — the label arrives with lag. Fact-based labels always cost timeliness.",
            },
            feedbackByAnswer: {
              true: "Correct — that is the price of using facts instead of feelings.",
              false: "A label that never lagged would be using information not yet recorded.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tc-l4-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "A stock fell 120 → 84, then based at 84–91 for six weeks, then advanced with swings 88 → 104 → 96 → 118.",
          "Now: three weeks of overlapping 112–119 trade after the run.",
        ],
        assessment: {
          items: [
            {
              skill: "Choosing the playbook by stage",
              question: {
                id: "tc-l4-q5",
                type: "mcq",
                topic: "trends",
                prompt:
                  "The swing chain 88→104→96→118 established an advance; the overlapping 112–119 stall ends it. What is the defensible read now?",
                options: [
                  "Distribution-era range: fade edges with a stop outside, or wait for a breakout — pullback buying needs a higher low that has not printed",
                  "Deep accumulation — the base will repeat",
                  "Guaranteed decline — short every rally",
                  "The advance continues until volume spikes",
                ],
                answer: 0,
                explain:
                  "Structure says transition to balance near highs: range rules or breakout rules apply, and the pullback playbook's premise (rising troughs) is currently absent.",
              },
              feedbackByAnswer: {
                "1": "The base was six weeks and 30 points lower — history need not rhyme.",
                "2": "'Guaranteed' predicts; the label supports conditional plays, not certainties.",
                "3": "Volume neither defines the stage nor removes the missing higher low.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tc-l4-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Which stage is your main watchlist market in right now, and what specific swing sequence would prove your label wrong?",
      ],
    },
    {
      kind: "summary",
      id: "tc-l4-b9",
      title: "Recap",
      points: [
        "Accumulation → advance → distribution → decline, judged from swing structure.",
        "The stage picks the playbook; identical patterns carry different odds by stage.",
        "Stage transitions are structural events — chain breaks, not indicator crosses.",
        "Labels lag: they confirm from completed swings, trading timeliness for honesty.",
      ],
      nextStep:
        "Next: ranges in detail — where boundaries are tested, and what breakouts actually prove.",
    },
  ],
};
