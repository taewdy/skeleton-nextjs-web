# Task 10 — Observability, Security, and Deployment

## Description
Harden security, add basic observability, and document deployment procedures for frontend and backend.

## Acceptance Criteria
- Security review checklist completed; rate limiting enabled on backend
- Logging with request IDs; error handling guidelines documented
- `DEPLOYMENT.md` created with envs, secrets, and rollout steps
- `API_DOCS.md` created or linked from OpenAPI generation

## Dependencies
- Core features functional (Tasks 01–09)

## Effort & Priority
- Effort: M
- Priority: P1

## Technical Specs
- Use OpenTelemetry-compatible libraries; basic dashboards defined
- Document backup/restore for Postgres; retention for logs
- Instrument FastAPI with `prometheus-fastapi-instrumentator`, `structlog`, and OTEL exporters; ensure workers share the same logging format
- Harden container/Docker image (python:3.11-slim) with non-root user and pinned dependency hashes
- Document CI pipelines for running Ruff, Black, MyPy, pytest, and Alembic migrations prior to deploy

## User Stories
- As an operator, I can deploy and monitor the system safely
