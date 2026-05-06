import { z } from "zod";

export function validate(schema) {
  return (request, response, next) => {
    const parsed = schema.safeParse(request.body);
    if (!parsed.success) {
      return response.status(400).json({ error: parsed.error.issues[0].message });
    }
    request.body = parsed.data;
    next();
  };
}

export const schemas = {
  createRoom: z.object({
    name: z.string().min(1, "name is required"),
  }),

  createInvoice: z.object({
    roomId: z.coerce.number().int().positive("roomId is required"),
    roomRent: z.coerce.number().nonnegative("roomRent is required"),
    electricityConsumption: z.coerce.number().nonnegative("electricityConsumption is required"),
    electricityPrice: z.coerce.number().nonnegative("electricityPrice is required"),
    waterConsumption: z.coerce.number().nonnegative("waterConsumption is required"),
    waterPrice: z.coerce.number().nonnegative("waterPrice is required"),
  }),
};
