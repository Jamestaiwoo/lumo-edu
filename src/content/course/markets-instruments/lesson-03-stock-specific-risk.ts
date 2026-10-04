import type { CourseLesson } from "../types";

export const lesson03StockSpecificRisk: CourseLesson = {
  id: "mk-l3",
  moduleId: "c4-m1",
  title: "Stock-Specific Risk",
  blurb: "The risk that hits one company while the market shrugs.",
  objectives: [
    "Diversifiable (idiosyncratic) from market-wide risk",
    "List the main single-name risk catalysts",
    "Estimate how much of a portfolio's risk sits in one name",
    "Apply driver caps and event sizing to concentrated single-name exposure",
  ],
  durationMinutes: 11,
  xp: 33,
  keyTakeaway:
    "One company can halve while the index rises. Single-name risk is why concentration caps, claim checks and event sizing exist — the market does not diversify you automatically.",
  blocks: [
    {
      kind: "explain",
      id: "mk-l3-b1",
      explanation: {
        heading: "Risk that only your ticker knows about",
        whyItMatters:
          "Course 2 taught correlated positions fail together. Stock-specific risk is the complement: events only this company's holders care about — the ones no stop can reliably negotiate.",
        paragraphs: [
          "Two broad risk families: systematic (market-wide) risk — rates, recessions, crashes — moves nearly everything at once and cannot be diversified away inside the market; idiosyncratic (stock-specific) risk is unique to the company: earnings fraud, CEO departure, product failure, trial results, customer loss, dilution. Holding more uncorrelated names shrinks the idiosyncratic share of your risk; it never touches the systematic part.",
          "The catalyst list for single names has a common property: several are binary and scheduled — FDA decisions, court verdicts, earnings, financing announcements. Binary outcomes gap; gaps outrun stops (rp-l6). This is why the single-name playbook includes: claim diligence (mk-l1), event calendars (mk-l2), and sizing for the binary scenario rather than the tape.",
          "Concentration measurement is simple arithmetic. If one position risks 1% of the account on its stop but its realistic gap costs 4%, your effective single-name risk is 4% — four trades' worth. With a 2% per-name cap and a 3% per-driver cap (rp-l7), a five-stock portfolio where three are semiconductors carries semiconductor-driver risk far beyond five independent 1% bets.",
          "The tools transfer directly: driver caps for clusters of names sharing a customer or sector; event sizing or avoidance for binary dates; claim-first diligence before any large single-name allocation. What does not transfer: index habits. In an index, one constituent's fraud is a footnote; in your account holding that constituent alone, it is the event.",
        ],
        keyTerms: [
          {
            term: "Idiosyncratic risk",
            definition: "Company-unique risk — reducible by holding more independent names.",
          },
          {
            term: "Systematic risk",
            definition:
              "Market-wide risk — rates, growth, crises — irreducible within equities alone.",
          },
          {
            term: "Binary event",
            definition:
              "An outcome with two regimes and little middle ground — where stops gap and sizing must pre-pay.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "mk-l3-b2",
      example: {
        title: "One name, one nightmare, market unaffected",
        setup:
          "You hold 800 shares of a biotech at $25 (a $20,000 position, 40% of a $50,000 account). Trial results due Thursday.",
        steps: [
          {
            label: "Measure the exposure",
            detail:
              "40% of capital in one claim; stop at $23.50 → planned risk 800 × 1.50 = $1,200 (2.4% of account — already over a 1% ceiling).",
          },
          {
            label: "Price the binary",
            detail:
              "Failed readouts in this class gap −50% routinely. Gap loss: 800 × 12.50 = $10,000 — 20% of the account, stop ignored.",
          },
          {
            label: "Apply the rules",
            detail:
              "Two compliant options: (a) size so the gap fits the ceiling: budget 500 (1%) ÷ 12.50 = 40 shares; (b) exit before the print and re-enter after resolution with the new facts.",
          },
          {
            label: "Note what failed",
            detail:
              "Nothing about the chart. The position was mis-sized for its binary risk — concentration plus event, exactly the compound this module warns about.",
          },
        ],
        takeaway:
          "The event decides the real unit risk; the ceiling sets the quantity; the chart never gets a vote in between.",
      },
    },
    {
      kind: "visual",
      id: "mk-l3-b3",
      title: "Where single-name risk hides",
      visual: {
        type: "table",
        label: "Idiosyncratic catalysts",
        columns: ["Catalyst", "Type", "Typical price behaviour"],
        rows: [
          ["Earnings / guidance", "Scheduled, binary-ish", "Gap through stops"],
          [
            "FDA / court / audit outcomes",
            "Scheduled or announced, binary",
            "Violent one-day repricing",
          ],
          ["CEO / fraud disclosure", "Unscheduled", "Gap plus sustained derating"],
          ["Dilutive offering", "Scheduled after hours", "Open below the prior close"],
          ["Customer loss / product failure", "Unscheduled", "Fast repricing on the news"],
        ],
        caption:
          "None of these appear on a chart in advance; all of them appear in the calendar or the claim diligence.",
      },
    },
    {
      kind: "interactive",
      id: "mk-l3-b4",
      title: "Concentration audit",
      takeaway:
        "Each response sizes or gates the exposure by its largest realistic single-name loss — the ceiling applies to the gap, not to the stop.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Your $50,000 account, 1% ceiling. Portfolio: 30% in one chip stock, 20% in a second chip stock, 50% across six other names. Earnings season arrives.",
        situation: ["The two chip names share customers and report the same week."],
        choices: [
          {
            label:
              "Cap combined chip-driver risk, size both names for their gap scenarios, and stagger event exposure",
            outcome:
              "Driver cap (say 3% = $1,500) forces the question 'how many versions of this do I own?' before the prints, not after.",
            best: true,
            feedback:
              "Correct — single-name sizing plus the driver cap from rp-l7: correlated names reporting together are one bet wearing two tickers.",
          },
          {
            label: "Hold both at full size — chip stocks are liquid",
            outcome:
              "Liquidity improves fills, not outcomes; correlated gaps sum toward the driver total.",
            best: false,
            feedback:
              "Liquid names gap too; and two customers-linked names reporting together behave as one exposure.",
          },
          {
            label: "Sell the smallest position to 'reduce risk'",
            outcome:
              "Risk is set by the largest correlated pair — trimming the unrelated name changes little.",
            best: false,
            feedback:
              "Concentration audits start from the biggest exposures; position count is paperwork (rp-l7).",
          },
          {
            label: "Hedge with options on the chip ETF",
            outcome:
              "Beyond this course's scope and unproven in your plan — an undefined hedge is an undefined risk.",
            best: false,
            feedback:
              "The tools taught here — caps, event sizing, avoidance — are the available, verifiable responses; new instruments need their own validated playbook first.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "mk-l3-b5",
      title: "Guided practice",
      assessment: {
        intro: "Quantify single-name exposure.",
        allowRetry: true,
        items: [
          {
            skill: "Effective gap risk",
            question: {
              id: "mk-l3-q1",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "A position risks $400 on its stop but a realistic adverse gap of 5% on a $16,000 holding costs $800. What is the effective risk in ceiling units of $400?",
              answer: 2,
              tolerance: 0.05,
              unit: "× ceiling",
              explain: "800 ÷ 400 = 2 — the gap consumes two full trade budgets.",
            },
            feedbackByAnswer: { numeric: "800 ÷ 400 = 2." },
          },
          {
            skill: "Gap-fit sizing",
            question: {
              id: "mk-l3-q2",
              type: "numeric",
              topic: "position-sizing",
              prompt:
                "Ceiling $600. A binary-event stock trades at $40 with a plausible 25% adverse gap ($10.00/share). What quantity survives the gap within budget?",
              answer: 60,
              tolerance: 2,
              unit: "shares",
              explain:
                "600 ÷ 10.00 = 60 shares — the only size whose worst scheduled case obeys the ceiling.",
            },
            feedbackByAnswer: { numeric: "Budget ÷ gap unit risk: 600 ÷ 10.00 = 60." },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "mk-l3-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Diversifiable versus not",
            question: {
              id: "mk-l3-q3",
              type: "mcq",
              topic: "market-basics",
              prompt: "Which risk does adding more independent stocks reduce?",
              options: [
                "Systematic market risk",
                "Idiosyncratic (company-specific) risk",
                "Interest-rate risk",
                "The risk of a market-wide crash",
              ],
              answer: 1,
              explain:
                "Independent company events average out across holdings; market-wide forces hit all names together.",
            },
            feedbackByAnswer: {
              "0": "Systematic risk cannot be diversified away inside equities.",
              "2": "Rates are a market-wide driver — systematic.",
              "3": "Crashes are the definition of systematic risk.",
            },
          },
          {
            skill: "Binary events and stops",
            question: {
              id: "mk-l3-q4",
              type: "truefalse",
              topic: "stops",
              prompt:
                "A stop below a binary event's gap does not cap the loss; only pre-event sizing or avoidance does.",
              answer: true,
              explain:
                "The order fills where liquidity exists after the jump — sizing for the gap (or skipping) is the pre-committed control.",
            },
            feedbackByAnswer: {
              true: "Correct — this is rp-l6 applied to single-name calendars.",
              false: "Believing otherwise is exactly the gap-breach failure the course audits.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "mk-l3-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "Account $40,000 (1% = $400). You hold 500 shares of a $30 stock (a $15,000 position, 37.5% of the account) with a court verdict due in two days.",
          "Historical analogous verdict gaps: ±30%.",
        ],
        assessment: {
          items: [
            {
              skill: "Auditing a concentrated binary position",
              question: {
                id: "mk-l3-q5",
                type: "numeric",
                topic: "position-sizing",
                prompt:
                  "A 30% adverse gap = $9.00/share. What quantity keeps that gap within the $400 ceiling?",
                answer: 44,
                tolerance: 2,
                unit: "shares",
                explain:
                  "400 ÷ 9.00 = 44.4 → 44 shares (gap loss $396). The current 500 shares would lose $4,500 — over 11 ceilings.",
              },
              feedbackByAnswer: {
                numeric: "400 ÷ 9.00 = 44.4; round down to 44 whole shares.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "mk-l3-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "What is the largest single-name exposure you would be comfortable holding through its next binary event — and does its size fit your ceiling at the gap, not the stop?",
      ],
    },
    {
      kind: "summary",
      id: "mk-l3-b9",
      title: "Recap",
      points: [
        "Idiosyncratic risk shrinks with independent holdings; systematic risk does not.",
        "Binary events gap — size for the gap or avoid the print; stops cannot fill through it.",
        "Concentration and shared drivers multiply single-name risk; caps from Course 2 apply.",
        "Claim diligence and event calendars are single-name diligence, not chart work.",
      ],
      nextStep: "Next: Module 2 — indices: what they are, and how baskets change the risk picture.",
    },
  ],
};
