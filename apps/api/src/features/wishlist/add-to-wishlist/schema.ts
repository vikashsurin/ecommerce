import { z } from 'zod'

export const addToWishlistSchema = z.object({
  productVariantId: z.coerce.number(),
})
