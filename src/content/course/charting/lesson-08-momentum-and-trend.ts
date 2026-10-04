import type { CourseLesson } from "../types";

export const lesson08MomentumAndTrend: CourseLesson = {
  id: "tc-l8",
  moduleId: "c3-m3",
  title: "Momentum & Trend Indicators",
  blurb: "RSI and MACD: what they measure, and why their 'signals' are descriptions.",
  objectives: [
    "Describe how RSI compares up-days to down-days",
    "Interpret overbought/oversold as stretch, not instruction",
    "Explain MACD as the gap between two averages",
    "Read a MACD cross as lagging summary, never as trigger",
  ],
  durationMinutes: 12,
  xp: 36,
  keyTakeaway:
    "Momentum indicators summarise how far and how fast price moved recently. 'Overbought' means stretched, not 'sell' — the tape decides, the oscillator only describes.",
  blocks: [
    {
      kind: "explain",
      id: "tc-l8-b1",
      explanation: {
        heading: "Speed and distance, compressed",
        whyItMatters:
          "RSI and MACD look like independent authorities on the same chart. They are two different summaries of the same closes — and both are downstream of tc-l7's lag arithmetic.",
        paragraphs: [
          "RSI answers: over the last N periods, how much did up-moves beat down-moves? It averages the gains on up-days and the losses on down-days, forms a ratio, and maps it to 0–100. Read loosely: near 70+ means recent rising has been persistent (stretched); near 30− means falling has been (stretched the other way). It measures persistence of movement, not quality of price.",
          "The classic misread is treating overbought as a sell signal. In a strong trend RSI can stay 'overbought' for weeks while price doubles — stretched is where winners live. What RSI actually flags is where movement has been one-sided enough that the next stretch of mean-reversion or consolidation becomes more probable. Probable, not scheduled.",
          "MACD subtracts a fast average from a slow average (the MACD line), then averages that line itself (the signal line). A 'cross' means: the gap between the two averages changed sign — momentum of the gap shifted. Because both inputs are averages, MACD carries their lag twice over. Its famous crosses arrive after turns, and in flat markets the gap oscillates around zero producing meaningless crosses — the whipsaw of tc-l7's table.",
          "Use them as documentation, not commanders: RSI can tell you a move is unusually one-sided (context for caution or for trend strength), and MACD can tell you the trend's slope is flattening (context for tightening plans). Both must be cross-checked against structure — tc-l2's swings and tc-l5's boundaries remain the claims with invalidation; oscillators merely annotate.",
        ],
        keyTerms: [
          {
            term: "RSI",
            definition:
              "0–100 summary of recent average gains versus average losses — persistence of movement.",
          },
          {
            term: "Overbought / oversold",
            definition:
              "Stretch in one direction — a description of recent movement, not an instruction.",
          },
          {
            term: "MACD cross",
            definition:
              "Sign change in the gap between two averages — a lagging summary of slope change.",
          },
        ],
        callouts: [
          {
            tone: "pitfall",
            title: "'Overbought' is not 'sell'",
            body: "Trends live above 70 as happily as corrections happen there. The label describes stretch; structure decides the trade.",
          },
        ],
      },
    },
    {
      kind: "example",
      id: "tc-l8-b2",
      example: {
        title: "One rally, three readings",
        setup:
          "A stock runs 100 → 135 in three weeks. RSI-14 prints 78. MACD line crosses below its signal line on day 14. Price pulls back to 130.",
        steps: [
          {
            label: "Read RSI",
            detail:
              "78 = the last two weeks were overwhelmingly up-days. Description: persistent buying, stretched.",
          },
          {
            label: "Read the MACD cross",
            detail:
              "The fast-average gap shrank as the pullback began — slope is flattening. The cross arrives on day 14, after price already turned.",
          },
          {
            label: "Read structure",
            detail:
              "Swing low at 128 (the prior higher low) is the claim's floor. A close below 128 falsifies the advance; above it, the pullback is a candidate entry.",
          },
          {
            label: "Assemble",
            detail:
              "RSI: stretched. MACD: momentum cooling. Structure: pullback into a valid higher low. The trade idea (buy the pullback with stop under 128) comes from structure; the oscillators only annotate its context.",
          },
        ],
        takeaway:
          "Oscillators supply adjectives; structure supplies the verb — claim, entry, invalidation.",
      },
    },
    {
      kind: "visual",
      id: "tc-l8-b3",
      title: "What the readings mean — and do not",
      visual: {
        type: "table",
        label: "Translation table",
        columns: ["Reading", "Means", "Does NOT mean"],
        rows: [
          [
            "RSI 78",
            "Recent movement has been overwhelmingly upward",
            "Sell now — price can stay stretched for weeks",
          ],
          [
            "RSI 25",
            "Recent movement has been overwhelmingly downward",
            "Buy now — falling knives keep falling",
          ],
          [
            "MACD cross down",
            "The gap between two averages shrank and flipped sign",
            "The top is in — crosses arrive after turns",
          ],
          [
            "MACD near zero, flat",
            "The averages agree — no directional slope",
            "Breakout is coming — it means nothing about the future",
          ],
        ],
        caption:
          "Left column: summary of the past. Right column: forecasts the summary never made.",
      },
    },
    {
      kind: "interactive",
      id: "tc-l8-b4",
      title: "Defuse the signal claims",
      takeaway:
        "Every defensible reading treats the oscillator as context and leaves the claim/entry/invalidation to structure; signal-only answers smuggle forecasts into summaries.",
      interaction: {
        type: "scenario-decision",
        prompt: "Three traders interpret the same readings. Which responses are rule-consistent?",
        situation: [
          "Strong uptrend: RSI 74, MACD just crossed down, price 2% below its peak, prior swing low 4% below current price.",
        ],
        choices: [
          {
            label: "Treat RSI and MACD as annotations; base entry and stop on the swing low",
            outcome:
              "RSI = stretched context; MACD = slope cooling; the entry/stop still reference the swing low 4% below.",
            best: true,
            feedback:
              "Correct — the readings modify caution and sizing; the claim, entry and falsification line come from structure.",
          },
          {
            label: "Short immediately — RSI above 70 is the sell signal",
            outcome: "Fighting an intact higher-low chain because an oscillator hit a zone.",
            best: false,
            feedback:
              "RSI zones describe stretch; in trends they persist. Without a structural trigger, this trade has no invalidation.",
          },
          {
            label: "Close the long because MACD crossed",
            outcome: "The cross lags — you exit on summary data after price already turned.",
            best: false,
            feedback:
              "MACD crosses arrive post-turn. If your exit rule is structural (swing low), the cross is commentary, not command.",
          },
          {
            label: "Ignore the readings entirely — price alone is enough",
            outcome:
              "The oscillator's legitimate role (context) is discarded along with its illegitimate one.",
            best: false,
            feedback:
              "Context about stretch and cooling slope legitimately informs sizing and caution — as annotation, never as trigger.",
          },
        ],
      },
    },
    {
      kind: "practice",
      id: "tc-l8-b5",
      title: "Guided practice",
      assessment: {
        intro: "Translate readings into claims that can be tested.",
        allowRetry: true,
        items: [
          {
            skill: "RSI's arithmetic source",
            question: {
              id: "tc-l8-q1",
              type: "mcq",
              topic: "indicators",
              prompt: "RSI is fundamentally computed from:",
              options: [
                "Order book imbalance",
                "Average recent gains versus average recent losses, mapped to 0–100",
                "Volume-weighted price change",
                "The distance to a moving average",
              ],
              answer: 1,
              explain:
                "Gain/loss averages over N periods — a persistence-of-movement summary of the same closes from tc-l7.",
            },
            feedbackByAnswer: {
              "0": "RSI never touches the book; it uses price changes only.",
              "2": "That describes other indicators (e.g. VWAP-style measures), not RSI.",
              "3": "Distance-to-average is a different family (e.g. Bollinger-style).",
            },
          },
          {
            skill: "Overbought as description",
            question: {
              id: "tc-l8-q2",
              type: "truefalse",
              topic: "indicators",
              prompt:
                "RSI above 70 means recent movement has been persistently one-sided — it does not, by itself, instruct a sale.",
              answer: true,
              explain:
                "Stretch is a fact about the past. Trends hold high RSI while they run; the instruction must come from structure.",
            },
            feedbackByAnswer: {
              true: "Correct — description, not command.",
              false:
                "Treating 70 as a sell rule fights trends and leaves the trade without structural invalidation.",
            },
          },
        ],
      },
    },
    {
      kind: "check",
      id: "tc-l8-b6",
      title: "Knowledge check",
      assessment: {
        items: [
          {
            skill: "MACD's composition",
            question: {
              id: "tc-l8-q3",
              type: "mcq",
              topic: "indicators",
              prompt: "A MACD cross tells you that:",
              options: [
                "Buyers have taken control of the order book",
                "The gap between a fast and a slow moving average changed sign — slope of the gap shifted",
                "Volume is expanding",
                "The trend has definitively reversed",
              ],
              answer: 1,
              explain:
                "MACD = fast average − slow average; a cross is that difference flipping sign. Two averaged inputs mean the signal lags twice.",
            },
            feedbackByAnswer: {
              "0": "MACD never observes the book.",
              "2": "Volume is not an input to MACD.",
              "3": "'Definitively' is a forecast the summary cannot make — crosses also fail in ranges.",
            },
          },
          {
            skill: "Cross-check with structure",
            question: {
              id: "tc-l8-q4",
              type: "truefalse",
              topic: "trends",
              prompt:
                "A MACD cross down inside an intact higher-high/higher-low sequence is not, by itself, a falsification of the uptrend.",
              answer: true,
              explain:
                "The trend's claim lives in swing lows. A lagging average cross is commentary; the chain remains intact until a swing low breaks.",
            },
            feedbackByAnswer: {
              true: "Correct — structure is the claim; the oscillator is annotation.",
              false: "Obeying the cross alone outsources your invalidation to a lagging statistic.",
            },
          },
        ],
      },
    },
    {
      kind: "scenario",
      id: "tc-l8-b7",
      title: "Application scenario",
      scenario: {
        situation: [
          "During a strong uptrend your rule allows longs only while swing lows rise. RSI hits 76; MACD crosses down; price is 1% off the high; the last two swing lows are 104.00 and 106.50.",
          "A friend insists both indicators say 'exit now'.",
        ],
        assessment: {
          items: [
            {
              skill: "Structure versus oscillator conflict",
              question: {
                id: "tc-l8-q5",
                type: "mcq",
                topic: "indicators",
                prompt: "What is the rule-consistent reading?",
                options: [
                  "Exit — two indicators outweigh one structure rule",
                  "Hold while price stays above the 106.50 swing low; RSI/MACD are annotations, and a close under 106.50 is the structural exit",
                  "Add to the position — trends never end",
                  "Exit only if RSI drops below 70",
                ],
                answer: 1,
                explain:
                  "The rule keys to the swing chain: falsification = close below 106.50. The stretched RSI and cooling MACD justify caution, not an undefined exit.",
              },
              feedbackByAnswer: {
                "0": "Vote-counting indicators does not create a falsifiable claim.",
                "2": "Adding into stretch with no new structural evidence abandons the sizing discipline.",
                "3": "That replaces a structural rule with an oscillator threshold — lagging and unanchored.",
              },
            },
          ],
        },
      },
    },
    {
      kind: "reflection",
      id: "tc-l8-b8",
      title: "Reflection",
      helper: "One or two sentences. Stays in your browser.",
      prompts: [
        "Have you ever taken an exit or entry purely because an oscillator crossed? What structural fact would have been the better trigger?",
      ],
    },
    {
      kind: "summary",
      id: "tc-l8-b9",
      title: "Recap",
      points: [
        "RSI summarises persistence of recent movement; overbought/oversold describe stretch, not instructions.",
        "MACD is the gap between two averages; its cross lags the turn it seems to call.",
        "Oscillators annotate context; structure supplies claim, entry and invalidation.",
        "Both indicators are downstream of tc-l7's arithmetic — no new information enters.",
      ],
      nextStep:
        "Next: the failure modes all indicators share — and the honest role they can still play.",
    },
  ],
};
