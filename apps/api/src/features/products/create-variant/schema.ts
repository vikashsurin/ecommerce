
import { z } from 'zod'

export const createProductVariantSchema = z.object({
  productId: z.coerce.number(),
  attributes: z.record(z.string(), z.string()),
  price: z.coerce.number().positive(),
  salePrice: z.coerce.number().positive().nullable(),
  stock: z.coerce.number().int().nonnegative(),
  sku: z.string(),
})

export type CreateProductVariantSchema = z.infer<typeof createProductVariantSchema>
