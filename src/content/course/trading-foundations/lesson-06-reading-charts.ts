import type { CourseLesson } from "../types";

export const lesson06ReadingCharts: CourseLesson = {
  id: "tf-l6",
  moduleId: "c1-m2",
  title: "Reading Price Charts",
  blurb: "A chart is a summary of completed trades — not a forecast.",
  objectives: [
    "Decode a candle into its four prices",
    "Explain why the same asset can look bullish and bearish at once",
    "Describe what a chart cannot tell you",
    "Read context — highs, lows, ranges — instead of memorising patterns",
  ],
  durationMinutes: 11,
  xp: 34,
  keyTakeaway:
    "A chart records what traders already agreed to pay. It is evidence about supply and demand, and evidence is not a promise.",
  blocks: [
    {
      kind: "explain",
      id: "tf-l6-b1",
      explanation: {
        heading: "Four numbers per period, arranged so a human can see them",
        whyItMatters:
          "Charts are how traders compress a stream of transactions into something readable. If you know what each mark means, you can read any timeframe, any asset and any chart style — and you will stop seeing meaning in wicks that contain none.",
        paragraphs: [
          "Every period on a chart has four prices. The open is the first trade of the period, the close is the last, the high and the low are the extremes reached in between. A candlestick draws those four numbers as a shape: the thick body spans open to close, and the thin wicks (shadows) reach up to the high and down to the low. A green or hollow body means the period closed above where it opened; a red or filled body means it closed below.",
          "Read that way, a wick is a story about rejection. A long lower wick means price traded down there and buyers pushed it back up before the period ended. A long upper wick means sellers appeared above. Neither is a prediction: they tell you that some level attracted a response, which is useful information for deciding where a trade would be wrong.",
          "Timeframes are a zoom control, and zooming changes the story. The same asset can be in a clear uptrend on a weekly chart and a downtrend on an hourly chart, because each is describing a different horizon. Neither is lying. This is why a plan must state which timeframe it is trading — otherwise your stop belongs to one timeframe and your target to another.",
          "What charts cannot tell you is just as important. A chart is built from last prices, so it does not show you how much size is resting at each level, how wide the spread currently is, whether the volume was one large order or a thousand small ones, or what happens between the closes you are drawing. When you mark a level on a chart you are drawing a place where traders previously responded — not a wall that will hold.",
          "Practical reading is therefore about context, not patterns. Where are the recent swings? Are the highs and lows rising, falling or flat? Is the market trending or ranging? Where would a position be clearly wrong? Those four questions can be answered on any chart, in any market, without a single indicator — and they are the questions that make the rest of this course possible.",
        ],
        keyTerms: [
          {
            term: "OHLC",
            definition: "Open, high, low, close — the four prices summarised by one bar or candle.",
          },
          {
            term: "Body",
            definition:
              "The span between the open and the close. Its colour shows direction for that period.",
          },
          {
            term: "Wick (shadow)",
            definition:
              "The thin line reaching the period's high and low — where price went and was rejected.",
          },
          {
            term: "Timeframe",
            definition:
              "The length of each period on the chart: one minute, one hour, one day, one week.",
          },
          {
            term: "Swing high / low",
            definition:
              "A local peak or trough that price later moved away from — the raw material of structure.",
          },
          {
            term: "Range",
            definition:
              "A market moving between roughly the same high and low, without a directional trend.",
          },
          {
            term: "Support / resistance",
            definition:
              "Zones where price previously stopped or reversed, used as reference levels rather than certainties.",
          },
        ],
        callouts: [
          {
            tone: "pitfall",
            title: "Pattern names are not explanations",
            body: "Calling a shape a 'head and shoulders' or a 'bull flag' does not tell you why price would move. The explanation is always about who was willing to trade there and what happened next.",
          },
          {
            tone: "info",
            title: "Charts ignore costs and depth",
            body: "A beautiful setup on a chart with a wide spread and an empty order book is a different trade from the same setup in a deep market. Always check what the chart leaves out.",
          },
        ],
      },
    },
    {
      kind: "visual",
      id: "tf-l6-b2",
      title: "Context before patterns",
      visual: {
        type: "candles",
        label: "NOVA · simulated daily candles",
        zones: [
          { price: 20.4, label: "Previous rejection 20.40–20.48", tone: "resistance" },
          { price: 19.6, label: "Responded zone 19.55–19.70", tone: "support" },
        ],
        candles: [
          { open: 20.05, high: 20.4, low: 19.95, close: 20.32 },
          { open: 20.32, high: 20.38, low: 20.05, close: 20.1 },
          { open: 20.1, high: 20.22, low: 19.7, close: 19.8 },
          { open: 19.8, high: 19.95, low: 19.55, close: 19.68 },
          { open: 19.68, high: 19.95, low: 19.62, close: 19.9 },
          { open: 19.9, high: 20.15, low: 19.82, close: 20.1 },
          { open: 20.1, high: 20.45, low: 20.05, close: 20.4 },
          { open: 20.4, high: 20.48, low: 20.18, close: 20.24 },
          { open: 20.24, high: 20.35, low: 20.02, close: 20.12 },
          { open: 20.12, high: 20.52, low: 20.08, close: 20.46 },
        ],
        caption:
          "After selling off into support, the lows rise from the fourth candle through the eighth, and after one pullback the final candle closed above the zone that previously rejected price. That is evidence about supply — not a promise about tomorrow.",
      },
    },
    {
      kind: "example",
      id: "tf-l6-b3",
      example: {
        title: "Reading one candle out loud",
        setup:
          "Take a single daily candle for NOVA. It opened at 19.80, traded as high as 19.95, as low as 19.55, and closed at 19.68. One shape, four numbers — here is how to say them in supply-and-demand language.",
        steps: [
          {
            label: "The body: where the period ended vs where it started",
            detail:
              "Open 19.80, close 19.68. Sellers were in control by the end of the session — the period finished 0.12 below where it began.",
          },
          {
            label: "The high: 19.95",
            detail:
              "Somebody was willing to buy up there. By the close, price was 0.27 lower, so those buyers were either stopped out or are now sitting on a loss.",
          },
          {
            label: "The low: 19.55",
            detail:
              "Price reached 19.55 and was pushed back up before the close. Buyers stepped in at that level, which is why it is worth watching again.",
          },
          {
            label: "The wick compared with the body",
            detail:
              "The lower wick runs 0.13 below the close — slightly longer than the 0.12 body. The rejection of lower prices was at least as meaningful as the decline itself.",
          },
          {
            label: "What the candle cannot tell you",
            detail:
              "How many shares traded, how wide the spread was, whether the low was one large seller or a thin book, or what happens tomorrow. For that you need the book and a plan.",
          },
        ],
        takeaway:
          "If you can only name the pattern, you have not read the candle. Say who moved the price and where someone stopped it.",
      },
    },
    {
      kind: "interactive",
      id: "tf-l6-b4",
      title: "Read the chart",
      interaction: {
        type: "chart-read",
        prompt: "Answer using only what the chart shows. Resist the urge to predict.",
        label: "NOVA · simulated daily candles",
        zones: [
          { price: 20.4, label: "Previous rejection 20.40–20.48", tone: "resistance" },
          { price: 19.6, label: "Responded zone 19.55–19.70", tone: "support" },
        ],
        candles: [
          { open: 20.05, high: 20.4, low: 19.95, close: 20.32 },
          { open: 20.32, high: 20.38, low: 20.05, close: 20.1 },
          { open: 20.1, high: 20.22, low: 19.7, close: 19.8 },
          { open: 19.8, high: 19.95, low: 19.55, close: 19.68 },
          { open: 19.68, high: 19.95, low: 19.62, close: 19.9 },
          { open: 19.9, high: 20.15, low: 19.82, close: 20.1 },
          { open: 20.1, high: 20.45, low: 20.05, close: 20.4 },
          { open: 20.4, high: 20.48, low: 20.18, close: 20.24 },
          { open: 20.24, high: 20.35, low: 20.02, close: 20.12 },
          { open: 20.12, high: 20.52, low: 20.08, close: 20.46 },
        ],
        tasks: [
          {
            prompt:
              "From the fourth candle to the eighth, each low is higher than the one before. What does that tell you?",
            options: [
              "Buyers have been willing to step in at progressively higher prices",
              "Sellers are firmly in control",
              "Volume must have been falling",
              "The price cannot fall below the support zone again",
            ],
            answer: 0,
            explain:
              "Each pullback was bought sooner than the last. That is descriptive evidence about demand. It says nothing about volume, and it does not make support permanent.",
          },
          {
            prompt:
              "The final candle closed above the zone that rejected price earlier. What can the chart alone establish?",
            options: [
              "That sellers who were present at that level did not stop the move this time",
              "That price will continue to rise",
              "That the company is now worth more",
              "Nothing whatsoever",
            ],
            answer: 0,
            explain:
              "You can only conclude what happened: supply at that level was absorbed. Whether it continues is unknown, which is why the plan needs a level where the idea is wrong.",
          },
          {
            prompt: "Which of these is NOT shown on this chart?",
            options: [
              "How much size was resting at each price",
              "The highest price reached in each period",
              "The closing price of each period",
              "The direction of each period",
            ],
            answer: 0,
            explain:
              "Depth lives in the order book. Charts are built from trades that already happened, so they compress a lot of information into four numbers per period.",
          },
        ],
      },
      takeaway:
        "Charts are excellent at describing what traders did. They are silent about what traders intend to do next.",
    },
    {
      kind: "practice",
      id: "tf-l6-b5",
      title: "Guided practice",
      assessment: {
        allowRetry: true,
        items: [
          {
            skill: "Anatomy of a candle",
            question: {
              id: "tf-l6-q1",
              type: "mcq",
              topic: "charts",
              prompt:
                "A daily candle has a small body near the top of its range and a long lower wick. What happened that day?",
              options: [
                "Price traded well below the open and was pushed back up before the close",
                "Price rose steadily all day and closed at the high",
                "There were no trades below the open",
                "The company announced bad news at the close",
              ],
              answer: 0,
              explain:
                "A long lower wick means price reached down and was rejected. Buyers transacted at those lower prices, which is information about where supply met demand that day.",
            },
            hint: "The wick reaches the day's low. Someone bought there.",
            feedbackByAnswer: {
              "1": "A steady rise closes at the high with little or no lower wick. Here price traded low and came back.",
              "2": "The lower wick exists precisely because trades occurred below the open.",
              "3": "The candle records price behaviour, not the cause. News is a separate question the shape cannot answer.",
            },
          },
          {
            skill: "What charts cannot show",
            question: {
              id: "tf-l6-q2",
              type: "truefalse",
              topic: "charts",
              prompt: "A chart shows how many shares are resting at each price level.",
              answer: false,
              explain:
                "Resting size lives in the order book. A chart shows trades that already happened, so a marked level is a place where traders responded before — not a guaranteed wall.",
            },
            feedbackByAnswer: {
              "0": "Charts are built from completed trades. The intentions of traders waiting at a level are not visible on the chart at all.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tf-l6-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "Timeframes",
            question: {
              id: "tf-l6-q3",
              type: "mcq",
              topic: "charts",
              prompt:
                "An asset is trending up on the weekly chart and down on the hourly chart. What does that tell you?",
              options: [
                "One of the charts must be wrong",
                "Each timeframe describes a different horizon; you must state which one your plan trades",
                "You should average the two and trade sideways",
                "Weekly charts always override hourly ones",
              ],
              answer: 1,
              explain:
                "Both are true descriptions of different horizons. Deciding your timeframe first is what makes a stop, a target and a holding period consistent with each other.",
            },
            feedbackByAnswer: {
              "0": "Neither chart is wrong. They summarise different periods of activity.",
              "2": "There is no meaningful 'average' of two timeframes — you would be trading a horizon your plan does not describe.",
              "3": "Longer timeframes are usually more significant, but that is a preference, not a rule. The point is consistency.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tf-l6-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "A friend sends a screenshot: a one-minute chart with a 'perfect setup' marked at the top of a spike, on a stock quoted 4.00 bid / 4.12 ask.",
          "The caption says the pattern cannot fail.",
        ],
        assessment: {
          items: [
            {
              skill: "Questioning a setup",
              question: {
                id: "tf-l6-q4",
                type: "mcq",
                topic: "charts",
                prompt: "What is the most useful response?",
                options: [
                  "Copy the entry — short timeframes with tight spreads are the safest setups",
                  "Ask where the idea is wrong, and check the spread and depth, because the chart leaves both out",
                  "Conclude that nothing can be known, so charts are useless",
                  "Double the size, because the pattern cannot fail",
                ],
                answer: 1,
                explain:
                  "The chart describes what happened. Your decision still needs the missing pieces: the invalidation level, the cost of a round trip in a market with a 3% spread, and whether your size even fits.",
              },
              feedbackByAnswer: {
                "0": "Short timeframes multiply the number of round trips, and each one pays this spread. A 3% spread is close to unworkable on a one-minute chart.",
                "2": "Charts are useful. They are simply incomplete, and knowing which parts are missing is the skill.",
                "3": "Nothing 'cannot fail'. A larger position only makes the failure larger.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tf-l6-b8",
      title: "Reflection",
      helper: "Short is fine. Stays in your browser.",
      prompts: [
        "Which timeframe could you realistically watch and act on? What does that imply about the trades you should be planning?",
      ],
    },
    {
      kind: "summary",
      id: "tf-l6-b9",
      title: "Recap",
      points: [
        "Each candle carries four prices: open, high, low, close. Wicks show where price went and was rejected.",
        "Timeframes can disagree without either being wrong — pick one and make your plan consistent with it.",
        "Charts describe completed trades, so they say nothing about resting depth, spreads or intent.",
        "Read context — swing highs, lows and ranges — instead of collecting pattern names.",
      ],
      nextStep: "Next: the part that decides survival — risk before reward.",
    },
  ],
};
