# room_minh_house_v2

## Purpose

- Practice Elon Musk's framework - First Principles Thinking and The Algorithm
- Fast-learn new tech stacks

## Project Structure

- **Backend entry point:** `server/index.js`
- **Backend tool:** Express (`npm run server`)

## Quick Start

```bash
npm install
cp .env.example .env
npm run server
```

## API Endpoints

### Health Check

- `GET /api/health` — Health check

```bash
curl http://localhost:3001/api/health
```

### Rooms

- `GET /api/rooms` — Get all rooms

```bash
curl http://localhost:3001/api/rooms
```

- `POST /api/rooms` — Create a new room

```bash
curl -X POST http://localhost:3001/api/rooms \
  -H "Content-Type: application/json" \
  -d '{"name":"Room 101"}'
```

### Invoice

- `POST /api/invoice` — Generate an invoice for a room

```bash
curl -X POST http://localhost:3001/api/invoice \
  -H "Content-Type: application/json" \
  -d '{"roomId":1,"roomRent":1000000,"electricityConsumption":20,"electricityPrice":3000,"waterConsumption":10,"waterPrice":5000}'
```

## SQLite3 commands

```
sqlite3 server/database.db
.tables
.schema rooms
SELECT * FROM rooms;
.quit
```
