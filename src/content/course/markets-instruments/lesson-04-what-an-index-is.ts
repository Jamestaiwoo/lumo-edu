import type { CourseLesson } from "../types";

export const lesson04WhatAnIndexIs: CourseLesson = {
  id: "mk-l4",
  moduleId: "c4-m2",
  title: "What an Index Is",
  blurb: "A benchmark is arithmetic on a basket — not a tradable thing itself.",
  objectives: [
    "Describe an index as a computed measure of a basket",
    "Distinguish weighting schemes and their effects",
    "Explain why index inclusion/exclusion reprices constituents",
    "Recognise that you cannot buy an index directly — only funds tracking it",
  ],
  durationMinutes: 11,
  xp: 33,
  keyTakeaway:
    "An index is a number calculated from a basket. You cannot trade the number — you trade the funds that replicate it, which is where spreads, fees and tracking enter.",
  blocks: [
    {
      kind: "explain",
      id: "mk-l4-b1",
      explanation: {
        heading: "The benchmark is arithmetic",
        whyItMatters:
          "'The market went up 1%' is a statement about a calculation. Knowing the calculation explains what your index fund actually holds, why inclusion moves single stocks, and what tracking error means.",
        paragraphs: [
          "An index measures a basket's value according to a rule: price-weighted (each share contributes by price — a $500 stock moves a price-weighted index ten times a $50 one, regardless of size), market-cap-weighted (bigger companies dominate — a cap-weighted index's largest constituents can be a third of it), or equal-weighted (each name contributes the same, forcing constant rebalancing). The rule decides which stocks drag the number.",
          "The index itself trades nowhere. Exchanges list funds (ETFs, futures) that track it — the number is the yardstick, the fund is the instrument. When someone says 'I bought the S&P 500', they bought a fund holding 500 companies in the index's proportions.",
          "Inclusion events show the basket's power over its parts: when a stock is added to a major index, every fund replicating that index must buy it — demand arrives from tracking rules, not from new opinions about the company. Exclusions force the mirror sell. The reprice on announcement is the market pricing that forced flow.",
          "Composition also explains risk: a cap-weighted tech-heavy index held through a sector crash is concentrated, not diversified, because the weighting rule concentrated it. Reading the top holdings of your index is reading your actual exposure.",
        ],
        keyTerms: [
          {
            term: "Weighting scheme",
            definition:
              "The rule assigning each constituent's influence: by price, market cap, or equally.",
          },
          {
            term: "Inclusion effect",
            definition:
              "Forced buying/selling by tracking funds when a name enters or leaves the basket.",
          },
          {
            term: "Tracking",
            definition:
              "How closely a fund follows its index — the gap (tracking error) is what fees and frictions cost you.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "mk-l4-b2",
      example: {
        title: "Three stocks, three index rules",
        setup:
          "Basket: Alpha 500 shares @ $100 (cap $50M), Beta 1,000 @ $60 (cap $60M), Gamma 2,000 @ $20 (cap $40M). Alpha rallies 10%.",
        steps: [
          {
            label: "Equal-weight",
            detail: "Each name = ⅓ of the index. Alpha's +10% adds 3.33% to the index.",
          },
          {
            label: "Cap-weight",
            detail:
              "Betas dominate at 40% (60/150); Alpha = 33%. Alpha's +10% adds ~3.3% — similar here because caps are close.",
          },
          {
            label: "Price-weight",
            detail:
              "Weights ∝ price: Alpha = 100/180 = 55.6%. Alpha's +10% adds ~5.6% — the priciest share rules the index.",
          },
          {
            label: "Read the exposure",
            detail:
              "Same company, same move, three index impacts: the rule decides whose opinion about Alpha you inherited by 'buying the market'.",
          },
        ],
        takeaway:
          "The weighting scheme is the index's real stance — read it before you buy the fund.",
      },
    },
    {
      kind: "visual",
      id: "mk-l4-b3",
      title: "Weighting rules side by side",
      visual: {
        type: "table",
        label: "Who dominates?",
        columns: ["Scheme", "Dominant constituent", "Consequence"],
        rows: [
          [
            "Price-weighted",
            "The highest-priced share",
            "Price, not size, sets influence — quirks included",
          ],
          [
            "Cap-weighted",
            "The largest companies",
            "Mega-caps dominate; concentration hides inside 'diversified'",
          ],
          [
            "Equal-weighted",
            "No one",
            "Small names amplified; constant rebalancing sells winners, buys losers",
          ],
        ],
        caption: "Three different answers to 'what is the market doing' from the same 500 stocks.",
      },
    },
    {
      kind: "interactive",
      id: "mk-l4-b4",
      title: "Basket reasoning",
      takeaway:
        "Every defensible answer traces exposure back to the weighting rule or the tracking fund — the number itself never trades.",
      interaction: {
        type: "scenario-decision",
        prompt: "Three index-related claims reach your desk. Which responses hold up?",
        situation: [
          "Your 'total market' ETF is 30% one company; a mid-cap announces index inclusion; a friend says they 'own the index' directly.",
        ],
        choices: [
          {
            label:
              "Audit top holdings for real exposure; price the inclusion flow; name the tracking fund as the actual holding",
            outcome:
              "Each claim is answered with the mechanism: weight rules, forced flow, and fund-versus-number.",
            best: true,
            feedback:
              "Correct — exposure comes from weights, inclusion from forced tracking demand, ownership from the fund — not the benchmark.",
          },
          {
            label: "Treat 'diversified index' as automatically diversified",
            outcome: "30% in one name is concentration wearing the word 'index'.",
            best: false,
            feedback:
              "Cap-weighting concentrates by design; the label 'broad index' says nothing about actual weight distribution.",
          },
          {
            label: "Ignore the inclusion — fundamentals unchanged",
            outcome:
              "Fundamentals of the company may be unchanged, but forced fund flows reprice it regardless.",
            best: false,
            feedback:
              "Inclusion moves price via mandated demand from tracking funds — a mechanical driver, not an opinion about the business.",
          },
          {
            label: "The index number is an instrument you can buy at the exchange",
            outcome:
              "The calculation has no exchange listing; only funds and futures referencing it trade.",
            best: false,
            feedback:
              "A benchmark is arithmetic — your broker sells the vehicle, not the yardstick.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "mk-l4-b5",
      title: "Guided practice",
      assessment: {
        intro: "Work the weighting arithmetic.",
        allowRetry: true,
        items: [
          {
            skill: "Cap-weighted contribution",
            question: {
              id: "mk-l4-q1",
              type: "numeric",
              topic: "market-basics",
              prompt:
                "In a cap-weighted index, one company holds a 12% weight and rallies 8%. By how much does the index move, in points of percent?",
              answer: 0.96,
              tolerance: 0.03,
              unit: "%",
              explain:
                "0.12 × 8 = 0.96% — the index gains about one point of percent from its largest mover.",
            },
            feedbackByAnswer: {
              numeric: "Weight × move: 0.12 × 8 = 0.96.",
            },
          },
          {
            skill: "Price-weighted influence",
            question: {
              id: "mk-l4-q2",
              type: "numeric",
              topic: "market-basics",
              prompt:
                "A price-weighted index holds shares priced at $200, $50 and $30 (one share each). What weight does the $200 share carry?",
              answer: 71.4,
              tolerance: 0.3,
              unit: "%",
              explain:
                "200 ÷ 280 = 71.4% — the priciest share rules the index regardless of company size.",
            },
            feedbackByAnswer: {
              numeric: "200 ÷ (200 + 50 + 30) = 200 ÷ 280 = 71.4%.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "mk-l4-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "What an index is",
            question: {
              id: "mk-l4-q3",
              type: "truefalse",
              topic: "market-basics",
              prompt:
                "An index is a computed measure of a basket; it cannot itself be bought — funds and futures referencing it are the tradable instruments.",
              answer: true,
              explain:
                "The number is the yardstick; ETFs and futures are the vehicles with spreads, fees and tracking behaviour of their own.",
            },
            feedbackByAnswer: {
              true: "Correct — the distinction that makes fees and tracking meaningful.",
              false:
                "A calculation cannot clear at a broker; something must replicate it for you to hold exposure.",
            },
          },
          {
            skill: "Inclusion mechanics",
            question: {
              id: "mk-l4-q4",
              type: "mcq",
              topic: "market-basics",
              prompt: "Why does a stock often rise when added to a major index?",
              options: [
                "The exchange lowers its fees",
                "Tracking funds must buy it to replicate the new basket — forced demand, not new opinions",
                "Its financial statements improve",
                "Index membership guarantees higher earnings",
              ],
              answer: 1,
              explain:
                "Every fund tracking the index rebalances into the name on inclusion — mechanical demand repricing the stock.",
            },
            feedbackByAnswer: {
              "0": "Listing fees are irrelevant to price.",
              "2": "No financials change on the announcement day.",
              "3": "Membership changes none of the business's numbers.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "mk-l4-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You buy an 'S&P 500 tracker' ETF. Its top ten holdings account for 35% of the fund; your thesis is 'broad diversification'.",
          "One of those ten is due for earnings next week.",
        ],
        assessment: {
          items: [
            {
              skill: "Exposure honesty",
              question: {
                id: "mk-l4-q5",
                type: "mcq",
                topic: "market-basics",
                prompt: "What does the fund's structure imply for your risk framing?",
                options: [
                  "Nothing — index funds have no single-name risk",
                  "35% of your exposure rides on ten names, so their events (like next week's earnings) are your events — but diluted by 500 holdings, not eliminated",
                  "Only the smallest holdings matter for diversification",
                  "Earnings do not affect index funds",
                ],
                answer: 1,
                explain:
                  "Cap-weighting concentrates real exposure in the leaders; their binary events hit your fund — softly relative to owning them outright, but not zero.",
              },
              feedbackByAnswer: {
                "0": "Index funds hold the names; the events travel with the shares.",
                "2": "Small weights contribute little risk; the top weights dominate.",
                "3": "The fund's holdings report earnings; the NAV responds.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "mk-l4-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "If you hold (or plan to hold) an index fund, what weighting scheme does it track — and what does that say about where your real exposure sits?",
      ],
    },
    {
      kind: "summary",
      id: "mk-l4-b9",
      title: "Recap",
      points: [
        "An index is a rule-calculated measure of a basket; the number does not trade.",
        "Weighting schemes decide whose move you inherit: price, cap, or equal.",
        "Inclusion/exclusion reprices constituents through forced tracking flows.",
        "'Diversified index' must be checked against actual weight concentration.",
      ],
      nextStep: "Next: how ETFs replicate that basket — creation, redemption, and tracking error.",
    },
  ],
};
