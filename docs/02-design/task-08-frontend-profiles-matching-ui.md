# Task 08 — Frontend: Profiles & Matching UI

## Description
Implement profile view/edit screen, recommendations list with like actions, and matches list. Keep components small and testable.

## Acceptance Criteria
- Profile page loads with `/me`; edit form with validation and optimistic UX
- Recommendations page calls `/matches/recommendations` and supports like
- Matches page lists mutual matches; links to conversation
- Unit tests for components and state transitions

## Dependencies
- Task 07 (auth UI) and Task 05 (matching backend)

## Effort & Priority
- Effort: L
- Priority: P1

## Technical Specs
- Create `src/features/profiles`, `src/features/matching` with cohesive modules
- Reuse shared UI primitives; responsive and accessible

## User Stories
- As a user, I can edit my profile and browse recommendations

