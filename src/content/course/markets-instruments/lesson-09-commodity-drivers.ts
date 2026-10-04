import type { CourseLesson } from "../types";

export const lesson09CommodityDrivers: CourseLesson = {
  id: "mk-l9",
  moduleId: "c4-m3",
  title: "Commodity Drivers",
  blurb: "Weather for grains, cycles for metals, geopolitics for oil — each family its own engine.",
  objectives: [
    "Group commodities into energy, metals and agriculture families",
    "Name the dominant driver(s) for each family",
    "Explain the USD link common to all commodity pricing",
    "Tag a commodity trade's primary driver before sizing it",
  ],
  durationMinutes: 11,
  xp: 33,
  keyTakeaway:
    "Commodities are not one asset class in driver terms: energy answers geopolitics and cold snaps, agriculture answers weather and plantings, metals answer industrial cycles — plus one shared dollar effect.",
  blocks: [
    {
      kind: "explain",
      id: "mk-l9-b1",
      explanation: {
        heading: "Three families, three engines, one currency",
        whyItMatters:
          "Driver tags (rp-l7) start here: a 'commodities' position is actually an energy, metals or agricultural bet with a dollar overlay — knowing which decides what news means what.",
        paragraphs: [
          "Energy (crude, natural gas, gasoline): dominated by geopolitics, OPEC+ supply decisions, spare capacity, seasonal heating/cooling demand. Binary headline risk is extreme — supply disruptions gap prices; a war premium can appear and vanish in sessions.",
          "Agriculture (grains, oilseeds, softs): weather is the perennial driver — planting-season rains, drought indices, hurricanes — plus plantings intentions and inventories. These markets make the largest percentage moves of the family because food supply is inelastic within a season: one failed harvest cannot be re-created.",
          "Metals: industrial metals (copper, aluminium) track manufacturing and construction cycles — China's demand cycle especially — while precious metals (gold, silver) track real interest rates, the dollar and crisis hedging more than industry. Gold's classic engine: lower real rates and a weaker dollar support prices; the opposite presses.",
          "The shared overlay: commodities are priced in dollars worldwide. Dollar up → the same barrels cost more for foreign buyers → demand estimate falls → commodity prices tend to fall, and vice versa. This is a tendency with noisy exceptions, but it is why the dollar belongs on every commodity trade's driver tag — often as a correlated position alongside your equity/book exposures.",
        ],
        keyTerms: [
          {
            term: "Driver tag",
            definition:
              "The primary force behind a commodity thesis: geopolitics, weather, industrial cycle, real rates, or dollar.",
          },
          {
            term: "Inelastic supply (seasonal)",
            definition:
              "Supply cannot respond within a season — why agricultural shocks overshoot.",
          },
          {
            term: "Real rates",
            definition:
              "Interest rate minus inflation — the classic gold driver: falling real rates support gold.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "mk-l9-b2",
      example: {
        title: "Tagging three trades",
        setup:
          "Three candidate positions arrive the same morning: long crude, long wheat, long gold.",
        steps: [
          {
            label: "Crude",
            detail:
              "Primary driver: geopolitics/OPEC supply. Tag: 'energy supply shock'. Binary headline risk — size for gap (rp-l6), mind the curve (mk-l8).",
          },
          {
            label: "Wheat",
            detail:
              "Primary driver: weather in growing regions. Tag: 'ag weather'. Watch forecasts and inventory reports — scheduled repricing events.",
          },
          {
            label: "Gold",
            detail:
              "Primary driver: real rates & dollar. Tag: 'monetary'. Check the rate calendar and DXY before entry — not crop reports.",
          },
          {
            label: "Apply the caps",
            detail:
              "All three share the 'dollar' overlay: a strong-dollar regime moves them together — count that shared driver in rp-l7's cap rather than treating three tickers as three independent bets.",
          },
        ],
        takeaway:
          "Tag first: the news that matters differs by family, and the dollar links them all.",
      },
    },
    {
      kind: "visual",
      id: "mk-l9-b3",
      title: "Driver map by family",
      visual: {
        type: "table",
        label: "What moves what",
        columns: ["Family", "Primary drivers", "Headline risk", "Ignore…"],
        rows: [
          ["Energy", "Geopolitics, OPEC+, seasons", "Extreme — supply gaps", "Earnings calendars"],
          [
            "Agriculture",
            "Weather, plantings, inventories",
            "High — report days & storms",
            "P/E ratios",
          ],
          [
            "Industrial metals",
            "Manufacturing cycles, China demand",
            "Moderate — data days",
            "Crop forecasts",
          ],
          [
            "Precious metals",
            "Real rates, dollar, crises",
            "Moderate — macro prints",
            "Weather in farm country",
          ],
        ],
        caption:
          "Wrong-family news is noise: reading crop reports to trade copper wastes attention the trade cannot spare.",
      },
    },
    {
      kind: "interactive",
      id: "mk-l9-b4",
      title: "Match the news to the metal",
      takeaway:
        "Every correct pairing starts from the family tag — untagged trades respond to headlines the driver does not care about.",
      interaction: {
        type: "scenario-decision",
        prompt: "Four headlines land at once. Which responses sort them correctly?",
        situation: [
          "You hold long copper and long gold; a drought strikes a grain belt; an OPEC meeting stalls.",
        ],
        choices: [
          {
            label:
              "Copper ← manufacturing data · gold ← real rates · grains ← drought · crude ← OPEC — then recheck the dollar overlay",
            outcome:
              "Each headline is routed to its engine; the shared dollar factor is counted once.",
            best: true,
            feedback:
              "Correct — family tags make the sorting mechanical, and the overlay check prevents double-counting or missing correlated risk.",
          },
          {
            label: "All four are bullish commodities news — add to both positions",
            outcome:
              "Half the headlines do not touch your drivers; sizing grows blind to correlation.",
            best: false,
            feedback:
              "Aggregating to 'commodities' erases the driver tags that rp-l7's cap requires.",
          },
          {
            label: "Drought is gold-negative because farming is bad for growth",
            outcome:
              "Agricultural weather does not drive gold's monetary engine — wrong family entirely.",
            best: false,
            feedback:
              "Gold listens to rates and the dollar; crop failures do not feature in that regression.",
          },
          {
            label: "Ignore headlines; commodities only follow charts",
            outcome:
              "These families are headline-driven by construction — charts record the repricing, not the cause.",
            best: false,
            feedback:
              "Structure times entries; the driver explains what is being priced. Skipping the cause misreads every gap.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "mk-l9-b5",
      title: "Guided practice",
      assessment: {
        intro: "Tag the driver before the trade.",
        allowRetry: true,
        items: [
          {
            skill: "Family → driver routing",
            question: {
              id: "mk-l9-q1",
              type: "mcq",
              topic: "market-basics",
              prompt:
                "Real interest rates fall and the dollar weakens. Which commodity family does this most directly affect?",
              options: [
                "Precious metals — falling real rates and a soft dollar support gold",
                "Agriculture — weather follows rates",
                "Energy — OPEC sets rates",
                "None — commodities ignore macro",
              ],
              answer: 0,
              explain:
                "Gold's monetary engine is real rates plus the dollar; hard-asset demand rises when holding cash yields less in real terms.",
            },
            feedbackByAnswer: {
              "1": "Weather, not rates, is the agricultural engine.",
              "2": "OPEC controls quotas, not policy rates.",
              "3": "Commodities are among the most macro-sensitive markets there are.",
            },
          },
          {
            skill: "Dollar overlay",
            question: {
              id: "mk-l9-q2",
              type: "truefalse",
              topic: "market-basics",
              prompt:
                "Because commodities are priced globally in dollars, a broad dollar rally tends to press commodity prices even when each family's own driver is unchanged.",
              answer: true,
              explain:
                "A stronger dollar makes the same barrel costlier for non-USD buyers, trimming demand — a shared headwind across families.",
            },
            feedbackByAnswer: {
              true: "Correct — the dollar is the one driver every commodity shares.",
              false:
                "This is the standard negative dollar/commodity relationship — noisy, but structurally real.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "mk-l9-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Why agriculture overshoots",
            question: {
              id: "mk-l9-q3",
              type: "mcq",
              topic: "market-basics",
              prompt: "Why do agricultural markets produce the family's largest percentage moves?",
              options: [
                "Farmers trade more than refiners",
                "Supply is inelastic within a season — a failed harvest cannot be re-created on demand",
                "Grain contracts are the largest by notional",
                "Weather forecasts are illegal",
              ],
              answer: 1,
              explain:
                "When supply cannot respond inside the season, price must do all the clearing work — hence violent repricing.",
            },
            feedbackByAnswer: {
              "0": "Participation is not the mechanism; supply response is.",
              "2": "Notional size does not create percentage volatility.",
              "3": "Forecasts are public and pivotal — the opposite of illegal.",
            },
          },
          {
            skill: "Correlated driver counting",
            question: {
              id: "mk-l9-q4",
              type: "mcq",
              topic: "position-sizing",
              prompt:
                "You hold long crude, long copper and long wheat, all sized independently. A dollar rally hits all three. What was the sizing error?",
              options: [
                "None — three different commodities are three independent bets",
                "The shared dollar driver means correlation was understated; one cap should have covered the cluster",
                "The positions should have been smaller in contracts, not group-capped",
                "Commodities are not affected by the dollar",
              ],
              answer: 1,
              explain:
                "Different families share the dollar factor — rp-l7's cap counts correlated driver clusters, not just tickers.",
            },
            feedbackByAnswer: {
              "0": "Three tickers, one shared driver — the correlation was hidden in plain sight.",
              "2": "Contract arithmetic was fine; the driver-cluster cap was missing.",
              "3": "The dollar is the shared commodity overlay — this is its textbook witness.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "mk-l9-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "You plan a rolling long in an agricultural contract: front $240/tonne, deferred next quarter $249.60 (+4%).",
          "Your forecast says spot rises 3% over the quarter and you roll once.",
        ],
        assessment: {
          items: [
            {
              skill: "Driver vs structure netting",
              question: {
                id: "mk-l9-q5",
                type: "numeric",
                topic: "costs",
                prompt:
                  "Roll cost is 4%; spot is forecast +3% over the same quarter. What is the approximate net result in percent (negative if a loss)?",
                answer: -1,
                tolerance: 0.25,
                unit: "%",
                explain:
                  "−4% roll + 3% spot ≈ −1%. The correct driver read does not rescue a trade whose structure costs more than the forecast gains.",
              },
              feedbackByAnswer: {
                numeric:
                  "Spot contribution +3%, curve contribution −4% → net ≈ −1%; the structure, not the driver, decides this one.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "mk-l9-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Name one commodity you follow. Write its family, its single dominant driver, and the news you would ignore as noise.",
      ],
    },
    {
      kind: "summary",
      id: "mk-l9-b9",
      title: "Recap",
      points: [
        "Energy ← geopolitics/supply; agriculture ← weather; industrial metals ← cycles; precious metals ← real rates.",
        "The dollar is the one overlay every family shares — count it once in correlated risk.",
        "Seasonal inelastic supply is why agricultural shocks overshoot the family.",
        "Tag the driver, then check the structure: a correct driver cannot beat a roll bill larger than the forecast.",
      ],
      nextStep: "Next module: currencies — pairs, pips, and the market that never closes.",
    },
  ],
};
