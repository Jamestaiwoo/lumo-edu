# Design

## Context

The engine is proven and audited (Course 1 + `audit-improve-course1-foundations`): declarative blocks (`explain/example/visual/interactive/practice/check/scenario/reflection/summary`), parameterised quality gates already running over `COURSE_LESSONS`, per-track sequential unlocking in `recommendation.ts`, one registry in `src/content/course/index.ts`. Authoring cost per lesson is the dominant constraint: 119 new lessons of Course-1 quality (each ~300 lines of content with interactions and verified numbers) is a large but mechanical volume, safe only if validation is parameterised over the registry rather than per course.

## Goals / Non-Goals

**Goals**
- Complete catalogue: 15 courses in one spine, prerequisites encoded in ordering.
- Course-1 quality bar everywhere, enforced by the existing (extended) test suite.
- Zero engine changes: content + registry + labels + track order only.

**Non-Goals**
- New block kinds or engine/UI rewrites; legacy lesson migration; curriculum-v2 activation; payments/rebrand/hosting; AI Coach/Paper Trading/market-data.

## Curriculum architecture (the review artifact)

Single spine, ordered by prerequisites. Deep specialisations sit after their shared foundations; speculative/advanced topics last.

| # | Course | Modules (lesson counts) | Absorbs |
|---|--------|--------------------------|---------|
| 1 | **Trading Foundations** ✅ shipped | existing 4 modules / 10 lessons | trading foundations |
| 2 | **Risk & Position Management** | Risk per trade (3) · Stops & invalidation (3) · Portfolio risk & drawdown (3) | risk management |
| 3 | **Charting & Technical Analysis** | Candles & structure (3) · Trends, ranges & levels (3) · Indicators & their limits (3) | technical analysis |
| 4 | **Markets & Instruments** | Stocks (3) · Indices & ETFs (3) · Commodities (3) · Forex (3) | stocks, indices/ETFs, commodities, forex |
| 5 | **Market Structure & Microstructure** | Auctions, books & liquidity (3) · Execution & costs (3) · Who moves markets (2) | market structure, microstructure, execution, trading systems |
| 6 | **Company & Macro Analysis** | Reading a company (3) · Macro drivers (3) · Events & calendars (2) | fundamental analysis, macro, event-driven |
| 7 | **Crypto Foundations** | Digital assets & Bitcoin (3) · Ethereum & tokens (3) · On-chain & DeFi (3) · Crypto security & scams (3) | crypto foundations, BTC/ETH, DeFi/on-chain, security/scams |
| 8 | **Crypto Speculation** | Memecoins & narratives (3) · Volatility & crypto risk (2) | memecoins, sentiment/social markets (crypto side) |
| 9 | **Derivatives Foundations** | What derivatives are (3) · Futures (3) · Perpetuals & leverage (3) | futures, perpetuals, leveraged trading |
| 10 | **Options** | Payoffs (3) · The Greeks (3) · Strategies & risk (3) | options, Greeks |
| 11 | **Trading Psychology** | Biases (3) · Discipline & process (3) | trading psychology |
| 12 | **Strategy & Edge** | What edge is (3) · Building a strategy (3) · Hypotheses & journals (2) | strategy development |
| 13 | **Backtesting & Validation** | Backtest mechanics (3) · Overfitting & bias (3) · Walk-forward & paper (2) | backtesting, validation |
| 14 | **Quantitative Trading** | Data & signals (3) · Simple systematic rules (3) · Automation & its risks (2) | quant/algorithmic |
| 15 | **Sentiment & Prediction Markets** | News, narratives & crowds (3) · Prediction-market mechanics (3) · Trading prediction markets (2) | sentiment, prediction markets, event-driven (capstone) |


## Prerequisite semantics (two distinct layers)

1. **Product unlocking (enforced).** The product has ONE sequential curriculum track: lesson N+1 unlocks after lesson N; the first lesson of each course unlocks after the previous course's last lesson completes. No course has independent unlock dependencies, and this change introduces none. A fresh learner sees exactly one unlocked lesson; a learner mid-C4 can never reach C9 out of order, whatever their interests. Conceptual prerequisites (below) are **not** enforced by unlocking.
2. **Conceptual prerequisites (authoring rationale).** If a future product adds jump-ahead options, these notes are the input — not this change.

Course-specific conceptual notes:
- **C9 Derivatives Foundations requires only C2 (risk fluency).** Futures, margin, and leverage are general instrument concepts taught from first principles using equities/commodities examples; crypto knowledge is NOT assumed. Perpetuals (C9-M3) use crypto as the natural example domain but re-explain every mechanism from scratch, so general derivatives are understandable independently of crypto — C7 graduates simply recognise the domain.
- **C15 is the capstone**: it draws on C6 (events), C8 (sentiment/narratives), and C10 (probability intuition) conceptually; the spine enforces only "everything before it".

## Authoring budget

Lesson counts: C1 10 (shipped) · C2 9 · C3 9 · C4 12 · C5 8 · C6 8 · C7 12 · C8 5 · C9 9 · C10 9 · C11 6 · C12 8 · C13 8 · C14 8 · C15 8. **New lessons: 119. Total curriculum: 129 lessons** (10 shipped + 119 new). C15 was expanded from 5 to 8 lessons so prediction markets get genuine instructional depth — probability pricing, implied probability, contract mechanics, resolution, liquidity/spreads, information aggregation, calibration, event risk, common mistakes — rather than two compressed lessons; the +3 is a deliberate depth correction, not filler.

## Decisions

1. **One spine, no per-course unlock graphs.** Track order = catalogue order; the unlocking code already implements this exactly (per-track sequential). A lesson-count budget per course (5–12) keeps courses shippable and modules balanced. *Alternative:* prerequisite DAG with multi-parent unlocks — the engine doesn't support it, and sequential spines are pedagogically clearer for beginners.
2. **Group topics into shared courses, not one course per topic.** The 26 requested domains map to 15 courses via the Absorbs column; e.g. stocks + forex + commodities + indices/ETFs become the four instrument modules of one course, so cross-instrument contrast (spreads, hours, drivers) is taught side by side.
3. **Authoring order = spine order, validated continuously.** Content lands course by course in commit-sized batches; the parameterised suite gates every batch so the tree is never half-broken. *Alternative:* write all content then validate — hides defects until the end.
4. **Reuse the interaction vocabulary; no new components.** All teaching uses the existing 7 interaction types and 5 visual types. If a lesson genuinely cannot teach with them, that is a content redesign signal, not an engine change.
5. **Achievements: one per course** (`course_2_risk` … `course_15_sentiment`), registered in `curriculum.ts` labels/achievements only.
6. **General derivatives before and independent of crypto-specific depth.** C9 teaches derivatives from first principles with non-crypto examples; perpetuals (C9-M3) use crypto as the example venue but re-derive their mechanics, so C9 does not depend on C7 conceptually. Memecoins (C8) sit after DeFi (they are tokens); their leverage-flavoured risk lessons assume only C2.
7. **Numeric-consistency tests parameterised per instrument course** (spreads, pip values, contract multipliers) reusing the `content-consistency` pattern.

## Risks / Trade-offs

- [119 lessons of hand-written content is a huge authoring surface] → strict per-lesson checklist + parameterised gates + course-by-course batches; no filler lessons; a course that cannot meet the bar is cut from scope rather than shipped shallow.
- [Unlock-order regression breaks mid-track learners] → the track test asserts the full consecutive order, including course boundaries, before every batch.
- [Registry growth slows module resolution] → registry stays plain data; tests import statically; no runtime cost concerns at this scale.
- [Scope pressure to add exotic topics (NFTs, HFT infrastructure)] → the catalogue above is closed for this change; additions become follow-up changes.

## Migration Plan

Content + registry land in spine order (Course 2 first, then 3, … 15); each batch keeps tests and build green. Learners on Course 1 are unaffected until the next course appears, then simply continue. Rollback = revert a batch.

## Open Questions

None blocking.
