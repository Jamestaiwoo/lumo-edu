# Proposal

## Why

Course 1 (Trading Foundations) and the block-based lesson engine shipped and are validated by unit tests, but the learning experience has known gaps from the build audit: nothing has been verified in a real browser against Supabase, in-lesson interactions validate client-side only, learner reflections are discarded on submit, and content quality (the actual teaching) has never been reviewed end-to-end as a learner. Before building Course 2 on this foundation, Course 1 should be audited and hardened so the architecture claim — "content-only, no engine changes" — is proven on a polished, trustworthy first course.

## What Changes

- Add a learner-flow audit pass: walk all 10 lessons end-to-end (teach → … → master) in a running app and fix content/engine defects found.
- Persist reflection answers locally (per lesson, client-side) so a learner's written thoughts survive navigation; they remain non-graded and are never submitted to the server.
- Tighten assessment block retry semantics so the recorded attempt is unambiguous (currently a local "Retry these questions" can desync what the learner last saw from what is submitted).
- Fix the interaction views' input validation gaps (e.g. position-size and trade-plan builders accept nonsensical inputs without useful feedback).
- Content-quality pass on all 10 lessons: verify each lesson teaches before testing, examples are numerically consistent with their visuals/interactions, and wrong-answer feedback targets real misconceptions (enforced by new tests, not manual review alone).
- Add regression tests for everything above; keep all 90 existing tests green.
- No server/API/schema changes; no changes to grading, XP, streaks, achievements, mastery, or unlocking.

## Capabilities

### New Capabilities
- `course-lesson-experience`: The in-lesson learner experience for course lessons — block rendering order, reflection persistence, assessment retry/submit semantics, and interaction feedback.
- `course-content-quality`: Structural and pedagogical guarantees enforced over course content — teaching-before-testing, block coverage, assessment item integrity, and numerical consistency between examples, visuals, and interactions.

### Modified Capabilities

## Impact

- `src/routes/_authenticated/learn.course.$lessonId.tsx` — reflection state persistence, retry/submit semantics.
- `src/components/lesson/**` (AssessmentBlockView, interactions/*) — retry clarity, input validation feedback.
- `src/lib/lesson-feedback.ts` — possible helper for attempt semantics (pure, tested).
- New: reflection persistence helper (localStorage-backed, client-only).
- `src/content/course/**` — content fixes only (no schema changes).
- Tests: `src/lib/__tests__/lesson-engine.test.ts`, `src/content/course/__tests__/course.test.ts`, plus new coverage for reflection persistence and interaction validation.
- Explicitly out of scope: server functions, database, curriculum-v2, legacy lessons, Course 2 content.
