import { apiClient } from "@/lib"
import { InferResponseType } from "hono/client"
import { z } from "zod"

export const createProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoryId: z.number().min(1, "Select a category"),
  brandId: z.number().min(1, "Brand ID must be a positive number"),
})

export type CreateProductSchema = z.infer<typeof createProductSchema>

// Export Type
type ProductResponse = InferResponseType<typeof apiClient.api.products.$get>

type ProductSuccess = Extract<ProductResponse, { data: unknown }>

export type Product = ProductSuccess["data"][number]
