# Deployment Guide

This guide covers deploying the frontend (Next.js) and backend (Python/FastAPI) with PostgreSQL and optional Redis. It assumes separate services for frontend and backend.

## Environments
- Development: local machines; debug logging; relaxed rate limits
- Staging: pre‑prod with production‑like data constraints
- Production: public traffic; strict security and observability

## Frontend (Next.js on Vercel)
- Repo: this repository
- Build command: `npm run build`
- Output: Next.js App Router (serverless/edge per route defaults)
- Env Vars:
  - `SITE_URL` — absolute base URL of the site (e.g., `https://app.example.com`)
  - `NEXT_PUBLIC_API_BASE_URL` — base URL for backend API (e.g., `https://api.example.com`)
- Domains: configure primary domain and preview subdomains
- Headers: add security headers (HSTS, frame-ancestors, content‑security‑policy as appropriate)
- Rewrites (optional): if proxying API through the same domain, add rewrite `/api/:path* → https://api.example.com/api/:path*`

## Backend (Python FastAPI)
- Framework: FastAPI (Python 3.11+)
- ASGI server: Gunicorn with Uvicorn workers (prod) or Uvicorn (dev)
- Packaging: Docker image (python:3.11-slim base)
- Deploy targets: Fly.io, Render, Railway, AWS ECS/Fargate, or Kubernetes
- Env Vars (non‑exhaustive):
  - `PORT` — server port (default 8000 inside container)
  - `ENVIRONMENT` — `production` | `staging` | `development`
  - `DATABASE_URL` — Postgres connection string
  - `REDIS_URL` — Redis connection string (optional for queues/caching)
  - `JWT_ACCESS_SECRET` — HMAC secret for access tokens
  - `JWT_REFRESH_SECRET` — HMAC secret for refresh tokens
  - `SESSION_COOKIE_DOMAIN` — cookie domain (e.g., `.example.com`)
  - `CORS_ALLOWED_ORIGINS` — comma‑separated origins (when cross‑domain)
  - `THREADS_CLIENT_ID` / `THREADS_CLIENT_SECRET` / `THREADS_REDIRECT_URI`
  - `OPENAI_API_KEY` or compatible provider credentials
  - Feature flags: `SCORING_DECAY_LAMBDA`, `TOXICITY_THRESHOLD`, etc.

### Example Dockerfile (FastAPI)
```
FROM python:3.11-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install system deps (psycopg)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
  && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml poetry.lock* requirements*.txt ./

# If using Poetry
# RUN pip install --no-cache-dir poetry && poetry config virtualenvs.create false && poetry install --only main --no-interaction --no-ansi

# If using requirements.txt instead of Poetry
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# Production: Gunicorn with Uvicorn workers
CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "-w", "2", "-b", "0.0.0.0:8000", "--timeout", "60"]
```

### Process/Server
- Development: `uvicorn app.main:app --reload --host 0.0.0.0 --port 4000`
- Production: `gunicorn app.main:app -k uvicorn.workers.UvicornWorker -w 2 -b 0.0.0.0:8000`

### Migrations
- ORM/DB: SQLAlchemy with Alembic (recommended)
- CI/CD step: `alembic upgrade head` before switching traffic
- Rollback plan: maintain `down_revision` and test downgrade on staging

### Networking & Cookies
- If frontend and backend are on different subdomains:
  - Cookies must use `Domain=.example.com` and `SameSite=None; Secure` for cross‑site
  - Backend must send CORS headers with `credentials: true` for allowed origins
- Prefer same‑site deployment with reverse proxy to avoid cross‑site cookies when possible

## Datastores
### PostgreSQL
- Use managed Postgres (e.g., Neon, Supabase, RDS)
- Set up:
  - Automated daily backups and PITR where available
  - Strong passwords/roles; restrict ingress
  - Migrations via Alembic in CI/CD

### Redis
- Use managed Redis (e.g., Upstash, Redis Cloud)
- Separate logical DBs or prefixes for queues vs caches
- Configure eviction policy for caches; persistent storage for queues if needed

## Observability
- Logs: structured JSON; ship to provider (Datadog, Grafana, ELK)
- Metrics: expose `/admin/metrics` (Prometheus format); scrape via agent (e.g., `prometheus-fastapi-instrumentator`)
- Tracing: OpenTelemetry SDK; export to OTEL collector
- Dashboards: latency, error rates, queue depth, ingestion durations, scoring durations

## Security
- Secrets: store in Vercel/host secrets manager; avoid .env in repos
- OAuth: configure Threads app with exact redirect URIs for staging and prod
- RBAC: admin endpoints restricted; audit logs enabled
- Rate limiting: configure per IP/user/route; safelist internal IPs for health checks
- Data lifecycle: retention policies and GDPR deletion workflows

## CI/CD
- Frontend: Vercel builds on PRs; Protect main with checks (lint, typecheck, tests)
- Backend: build Docker image; run unit tests; run Alembic migrations; progressive deploy (staging → prod)
- Rollbacks: maintain previous image; database rollback plan for destructive changes

## Local Development
- Frontend: `npm run dev` (env: `SITE_URL=http://localhost:3000`, `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1`)
- Backend: `uvicorn app.main:app --reload --port 4000`
- Postgres: Docker `postgres:15` on `localhost:5432`
- Redis: Docker `redis:7` on `localhost:6379`
- OAuth: set Threads app redirect URI to `http://localhost:4000/api/v1/auth/threads/callback`

## Runbooks
- Incident: capture metrics and logs; identify failing component (ingestion, analysis, matching)
- Token rotation: rotate JWT secrets with dual‑sign strategy and short TTLs
- Database migration: use pre‑deploy `migrate up` with backward compatible changes; post‑deploy cleanup

## References
- API Docs: `docs/API_DOCS.md`
- Threads Postman Collection: `docs/reference/threads_postman_collection.json`
