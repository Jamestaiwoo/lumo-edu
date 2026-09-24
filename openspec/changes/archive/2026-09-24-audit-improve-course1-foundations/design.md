# Design

## Context

Course 1 and the block-based lesson engine shipped on `sprint-2/mastery-engine-v1` (commits `c2b1989`…`be67d0b`): 90/90 tests, lint clean, production build green, server grading hardened against empty answers. The engine renders content from `src/content/course/` through one route (`learn.course.$lessonId.tsx`) plus `src/components/lesson/**`. Known gaps from that build: reflections are component state only (lost on navigation), the assessment "Retry" flow's relationship to grading is implicit, interaction builders accept incoherent inputs, and no human has walked the lessons in a running app. All current behavior lives client-side; the server (`progress.functions.ts`) is out of scope.

## Goals / Non-Goals

**Goals**
- Reflections survive navigation per lesson, per device, without touching the server contract.
- Make the retry-vs-grading contract explicit and testable.
- Interaction builders reject impossible inputs with teaching feedback.
- A structured learner-flow audit of all 10 lessons with fixes for defects found.
- Extend the pure-function test suite to cover the above.

**Non-Goals**
- Server/API/database changes; graded storage of reflections.
- Changes to legacy lessons, `curriculum-v2.ts`, mastery, unlocking, or Course 2 content.
- Rewriting block components or the content schema.

## Decisions

1. **Reflections persist via a tiny localStorage-backed store.** New pure module `src/lib/reflection-store.ts` with `loadReflections(lessonId)`, `saveReflections(lessonId, map)`, storage injected (default `window.localStorage`) for testability; key namespace `lumo.reflections.<lessonId>`. The route loads once on mount, saves debounced on change. *Alternative considered:* sessionStorage (lost on browser restart — worse for a "come back tomorrow" learner); server-side storage (adds schema + API surface for non-graded data — rejected).
2. **Retry stays, but the contract becomes explicit.** "Check answers" remains formative (local `evaluateRaw`, misconception feedback). Copy changes to say checks are practice and grading happens once at "Finish lesson", which submits the learner's final selections via `buildSubmission` (unchanged server contract, one authoritative grade per completion). *Alternative considered:* remove retry (hurts learning loop); record each retry server-side (server change — out of scope).
3. **Interaction input validation as pure helpers.** `validatePositionSizeInput`, `validateTradePlanInput` exported from a pure module (extending `src/lib/order-simulation.ts`'s pattern) returning `{ ok, message }` with learning-oriented messages ("why this can't work"), consumed by the two builder views; order simulator already validates via `simulateOrder`. *Alternative:* inline validation in views (untestable without DOM — the repo has no DOM test env).
4. **Content audit is a per-lesson checklist, backed by targeted consistency assertions.** The full-suite schema tests already enforce arc/coverage/integrity; the audit adds a manual learner walkthrough (checklist in tasks.md) plus a small number of numeric-consistency assertions where a lesson's example, visual, and check share facts. *Alternative:* a generic cross-block numeric consistency checker (under-determined without a facts model — over-engineering for 10 lessons).

## Risks / Trade-offs

- [localStorage unavailable (private mode/embedded webview)] → store degrades to in-memory (session-only); reflections are non-graded, so silent degradation is acceptable.
- [Retry copy change confuses existing users] → wording keeps both verbs visible ("Check answers" / "Finish lesson grades once"); no behavioral change to grading.
- [Consistency assertions get brittle as content edits] → keep them few, tied to canonical facts per lesson; they fail loudly during content edits, which is the point.
- [Audit finds engine-level defects] → fix within existing block schema; anything needing schema change goes to a follow-up change.

## Migration Plan

Client-only, additive; no data migration. Rollback = revert the commits. Reflection keys are new and isolated (`lumo.reflections.*`).

## Open Questions

None blocking. (If the browser audit surfaces a defect the block schema cannot express, that becomes a new change rather than a scope expansion here.)
