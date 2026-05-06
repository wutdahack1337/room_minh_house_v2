import { Router } from "express";
import sqliteDatabase from "../database.js";
import { validate, schemas } from "../middleware/validate.js";

const router = Router();

// Create room
router.post("/", validate(schemas.createRoom), (request, response, next) => {
  const { name } = request.body;

  try {
    const result = sqliteDatabase.prepare("INSERT INTO rooms (name) VALUES (?)").run(name);
    const created = sqliteDatabase.prepare("SELECT id, name FROM rooms WHERE id = ?").get(result.lastInsertRowid);
    response.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

// Get all rooms
router.get("/", (request, response, next) => {
  try {
    response.json(sqliteDatabase.prepare("SELECT id, name FROM rooms").all());
  } catch (error) {
    next(error);
  }
});

export default router;
