
import { z } from 'zod'

export const createProductVariantSchema = z.object({
  productId: z.coerce.number(),
  attributes: z.record(z.string(), z.unknown()),
  price: z.coerce.number(),
  salePrice: z.coerce.number(),
  stock: z.coerce.number(),
  sku: z.string(),
})

export type CreateProductVariantSchema = z.infer<typeof createProductVariantSchema>
