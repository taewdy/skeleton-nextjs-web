# Task 04 — Backend: Analysis & Scoring

## Description
Analyze imported interactions with an OpenAI-compatible API to compute sentiment, toxicity, interests, and derive user→user interaction scores with weights and decay.

## Acceptance Criteria
- Pluggable provider interface with mock provider for tests
- Store `analysis_results` and `scores` with metadata
- Toxicity filter gate before persistence; configurable thresholds
- Recompute endpoint `POST /scores/recompute`
- Unit tests for weighting, decay, and provider adapter

## Dependencies
- Task 03 (ingestion)

## Effort & Priority
- Effort: L
- Priority: P0

## Technical Specs
- Exponential decay on recency; weights per interaction type
- Configurable via env/feature flags; audit logged

## User Stories
- As a user, my recommendations reflect positive interactions and avoid toxic ones

