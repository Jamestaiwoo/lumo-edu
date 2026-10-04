# Spec Delta

## Purpose

Defines the pedagogical and structural guarantees enforced over Lumo course content: the teaching arc every lesson must follow, assessment item integrity, and numerical consistency between examples, visuals, and interactions.

## ADDED Requirements

### Requirement: Every course lesson follows the teaching arc

Every course lesson SHALL contain at least one explain, example, interactive, practice, check, reflection, and summary block, with the first assessed block appearing after the first explanation block.

#### Scenario: Content suite validates the arc
- **WHEN** the course content tests run
- **THEN** every lesson in every registered course satisfies block coverage and teaching-before-testing

### Requirement: Assessment items are complete and honest

Every assessed item in course content SHALL have a unique question id across the course, a known topic, an explanation longer than a token phrase, in-range answer keys for multiple choice, finite numeric answers, and misconception feedback keyed only to wrong options.

#### Scenario: Schema validation catches a broken item
- **WHEN** a lesson's question duplicates an existing id, or its mcq answer index is out of range, or feedback explains the correct option
- **THEN** the content test suite fails, naming the offending question

### Requirement: Lessons carry complete metadata

Every course lesson SHALL declare a title, blurb, at least three learning objectives, positive duration and XP, a substantive key takeaway, and unique block ids.

#### Scenario: Metadata validation
- **WHEN** the content tests run over the course registry
- **THEN** every lesson passes the metadata and block-id uniqueness checks
