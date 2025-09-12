# Task 03 — Backend: Threads Ingestion Service

## Description
Fetch a user’s Threads posts, replies, and interactions and persist them. Provide idempotent initial bootstrap and incremental sync.

## Acceptance Criteria
- `POST /ingest/bootstrap` starts or resumes first-time import
- `GET /ingest/status` exposes job progress
- Persist posts and interactions with external IDs; ensure idempotency
- Queue-based worker processes (Redis-backed)
- Unit tests for ingestion orchestrator and mappers

## Dependencies
- Task 02 (models)

## Effort & Priority
- Effort: L
- Priority: P0

## Technical Specs
- Use rate limiting/backoff; respect provider quotas
- Normalize provider payloads into internal schema
- Store raw payloads separately for audit if needed

## User Stories
- As a user, I can import my Threads activity

