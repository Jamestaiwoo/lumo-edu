import type { CourseLesson } from "../types";

export const lesson04WhereIdeasGoWrong: CourseLesson = {
  id: "rp-l4",
  moduleId: "c2-m2",
  title: "Where Ideas Go Wrong",
  blurb: "Invalidation is a claim about the market; the stop just enforces it.",
  objectives: [
    "Define invalidation as the condition that disproves the trade thesis",
    "Place a stop at the invalidation level instead of at a comfortable distance",
    "Recognise stop placement driven by account comfort or round numbers",
    "State the thesis-then-stop sequence for any new setup",
  ],
  durationMinutes: 11,
  xp: 33,
  keyTakeaway:
    "A stop is not a loss you tolerate — it is the price level at which your reason for being in the trade has ceased to exist. The market picks the level; you only agree to it.",
  blocks: [
    {
      kind: "explain",
      id: "rp-l4-b1",
      explanation: {
        heading: "The stop is an enforcement mechanism, not a decision",
        whyItMatters:
          "Traders choose stops for emotional reasons — a distance that feels survivable, a round number, a level that keeps the position 'safe'. Every one of those hands the market a free option against you.",
        paragraphs: [
          "Start with the thesis, written as a falsifiable claim: 'Buyers are defending this zone; while price holds above it, the demand thesis holds.' Invalidation is the condition that makes the claim false — here, a decisive break below the zone. The stop belongs at (or just beyond) that condition, because that is where the reason to hold evaporates.",
          "The consequences of getting this backwards are symmetric and unpleasant. A stop placed too close to entry — tighter than the thesis demands — turns normal market noise into exits: you were right, but did not survive the wiggle. A stop placed too far — looser than invalidation — means you hold a thesis that has already been disproven, paying real money to wait for a conclusion the market already delivered.",
          "Account comfort must not choose the distance. If invalidation is $4 away and your budget only supports a $2 stop, the honest responses are: shrink the quantity (division, from rp-l2), shrink the trade's share of the account, or skip it. Truncating invalidation to fit the budget is the one unacceptable option — it converts a stop into a coin toss.",
          "Sequence matters: thesis → invalidation → stop → size. If you find yourself picking the stop first and inventing a thesis that justifies it, you are decorating a loss in advance.",
        ],
        keyTerms: [
          {
            term: "Invalidation",
            definition:
              "The observable condition under which the trade's thesis is no longer true.",
          },
          {
            term: "Noise",
            definition:
              "Price movement too small to prove or disprove any thesis — the reason tight stops get hit by randomness.",
          },
          {
            term: "Thesis",
            definition: "The specific, falsifiable claim about the market that the trade bets on.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "Round numbers are not levels",
            body: "'Stop at $50 because it is round' is a description of your counting system, not of any behaviour by buyers or sellers.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "rp-l4-b2",
      example: {
        title: "Thesis first, stop second",
        setup:
          "A stock rallies to $88, pulls back, and holds $84–85 three times over two weeks. Thesis: the $84–85 demand zone is being defended.",
        steps: [
          {
            label: "Write the claim",
            detail:
              "'Buyers keep defending $84–85.' Falsifiable, observable, time-bound to the current structure.",
          },
          {
            label: "Find invalidation",
            detail:
              "A decisive close below the zone — say, a 15-minute close under $83.50 — means the defence failed. Above it, wicks into the zone prove nothing.",
          },
          {
            label: "Place the stop",
            detail:
              "Entry near $87.00, stop at $83.20 — just beyond invalidation, giving the claim room to be tested without being declared dead by one stray tick.",
          },
          {
            label: "Let size obey",
            detail:
              "Unit risk = 87.00 − 83.20 = $3.80. With a $250 budget: 250 ÷ 3.80 = 65 shares (65 × 3.80 = $247, within budget). The distance was chosen by the market; division absorbed it.",
          },
        ],
        takeaway:
          "The zone chose the stop; the budget chose the size. Neither was chosen for comfort.",
      },
    },
    {
      kind: "visual",
      id: "rp-l4-b3",
      title: "A defended zone and the level that disproves it",
      visual: {
        type: "candles",
        label: "Demand zone under test",
        candles: [
          { open: 84.2, high: 87.6, low: 83.8, close: 87.1 },
          { open: 87.1, high: 88.4, low: 86.5, close: 87.9 },
          { open: 87.9, high: 88.2, low: 84.1, close: 84.6 },
          { open: 84.6, high: 87.4, low: 84.3, close: 87.0 },
          { open: 87.0, high: 88.9, low: 86.2, close: 88.1 },
          { open: 88.1, high: 89.3, low: 84.4, close: 84.9 },
          { open: 84.9, high: 87.6, low: 84.5, close: 87.2 },
          { open: 87.2, high: 90.1, low: 86.8, close: 89.6 },
        ],
        caption:
          "Three rejections from the 84–85 zone; the stop sits below where a decisive break would mean the defence failed.",
        zones: [{ price: 84.5, label: "Demand zone · thesis floor", tone: "support" }],
      },
    },
    {
      kind: "interactive",
      id: "rp-l4-b4",
      title: "Diagnose the broken stop",
      takeaway:
        "Every stop that was 'too tight' was really an invalidation the trader refused to wait for; the disciplined pick waits for the thesis to die, not the price to wiggle.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Three trades stopped out within an hour. Each time, the original thesis still looks intact. What went wrong?",
        situation: [
          "Trade 1: thesis is a breakout above resistance at $120; stop set at $119.50 because 'tight is safe'. Price dips to $119.40, then rallies to $130 without you.",
          "Trade 2: thesis is a range hold; stop at an even $75.00. Price sweeps $74.80 intraday, closes the range intact, and triples the original target.",
          "Trade 3: thesis requires a close below 200-day average to fail; you set the stop 10 cents above it to 'be safe'.",
        ],
        choices: [
          {
            label: "All three stops were tighter than their invalidation conditions",
            outcome: "Each trade exited on noise while its falsifiable claim remained untested.",
            best: true,
            feedback:
              "Correct. Noise tolerance belongs between the current price and invalidation — the stops were placed inside it.",
          },
          {
            label: "The market unfairly hunted the stops",
            outcome: "You learn nothing; next time the stops will be hunted again.",
            best: false,
            feedback:
              "Whether others saw the levels is unknowable and irrelevant. The fix is placing stops where the thesis actually fails.",
          },
          {
            label: "Tight stops are a mistake and all stops should be wide",
            outcome: "Wide-but-arbitrary stops simply trade noise exits for held-losers.",
            best: false,
            feedback:
              "Width is not the virtue — alignment with invalidation is. Some theses invalidate very close to entry.",
          },
          {
            label: "Breakout trades should never use stops",
            outcome:
              "Unbounded risk on a falsifiable idea: the exact failure mode this course exists to prevent.",
            best: false,
            feedback:
              "No thesis, no trade — and every thesis has a falsification point that the stop enforces.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "rp-l4-b5",
      title: "Guided practice",
      assessment: {
        intro: "Derive stops from invalidation.",
        allowRetry: true,
        items: [
          {
            skill: "Stop distance from the claim",
            question: {
              id: "rp-l4-q1",
              type: "numeric",
              topic: "stops",
              prompt:
                "Entry is $61.00. Your thesis fails on a decisive close below $58.40, and you place the stop at $58.20. What is the unit risk per share?",
              answer: 2.8,
              tolerance: 0.05,
              unit: "USD",
              explain: "61.00 − 58.20 = $2.80 per share of unit risk.",
            },
            feedbackByAnswer: {
              numeric: "Subtract the stop from the entry: 61.00 − 58.20 = 2.80.",
            },
          },
          {
            skill: "Sizing from an invalidation-derived stop",
            question: {
              id: "rp-l4-q2",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "With a $280 budget and the $2.80 unit risk from the previous item, how many shares?",
              answer: 100,
              tolerance: 1,
              unit: "shares",
              explain: "280 ÷ 2.80 = 100 shares, risking exactly the budget.",
            },
            feedbackByAnswer: {
              numeric: "Budget ÷ unit risk: 280 ÷ 2.80 = 100.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "rp-l4-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "What invalidation is",
            question: {
              id: "rp-l4-q3",
              type: "mcq",
              topic: "stops",
              prompt:
                "What makes a level an invalidation level rather than merely a convenient price?",
              options: [
                "It is a round number that other traders also watch",
                "It is where the trade's falsifiable thesis stops being true",
                "It is exactly 1% below the entry price",
                "It is the level at which the loss feels smallest",
              ],
              answer: 1,
              explain:
                "Invalidation is defined by the thesis: the observable condition under which the claim you bet on has failed.",
            },
            feedbackByAnswer: {
              "0": "Shared round numbers may get swept precisely because everyone chose them for the same non-reason.",
              "2": "1% below entry ignores where the structure actually fails — the stop would sit inside noise.",
              "3": "Feel is not a market property; sizing exists so the loss is already acceptable.",
            },
          },
          {
            skill: "When budget and invalidation conflict",
            question: {
              id: "rp-l4-q4",
              type: "truefalse",
              topic: "stops",
              prompt:
                "If invalidation lies further away than the budget comfortably supports, moving the stop closer to fit the budget is acceptable.",
              answer: false,
              explain:
                "Shrink the quantity or skip the trade. Moving the stop inside invalidation buys survival odds with the trade's own logic.",
            },
            feedbackByAnswer: {
              false: "Correct — quantity adjusts to the stop, never the reverse.",
              true: "That produces noise exits: the market will reach your stop before it reaches your thesis.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "rp-l4-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You plan: entry $42.00, thesis 'the 50-day average keeps acting as support', invalidation = a daily close below $40.10, stop at $39.90.",
          "Your budget for the trade is $255.",
        ],
        assessment: {
          items: [
            {
              skill: "Complete the thesis → stop → size chain",
              question: {
                id: "rp-l4-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt: "Unit risk = 42.00 − 39.90 = $2.10. How many shares fit the $255 budget?",
                answer: 121,
                tolerance: 1,
                unit: "shares",
                explain: "255 ÷ 2.10 = 121.4, so 121 shares — risking $254.10, within the budget.",
              },
              feedbackByAnswer: {
                numeric:
                  "255 ÷ 2.10 = 121.4; partial shares are not tradable, so round down to 121.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "rp-l4-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "For your most recent trade idea, what single observable event would prove it wrong? Write it as an if-then statement.",
      ],
    },
    {
      kind: "summary",
      id: "rp-l4-b9",
      title: "Recap",
      points: [
        "Write the thesis first; invalidation is where the falsifiable claim stops being true.",
        "The stop enforces invalidation — it does not choose it.",
        "Too-tight stops exit on noise; too-loose stops hold disproven ideas.",
        "When budget and invalidation conflict, adjust quantity or skip — never the stop.",
      ],
      nextStep:
        "Next: the stop mechanics themselves — market, limit, trailing, and where each one bends.",
    },
  ],
};
