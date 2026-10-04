import type { CourseLesson } from "../types";

export const lesson05RangesAndBreakouts: CourseLesson = {
  id: "tc-l5",
  moduleId: "c3-m2",
  title: "Ranges & Breakouts",
  blurb: "Where price balances, what a breakout proves, and what it only suggests.",
  objectives: [
    "Define a trading range from repeated swing highs and lows",
    "Distinguish a genuine breakout from a failed one (fakeout)",
    "Explain confirmation: close beyond the boundary and retest",
    "Size a breakout trade with invalidation at the range edge",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "A breakout is a claim the market must confirm with settlement — closes beyond the boundary, ideally a retest that holds. A wick through the edge proves only that someone tried.",
  blocks: [
    {
      kind: "explain",
      id: "tc-l5-b1",
      explanation: {
        heading: "Balance, then resolution",
        whyItMatters:
          "Ranges are where orders accumulate on both sides. Their resolution moves fast, which is exactly why the trigger discipline matters more here than anywhere else.",
        paragraphs: [
          "A trading range forms when repeated swing highs cluster near one ceiling and swing lows near one floor: supply is willing to sell there, demand willing to buy. Each touch adds participants who now anchor to those edges — stop orders cluster beyond them, which is why breakouts tend to move quickly once they begin.",
          "The breakout itself is not the proof. A wick above the ceiling only says a test happened; the settlement question is whether closes hold beyond the edge. Confirmation has two common grades: (1) a close outside the range — the auction ended there; (2) a retest — price returns to the old ceiling (now support) and holds. Each grade costs some of the move and buys evidence; neither guarantees continuation.",
          "Failure is the normal alternative: the fakeout. Price pierces the edge, absorbs the stops sitting there, and reverses back inside. The range stays valid — arguably strengthened, since the failed break trapped the breakout crowd. This asymmetry is why many traders wait for the close or the retest instead of buying the pierce.",
          "Sizing connects to Course 2 as always: if you enter on the confirmation close at the edge, invalidation is back inside the range — the stop is short, so division permits reasonable size. If you enter after a retest, stop sits under the retest low. What you never do is hold through a reversal back inside and call it 'giving it room' — back inside means the breakout claim was falsified.",
        ],
        keyTerms: [
          {
            term: "Trading range",
            definition:
              "Repeated swing highs near a ceiling and lows near a floor — balance between supply and demand.",
          },
          {
            term: "Fakeout",
            definition: "A pierce of the boundary that fails to hold — stops taken, range intact.",
          },
          {
            term: "Retest",
            definition:
              "Return to the broken edge to check it now acts as support (or resistance) — confirmation grade two.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "The edge is where the stops are",
            body: "Everyone's stops live just beyond the range. Breakouts feed on them; that fuel is one reason moves accelerate — and why the first pierce deserves suspicion.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "tc-l5-b2",
      example: {
        title: "Three touches, one breakout",
        setup:
          "A stock ranges 48.00–51.00 for three weeks: highs 50.9, 51.0, 50.8; lows 48.1, 48.0, 48.3.",
        steps: [
          {
            label: "Establish the range",
            detail:
              "Ceiling ~51.00 (three rejections), floor ~48.00 (three absorptions). Balance confirmed by repetition.",
          },
          {
            label: "The first attempt",
            detail:
              "Day 1: wick to 51.40, close 50.70 — back inside. Test, not breakout. Traders who bought the pierce now sit against the ceiling.",
          },
          {
            label: "The confirmation",
            detail:
              "Day 2: closes 51.65. Claim grade: close outside. Aggressive entry near the close, stop back under 51.00 (unit risk ~$0.65–0.80).",
          },
          {
            label: "The retest",
            detail:
              "Day 3: dips to 50.95, holds, closes 51.55 — old ceiling acting as support. Grade-two confirmation; stop under the retest low (~50.90).",
          },
          {
            label: "What invalidates either entry",
            detail:
              "A close back inside the range (below 51.00) falsifies the breakout claim: exit, size was never the issue — the claim was.",
          },
        ],
        takeaway:
          "Pierce → suspicion; close-outside → claim; retest-hold → evidence. Invalidation lives back inside the box.",
      },
    },
    {
      kind: "visual",
      id: "tc-l5-b3",
      title: "Range, fakeout, confirmed breakout",
      visual: {
        type: "candles",
        label: "Three tests of 51.00",
        candles: [
          { open: 48.4, high: 50.9, low: 48.1, close: 50.6 },
          { open: 50.6, high: 51.0, low: 49.3, close: 49.7 },
          { open: 49.7, high: 51.4, low: 49.5, close: 50.7 },
          { open: 50.7, high: 51.7, low: 50.5, close: 51.65 },
          { open: 51.65, high: 51.8, low: 50.95, close: 51.55 },
        ],
        caption:
          "Bar 3 wicks to 51.40 but settles inside (fakeout). Bar 4 closes at 51.65 above the ceiling; bar 5 retests 50.95 and holds — confirmation.",
        zones: [
          { price: 51.0, label: "Range ceiling", tone: "resistance" },
          { price: 48.1, label: "Range floor", tone: "support" },
        ],
      },
    },
    {
      kind: "interactive",
      id: "tc-l5-b4",
      title: "Trigger discipline",
      takeaway:
        "Every defensible choice waits for settlement evidence and keeps invalidation back inside the range; the impatient picks buy the pierce that feeds the fakeout.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "The 48–51 range is in its third week. Your order plan must answer one question: when do you enter, and where is the stop?",
        situation: ["Volume is above average; stops are visibly clustered beyond both edges."],
        choices: [
          {
            label: "Enter only after a close beyond 51.00; stop back inside the range",
            outcome:
              "You miss the first 0.4–0.6 of the move; fakeouts stop you out cheap; real breaks pay.",
            best: true,
            feedback:
              "Correct — the close is the settlement evidence, and back-inside is the falsification point of a breakout claim.",
          },
          {
            label: "Buy the wick through 51.00 immediately — speed is edge",
            outcome:
              "You are first in line for every fakeout; the trap pattern is exactly this entry.",
            best: false,
            feedback:
              "The pierce is the cheapest-looking and least-evidenced moment; stops beyond the edge make it the most hunted.",
          },
          {
            label: "Short the ceiling every touch — ranges always hold",
            outcome:
              "When the real break comes, the fade becomes the fuel and the stop sits inside the move.",
            best: false,
            feedback:
              "Edge-fading works until it doesn't; without a plan for the break, one trend day erases weeks of fades.",
          },
          {
            label: "Enter after the close, and if it falls back inside, average down",
            outcome:
              "The falsified claim now has more capital attached — the exact escalation Course 2 forbids.",
            best: false,
            feedback:
              "Back inside means 'no breakout'. Adding to a disproven claim converts a small stopped loss into a range-bound anchor.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "tc-l5-b5",
      title: "Guided practice",
      assessment: {
        intro: "Range geometry and breakout sizing.",
        allowRetry: true,
        items: [
          {
            skill: "Range height",
            question: {
              id: "tc-l5-q1",
              type: "numeric",
              topic: "levels",
              prompt:
                "A range's ceiling tests at $63.00 and its floor at $58.50. What is the range height in dollars?",
              answer: 4.5,
              tolerance: 0.05,
              unit: "USD",
              explain:
                "63.00 − 58.50 = $4.50 — the measured move projection base for a measured breakout.",
            },
            feedbackByAnswer: {
              numeric: "Ceiling − floor: 63.00 − 58.50 = 4.50.",
            },
          },
          {
            skill: "Breakout stop distance",
            question: {
              id: "tc-l5-q2",
              type: "numeric",
              topic: "stops",
              prompt:
                "You enter a confirmed breakout at $63.10 with the stop back inside at $61.90. Unit risk per share?",
              answer: 1.2,
              tolerance: 0.05,
              unit: "USD",
              explain:
                "63.10 − 61.90 = $1.20 — short, because invalidation (back inside) sits right behind the entry.",
            },
            feedbackByAnswer: {
              numeric: "Entry − stop: 63.10 − 61.90 = 1.20.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tc-l5-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Confirmation grades",
            question: {
              id: "tc-l5-q3",
              type: "mcq",
              topic: "levels",
              prompt: "What separates a confirmed breakout from a simple pierce?",
              options: [
                "Higher volume on the pierce alone",
                "Settlement evidence: a close beyond the edge, ideally followed by a retest that holds",
                "A faster move through the level",
                "More touches of the range first",
              ],
              answer: 1,
              explain:
                "The close is where the auction ended — evidence. The retest then checks that the old edge flipped polarity. Volume supports but never replaces settlement.",
            },
            feedbackByAnswer: {
              "0": "Volume on a wick still ends with price back inside — participation without settlement.",
              "2": "Speed describes the pierce, not whether it held.",
              "3": "More touches strengthen the range; they do not confirm leaving it.",
            },
          },
          {
            skill: "What a fakeout proves",
            question: {
              id: "tc-l5-q4",
              type: "truefalse",
              topic: "levels",
              prompt:
                "A close back inside the range falsifies the breakout claim and invalidates a breakout position — regardless of entry quality.",
              answer: true,
              explain:
                "Back inside means the settlement did not hold beyond the edge. The claim is false; the exit is dictated by the claim, not by hope.",
            },
            feedbackByAnswer: {
              true: "Correct — entry price is sunk; the falsification rule does not care what you paid.",
              false:
                "Holding a disproven breakout 'because of the entry' converts a planned small loss into an anchor.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tc-l5-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Range ceiling $82.00, floor $77.50. You enter on the confirming close at $82.60, stop at $81.40 (back inside).",
          "Your per-trade budget is $330.",
        ],
        assessment: {
          items: [
            {
              skill: "Sizing a breakout entry",
              question: {
                id: "tc-l5-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt: "Unit risk = 82.60 − 81.40 = $1.20. How many shares fit the $330 budget?",
                answer: 275,
                tolerance: 2,
                unit: "shares",
                explain: "330 ÷ 1.20 = 275 shares — risking exactly $330 if the claim fails.",
              },
              feedbackByAnswer: {
                numeric: "Budget ÷ unit risk: 330 ÷ 1.20 = 275.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tc-l5-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Recall a breakout you took (or watched) that failed. At what moment was the claim falsified, and would your plan have exited there?",
      ],
    },
    {
      kind: "summary",
      id: "tc-l5-b9",
      title: "Recap",
      points: [
        "Ranges are repeated ceiling/floor tests — balance with stops clustered beyond both edges.",
        "Pierce = suspicion, close-outside = claim, retest-hold = evidence.",
        "Fakeouts are the normal alternative; back inside falsifies the claim.",
        "Breakout stops sit inside the range, which keeps unit risk small and sizing honest.",
      ],
      nextStep: "Next: why 'support' and 'resistance' should never be drawn as one-pixel lines.",
    },
  ],
};
