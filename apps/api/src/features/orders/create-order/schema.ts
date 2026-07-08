
import z from "zod";

export const createOrderSchema = z.object({
  cartId: z.number(),
  shippingAddress: z.string(),
})
