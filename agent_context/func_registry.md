# Function Registry

All exported symbols, their signatures, and locations.

## server/database.js

| Export | Kind | Description |
|---|---|---|
| `sqliteDatabase` (default) | `Database` instance | Singleton better-sqlite3 connection. WAL mode, foreign keys ON. Migrations auto-applied on import. |

## server/middleware/validate.js

| Export | Signature | Description |
|---|---|---|
| `validate` | `(schema: ZodSchema) => ExpressMiddleware` | Returns middleware that calls `schema.safeParse(req.body)`. On failure: `400 { error: firstIssueMessage }`. On success: replaces `req.body` with parsed data and calls `next()`. |
| `schemas.createRoom` | `z.object` | `{ name: string (min 1) }` |
| `schemas.createInvoice` | `z.object` | `{ roomId: coerce→int>0, roomRent: coerce→num≥0, electricityConsumption: coerce→num≥0, electricityPrice: coerce→num≥0, waterConsumption: coerce→num≥0, waterPrice: coerce→num≥0 }` |

## server/middleware/errorHandler.js

| Export | Signature | Description |
|---|---|---|
| `errorHandler` | `(err, req, res, _next) => void` | Express 4-arg error handler. Maps `SQLITE_CONSTRAINT_UNIQUE` → 409. All others → 500. |

## server/routes/rooms.js

| Export | Kind | Description |
|---|---|---|
| `router` (default) | `express.Router` | Handles `POST /` and `GET /` for rooms resource. |

## server/routes/invoice.js

| Export | Kind | Description |
|---|---|---|
| `router` (default) | `express.Router` | Handles `POST /` for invoice generation. Computes `electricityBill`, `waterBill`, `totalBill` in memory. |

## DB Schema (server/migrations/0001_init.sql)

```sql
rooms (id INTEGER PK AUTOINCREMENT, name TEXT NOT NULL UNIQUE)
```
