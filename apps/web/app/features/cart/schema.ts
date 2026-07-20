import z from "zod";

export const addToCartSchema = z.object({
  productVariantId: z.number(),
  quantity: z.number().min(1),
})


export type AddToCartSchema = z.infer<typeof addToCartSchema>
