export type Question =
  | {
      id: string;
      type: "mcq";
      topic: string;
      prompt: string;
      options: string[];
      answer: number;
      explain: string;
    }
  | {
      id: string;
      type: "truefalse";
      topic: string;
      prompt: string;
      answer: boolean;
      explain: string;
    }
  | {
      id: string;
      type: "numeric";
      topic: string;
      prompt: string;
      answer: number;
      tolerance?: number;
      unit?: string;
      explain: string;
    };

export type Lesson = {
  id: string;
  title: string;
  blurb: string;
  xp: number;
  questions: Question[];
};

export type World = {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  lessons: Lesson[];
};

export const WORLDS: World[] = [
  {
    id: "w1",
    title: "Market Foundations",
    subtitle: "How markets actually work",
    accent: "teal",
    lessons: [
      {
        id: "w1l1",
        title: "What is a market?",
        blurb: "Buyers, sellers and the price in between.",
        xp: 20,
        questions: [
          {
            id: "w1l1q1",
            type: "mcq",
            topic: "market-basics",
            prompt: "A market price is best described as…",
            options: [
              "The value a company reports in its accounts",
              "The last price a buyer and seller agreed on",
              "A price set by the exchange each morning",
              "An average of analyst forecasts",
            ],
            answer: 1,
            explain:
              "Price is simply the most recent agreement between a buyer and a seller. It changes every time a new trade prints.",
          },
          {
            id: "w1l1q2",
            type: "truefalse",
            topic: "market-basics",
            prompt: "For every buyer of a share there must be a seller.",
            answer: true,
            explain: "Every transaction has two sides. Markets match buyers with sellers.",
          },
          {
            id: "w1l1q3",
            type: "mcq",
            topic: "liquidity",
            prompt: "A 'liquid' market usually means…",
            options: [
              "Prices only go up",
              "You can buy or sell quickly without moving the price much",
              "There is no risk of loss",
              "The asset pays a dividend",
            ],
            answer: 1,
            explain:
              "Liquidity is about how easily you can get in and out. Thin markets move a lot on small orders.",
          },
          {
            id: "w1l1q4",
            type: "mcq",
            topic: "participants",
            prompt: "Which participant provides continuous two-sided quotes?",
            options: ["A market maker", "A regulator", "A custodian", "An auditor"],
            answer: 0,
            explain: "Market makers quote both a bid and an ask, earning the spread for providing liquidity.",
          },
          {
            id: "w1l1q5",
            type: "truefalse",
            topic: "market-basics",
            prompt: "Volatility means the size and speed of price movement, not the direction.",
            answer: true,
            explain: "Volatility is direction-neutral: it measures how much price swings.",
          },
        ],
      },
      {
        id: "w1l2",
        title: "Bid, ask & spread",
        blurb: "The hidden cost of every trade.",
        xp: 20,
        questions: [
          {
            id: "w1l2q1",
            type: "mcq",
            topic: "spread",
            prompt: "You want to buy immediately. Which price do you pay?",
            options: ["The bid", "The ask", "The midpoint", "Yesterday's close"],
            answer: 1,
            explain: "Buyers who want to trade now lift the ask; sellers who want out now hit the bid.",
          },
          {
            id: "w1l2q2",
            type: "numeric",
            topic: "spread",
            prompt: "Bid is 20.10 and ask is 20.16. What is the spread in cents?",
            answer: 6,
            tolerance: 0.01,
            unit: "cents",
            explain: "20.16 − 20.10 = 0.06, or 6 cents. You pay that gap the moment you enter and exit.",
          },
          {
            id: "w1l2q3",
            type: "truefalse",
            topic: "spread",
            prompt: "Wider spreads generally mean lower liquidity.",
            answer: true,
            explain: "When few participants are quoting, the gap between bid and ask widens.",
          },
          {
            id: "w1l2q4",
            type: "mcq",
            topic: "costs",
            prompt: "Which cost is easy to forget when trading frequently?",
            options: [
              "The spread paid on every round trip",
              "The colour of the chart",
              "The stock's ticker length",
              "The exchange's founding year",
            ],
            answer: 0,
            explain: "Small spreads compound. Fifty round trips at 6 cents is a real drag on results.",
          },
          {
            id: "w1l2q5",
            type: "mcq",
            topic: "slippage",
            prompt: "Slippage is…",
            options: [
              "A fee charged by regulators",
              "The difference between expected and executed price",
              "A type of chart pattern",
              "Interest paid on cash",
            ],
            answer: 1,
            explain: "Fast markets and thin books mean your fill can land away from the price you saw.",
          },
        ],
      },
      {
        id: "w1l3",
        title: "Order types",
        blurb: "Market, limit, stop — and when each hurts.",
        xp: 25,
        questions: [
          {
            id: "w1l3q1",
            type: "mcq",
            topic: "orders",
            prompt: "A limit order guarantees…",
            options: [
              "That you get filled",
              "Your price, but not a fill",
              "A profit",
              "Zero spread",
            ],
            answer: 1,
            explain: "Limit orders control price. They may never execute if the market moves away.",
          },
          {
            id: "w1l3q2",
            type: "mcq",
            topic: "orders",
            prompt: "A market order guarantees…",
            options: [
              "Your price",
              "A fill, but not a price",
              "Both price and fill",
              "Neither",
            ],
            answer: 1,
            explain: "Market orders prioritise speed. In thin markets that can mean a poor fill.",
          },
          {
            id: "w1l3q3",
            type: "truefalse",
            topic: "orders",
            prompt: "A stop-loss order becomes active only when price reaches your stop level.",
            answer: true,
            explain: "Until triggered it sits dormant; once hit, it usually becomes a market order.",
          },
          {
            id: "w1l3q4",
            type: "mcq",
            topic: "orders",
            prompt: "You are long and want to lock in gains automatically. You would use a…",
            options: ["Take-profit order", "Second buy order", "Deposit", "Watchlist alert only"],
            answer: 0,
            explain: "A take-profit exits your position at a chosen better price without you watching.",
          },
          {
            id: "w1l3q5",
            type: "truefalse",
            topic: "orders",
            prompt: "During a gap, a stop-loss can fill worse than the stop price.",
            answer: true,
            explain: "Stops are not guarantees. Gaps and fast moves can skip your level entirely.",
          },
        ],
      },
      {
        id: "w1l4",
        title: "Reading a chart",
        blurb: "Time, price and what a candle says.",
        xp: 25,
        questions: [
          {
            id: "w1l4q1",
            type: "mcq",
            topic: "charts",
            prompt: "On a candlestick, the thin lines above and below the body are the…",
            options: ["Wicks (shadows)", "Volume bars", "Moving averages", "Order book"],
            answer: 0,
            explain: "Wicks show the extremes traded during the period; the body shows open to close.",
          },
          {
            id: "w1l4q2",
            type: "mcq",
            topic: "charts",
            prompt: "A daily candle's body represents…",
            options: [
              "High to low",
              "Open to close",
              "Yesterday's close to today's high",
              "Average price",
            ],
            answer: 1,
            explain: "Body = open to close. Wicks = the full high-low range.",
          },
          {
            id: "w1l4q3",
            type: "truefalse",
            topic: "charts",
            prompt: "A longer timeframe chart generally shows less noise than a 1-minute chart.",
            answer: true,
            explain: "Higher timeframes smooth out short-term churn, at the cost of detail.",
          },
          {
            id: "w1l4q4",
            type: "mcq",
            topic: "volume",
            prompt: "Rising volume on a breakout usually suggests…",
            options: [
              "Fewer participants agree",
              "More participation behind the move",
              "The exchange is closing",
              "Guaranteed continuation",
            ],
            answer: 1,
            explain:
              "Volume shows participation, not certainty. Breakouts on thin volume are easier to fade.",
          },
          {
            id: "w1l4q5",
            type: "numeric",
            topic: "charts",
            prompt: "A candle opens at 50 and closes at 47. How many points did it fall?",
            answer: 3,
            tolerance: 0.01,
            unit: "points",
            explain: "50 − 47 = 3 points. The body would be drawn as a down candle.",
          },
        ],
      },
    ],
  },
  {
    id: "w2",
    title: "Risk & Discipline",
    subtitle: "Protect the account first",
    accent: "amber",
    lessons: [
      {
        id: "w2l1",
        title: "Position sizing",
        blurb: "Decide the loss before the trade.",
        xp: 30,
        questions: [
          {
            id: "w2l1q1",
            type: "numeric",
            topic: "position-sizing",
            prompt: "Account $10,000. You risk 1% per trade. How many dollars is that?",
            answer: 100,
            tolerance: 0.5,
            unit: "$",
            explain: "1% of $10,000 = $100. That is your maximum planned loss on the idea.",
          },
          {
            id: "w2l1q2",
            type: "numeric",
            topic: "position-sizing",
            prompt: "Risk $100. Entry $50, stop $48. How many shares can you buy?",
            answer: 50,
            tolerance: 0.5,
            unit: "shares",
            explain: "Risk per share = $2. $100 ÷ $2 = 50 shares.",
          },
          {
            id: "w2l1q3",
            type: "truefalse",
            topic: "position-sizing",
            prompt: "A wider stop means you should buy fewer shares to keep risk constant.",
            answer: true,
            explain: "Size and stop distance move in opposite directions when dollar risk is fixed.",
          },
          {
            id: "w2l1q4",
            type: "mcq",
            topic: "position-sizing",
            prompt: "Sizing by 'how confident I feel' tends to fail because…",
            options: [
              "Confidence is not a measure of risk",
              "It is illegal",
              "Brokers block it",
              "It always loses money",
            ],
            answer: 0,
            explain: "Feelings are not probabilities. A rule keeps the worst day survivable.",
          },
          {
            id: "w2l1q5",
            type: "mcq",
            topic: "position-sizing",
            prompt: "Risking 25% of an account per trade mainly increases the chance of…",
            options: ["Faster learning", "Ruin from a short losing streak", "Lower spreads", "Better fills"],
            answer: 1,
            explain:
              "Four losses in a row would wipe the account. Small risk keeps you in the game long enough to learn.",
          },
        ],
      },
      {
        id: "w2l2",
        title: "Stop losses",
        blurb: "Where the idea is proven wrong.",
        xp: 25,
        questions: [
          {
            id: "w2l2q1",
            type: "mcq",
            topic: "stops",
            prompt: "A stop should be placed where…",
            options: [
              "Your idea is invalidated",
              "You feel uncomfortable",
              "Round numbers look nice",
              "Exactly 1% below entry, always",
            ],
            answer: 0,
            explain: "Structure decides the stop; the stop then decides your size.",
          },
          {
            id: "w2l2q2",
            type: "truefalse",
            topic: "stops",
            prompt: "Moving a stop further away after entry increases your planned risk.",
            answer: true,
            explain: "Widening a stop mid-trade breaks the plan and raises the loss you accepted.",
          },
          {
            id: "w2l2q3",
            type: "mcq",
            topic: "stops",
            prompt: "A trailing stop is designed to…",
            options: [
              "Follow price to protect open gains",
              "Add to a losing position",
              "Remove all risk",
              "Increase leverage",
            ],
            answer: 0,
            explain: "It ratchets in your favour only, locking in more of an existing move.",
          },
          {
            id: "w2l2q4",
            type: "truefalse",
            topic: "stops",
            prompt: "Being stopped out means you made a mistake.",
            answer: false,
            explain: "A good process still produces losing trades. Losses are a cost of doing business.",
          },
          {
            id: "w2l2q5",
            type: "mcq",
            topic: "stops",
            prompt: "Placing a stop exactly at an obvious round number can…",
            options: [
              "Cluster with other stops and get swept",
              "Guarantee a better fill",
              "Reduce the spread",
              "Prevent slippage",
            ],
            answer: 0,
            explain: "Crowded levels attract volatility. Giving structure a little room can help.",
          },
        ],
      },
      {
        id: "w2l3",
        title: "Risk/reward & expectancy",
        blurb: "Why win rate alone means nothing.",
        xp: 30,
        questions: [
          {
            id: "w2l3q1",
            type: "numeric",
            topic: "risk-reward",
            prompt: "Risk $100 to make $300. What is the reward-to-risk ratio (x)?",
            answer: 3,
            tolerance: 0.01,
            unit: "R",
            explain: "300 ÷ 100 = 3R. One winner covers three losers of the same size.",
          },
          {
            id: "w2l3q2",
            type: "truefalse",
            topic: "risk-reward",
            prompt: "A 40% win rate can still be viable at 3R average reward.",
            answer: true,
            explain: "0.4 × 3R − 0.6 × 1R = +0.6R per trade on average, before costs.",
          },
          {
            id: "w2l3q3",
            type: "mcq",
            topic: "expectancy",
            prompt: "Expectancy measures…",
            options: [
              "Average result per trade over many trades",
              "The best trade you ever had",
              "Your broker's fee",
              "How confident you feel",
            ],
            answer: 0,
            explain: "It combines win rate and average win/loss into one number per trade.",
          },
          {
            id: "w2l3q4",
            type: "mcq",
            topic: "risk-reward",
            prompt: "Cutting winners early and holding losers usually…",
            options: [
              "Destroys expectancy",
              "Improves expectancy",
              "Has no effect",
              "Reduces spread",
            ],
            answer: 0,
            explain: "It shrinks the average win and grows the average loss — the opposite of the goal.",
          },
          {
            id: "w2l3q5",
            type: "numeric",
            topic: "expectancy",
            prompt: "Win rate 50%, average win 2R, average loss 1R. Expectancy in R?",
            answer: 0.5,
            tolerance: 0.05,
            unit: "R",
            explain: "0.5 × 2 − 0.5 × 1 = 0.5R per trade before costs.",
          },
        ],
      },
      {
        id: "w2l4",
        title: "Trading psychology",
        blurb: "The account you manage is partly your own head.",
        xp: 25,
        questions: [
          {
            id: "w2l4q1",
            type: "mcq",
            topic: "psychology",
            prompt: "Revenge trading usually follows…",
            options: ["A loss you did not accept", "A holiday", "A dividend", "A limit order"],
            answer: 0,
            explain: "The urge to win it back immediately is where rules matter most.",
          },
          {
            id: "w2l4q2",
            type: "truefalse",
            topic: "psychology",
            prompt: "FOMO often causes entries far from a sensible stop level.",
            answer: true,
            explain: "Chasing means worse entries, wider stops and larger risk than planned.",
          },
          {
            id: "w2l4q3",
            type: "mcq",
            topic: "psychology",
            prompt: "A daily loss limit is designed to…",
            options: [
              "Stop a bad day becoming a bad month",
              "Guarantee profit",
              "Increase position size",
              "Remove volatility",
            ],
            answer: 0,
            explain: "It is a circuit breaker for your decision-making, not just your balance.",
          },
          {
            id: "w2l4q4",
            type: "truefalse",
            topic: "psychology",
            prompt: "Journaling helps because it separates process quality from outcome.",
            answer: true,
            explain: "You can take a great trade and lose. Only the process is repeatable.",
          },
          {
            id: "w2l4q5",
            type: "mcq",
            topic: "psychology",
            prompt: "Overtrading is most often driven by…",
            options: ["Boredom and the need for action", "Low spreads", "Long timeframes", "Small size"],
            answer: 0,
            explain: "No setup is a position too. Patience is a skill you can practise.",
          },
        ],
      },
    ],
  },
  {
    id: "w3",
    title: "Chart Skills",
    subtitle: "Structure, trends and context",
    accent: "violet",
    lessons: [
      {
        id: "w3l1",
        title: "Support & resistance",
        blurb: "Where decisions cluster.",
        xp: 25,
        questions: [
          {
            id: "w3l1q1",
            type: "mcq",
            topic: "levels",
            prompt: "Support is a zone where…",
            options: [
              "Buying interest has previously slowed a decline",
              "Price can never fall below",
              "Volume is always zero",
              "The spread disappears",
            ],
            answer: 0,
            explain: "Levels are zones of interest, not walls. They can and do break.",
          },
          {
            id: "w3l1q2",
            type: "truefalse",
            topic: "levels",
            prompt: "Broken resistance can later act as support.",
            answer: true,
            explain: "This flip happens because participants reassess the level after a break.",
          },
          {
            id: "w3l1q3",
            type: "mcq",
            topic: "levels",
            prompt: "The more times a level is tested without breaking, the more it tends to…",
            options: ["Attract attention and orders", "Become irrelevant", "Reduce volatility to zero", "Guarantee a bounce"],
            answer: 0,
            explain: "Attention concentrates orders there — which is also why breaks can be violent.",
          },
          {
            id: "w3l1q4",
            type: "truefalse",
            topic: "levels",
            prompt: "Drawing levels as thin exact lines is more reliable than using zones.",
            answer: false,
            explain: "Price rarely respects an exact tick. Zones tolerate normal noise.",
          },
          {
            id: "w3l1q5",
            type: "mcq",
            topic: "levels",
            prompt: "A false breakout is when price…",
            options: [
              "Breaks a level then quickly returns inside",
              "Never reaches the level",
              "Gaps at the open",
              "Trades sideways for weeks",
            ],
            answer: 0,
            explain: "Failed breaks often trap late entries and fuel a move the other way.",
          },
        ],
      },
      {
        id: "w3l2",
        title: "Trends & structure",
        blurb: "Higher highs, lower lows.",
        xp: 25,
        questions: [
          {
            id: "w3l2q1",
            type: "mcq",
            topic: "trends",
            prompt: "An uptrend is commonly defined by…",
            options: [
              "Higher highs and higher lows",
              "Lower highs and lower lows",
              "Equal highs only",
              "Rising volume only",
            ],
            answer: 0,
            explain: "Structure, not opinion: each pullback holds above the previous low.",
          },
          {
            id: "w3l2q2",
            type: "truefalse",
            topic: "trends",
            prompt: "A market can be in an uptrend on the weekly and a downtrend on the hourly.",
            answer: true,
            explain: "Timeframes disagree constantly. Decide which one your plan trades.",
          },
          {
            id: "w3l2q3",
            type: "mcq",
            topic: "trends",
            prompt: "A range-bound market is best described as…",
            options: [
              "Price oscillating between support and resistance",
              "Price trending strongly",
              "No trading activity",
              "A closed exchange",
            ],
            answer: 0,
            explain: "Ranges reward fading extremes; trends punish it. Context first.",
          },
          {
            id: "w3l2q4",
            type: "mcq",
            topic: "trends",
            prompt: "A break of the most recent higher low in an uptrend signals…",
            options: [
              "Possible trend weakening",
              "Guaranteed reversal",
              "A dividend",
              "Nothing at all",
            ],
            answer: 0,
            explain: "It is evidence, not proof. Structure shifts happen gradually.",
          },
          {
            id: "w3l2q5",
            type: "truefalse",
            topic: "trends",
            prompt: "Trading against the dominant trend generally requires tighter risk control.",
            answer: true,
            explain: "Counter-trend attempts have lower odds of follow-through, so define the loss clearly.",
          },
        ],
      },
      {
        id: "w3l3",
        title: "Candlestick signals",
        blurb: "What a single bar can hint at.",
        xp: 25,
        questions: [
          {
            id: "w3l3q1",
            type: "mcq",
            topic: "candles",
            prompt: "A long lower wick after a decline suggests…",
            options: [
              "Buyers stepped in intraday",
              "Sellers took control",
              "Volume was zero",
              "The market closed early",
            ],
            answer: 0,
            explain: "Price was rejected lower and closed back up — one clue, not a signal on its own.",
          },
          {
            id: "w3l3q2",
            type: "truefalse",
            topic: "candles",
            prompt: "A doji shows indecision because open and close are very close.",
            answer: true,
            explain: "Neither side won the period. Context around it matters far more.",
          },
          {
            id: "w3l3q3",
            type: "mcq",
            topic: "candles",
            prompt: "A candlestick pattern is most useful when it appears…",
            options: [
              "At a meaningful level or after a trend move",
              "Anywhere at random",
              "Only on Mondays",
              "Only with high spreads",
            ],
            answer: 0,
            explain: "Location gives a pattern meaning. In the middle of nowhere it is noise.",
          },
          {
            id: "w3l3q4",
            type: "truefalse",
            topic: "candles",
            prompt: "An engulfing candle is one whose body fully covers the previous body.",
            answer: true,
            explain: "It shows a shift in who controlled the period — again, context decides value.",
          },
          {
            id: "w3l3q5",
            type: "mcq",
            topic: "candles",
            prompt: "Relying on a single candle to predict the next move is…",
            options: [
              "Unreliable without confluence",
              "A guaranteed edge",
              "Required by exchanges",
              "The same as position sizing",
            ],
            answer: 0,
            explain: "Patterns are probabilities layered on structure, not predictions.",
          },
        ],
      },
      {
        id: "w3l4",
        title: "Moving averages",
        blurb: "Smoothing the noise.",
        xp: 30,
        questions: [
          {
            id: "w3l4q1",
            type: "numeric",
            topic: "indicators",
            prompt: "Closes: 10, 12, 14, 16, 18. What is the 5-period simple moving average?",
            answer: 14,
            tolerance: 0.01,
            explain: "(10+12+14+16+18) ÷ 5 = 14.",
          },
          {
            id: "w3l4q2",
            type: "mcq",
            topic: "indicators",
            prompt: "Moving averages are called lagging indicators because they…",
            options: [
              "Are built from past prices",
              "Update once a year",
              "Predict the future",
              "Ignore price entirely",
            ],
            answer: 0,
            explain: "They describe what already happened; they cannot lead price.",
          },
          {
            id: "w3l4q3",
            type: "truefalse",
            topic: "indicators",
            prompt: "A shorter moving average reacts faster but produces more false signals.",
            answer: true,
            explain: "Speed and reliability trade off against each other.",
          },
          {
            id: "w3l4q4",
            type: "mcq",
            topic: "indicators",
            prompt: "In a choppy range, moving-average crossovers typically…",
            options: ["Whipsaw", "Work best", "Stop updating", "Remove risk"],
            answer: 0,
            explain: "Trend tools need trends. Match the tool to the market condition.",
          },
          {
            id: "w3l4q5",
            type: "mcq",
            topic: "indicators",
            prompt: "Adding six indicators that all measure momentum mostly gives you…",
            options: [
              "The same information repeated",
              "Six independent edges",
              "Lower spreads",
              "Guaranteed accuracy",
            ],
            answer: 0,
            explain: "Confluence means different information agreeing, not one signal duplicated.",
          },
        ],
      },
    ],
  },
];

export const ALL_LESSONS: Lesson[] = WORLDS.flatMap((w) => w.lessons);
export const LESSON_ORDER: string[] = ALL_LESSONS.map((l) => l.id);

export function getLesson(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function worldOfLesson(id: string): World | undefined {
  return WORLDS.find((w) => w.lessons.some((l) => l.id === id));
}

export const TOPIC_LABELS: Record<string, string> = {
  "market-basics": "Market basics",
  liquidity: "Liquidity",
  participants: "Participants",
  spread: "Bid/ask spread",
  costs: "Trading costs",
  slippage: "Slippage",
  orders: "Order types",
  charts: "Chart reading",
  volume: "Volume",
  "position-sizing": "Position sizing",
  stops: "Stop losses",
  "risk-reward": "Risk/reward",
  expectancy: "Expectancy",
  psychology: "Psychology",
  levels: "Support & resistance",
  trends: "Trends",
  candles: "Candlesticks",
  indicators: "Indicators",
};

export const ACHIEVEMENTS: { code: string; title: string; description: string; icon: string }[] = [
  { code: "first_lesson", title: "First Steps", description: "Complete your first lesson", icon: "footprints" },
  { code: "perfect_lesson", title: "Flawless", description: "Score 100% on a lesson", icon: "target" },
  { code: "streak_3", title: "Warming Up", description: "Reach a 3-day streak", icon: "flame" },
  { code: "streak_7", title: "Consistent", description: "Reach a 7-day streak", icon: "calendar-check" },
  { code: "world_1", title: "Foundations Cleared", description: "Finish every lesson in Market Foundations", icon: "layers" },
  { code: "level_5", title: "Level 5", description: "Reach level 5", icon: "trending-up" },
  { code: "first_trade", title: "Paper Debut", description: "Open your first paper trade", icon: "line-chart" },
  { code: "journal_3", title: "Reflective", description: "Write 3 journal entries", icon: "notebook-pen" },
];

export const DISCLAIMER =
  "TradeLingo is an educational platform and does not provide financial or investment advice.";
