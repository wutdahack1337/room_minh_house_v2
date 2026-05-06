import { Router } from "express";
import sqliteDatabase from "../database.js";
import { validate, schemas } from "../middleware/validate.js";

const router = Router();

// Generate invoice
router.post("/", validate(schemas.createInvoice), (request, response, next) => {
  const { roomId, roomRent, electricityConsumption, electricityPrice, waterConsumption, waterPrice } = request.body;

  try {
    const room = sqliteDatabase.prepare("SELECT id FROM rooms WHERE id = ?").get(roomId);
    if (!room) {
      return response.status(404).json({ error: "room not found" });
    }

    const electricityBill = electricityConsumption * electricityPrice;
    const waterBill = waterConsumption * waterPrice;
    const totalBill = electricityBill + waterBill + roomRent;

    response.json({ roomId, roomRent, electricityBill, waterBill, totalBill });
  } catch (error) {
    next(error);
  }
});

export default router;
