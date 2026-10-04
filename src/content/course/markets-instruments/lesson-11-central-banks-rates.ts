import type { CourseLesson } from "../types";

export const lesson11CentralBanksRates: CourseLesson = {
  id: "mk-l11",
  moduleId: "c4-m4",
  title: "Central Banks & Rates",
  blurb: "Currencies are priced by the rate differential — and repriced on the day policy speaks.",
  objectives: [
    "Explain how rate differentials drive currency demand",
    "Compute gross carry on a funded position",
    "Anticipate a policy-meeting gap and size for it",
    "Judge whether a currency thesis is a rates thesis or something else",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Money flows toward higher risk-adjusted yield: expectations of rate changes move currencies more than the rates themselves. Meeting days are scheduled gaps — treat them like rp-l6 taught you to.",
  blocks: [
    {
      kind: "explain",
      id: "mk-l11-b1",
      explanation: {
        heading: "The differential engine",
        whyItMatters:
          "This is the driver tag for forex: before you read a chart, know each side's policy path. Every other story is usually a second-order effect.",
        paragraphs: [
          "A currency's appeal is relative return: hold the higher-yielding currency, and you earn its deposit rate while paying the lower one. Rate differentials therefore pull capital, and expected differentials pull it earlier — markets price the next move before it happens.",
          "Central banks set the short rate: a hawkish surprise (higher than expected, or tighter guidance) strengthens that currency; a dovish one weakens it. Employment and inflation prints matter mainly because they update the expected policy path — this is why a CPI print can move a pair 100 pips and a factory order barely 10.",
          "The carry trade: borrow the low-yield funding currency (historically JPY or CHF), buy the high-yield one, collect the differential. Gross carry looks steady and attractive — until the position unwinds. Carry losses are fat-tailed: calm for months, then a rapid squeeze as funding currencies spike in risk-off. A levered carry position carries both FX direction risk and the leverage multiplier (Course 2's ceilings still apply).",
          "Meeting days: scheduled, calendar-known events. Spreads widen into the decision, and the release produces a gap — no stop is honoured through it. Size the same way rp-l6 taught: assume the gap first, then choose position size that survives it. Never hold a size on a meeting that you could not hold through an overnight gap.",
        ],
        keyTerms: [
          {
            term: "Rate differential",
            definition:
              "The interest-rate gap between two currencies — the primary pull on their exchange rate.",
          },
          {
            term: "Carry trade",
            definition:
              "Borrow low-yield, hold high-yield, collect the spread — profitable until an unwind, then violently unprofitable.",
          },
          {
            term: "Hawkish / dovish",
            definition:
              "Tighter or looser policy than expected; both move the currency before the rate itself changes.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "mk-l11-b2",
      example: {
        title: "Gross carry vs one bad week",
        setup:
          "You fund in JPY at 0.10% and hold USD at 5.25%, 3× levered. Differential = 5.15% annualised.",
        steps: [
          {
            label: "Gross carry",
            detail:
              "5.15% per year before leverage ≈ 0.43% per month. Levered 3×: ~15.5% per year gross, ~1.3% per month.",
          },
          {
            label: "The trap",
            detail:
              "Carry accumulates slowly and steadily; the exchange rate can give it all back in days. At 3× leverage, a 5% adverse FX move costs 15% of equity — about eleven months of the levered carry, gone in a week.",
          },
          {
            label: "Risk-off squeeze",
            detail:
              "In a shock, the high-yield leg is sold and the funding currency is bought — both legs move against the carry position at once. Losses compound, and margin calls force exits at the worst prices.",
          },
          {
            label: "Sizing discipline",
            detail:
              "Compute unit risk from the stop, not the carry: if the stop is 200 pips and the goal is steady income, 1%/trade still applies — the differential never justifies a larger size.",
          },
        ],
        takeaway:
          "Carry is compensation for tail risk, not free money — size it as the tail, not the average.",
      },
    },
    {
      kind: "visual",
      id: "mk-l11-b3",
      title: "What the differential tells you",
      visual: {
        type: "table",
        label: "Policy path scenarios",
        columns: ["Scenario", "Rate path", "Currency", "Positioning logic"],
        rows: [
          [
            "Hot CPI",
            "Hawkish repricing",
            "Strengthens",
            "Long the currency; expect a gap on the print",
          ],
          [
            "Weak jobs data",
            "Dovish repricing",
            "Weakens",
            "Short the currency; differential compresses",
          ],
          [
            "Calm, stable differential",
            "No path change",
            "Drifts on carry",
            "Carry trade — acceptable only with tail sizing",
          ],
          [
            "Risk-off shock",
            "Funding currencies bid",
            "High-yielders punished",
            "Carry unwinds violently; funding legs spike",
          ],
        ],
        caption:
          "The middle two rows are where carry lives; the top and bottom rows are where accounts are made and broken.",
      },
    },
    {
      kind: "interactive",
      id: "mk-l11-b4",
      title: "Rates first, candles second",
      takeaway:
        "Currency theses organise around policy paths — if you cannot name the differential and its direction, you do not yet have a forex thesis.",
      interaction: {
        type: "scenario-decision",
        prompt: "Four traders describe their forex thesis. Which is properly grounded?",
        situation: [
          "Same week: a central bank meeting, a CPI print, and a 'support' level on a weekly chart.",
        ],
        choices: [
          {
            label:
              "Long the currency because the market is underpricing a hike, sized so a 60-pip meeting gap is survivable",
            outcome: "Thesis = expected differential; risk plan = the scheduled gap.",
            best: true,
            feedback:
              "Correct — policy expectations set direction, and the calendar-known gap sets size. Both parts are present.",
          },
          {
            label: "Long because price bounced off support three times",
            outcome:
              "Structure alone names no driver — the meeting can invalidate the level in one candle.",
            best: false,
            feedback:
              "Levels are timing tools; without a rate-path reason, the meeting gap decides the trade, not the chart.",
          },
          {
            label: "Carry is 5% — max leverage to maximise the income",
            outcome:
              "Leverage multiplies the unwind loss with the carry; the tail is what gets magnified.",
            best: false,
            feedback:
              "Carry sized at max leverage converts a slow income stream into a single-event ruin risk.",
          },
          {
            label: "Trade the CPI print with a wide size to 'capture' the move",
            outcome:
              "Sizing for the average move while the event produces a gap is rp-l6's classic error repeated.",
            best: false,
            feedback:
              "Gap events must be sized by the possible gap, not the average range — the stop will not fill where you placed it.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "mk-l11-b5",
      title: "Guided practice",
      assessment: {
        intro: "Run the differential and the gap arithmetic.",
        allowRetry: true,
        items: [
          {
            skill: "Gross carry",
            question: {
              id: "mk-l11-q1",
              type: "numeric",
              topic: "market-basics",
              prompt:
                "The high-yield currency pays 4.75%; the funding currency costs 0.25%. What is the annual gross carry differential in percent?",
              answer: 4.5,
              tolerance: 0.1,
              unit: "%",
              explain:
                "4.75% − 0.25% = 4.5% gross per year — before FX moves, leverage, spreads or financing costs.",
            },
            feedbackByAnswer: {
              numeric: "Subtract the funding rate from the holding rate: 4.75 − 0.25 = 4.5.",
            },
          },
          {
            skill: "Gap-event sizing",
            question: {
              id: "mk-l11-q2",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "A central-bank meeting could gap the pair 80 pips. Your ceiling is $200 and a mini lot is $1/pip. How many mini lots survive the gap?",
              answer: 2,
              tolerance: 0,
              unit: "mini lots",
              explain:
                "Gap risk per mini lot = 80 × $1 = $80. $200 ÷ $80 = 2 mini lots — sized for the gap, not the average.",
            },
            feedbackByAnswer: {
              numeric: "80 pips × $1 = $80 per mini lot; 200 ÷ 80 = 2.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "mk-l11-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "What moves a currency",
            question: {
              id: "mk-l11-q3",
              type: "mcq",
              topic: "market-basics",
              prompt: "Why can a CPI release move a currency more than an actual policy decision?",
              options: [
                "CPI is published by central banks",
                "It updates the expected policy path — markets trade the expectation of future rates, not only current ones",
                "Inflation directly changes the deposit rate",
                "Because CPI days have less liquidity",
              ],
              answer: 1,
              explain:
                "Currencies discount expected future differentials; a surprise print re-prices the whole path, which is a bigger object than one meeting.",
            },
            feedbackByAnswer: {
              "0": "Statistical agencies publish CPI, not central banks.",
              "2": "Inflation influences policy; it does not set the administered rate.",
              "3": "Reduced liquidity amplifies moves, but the repricing mechanism is expectations.",
            },
          },
          {
            skill: "Carry tail risk",
            question: {
              id: "mk-l11-q4",
              type: "truefalse",
              topic: "position-sizing",
              prompt:
                "Carry trades deliver steady income most of the time and take their losses in fast, correlated unwind events — so they must be sized for the tail, not the average month.",
              answer: true,
              explain:
                "The distribution is skewed: small steady gains punctuated by sharp losses when risk appetite flips and both legs move against you.",
            },
            feedbackByAnswer: {
              true: "Correct — and that asymmetry is exactly why leverage is fatal here.",
              false:
                "Carry's calm averages are the mask; the unwind is the event that decides the account.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "mk-l11-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You run a levered carry position: 4× leverage, gross carry 4% per year, equity $10,000.",
          "Risk appetite flips after a central-bank meeting and the pair moves 4% against you over two sessions.",
        ],
        assessment: {
          items: [
            {
              skill: "Leveraged carry unwind",
              question: {
                id: "mk-l11-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt:
                  "With 4× leverage, what is the equity loss in percent from the 4% adverse FX move?",
                answer: 16,
                tolerance: 0.5,
                unit: "%",
                explain:
                  "4% × 4 = 16% of equity — roughly four years of unlevered gross carry, lost in two days. Leverage multiplies the move, not the income's reliability.",
              },
              feedbackByAnswer: {
                numeric: "Move × leverage: 4% × 4 = 16% of equity.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "mk-l11-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Find the next central-bank meeting for a pair you follow. Write the two policy rates, the differential, and the size you could hold through a 100-pip gap.",
      ],
    },
    {
      kind: "summary",
      id: "mk-l11-b9",
      title: "Recap",
      points: [
        "Currencies are pulled by rate differentials and pushed by expected policy changes.",
        "Hawkish surprises strengthen; dovish surprises weaken — before the rate itself moves.",
        "Carry earns slowly and loses fast: sized for the tail, never levered for the average.",
        "Meeting days and prints are scheduled gaps — size with rp-l6's gap rule, not the average range.",
      ],
      nextStep:
        "Next: sessions, spreads and broker-side risks — the clock that decides when forex is tradeable.",
    },
  ],
};
