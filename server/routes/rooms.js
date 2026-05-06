import { Router } from "express";
import sqliteDatabase from "../database.js";

const router = Router();

// Create room
router.post("/", (request, response) => {
  const { name } = request.body;
  if (!name) {
    return response.status(400).json({ error: "name is required" });
  }

  try {
    const result = sqliteDatabase.prepare("INSERT INTO rooms (name) VALUES (?)").run(name);
    const created = sqliteDatabase.prepare("SELECT id, name FROM rooms WHERE id = ?").get(result.lastInsertRowid);
    response.status(201).json(created);
  } catch (error) {
    console.error("[create room api]", error);
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return response.status(409).json({ error: "duplicate room name" });
    }
    response.status(500).json({ error: "internal server error" });
  }
});

// Get all rooms
router.get("/", (request, response) => {
  try {
    response.json(sqliteDatabase.prepare("SELECT id, name FROM rooms").all());
  } catch (error) {
    console.error("[get rooms api]", error);
    response.status(500).json({ error: "internal server error" });
  }
});

export default router;
