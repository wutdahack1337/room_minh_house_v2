import { Router } from "express";


const router = Router();


// Generate invoice
router.post("/", (request, response) => {
    const { roomId, roomRent, electricityConsumption, electricityPrice, waterConsumption, waterPrice } = request.body;
    if (!roomId || electricityConsumption == null || waterConsumption == null || electricityPrice == null || waterPrice == null || roomRent == null) {
        return response.status(400).json({ error: "missing some required fields" });
    }

    const electricityBill = electricityConsumption * electricityPrice;
    const waterBill = waterConsumption * waterPrice;
    const totalBill = electricityBill + waterBill + roomRent;

    response.status(201).json({ roomId, roomRent, electricityBill, waterBill, totalBill });
});

export default router;