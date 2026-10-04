import type { CourseLesson } from "../types";

export const lesson02EarningsDividendsSplits: CourseLesson = {
  id: "mk-l2",
  moduleId: "c4-m1",
  title: "Earnings, Dividends & Splits",
  blurb: "Three corporate events, three very different reasons price moves.",
  objectives: [
    "Explain what earnings reports reprice and why gaps result",
    "Compute a dividend's ex-date price adjustment",
    "Distinguish economic events (earnings, dividends) from cosmetic ones (splits)",
    "Plan event exposure with Course 2's gap-sizing rules",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Earnings change the claim's worth, dividends transfer cash out of it, splits redraw the units — only the first two move your wealth, but all three move the tape.",
  blocks: [
    {
      kind: "explain",
      id: "mk-l2-b1",
      explanation: {
        heading: "Scheduled repricing events",
        whyItMatters:
          "Single-name risk concentrates on known dates. Knowing which events change shareholder wealth — and which only change the arithmetic — decides what you hold through and what you do not.",
        paragraphs: [
          "Earnings: four times a year (mostly), the company reports revenue, profit and guidance. Because the residual estimate depends on earning power, the report is a scheduled revision of price inputs. Uncertainty resolves in one print: that is why single names gap through stops on earnings (Course 2's event gap), and why position size for the gap scenario or stands aside — never the calm-tape size.",
          "Dividends: cash paid per share from company funds. On the ex-dividend date, the exchange mechanically reduces the price by roughly the dividend amount — you hold the stock, your account gains the cash, and total value is unchanged on that day (before taxes). The dividend is a transfer, not a gain: 'the stock yielded 4%' describes income mechanics, not free money. Below the prior low the support line you drew is now off by the amount — a detail that matters for stop placement.",
          "Splits: a 2-for-1 split doubles shares and halves price overnight. Nothing economic changes — your ownership percentage and the company are identical; only the unit size differs (a pizza cut into more slices). Markets often still react (affordability psychology, index inclusion flows), but no cash or claim moved.",
          "The trader's checklist before each event: is it economic (earnings, dividend, dilution offering) or cosmetic (split)? For economic ones, size for the gap (rp-l6) or avoid the print; for cosmetic ones, update your charts for the unit change so your levels stay consistent.",
        ],
        keyTerms: [
          {
            term: "Ex-dividend date",
            definition:
              "The date from which the buyer no longer receives the declared dividend; price adjusts down by about the amount.",
          },
          {
            term: "Guidance",
            definition:
              "Management's forward statement — often repriced harder than the backward-looking numbers.",
          },
          {
            term: "Stock split",
            definition:
              "A change in share count and unit price with no change in ownership, value, or fundamentals.",
          },
        ],
        callouts: [
          {
            tone: "warning",
            title: "Gap sizing is mandatory pre-event",
            body: "A stop does not cap loss through an earnings print. Size for the gap or skip the print — decided before the bell, not during it.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "mk-l2-b2",
      example: {
        title: "Ex-date arithmetic and a split",
        setup:
          "Stock at $60.50 declares a $0.50 dividend (ex-date tomorrow), then later announces a 3-for-1 split.",
        steps: [
          {
            label: "Ex-date adjustment",
            detail:
              "Open near 60.50 − 0.50 = $60.00. If you held yesterday: account +$0.50/share, price −$0.50 — flat, not a loss.",
          },
          {
            label: "Re-anchor your levels",
            detail:
              "Your support drawn at 59.80 effectively sits at 59.30 in new units. Stops placed without the adjustment are 50 cents tighter than intended.",
          },
          {
            label: "The split",
            detail:
              "3-for-1: your 300 shares at $60 → 900 shares at $20. Claim unchanged: 300 × 60 = 900 × 20 = $18,000 either way.",
          },
          {
            label: "What to tell yourself",
            detail:
              "Dividend day moved cash; split day moved units. Only earnings moved the estimate of the business itself.",
          },
        ],
        takeaway: "Know which event is economic — the plan differs accordingly.",
      },
    },
    {
      kind: "visual",
      id: "mk-l2-b3",
      title: "Three events, three mechanisms",
      visual: {
        type: "table",
        label: "What actually changes",
        columns: ["Event", "What changes", "Your wealth", "Trading implication"],
        rows: [
          [
            "Earnings report",
            "Estimate of earning power",
            "Can gap violently",
            "Size for the gap or skip the print",
          ],
          [
            "Ex-dividend",
            "Cash moves to you; price adjusts down ~dividend",
            "Unchanged that day",
            "Re-anchor levels and stops by the amount",
          ],
          [
            "Stock split",
            "Share count up, unit price down",
            "Unchanged",
            "Update charts; units, not value, changed",
          ],
        ],
        caption:
          "Economic events repriced; the dividend transfers; the split redraws. Plans follow the mechanism.",
      },
    },
    {
      kind: "interactive",
      id: "mk-l2-b4",
      title: "Pre-event triage",
      takeaway:
        "Each answer keys to the mechanism — gap economics for earnings, unit re-anchoring for dividends, indifference for splits.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Three announcements land in one week. Your existing positions need a response to each.",
        situation: [
          "(a) Earnings after the close tomorrow · (b) $0.75 dividend, ex-date Wednesday · (c) 2-for-1 split announced, effective next month.",
        ],
        choices: [
          {
            label:
              "a: re-size for gap or exit pre-print · b: shift levels down 0.75 · c: no economic action",
            outcome:
              "Each response matches the mechanism: gap risk, unit adjustment, and a cosmetic change respectively.",
            best: true,
            feedback:
              "Correct — earnings is the only wealth-gap risk here; the dividend is arithmetic housekeeping; the split changes nothing you own.",
          },
          {
            label: "Hold all three at full size — corporate events rarely matter",
            outcome:
              "The earnings position now carries uncapped overnight gap risk through your stop.",
            best: false,
            feedback:
              "This is precisely the rp-l6 event case: stops cannot fill through a gap; the size must pre-pay for it.",
          },
          {
            label: "Sell everything before every event — events are always dangerous",
            outcome: "Over-correction: you exit splits and ex-dates that carry no wealth gap.",
            best: false,
            feedback:
              "Blanket avoidance pays real costs (spreads, re-entry risk, dividends given up) for mechanisms that only earnings repriced.",
          },
          {
            label: "Add to the dividend stock — free money day",
            outcome: "Price opens ~0.75 lower; the payout came out of the share you hold.",
            best: false,
            feedback:
              "The ex-date adjustment makes you flat; treating it as income magic misunderstands the transfer.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "mk-l2-b5",
      title: "Guided practice",
      assessment: {
        intro: "Compute the adjustments.",
        allowRetry: true,
        items: [
          {
            skill: "Ex-date price adjustment",
            question: {
              id: "mk-l2-q1",
              type: "numeric",
              topic: "market-basics",
              prompt:
                "A stock closes at $42.30 the day before ex-date with a declared $0.18 dividend. Approximately what does it open at?",
              answer: 42.12,
              tolerance: 0.03,
              unit: "USD",
              explain: "42.30 − 0.18 = $42.12 — the cash left the price and entered your account.",
            },
            feedbackByAnswer: {
              numeric: "Subtract the dividend: 42.30 − 0.18 = 42.12.",
            },
          },
          {
            skill: "Split unit arithmetic",
            question: {
              id: "mk-l2-q2",
              type: "numeric",
              topic: "market-basics",
              prompt:
                "You hold 250 shares at $36.00. After a 4-for-1 split, how many shares at what price?",
              answer: 1000,
              tolerance: 1,
              unit: "shares",
              explain:
                "250 × 4 = 1,000 shares at 36.00 ÷ 4 = $9.00 — total value unchanged at $9,000.",
            },
            feedbackByAnswer: { numeric: "250 × 4 = 1,000 shares; price divides by 4 to $9." },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "mk-l2-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Which events move wealth",
            question: {
              id: "mk-l2-q3",
              type: "mcq",
              topic: "market-basics",
              prompt:
                "Which event can change a shareholder's economic position outright on its own?",
              options: [
                "A 2-for-1 split",
                "An earnings report that repriced expectations",
                "A ticker symbol change",
                "A share exchange in identical units",
              ],
              answer: 1,
              explain:
                "Earnings revise the earning-power input — the residual's worth changes. Splits and cosmetic actions redraw units only.",
            },
            feedbackByAnswer: {
              "0": "Split: same value, more slices.",
              "2": "A new symbol moves nothing but your muscle memory.",
              "3": "Identical units exchanged — pure mechanics.",
            },
          },
          {
            skill: "Dividend-day neutrality",
            question: {
              id: "mk-l2-q4",
              type: "truefalse",
              topic: "market-basics",
              prompt:
                "On the ex-date, the holder is economically whole: price drops about the dividend while the cash is credited.",
              answer: true,
              explain:
                "It is a transfer from company cash to your account, with the price adjusting to reflect the cash leaving.",
            },
            feedbackByAnswer: {
              true: "Correct — flat before tax; nothing was created.",
              false:
                "If it created wealth from nothing, every investor would time ex-dates into infinity.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "mk-l2-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You hold a $50 stock ahead of earnings. Account $30,000, ceiling 1% ($300). Backtests show post-print gaps of up to 6% against your position.",
          "Your planned stop is $1.50 below entry — but stops do not fill through gaps.",
        ],
        assessment: {
          items: [
            {
              skill: "Sizing for the earnings gap",
              question: {
                id: "mk-l2-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt:
                  "Gap unit risk ≈ 6% of $50 = $3.00/share. Budget $300. What quantity keeps a full adverse gap within budget?",
                answer: 100,
                tolerance: 2,
                unit: "shares",
                explain:
                  "300 ÷ 3.00 = 100 shares. At 100 shares a 6% gap costs $300 — the ceiling, not a breach of it.",
              },
              feedbackByAnswer: {
                numeric: "Budget ÷ gap unit risk: 300 ÷ 3.00 = 100.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "mk-l2-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Which is the next scheduled economic event on your main position — and is your current size survivable through its gap?",
      ],
    },
    {
      kind: "summary",
      id: "mk-l2-b9",
      title: "Recap",
      points: [
        "Earnings reprice the claim; dividends transfer cash with an ex-date adjustment; splits redraw units.",
        "Only economic events can move wealth outright — plan gap size or skip the print.",
        "Re-anchor support, resistance and stops after any cash or unit adjustment.",
        "Event decisions are made before the bell, with Course 2's ceiling arithmetic.",
      ],
      nextStep:
        "Next: what else can go wrong with one company — and why baskets behave differently.",
    },
  ],
};
