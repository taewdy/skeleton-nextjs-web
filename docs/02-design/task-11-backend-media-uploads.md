# Task 11 — Backend: Profile Photo Uploads (Supabase Storage)

## Description
Add authenticated endpoints to upload, list, set primary, reorder, and delete user profile photos using Supabase Storage. Persist canonical storage locations in the `profile_photos` table (bucket + object_path). Enforce a maximum of 5 photos per user.

## Acceptance Criteria
- `POST /media/profile-photos/upload-url` returns a one-time signed URL and canonical `object_path` for client-side upload.
- `POST /media/profile-photos/commit` persists the uploaded object to `profile_photos` with `object_path` and optional `is_primary`/`sort_order`.
- `GET /media/profile-photos` returns current user’s photos with derived public or signed URLs.
- `PATCH /media/profile-photos/:id` supports setting `is_primary` and updating `sort_order`.
- `DELETE /media/profile-photos/:id` deletes DB row and object from storage.
- Enforce max 5 photos per user; return 409 on overflow.
- Unit tests cover: URL issuance, commit validation, max-limit enforcement, primary change, delete behavior.

## Dependencies
- `profile_photos` table in DB (see architecture design)
- Auth/session and `users` table
- Supabase Storage credentials and bucket `profile-photos`

## Effort & Priority
- Effort: M
- Priority: P1

## Technical Specs
- Bucket: `profile-photos`; object path convention: `user/<userId>/<uuid>.<ext>`
- Signed URL duration: short (e.g., 10 minutes) for upload; read URLs signed on demand for private buckets
- Do not store signed URLs; store `bucket` and `object_path`; derive URL at read
- When setting `is_primary=true`, unset previous primary in a transaction
- Sort order: 0..4; validate unique per user; clamp to count-1 on deletes
- Content-type allowlist: images only; size limit enforced via storage policy and server validation
- Rate limit write endpoints
- FastAPI router under `/media` issues signed URLs and commits uploads using dependency-injected services
- Storage integration via Supabase REST API or `supabase-py` client with service role key stored server-side
- Persist photo metadata with SQLAlchemy models inside the existing transaction/session scope
- Responses validated through Pydantic schemas; ensure strict typing for sort order and flags

## API Sketch
- `POST /media/profile-photos/upload-url`
  - Body: `{ filename: string, contentType: string }`
  - Res: `{ uploadUrl: string, objectPath: string }`
- `POST /media/profile-photos/commit`
  - Body: `{ objectPath: string, isPrimary?: boolean, sortOrder?: number }`
  - Res: `{ id: string }`
- `GET /media/profile-photos`
  - Res: `{ items: { id: string, url: string, isPrimary: boolean, sortOrder: number }[] }`
- `PATCH /media/profile-photos/:id`
  - Body: `{ isPrimary?: boolean, sortOrder?: number }`
  - Res: `{ ok: true }`
- `DELETE /media/profile-photos/:id`
  - Res: `{ ok: true }`

## Notes
- Ensure delete is idempotent if object missing in storage
- Log storage operations (no secrets)
- Consider background thumbnailing in future; for MVP serve original size or client-resized images
