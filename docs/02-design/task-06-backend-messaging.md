# Task 06 — Backend: Messaging

## Description
Enable messaging between mutually matched users with basic features and moderation hooks.

## Acceptance Criteria
- `GET /messages/:matchId` and `POST /messages/:matchId`
- Validate sender is part of `matchId`
- Store and return messages in chronological order
- Hook for toxicity scan before delivery
- Unit tests for authorization and persistence

## Dependencies
- Task 05 (matches)

## Effort & Priority
- Effort: M
- Priority: P1

## Technical Specs
- SSE/WebSocket optional later; start with polling/HTTP
- Soft-delete support for user-initiated deletions
- FastAPI routers expose messaging endpoints with authentication middleware via `Depends`
- Persist conversations with SQLAlchemy models; wrap access in repository/service layer for testability
- Pydantic schemas define request/response contracts; enforce content limits and sanitization
- Optional Redis pub/sub (via `redis.asyncio`) prepares for future realtime delivery without blocking adoption now

## User Stories
- As a user, I can chat with my matches
