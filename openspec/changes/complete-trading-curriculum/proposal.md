# Proposal

## Why

Lumo has a proven lesson engine, a validated learning arc (Teach → Demonstrate → Interact → Practice → Check → Reflect → Master), and one shipped course (Trading Foundations). The product is marketed as a trading education app but stops after the first 10 lessons. Shipping the complete curriculum turns the engine into the product: one coordinated, prerequisite-ordered program covering markets, instruments, derivatives, psychology, and systematic trading.

## What Changes

- Define the complete Course → Module → Lesson hierarchy for the whole curriculum (15 courses; 10 shipped + 119 new = 129 total), grouped by prerequisites and progression rather than one course per topic.
- Author all new courses as declarative content reusing the existing block architecture, lesson engine, assessment/grading, mastery, XP, unlocking, reflections, and interaction components. No engine replacement.
- Extend the course registry and track order so the full sequence is coherent: one sequential spine for product unlocking, with conceptual prerequisites guiding placement (no course locked behind content that does not teach its foundations first).
- Every course follows the same quality bar as Course 1: teaching before testing, 3–5 assessed items per lesson with misconception-specific feedback, interactions with meaningful feedback, reflections, numeric consistency between examples/visuals/checks.
- Extend the automated validation (schema, arc, consistency, unlock-order tests) to cover every new course; full lint and production-build validation.
- Out of scope: payments, Lumo 2.0 visual rebrand, hosting migration, AI Coach/Paper Trading/market-data changes, legacy lesson migration, curriculum-v2.ts activation.

## Capabilities

### New Capabilities
- `curriculum-architecture`: The complete course catalogue — course/module/lesson hierarchy, prerequisite and unlocking rules across courses, track ordering, and the guarantee that every course in the catalogue is registered, ordered, and teachable from first lesson to course completion.

### Modified Capabilities

- (none — `course-content-quality` already applies to every course lesson, including all new content; `course-lesson-experience` is unchanged)

## Impact

- `src/content/course/` — ~14 new course folders (content only), registry `index.ts` extended.
- `src/lib/recommendation.ts` — curriculum track order (existing per-track mechanics reused, not redesigned).
- `src/content/curriculum.ts` — new topic labels / achievements for new courses (labels only, no engine change).
- Tests: per-course schema/arc tests (parameterised over the registry), unlock-order tests, consistency tests.
- No changes to: grading, mastery, XP, streaks, achievements mechanics, server functions, DB, legacy lessons, AI Coach, Paper Trading, market-data providers.
