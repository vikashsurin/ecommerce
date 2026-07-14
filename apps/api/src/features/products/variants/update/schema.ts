
import { z } from 'zod'

export const updateProductVariantSchema = z.object({
  productId: z.coerce.number(),
  sku: z.string().optional(),
  attributes: z.record(z.string(), z.unknown()).optional(),
  price: z.coerce.number().optional(),
  salePrice: z.coerce.number().optional(),
  stock: z.coerce.number().optional(),
})

export type UpdateProductVariantSchema = z.infer<typeof updateProductVariantSchema>
