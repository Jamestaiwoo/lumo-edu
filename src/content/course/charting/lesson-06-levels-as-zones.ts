import type { CourseLesson } from "../types";

export const lesson06LevelsAsZones: CourseLesson = {
  id: "tc-l6",
  moduleId: "c3-m2",
  title: "Support & Resistance as Zones",
  blurb: "Levels are areas of contested price, not pencil lines at one tick.",
  objectives: [
    "Draw levels as zones around clusters of prior reactions",
    "Explain polarity flips when broken levels are retested",
    "Reject single-tick precision in favour of probabilistic areas",
    "Plan entries and stops relative to a zone rather than a price",
  ],
  durationMinutes: 11,
  xp: 33,
  keyTakeaway:
    "Markets remember areas, not digits. Trade the zone: place entries at its edge, stops beyond it, and accept that 'through the level' needs a margin of judgment.",
  blocks: [
    {
      kind: "explain",
      id: "tc-l6-b1",
      explanation: {
        heading: "Memory is blurry — plan for blurry",
        whyItMatters:
          "A level drawn at exactly 47.36 will be violated by 3 cents and declared 'broken', forcing a decision your plan never actually needed to make.",
        paragraphs: [
          "Support is an area where prior selling was absorbed by demand; resistance where prior buying was met by supply. Each reaction leaves memory: participants who bought the last floor remember it, and their orders cluster near it again. But fills happen across prices — the 'level' is really a band where the cluster concentrates, typically a few tenths to a couple of percent wide depending on timeframe and volatility.",
          "The zone framing fixes three failure modes. First, false precision: whether price closed 47.36 or 47.31 is noise; whether it closed below the zone's lower edge is information. Second, premature exits: stops placed one tick beyond a line get harvested by spreads and wicks before the real test. Third, missed context: zones overlap — a prior range floor can sit inside a later resistance band, and the band is where the battle actually occurred.",
          "Polarity flip: when a resistance zone breaks and is retested from above and holds, it has become support — and vice versa. The mechanism is the same memory: trapped shorts from the old resistance now sit at their exits (buying), while would-be buyers who missed the breakout wait at the zone. The flip is evidence, not law; failed flips (breakout fails, price re-enters) are exactly the fakeouts from tc-l5.",
          "Trading relative to zones: entries at the zone edge (where the risk is defined), stops beyond the zone plus a margin (so the claim needs to be decisively falsified), and targets at the next zone — which turns risk/reward into a measurable statement from map distances.",
        ],
        keyTerms: [
          {
            term: "Zone",
            definition:
              "A band around the price cluster where prior reactions concentrated — the honest resolution of a level.",
          },
          {
            term: "Polarity flip",
            definition: "A broken resistance retested and holding as support (or the mirror).",
          },
          {
            term: "False precision",
            definition:
              "Treating a contested area as an exact tick — the error that turns noise into 'signals'.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "tc-l6-b2",
      example: {
        title: "From reactions to a zone",
        setup:
          "Reactions over four months: reversals began at 47.2, 47.5, 47.1, 47.6, and pullbacks bottomed at 46.8, 47.0, 46.9.",
        steps: [
          {
            label: "Cluster the highs",
            detail:
              "47.1–47.6: five upper reactions inside 50 cents → resistance zone 47.10–47.60.",
          },
          {
            label: "Cluster the lows",
            detail:
              "46.8–47.0: three lower reactions → support zone 46.80–47.00 (tighter, fewer touches).",
          },
          {
            label: "Trade the edges",
            detail:
              "A short idea triggers near 47.60 (zone top); its stop goes above the zone plus margin — say 47.90 — not at 47.61.",
          },
          {
            label: "Plan the flip",
            detail:
              "If price closes above 47.60 and retests the 47.10–47.60 band from above and holds, resistance is now support — the long playbook activates with stops below the zone.",
          },
        ],
        takeaway:
          "Reactions make the cluster; the cluster sets edges; edges set entries, stops and flip conditions.",
      },
    },
    {
      kind: "visual",
      id: "tc-l6-b3",
      title: "Reactions cluster, price wobbles",
      visual: {
        type: "price-path",
        label: "Five touches of a resistance zone",
        points: [45.9, 47.2, 46.4, 47.5, 46.9, 47.1, 46.2, 47.6, 47.0, 47.4, 48.3],
        caption:
          "Reversals keep appearing in the 47.1–47.6 band — the zone is the cluster of reactions, not any single touch — until the final close above it invites the flip.",
        markers: [
          { index: 1, label: "47.2", tone: "neutral" },
          { index: 3, label: "47.5", tone: "neutral" },
          { index: 7, label: "47.6", tone: "neutral" },
          { index: 10, label: "Break", tone: "up" },
        ],
      },
    },
    {
      kind: "interactive",
      id: "tc-l6-b4",
      title: "Zone judgment calls",
      takeaway:
        "Every defensible answer locates risk relative to the zone's edges and its flip condition — none of them places a stop one tick from a line.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Resistance zone 121.00–121.80 held three times. Price now closes at 122.30. Your plan must be written before the retest.",
        situation: ["The retest of the zone could come tomorrow."],
        choices: [
          {
            label: "Long the retest if the 121.00–121.80 band holds as support; stop below 120.70",
            outcome:
              "The flip claim gets its evidence (hold from above) and its falsification line (settle back below the zone).",
            best: true,
            feedback:
              "Correct — polarity flip traded with zone-relative invalidation: the margin below the band absorbs spread and one wick.",
          },
          {
            label: "Buy now at 122.30 before the retest — it might not come",
            outcome: "Possible, but your stop sits above a zone that has not yet proven support.",
            best: false,
            feedback:
              "Skipping the retest means entering on the breakout leg with untested support — larger risk, less evidence.",
          },
          {
            label: "Set the stop exactly at 121.80, the zone's top edge",
            outcome:
              "Ordinary retest wicks dip into the band and stop you before anything is falsified.",
            best: false,
            feedback:
              "The zone is a band; a stop inside it reacts to noise. Falsification = settling below the zone's lower edge.",
          },
          {
            label: "Short the retest — resistance always holds after a break",
            outcome: "You are shorting the flip while the breakout crowd holds above you.",
            best: false,
            feedback:
              "Polarity flips are the documented behaviour after confirmed breaks; the old rule reverses unless price re-enters the zone.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "tc-l6-b5",
      title: "Guided practice",
      assessment: {
        intro: "Build zones and measure relative risk.",
        allowRetry: true,
        items: [
          {
            skill: "Zone width",
            question: {
              id: "tc-l6-q1",
              type: "numeric",
              topic: "levels",
              prompt:
                "Resistance reactions cluster between $90.40 and $91.10. What is the zone width in dollars?",
              answer: 0.7,
              tolerance: 0.03,
              unit: "USD",
              explain: "91.10 − 90.40 = $0.70 — that band, not a single price, is what must break.",
            },
            feedbackByAnswer: {
              numeric: "Upper edge − lower edge: 91.10 − 90.40 = 0.70.",
            },
          },
          {
            skill: "Stop beyond the zone",
            question: {
              id: "tc-l6-q2",
              type: "numeric",
              topic: "stops",
              prompt:
                "You short at the resistance zone's top ($91.10) with a stop $0.40 above the zone. Unit risk per share?",
              answer: 1.1,
              tolerance: 0.05,
              unit: "USD",
              explain:
                "Stop at 91.50; 91.50 − 91.10 = $1.10 — the margin keeps one wick inside the band from deciding the trade.",
            },
            feedbackByAnswer: {
              numeric: "Stop (91.10 + 0.40 = 91.50) − entry: 91.50 − 91.10 = 1.10.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tc-l6-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Polarity flip",
            question: {
              id: "tc-l6-q3",
              type: "mcq",
              topic: "levels",
              prompt: "Why does broken resistance often become support on the retest?",
              options: [
                "The exchange reclassifies the price level overnight",
                "Memory: trapped shorts cover at their exits and missed buyers wait where supply previously flipped",
                "Mathematical symmetry of price series",
                "It always happens — without exception",
              ],
              answer: 1,
              explain:
                "Order memory — shorts' stops (buys) cluster above old resistance, and disappointed buyers wait below it. It's a tendency with documented failures, not a law.",
            },
            feedbackByAnswer: {
              "0": "No exchange mechanism tracks anyone's support/resistance lines.",
              "2": "There is no symmetry law; the mechanism is order placement by participants.",
              "3": "Failed flips (fakeouts) are common enough to have their own name.",
            },
          },
          {
            skill: "Why zones beat lines",
            question: {
              id: "tc-l6-q4",
              type: "truefalse",
              topic: "levels",
              prompt:
                "Placing a stop one tick beyond a single-price level turns ordinary spread and wick behaviour into false signals.",
              answer: true,
              explain:
                "A one-tick margin has no room for the band's natural width — the stop tests noise rather than falsification.",
            },
            feedbackByAnswer: {
              true: "Correct — the margin must clear the zone, not the line.",
              false:
                "Tightness beyond a contested band systematically harvests the stop before the thesis is tested.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tc-l6-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Support zone $33.20–33.60 absorbed four selloffs. Price now closes at $32.90 — below the zone. Budget $252.",
          "You plan a short on the retest into 33.20–33.60, with a stop above the zone at $33.90.",
        ],
        assessment: {
          items: [
            {
              skill: "Sizing a zone-retest short",
              question: {
                id: "tc-l6-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt:
                  "Entry on the retest at $33.50 (inside the zone), stop $33.90. Unit risk = $0.40. How many shares fit the $252 budget?",
                answer: 630,
                tolerance: 3,
                unit: "shares",
                explain:
                  "252 ÷ 0.40 = 630 shares. Falsification (close back above the zone) costs exactly the budget.",
              },
              feedbackByAnswer: {
                numeric: "Budget ÷ unit risk: 252 ÷ 0.40 = 630.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tc-l6-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Draw (mentally or on paper) the two zones that matter most on your main market — what prior reactions put them there?",
      ],
    },
    {
      kind: "summary",
      id: "tc-l6-b9",
      title: "Recap",
      points: [
        "Levels are zones — bands around clusters of prior reactions, not tick-exact lines.",
        "Trade edges: entries at the band's edge, stops beyond it plus margin.",
        "Polarity flips are order memory with documented failures, not laws.",
        "False precision is the enemy: judge breaks by settlement beyond the zone.",
      ],
      nextStep:
        "Next: Module 3 — indicators, starting with exactly what a moving average computes.",
    },
  ],
};
