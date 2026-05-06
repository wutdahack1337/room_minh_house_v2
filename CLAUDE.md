# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Agent Context

**Read `agent_context/` before starting any task.** It contains pre-mapped indexes that save you from re-scanning the codebase:

- [`agent_context/call_index.md`](agent_context/call_index.md) — endpoint → handler → DB table map
- [`agent_context/chains.md`](agent_context/chains.md) — middleware stack per route
- [`agent_context/func_registry.md`](agent_context/func_registry.md) — all exports, signatures, and DB schema
- [`agent_context/modify_guide.md`](agent_context/modify_guide.md) — step-by-step patterns for structural changes

**Update `agent_context/` (and this file) after structural changes** — new/removed routes, middleware, exports, or migrations. Check `git log --oneline -10` to judge whether recent commits constitute a structural refactor or a batch of changes; skip updates for isolated bug fixes.

## Commands

```bash
npm run server    # Start the Express server (http://localhost:3001)
npm run lint      # Run ESLint
npm run format    # Run Prettier
```

No test suite is configured.

## Architecture

Pure Node.js backend (ESM, `"type": "module"`), no frontend. Entry point: `server/index.js`.

**Request lifecycle:** `express.json()` → `validate(schema)` middleware → route handler → `errorHandler` (catch-all at bottom of `index.js`)

**Key layers:**
- `server/routes/` — Express routers mounted at `/api/rooms` and `/api/invoice`
- `server/middleware/validate.js` — Zod-based request body validation; all schemas live here in `schemas` object
- `server/middleware/errorHandler.js` — Centralized error handler; maps SQLite error codes to HTTP responses
- `server/database.js` — Singleton `better-sqlite3` connection; runs SQL migrations from `server/migrations/` on startup in filename-sorted order, tracking applied files in `_migrations` table

**Adding a migration:** create a new `.sql` file in `server/migrations/` with a name that sorts after existing ones (e.g. `0002_add_column.sql`). It runs automatically on next server start.

**Database:** SQLite at `server/database.db` with WAL mode and foreign keys enabled.
