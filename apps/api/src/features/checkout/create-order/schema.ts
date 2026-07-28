import { z } from "zod";

export const createRazorpayOrderSchema = z.object({
  checkoutSessionId: z.coerce.number()
})

export type CreateRazorpayOrderSchema = z.infer<typeof createRazorpayOrderSchema>;
