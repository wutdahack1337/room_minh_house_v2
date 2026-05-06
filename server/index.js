import express from "express";

import sqliteDatabase from "./database.js";

const app = express();
const HOST = "localhost";
const PORT = 3001;

// API
app.get("/api/health", (request, response) => {
    response.json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
});

// Start server
const server = app.listen(PORT, HOST, () => {
    console.log(`Backend server is running at http://${HOST}:${PORT}`);
    console.log(`API endpoints are available at http://${HOST}:${PORT}/api`);
});