# Modify Guide

Step-by-step patterns for the most common structural changes.

## Add a new API route

1. Create `server/routes/<resource>.js` — export a default `express.Router()`.
2. Add the schema(s) to `server/middleware/validate.js` under `schemas`.
3. Mount the router in `server/index.js`: `app.use("/api/<resource>", resourceRouter)`.
4. Update `agent_context/call_index.md`, `agent_context/chains.md`, and `agent_context/func_registry.md`.

## Add a DB migration

1. Create `server/migrations/<NNNN>_description.sql` — name must sort after the last file.
2. The migration runs automatically on next server start; no manual step needed.
3. Update the DB Schema section in `agent_context/func_registry.md`.

## Add a Zod schema

1. Add to the `schemas` object in `server/middleware/validate.js`.
2. Use `z.coerce.<type>()` for fields that arrive as strings from HTTP bodies.
3. Reference it as `validate(schemas.yourSchema)` in the route.
4. Update `agent_context/func_registry.md` schemas table.

## Add global middleware

Insert `app.use(yourMiddleware)` in `server/index.js` **before** the router mounts. Update `agent_context/chains.md`.

## Add error mapping

Add a new `if (error.code === ...)` branch in `server/middleware/errorHandler.js` before the 500 fallback. Update `agent_context/func_registry.md` errorHandler entry.

## When to update agent_context

Update these files after:
- Adding, removing, or renaming routes, middleware, or exported functions
- Adding a DB migration that changes the schema
- Reorganising the `server/` directory structure

Small in-place fixes (bug fixes, value changes) do not require updates here.
