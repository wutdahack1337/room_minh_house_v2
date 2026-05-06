# room_minh_house_v2

## Purpose

- Practice Elon Musk's framework - First Principles Thinking and The Algorithm
- Fast-learn new tech stacks

## Quick Start

```bash
npm install
npm run server
```

Test the API:
```bash
# Health check
curl http://localhost:3001/api/health

# Get all rooms
curl http://localhost:3001/api/rooms

# Create a room
curl -X POST http://localhost:3001/api/rooms \
  -H "Content-Type: application/json" \
  -d '{"name":"Room 101"}'
```

## Project Structure

- **Backend entry point:** `server/index.js`
- **Backend tool:** Express (`npm run server`)

## API Endpoints

### Health Check
- `GET /api/health` — Returns server status

### Rooms
- `GET /api/rooms` — Get all rooms
- `POST /api/rooms` — Create a new room
  - Body: `{ "name": "string" }` (required)
  - Response: `{ "id": number, "name": string }`

## SQLite3 commands
```
sqlite3 server/database.db
.tables
.schema rooms
SELECT * FROM rooms;
.quit
```