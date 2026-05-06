import { Router } from "express";
import { validate, schemas } from "../middleware/validate.js";

const router = Router();

// Generate invoice
router.post("/", validate(schemas.createInvoice), (request, response) => {
  const { roomId, roomRent, electricityConsumption, electricityPrice, waterConsumption, waterPrice } = request.body;

  const electricityBill = electricityConsumption * electricityPrice;
  const waterBill = waterConsumption * waterPrice;
  const totalBill = electricityBill + waterBill + roomRent;

  response.status(200).json({ roomId, roomRent, electricityBill, waterBill, totalBill });
});

export default router;
