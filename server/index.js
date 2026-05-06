import express from "express";

const app = express();
const HOST = "0.0.0.0";
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
    console.log(`Backend server is running at http://localhost:${PORT}`);
    console.log(`API endpoints is available at http://localhost:${PORT}/api`);
});