import { z } from "zod";

export const createCheckoutSchema = z.object({
  cartId: z.number(),
  addressId: z.number(),
  paymentMethod: z.enum(['card', 'upi', 'netbanking', 'wallet']),
  total: z.number(),
  status: z.enum([
    "in_progress",
    "address_selected",
    "payment_pending",
    "payment_confirmed",
    "completed",
    "abandoned",
  ]),
});


export type CreateCheckoutSchema = z.infer<typeof createCheckoutSchema>;
