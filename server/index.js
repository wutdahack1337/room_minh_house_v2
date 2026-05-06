import express from "express";

import roomsRouter from "./routes/rooms.js";
import invoiceRouter from "./routes/invoice.js";

const app = express();
app.use(express.json());

const HOST = "localhost";
const PORT = 3001;

// API
app.get("/api/health", (request, response) => {
    response.json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
});

app.use("/api/rooms", roomsRouter);

app.use("/api/invoice", invoiceRouter);

// Start server
const server = app.listen(PORT, HOST, () => {
    console.log(`Backend server is running at http://${HOST}:${PORT}`);
    console.log(`API endpoints are available at http://${HOST}:${PORT}/api`);
});