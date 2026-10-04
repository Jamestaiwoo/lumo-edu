# Spec Delta

## Purpose

Defines the learner-facing quality bar for Course 1: how a course lesson behaves while being taken (block flow, reflections, retry and submit semantics, interaction feedback) and the pedagogical guarantees every course lesson's content must satisfy.

## Requirements

### Requirement: Lesson block flow preserves the teaching arc

Course lessons SHALL render learning blocks in their authored order with teaching blocks (explain, example, visual, interactive) preceding assessed blocks (practice, check, scenario), followed by reflection and summary blocks.

#### Scenario: Learner encounters teaching before assessment
- **WHEN** a learner opens any Course 1 lesson
- **THEN** the first assessed question appears only after at least one explanation and one example block have been rendered

### Requirement: Reflections persist across navigation

Reflection answers written by the learner in a course lesson SHALL be saved on the learner's device and restored when they return to that lesson, and SHALL NOT be transmitted to the server or affect grading, XP, or completion.

#### Scenario: Reflection survives leaving and returning
- **WHEN** a learner types a reflection answer, navigates away, and later reopens the same lesson
- **THEN** their previously typed reflection text is shown again

#### Scenario: Reflections are never graded
- **WHEN** a lesson is completed and submitted to the server
- **THEN** the submission payload contains no reflection content

### Requirement: Assessment answers lock at submission

After a course lesson is submitted for grading, assessment answers SHALL be locked and identical answers SHALL produce the same result on any resubmission of the same lesson state; partial submissions SHALL be impossible because the finish control stays disabled until every assessed question is answered.

#### Scenario: Finish control gates on completeness
- **WHEN** at least one assessed question is unanswered
- **THEN** the finish control is disabled

#### Scenario: Retry does not change the graded record
- **WHEN** a learner retries a knowledge check locally after revealing feedback and then finishes the lesson
- **THEN** the submitted answer is the learner's final selection for each question, graded once by the server

### Requirement: Interactions give actionable feedback on invalid input

Interactive blocks that accept numeric or structured input (position sizing, trade-plan building, order simulation) SHALL reject nonsensical input with a specific, learning-oriented message rather than producing a misleading result or silently accepting it.

#### Scenario: Position size builder rejects impossible risk
- **WHEN** a learner enters a risk-per-trade of 0 or a stop distance of 0 in the position-size builder
- **THEN** the interaction shows why that input cannot produce a position instead of computing a result

#### Scenario: Trade plan builder requires coherent levels
- **WHEN** a learner sets a take-profit below the entry for a long trade in the trade-plan builder
- **THEN** the interaction flags the incoherence with an explanation rather than reporting a reward-to-risk ratio

### Requirement: Content teaches before it tests with consistent numbers

Every course lesson SHALL contain at least one explanation, example, interactive, practice, check, reflection, and summary block; every assessed item SHALL follow the first teaching block; and every number used in an example, visual, or interaction within a lesson SHALL be arithmetically consistent with the lesson's stated facts.

#### Scenario: Schema validation enforces the arc
- **WHEN** the course content test suite runs over all Course 1 lessons
- **THEN** every lesson passes the block-coverage, ordering, and assessment-integrity checks

#### Scenario: Misconception feedback never explains the correct answer
- **WHEN** the assessment schema validation runs
- **THEN** no feedback entry is keyed to a question's correct answer index
