# Spec Delta

## Purpose

Defines the complete Lumo trading curriculum: the course catalogue, its prerequisite-ordered structure, and the guarantees that every course in it is registered, ordered, and teachable from first lesson to completion using the existing lesson engine.

## ADDED Requirements

### Requirement: Complete course catalogue is defined and registered

The curriculum SHALL define a complete set of courses covering trading foundations, risk management, technical analysis, fundamental and macro analysis, market structure, the major instrument classes (stocks, forex, commodities, indices/ETFs, crypto including Bitcoin/Ethereum, DeFi, memecoins, crypto security, futures, options, perpetuals), trading psychology, strategy development, backtesting, quantitative trading, execution/systems, prediction and event-driven markets, and sentiment — grouped into an instructional hierarchy by prerequisites and progression, and every course SHALL be registered in the course registry with its modules and lessons resolvable.

#### Scenario: Registry resolves the whole catalogue
- **WHEN** the curriculum test suite iterates every registered course
- **THEN** every course exposes at least one module, every module at least one lesson, and every lesson resolves to full teaching content

#### Scenario: Coverage of the advertised domains
- **WHEN** the catalogue is reviewed against the curriculum scope
- **THEN** every domain listed in the course map has at least one course or module teaching it, with no placeholder lessons

### Requirement: Prerequisite order is coherent and acyclic

Course unlocking SHALL follow a single curriculum track in which every course's first lesson is unlockable only after the previous course's final lesson is complete, every lesson within a course unlocks in sequence, and the ordering forms an acyclic progression where each course builds only on material taught earlier in the track.

#### Scenario: Fresh learner path
- **WHEN** a learner has completed nothing
- **THEN** exactly the first lesson of the first course is unlocked

#### Scenario: No gaps or cycles
- **WHEN** the unlock-order tests walk the full track
- **THEN** each consecutive lesson pair is ordered, each course boundary connects the previous course's last lesson to the next course's first lesson, and no lesson is reachable before its teachers

### Requirement: Every lesson meets the teaching-arc quality bar

Every lesson in every course SHALL satisfy the existing course-content-quality requirements: complete metadata, at least one explain/example/interactive/practice/check/reflection/summary block, teaching before testing, 3–5 assessed items with misconception-specific feedback, and internal numeric consistency across examples, visuals, and checks.

#### Scenario: Parameterised quality gate
- **WHEN** the content test suites run over the entire registry
- **THEN** every lesson of every course passes the same schema, arc, assessment-integrity, and consistency assertions that Course 1 passes

### Requirement: Curriculum ships as one coherent product state

The curriculum SHALL be delivered so that at any point the shipped state is internally consistent: the Learn experience lists all registered courses with accurate progress and locked/unlocked states, achievements and topic labels exist for every course, and no course is partially registered or reachable in a broken state.

#### Scenario: Shipped state is consistent
- **WHEN** the app is built with the complete curriculum
- **THEN** the Learn path renders every course and module, progress and unlock states are correct for new and mid-track learners, and the production build and full test suite pass
