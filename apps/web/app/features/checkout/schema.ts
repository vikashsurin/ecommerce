import { z } from "zod";

export const addCheckoutItemsSchema = z.object({
  cartId: z.number(),
});

export const addCheckoutAddressSchema = z.object({
  addressId: z.number(),
  checkoutSessionId: z.number()
});

export type AddCheckoutItemsSchema = z.infer<typeof addCheckoutItemsSchema>;
export type AddCheckoutAddressSchema = z.infer<typeof addCheckoutAddressSchema>;
