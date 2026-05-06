# Call Index

Maps every API endpoint to its handler file, schema, and DB operations.

| Endpoint | Method | Route file | Schema | DB tables touched |
|---|---|---|---|---|
| `/api/health` | GET | `server/index.js` (inline) | none | none |
| `/api/rooms` | POST | `server/routes/rooms.js` | `schemas.createRoom` | INSERT rooms |
| `/api/rooms` | GET | `server/routes/rooms.js` | none | SELECT rooms |
| `/api/invoice` | POST | `server/routes/invoice.js` | `schemas.createInvoice` | SELECT rooms (read-only) |

## Notes

- `/api/invoice` is stateless — it validates `roomId` exists then computes totals in memory, no writes.
- All DB access uses `better-sqlite3` synchronous API via the singleton in `server/database.js`.
