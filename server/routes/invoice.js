import { Router } from "express";


const router = Router();


// Generate invoice
router.post("/", (request, response) => {
    let { roomId, roomRent, electricityConsumption, electricityPrice, waterConsumption, waterPrice } = request.body;
    if (!roomId || electricityConsumption == null || waterConsumption == null || electricityPrice == null || waterPrice == null || roomRent == null) {
        return response.status(400).json({ error: "missing some required fields" });
    }

    roomRent = Number(roomRent);
    electricityConsumption = Number(electricityConsumption);
    waterConsumption = Number(waterConsumption);
    electricityPrice = Number(electricityPrice);
    waterPrice = Number(waterPrice);

    const electricityBill = electricityConsumption * electricityPrice;
    const waterBill = waterConsumption * waterPrice;
    const totalBill = electricityBill + waterBill + roomRent;

    response.status(200).json({ roomId, roomRent, electricityBill, waterBill, totalBill });
});

export default router;