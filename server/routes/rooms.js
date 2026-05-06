import { Router } from "express";
import sqliteDatabase from "../database.js";

const router = Router();

// Create room
router.post("/", async (request, response) => {
    const { name } = request.body;
    if (!name) {
        return response.status(400).json({ error: "name is required" });
    }

    const result = await sqliteDatabase.prepare("INSERT INTO rooms (name) VALUES (?)").run(name);

    const created = await sqliteDatabase.prepare("SELECT id, name FROM rooms WHERE id = ?").get(result.lastInsertRowid);
    response.status(201).json(created);
});

// Get all rooms
router.get("/", async (request, response) => {
    const query = "SELECT id, name FROM rooms";
    response.json(await sqliteDatabase.prepare(query).all());
});

export default router;
