# Deployment Guide

This guide covers deploying the frontend (Next.js) and backend (Node.js/TypeScript service) with PostgreSQL and Redis. It assumes separate services for frontend and backend.

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

## Backend (Node.js service)
- Suggested frameworks: NestJS (recommended) or Fastify
- Packaging: Docker image
- Deploy targets: Fly.io, Render, Railway, AWS ECS/Fargate, or Kubernetes
- Env Vars (non‑exhaustive):
  - `PORT` — server port
  - `NODE_ENV` — `production` in prod
  - `DATABASE_URL` — Postgres connection string
  - `REDIS_URL` — Redis connection string
  - `JWT_ACCESS_SECRET` — HMAC secret for access tokens
  - `JWT_REFRESH_SECRET` — HMAC secret for refresh tokens
  - `SESSION_COOKIE_DOMAIN` — cookie domain (e.g., `.example.com`)
  - `CORS_ALLOWED_ORIGINS` — comma‑separated origins (when cross‑domain)
  - `THREADS_CLIENT_ID` / `THREADS_CLIENT_SECRET` / `THREADS_REDIRECT_URI`
  - `OPENAI_API_KEY` or compatible provider credentials
  - Feature flags: `SCORING_DECAY_LAMBDA`, `TOXICITY_THRESHOLD`, etc.

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
  - Migrations via Prisma/TypeORM in CI/CD

### Redis
- Use managed Redis (e.g., Upstash, Redis Cloud)
- Separate logical DBs or prefixes for queues vs caches
- Configure eviction policy for caches; persistent storage for queues if needed

## Observability
- Logs: structured JSON; ship to provider (Datadog, Grafana, ELK)
- Metrics: expose `/admin/metrics` (Prometheus format); scrape via agent
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
- Backend: build Docker image; run unit tests; run migrations; progressive deploy (staging → prod)
- Rollbacks: maintain previous image; database rollback plan for destructive changes

## Local Development
- Frontend: `npm run dev` (env: `SITE_URL=http://localhost:3000`, `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1`)
- Backend: `npm run start:dev` on `localhost:4000`
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

