import { apiClient } from '@/lib'
import { InferResponseType } from 'hono/client'
import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  salePrice: z.number(),
  stock: z.number(),
  categoryId: z.number(),
  brandId: z.number(),
})

export type CreateProductSchema = z.infer<typeof createProductSchema>



// Export Type
type ProductResponse = InferResponseType<typeof apiClient.api.products.$get>

type ProductSuccess = Extract<ProductResponse, { data: unknown }>

export type Product = ProductSuccess['data'][number];
