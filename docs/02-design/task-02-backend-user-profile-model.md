# Task 02 — Backend: User & Profile Model

## Description
Define and implement core domain models for users, Threads accounts, and profiles. Expose basic profile CRUD for the authenticated user.

## Acceptance Criteria
- PostgreSQL schema migrations for `users`, `thread_accounts`, `profiles`
- `GET /me` returns profile + linkage status
- `PATCH /me` updates profile fields with validation
- Unit tests for repositories/services and DTO validation

## Dependencies
- Task 01 (auth) for identifying current user

## Effort & Priority
- Effort: M
- Priority: P0

## Technical Specs
- ORM: Prisma or TypeORM (recommend Prisma for DX)
- Validation: class-validator/Zod
- Avoid over-fetching; select only required fields

## User Stories
- As a user, I can see and edit my profile

