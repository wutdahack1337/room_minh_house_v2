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
curl http://localhost:3001/api/health
```

## Project Structure

- **Backend entry point:** `server/index.js`
- **Backend tool:** Express (`npm run server`)

## SQLite3 commands
```
sqlite3 server/database.db
.tables
.schema rooms
SELECT * FROM rooms;
.quit
```