import type { CourseLesson } from "../types";

export const lesson01OwningABusiness: CourseLesson = {
  id: "mk-l1",
  moduleId: "c4-m1",
  title: "Owning a Business",
  blurb: "A share is a claim on a company — the instrument behind the ticker.",
  objectives: [
    "Explain what a share legally represents",
    "Connect share price to the business's assets and earning power",
    "Distinguish owner claims (equity) from lender claims (debt)",
    "Recognise when 'stock talk' quietly assumes the company survives",
  ],
  durationMinutes: 11,
  xp: 33,
  keyTakeaway:
    "A share is a fractional claim on a surviving business's residual value. Everything a stock trader bets on — narrative, momentum, earnings — rides on top of that claim.",
  blocks: [
    {
      kind: "explain",
      id: "mk-l1-b1",
      explanation: {
        heading: "What the certificate actually says",
        whyItMatters:
          "You cannot reason about stock-specific risk (mk-l3) or earnings reactions (mk-l2) until the instrument itself is clear: partial ownership, seniority ladder, and the fact that the company can outlive its shareholders' patience.",
        paragraphs: [
          "A share is a unit of equity ownership. Hold one of a million, and you own one-millionth of the company's residual claim: after every lender, supplier and tax authority is paid, whatever remains belongs to shareholders — in bankruptcy, nothing, because equity sits last in the queue.",
          "That seniority is the core asymmetry of the instrument. Debt holders have contracts: coupons and maturities enforce payment or force reorganisation. Shareholders have upside and voting rights, but no promise — if the business thrives, the residual compounds; if it fails, the equity goes to zero while the bonds may recover cents on the dollar.",
          "Price, in this frame, is the market's continuously revised estimate of the residual's present worth — driven by earnings power, growth, rates and sentiment, with sentiment often dominating short-term. A stock can triple while nothing physical changed, if the market repriced what it believes the residual is worth.",
          "For a trader, the claim matters even for short holding periods: every long position assumes the claim will not be impaired during your window (an earnings collapse, fraud, dilution), and every short position assumes it can be impaired faster than you can cover. Instruments like ETFs (Module 2) dilute this company-specific claim deliberately — that is their point.",
        ],
        keyTerms: [
          {
            term: "Equity",
            definition:
              "The residual ownership claim after all creditors are satisfied — last in line, unlimited upside.",
          },
          {
            term: "Residual value",
            definition:
              "What remains for shareholders if the company were wound up today; the theoretical floor beneath sentiment.",
          },
          {
            term: "Seniority",
            definition:
              "The payment order in distress: debt before equity. It prices both instruments' risk.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "mk-l1-b2",
      example: {
        title: "One company, two claims",
        setup:
          "Company X: 100 million shares at $40 (market cap $4B), plus $2B of bonds. Net cash and assets worth $1B; annual operating profit $300M.",
        steps: [
          {
            label: "Read the market's estimate",
            detail:
              "Equity priced at $4B for a business earning $300M — the market pays ~13× earnings plus a growth premium.",
          },
          {
            label: "Read the seniority",
            detail:
              "If the company is wound up at asset value, bondholders are paid first ($2B of claims against $1B of assets here — equity recovers nothing until lenders are made whole).",
          },
          {
            label: "Read what moves the stock",
            detail:
              "A 10% profit upgrade raises the earnings base for all shareholders; a fraud disclosure attacks the residual directly — the price can gap through any technical level.",
          },
          {
            label: "Connect to trading",
            detail:
              "Your stop (Course 2) protects against price reaching invalidation — but a claim impairment gaps past stops. Event risk on single names is real; size accordingly (rp-l6).",
          },
        ],
        takeaway:
          "Price estimates the residual; structure explains the risk; gaps are what happen when the estimate is revised violently.",
      },
    },
    {
      kind: "visual",
      id: "mk-l1-b3",
      title: "The liquidation ladder",
      visual: {
        type: "table",
        label: "Who gets paid first",
        columns: ["Order", "Claim", "If assets < claims"],
        rows: [
          ["1", "Secured lenders / tax authorities", "Paid first up to collateral value"],
          ["2", "Unsecured lenders & suppliers", "Paid only from what remains"],
          ["3", "Shareholders (equity)", "Paid last — often nothing in distress"],
        ],
        caption:
          "Seniority flips the risk: bonds have smaller upside and firmer claims; equity has unlimited upside and the last seat.",
      },
    },
    {
      kind: "interactive",
      id: "mk-l1-b4",
      title: "Think like the claim",
      takeaway:
        "Each judgement starts from what shareholders are owed — residual, seniority, survival — before any chart is opened.",
      interaction: {
        type: "scenario-decision",
        prompt:
          "Three statements arrive about the same stock. Which responses start from the instrument's actual claim?",
        situation: [
          "Company Y trades at $12, half its price from two years ago, with $500M of debt maturing in 18 months.",
        ],
        choices: [
          {
            label: "Ask whether the residual survives the refinancing, then chart only if it does",
            outcome:
              "Claim first: if debt cannot be refinanced, equity is the junior claim that absorbs the restructuring.",
            best: true,
            feedback:
              "Correct — the chart describes past prices of a claim whose existence is the first question. Claim, then chart.",
          },
          {
            label: "Buy because the chart shows a double bottom",
            outcome:
              "The pattern prices past sentiment; the refinancing prices the company. One of these can erase the other overnight.",
            best: false,
            feedback:
              "A technically perfect setup on a claim that may be restructured is a claim-timing bet wearing a chart costume.",
          },
          {
            label: "Short immediately — 50% declines always continue",
            outcome:
              "Equity rallies on survival news violently; short squeezes on refinancing success are classic single-name risk.",
            best: false,
            feedback:
              "Decline momentum ignores that equity is an option on recovery: one session of survival news can reprice the residual violently.",
          },
          {
            label: "Ignore the debt — only price action matters",
            outcome:
              "Maturity dates are scheduled claims; price action discovers them, it does not excuse them.",
            best: false,
            feedback:
              "Seniority and maturities are facts about the instrument — precisely the kind of checkable fact this course exists to teach.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "mk-l1-b5",
      title: "Guided practice",
      assessment: {
        intro: "Work the claim arithmetic.",
        allowRetry: true,
        items: [
          {
            skill: "Market capitalisation",
            question: {
              id: "mk-l1-q1",
              type: "numeric",
              topic: "market-basics",
              prompt:
                "A company has 250 million shares outstanding and trades at $18. What is its market capitalisation?",
              answer: 4500,
              tolerance: 10,
              unit: "USD millions",
              explain:
                "250 × 18 = 4,500 — $4.5 billion is the market's price for the entire equity claim.",
            },
            feedbackByAnswer: {
              numeric: "Shares × price: 250 × 18 = 4,500 (in $ millions).",
            },
          },
          {
            skill: "Seniority in distress",
            question: {
              id: "mk-l1-q2",
              type: "mcq",
              topic: "market-basics",
              prompt:
                "Assets of $300M, secured debt of $400M. What do shareholders expect in liquidation?",
              options: [
                "$300M — assets are split equally",
                "Nothing — lenders' secured claim exceeds the assets, so equity is wiped out",
                "$100M — the surplus of claims over assets",
                "The government guarantees the difference",
              ],
              answer: 1,
              explain:
                "Secured lenders claim $400M against $300M of assets; equity, paid last, receives zero.",
            },
            feedbackByAnswer: {
              "0": "Splitting equally would ignore the contract that secured the debt.",
              "2": "That surplus runs the wrong direction — it is what lenders are short, not what equity receives.",
              "3": "Depositor-style guarantees do not exist for shares.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "mk-l1-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "What a share is",
            question: {
              id: "mk-l1-q3",
              type: "truefalse",
              topic: "market-basics",
              prompt:
                "A share represents a fractional residual ownership claim on the company, junior to its creditors.",
              answer: true,
              explain:
                "Equity = residual after creditors; junior by construction. That junior seat is both the upside and the risk.",
            },
            feedbackByAnswer: {
              true: "Correct — the definition every equity behaviour descends from.",
              false:
                "A share is not a debt instrument, not a deposit, and not a guarantee of return.",
            },
          },
          {
            skill: "What moves the residual",
            question: {
              id: "mk-l1-q4",
              type: "mcq",
              topic: "market-basics",
              prompt:
                "A stock gaps 20% overnight on an earnings beat. In claim language, what happened?",
              options: [
                "The company's debt was renegotiated",
                "The market repriced its estimate of the residual's worth — earnings power changed the estimate",
                "The exchange adjusted the ticker",
                "Shareholders were paid their dividend early",
              ],
              answer: 1,
              explain:
                "Earnings change the earning-power input to the residual estimate; the gap is the market's repricing speed, not a structural change.",
            },
            feedbackByAnswer: {
              "0": "No debt event is implied by an earnings beat.",
              "2": "Ticker adjustments are mechanical and do not gap price.",
              "3": "Dividends are paid on declared dates and reduce price by the amount on ex-date — not a 20% gap engine.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "mk-l1-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You consider a long in a $9 stock with $1.2B debt due in nine months and cash of $180M.",
          "The chart shows a fresh breakout above a six-month range.",
        ],
        assessment: {
          items: [
            {
              skill: "Claim-first diligence",
              question: {
                id: "mk-l1-q5",
                type: "mcq",
                topic: "market-basics",
                prompt: "Which sequence is consistent with this course's discipline?",
                options: [
                  "Buy the breakout — structure precedes fundamentals",
                  "Check the refinancing path first (claim survival); if plausible, size the trade with the event risk in the plan; if not, skip",
                  "Short the bonds — debt always beats equity in crises",
                  "Wait for the RSI to confirm",
                ],
                answer: 1,
                explain:
                  "Claim survival gates the trade; the chart and sizing follow. The scheduled maturity is exactly the kind of fact that gaps through stops.",
              },
              feedbackByAnswer: {
                "0": "Structure-first skips the claim question that can invalidate everything overnight.",
                "2": "Bond price action on this name is a different instrument with different questions.",
                "3": "An oscillator cannot price a maturity date.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "mk-l1-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Name one stock you follow. In one sentence, describe what its shareholders would own if the company stopped trading tomorrow.",
      ],
    },
    {
      kind: "summary",
      id: "mk-l1-b9",
      title: "Recap",
      points: [
        "A share is a fractional residual claim, junior to every creditor.",
        "Price is the market's estimate of that residual; earnings and sentiment move the estimate.",
        "Seniority explains the asymmetry: bonds contract, equity absorbs.",
        "Claim survival is the first diligence step on any single name — before the chart.",
      ],
      nextStep:
        "Next: the scheduled events that reprice the residual — earnings, dividends and splits.",
    },
  ],
};
