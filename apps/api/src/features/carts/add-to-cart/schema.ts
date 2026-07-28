import { z } from 'zod';

export const addToCartSchema = z.object({
  productVariantId: z.number(),
  quantity: z.number(),
});


export const createCheckoutSessionSchema = z.object({
  cartId: z.number(),
  status: z.enum([
    "in_progress",
    "address_selected",
    "ready_for_payment",
    "completed",
    "abandoned",
    "expired",
  ]),
});

export type AddToCartSchema = z.infer<typeof addToCartSchema>;
export type CreateCheckoutSessionSchema = z.infer<typeof createCheckoutSessionSchema>;
