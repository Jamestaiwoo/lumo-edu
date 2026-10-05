# Tasks

## 1. Validation scaffolding (before any new content)

- [x] 1.1 Parameterise the course-content-quality gates over the full registry: extend `course.test.ts` (schema/arc/assessment/metadata loops already iterate `COURSE_LESSONS`) so they hold for any number of courses; verify with Course 1 only — suite green, no behaviour change
- [x] 1.2 Add curriculum-track tests: consecutive lesson order across the whole track, course-boundary connections (prev course's last lesson unlocks next course's first), acyclicity, and "fresh learner unlocks exactly one lesson"; verify green against current spine (Course 1)
- [x] 1.3 Extend `content-consistency.test.ts` invariants (candles, books, spreads, markers) to run over every registered course; verify green on Course 1

## 2. Course batches (author in spine order; each batch = content + registry entry + topic labels + achievement, tests/build green before the next)

- [x] 2.1 Course 2 — Risk & Position Management (3 modules / 9 lessons: risk per trade, stops & invalidation, portfolio risk & drawdown); verify parameterised gates + track tests + numeric consistency (risk arithmetic)
- [x] 2.2 Course 3 — Charting & Technical Analysis (3 / 9: candles & structure, trends/ranges/levels, indicators & limits); verify gates incl. candle/level consistency
- [x] 2.3 Course 4 — Markets & Instruments (4 / 12: stocks, indices & ETFs, commodities, forex); verify gates incl. per-instrument numeric facts (tick values, pip values, contract sizes)
- [x] 2.4 Course 5 — Market Structure & Microstructure (3 / 8: auctions/books/liquidity, execution & costs, who moves markets); verify gates incl. order-book walks
- [x] 2.5 Course 6 — Company & Macro Analysis (3 / 8: reading a company, macro drivers, events & calendars); verify gates
- [ ] 2.6 Course 7 — Crypto Foundations (4 / 12: Bitcoin, Ethereum & tokens, on-chain & DeFi, security & scams); verify gates incl. on-chain example arithmetic
- [ ] 2.7 Course 8 — Crypto Speculation (2 / 5: memecoins & narratives, volatility & crypto risk); verify gates
- [ ] 2.8 Course 9 — Derivatives Foundations (3 / 9: what derivatives are, futures, perpetuals & leverage); verify gates incl. leverage/liquidation arithmetic
- [ ] 2.9 Course 10 — Options (3 / 9: payoffs, the Greeks, strategies & risk); verify gates incl. payoff/Greeks arithmetic
- [ ] 2.10 Course 11 — Trading Psychology (2 / 6: biases, discipline & process); verify gates
- [ ] 2.11 Course 12 — Strategy & Edge (3 / 8: what edge is, building a strategy, hypotheses & journals); verify gates incl. expectancy arithmetic
- [ ] 2.12 Course 13 — Backtesting & Validation (3 / 8: backtest mechanics, overfitting & bias, walk-forward & paper); verify gates
- [ ] 2.13 Course 14 — Quantitative Trading (3 / 8: data & signals, simple systematic rules, automation & risks); verify gates
- [ ] 2.14 Course 15 — Sentiment & Prediction Markets (3 / 8: news, narratives & crowds · prediction-market mechanics — probability pricing, implied probability, contract mechanics, resolution, liquidity & spreads · trading prediction markets — information aggregation, calibration, event risk, common mistakes); verify gates incl. probability-arithmetic consistency
- [ ] 2.15 After each batch: run full vitest suite, eslint on touched files, and production build; fix before proceeding (per-batch gate, applies to 2.1–2.14)

## 3. Learn-experience coherence

- [ ] 3.1 Verify the Learn path renders the complete catalogue: every course card, modules, lesson states, durations, objectives; progress math correct for a fresh learner, a Course-1 graduate, and a mid-track learner (unit-level checks via registry/progress helpers)
- [ ] 3.2 Register topic labels + one achievement per course in `curriculum.ts`; verify label/achievement tests cover every course id

## 4. Final validation

- [ ] 4.1 Full `vitest run` over the entire curriculum — every parameterised gate green
- [ ] 4.2 ESLint on all touched files and `npm run build` — both clean
- [ ] 4.3 Curriculum review pass: walk one full course end-to-end as a learner against the arc checklist; spot-check one lesson per remaining course; record findings and fix
- [ ] 4.4 Regression sweep: legacy lessons, mastery/recommendation tests, AI Coach / Paper Trading untouched (no diffs outside the declared scope)
