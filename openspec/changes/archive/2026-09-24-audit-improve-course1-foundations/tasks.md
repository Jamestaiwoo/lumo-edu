# Tasks

## 1. Reflection persistence

- [x] 1.1 Create `src/lib/reflection-store.ts` with `loadReflections(lessonId)` / `saveReflections(lessonId, map)` using injected storage (default localStorage, in-memory fallback) under key `lumo.reflections.<lessonId>`; verify with unit tests covering round-trip, per-lesson isolation, missing-storage fallback, and corrupt-JSON tolerance
- [x] 1.2 Wire `learn.course.$lessonId.tsx` to load reflections on mount and save on change (debounced); verify by typing a reflection, reloading, and seeing it restored (observable behavior)

## 2. Retry and submit semantics

- [x] 2.1 Update `AssessmentBlockView` copy so "Check answers" is framed as formative practice and "Finish lesson" as the single graded submission; verify no behavioral change to `buildSubmission` output in existing `completion submission contract` tests (all still green)
- [x] 2.2 Verify the finish control stays disabled until every assessed question is answered and that all assessment blocks lock after submission; confirm via existing tests plus a new lesson-engine test asserting lock-after-submit state mapping

## 3. Interaction input validation

- [x] 3.1 Add pure `validatePositionSizeInput` and `validateTradePlanInput` helpers (returning `{ ok, message }` with learning-oriented messages) and wire them into `PositionSizeBuilderView` / `TradePlanBuilderView`; verify with unit tests covering zero/negative risk, zero stop distance, TP-below-entry for longs, and coherent-input pass-through
- [x] 3.2 Confirm the order-type simulator path already surfaces `simulateOrder` outcomes for nonsensical limits; add a test if a gap is found

## 4. Learner-flow content audit

- [x] 4.1 Walk all 10 lessons (tf-l1…tf-l10) in a running build using the audit checklist: arc order, example numbers vs visual numbers vs check answers, misconception feedback relevance, interaction feedback quality; record findings per lesson in this change's notes
- [x] 4.2 Fix content defects found by the audit (content files only — no schema changes); verify `course.test.ts` and `lesson-engine.test.ts` stay green after each fix batch
- [x] 4.3 Add numeric-consistency assertions for lessons where example, visual, and check share canonical facts (e.g. tf-l4 spread arithmetic); verify the new assertions pass against current content

## 5. Validation

- [x] 5.1 Run `npx vitest run` — all tests green (existing 90 plus new coverage)
- [x] 5.2 Run lint on changed files and `npm run build` — both clean
- [ ] 5.3 Manual browser regression: complete one course lesson end-to-end (teach → finish → done screen → next lesson) and one legacy lesson; verify XP/streak/achievement path untouched
