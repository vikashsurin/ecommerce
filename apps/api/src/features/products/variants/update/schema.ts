
import { z } from 'zod'

export const updateProductVariantSchema = z.object({
  productId: z.coerce.number(),
  sku: z.string().optional(),
  attributes: z.record(z.string(), z.unknown()).optional(),
  price: z.coerce.number().positive().optional(),
  salePrice: z.coerce.number().positive().nullable().optional(),
  stock: z.coerce.number().int().nonnegative().optional(),
})

export type UpdateProductVariantSchema = z.infer<typeof updateProductVariantSchema>
