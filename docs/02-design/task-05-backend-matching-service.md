# Task 05 — Backend: Matching & Recommendations

## Description
Produce recommendations for whom a user should see based on one-way and mutual positive interaction scores. Manage likes and matches.

## Acceptance Criteria
- `GET /matches/recommendations` returns ranked list
- `POST /matches/like` records intent; mutual likes create `matches`
- `GET /matches` lists mutual matches
- Caches hot recommendations in Redis
- Unit tests for ranking, thresholds, and matching logic

## Dependencies
- Task 04 (scoring)

## Effort & Priority
- Effort: M
- Priority: P0

## Technical Specs
- Configurable thresholds; diversity/novelty injection to avoid filter bubbles
- Keyset pagination; dedupe and cooldown recently skipped items

## User Stories
- As a user, I see relevant recommendations and can like others

