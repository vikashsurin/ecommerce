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

export const createProductVariantSchema = z.object({
  productId: z.number().min(1, "Product ID must be a positive number"),
  sku: z.string().min(1, "SKU must be at least 1 character"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  salePrice: z.coerce
    .number()
    .min(
      0,
      "Sale price must be a positive number and less than or equal to the price"
    ),
  stock: z.coerce.number().min(0, "Stock must be a positive number"),
  attributes: z.record(z.string(), z.string()),
})

export type CreateProductVariantSchema = z.infer<
  typeof createProductVariantSchema
>


export const updateProductVariantSchema = z
  .object({
    price: z.number().positive().optional(),
    salePrice: z.number().positive().nullable().optional(),
    stock: z.number().int().nonnegative().optional(),
  })
  .refine(
    (data) => data.stock !== undefined || data.price !== undefined || data.salePrice !== undefined,
    {
      message: "You must provide either 'stock' or 'price' or 'salePrice' to update.",
      path: ["stock"],
    }
  );

export const updateSalePriceSchema = z
  .object({
    price: z.number().positive().optional(),
    salePrice: z.number().positive().nullable().optional(),
  })

export type UpdateProductVariantSchema = z.infer<typeof updateProductVariantSchema>
