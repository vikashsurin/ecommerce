import { apiClient } from "@/lib"
import { InferResponseType } from "hono/client"
import { z } from "zod"


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

export type CreateProductVariantResponse = InferResponseType<typeof apiClient.api.products[':productId']['variants']['$get'], 200>

export type ProductVariant = CreateProductVariantResponse['data'][number]

export const updateProductVariantSchema = z
  .object({
    price: z.number().positive().optional(),
    salePrice: z.number().positive().nullable().optional(),
    stock: z.number().int().nonnegative().optional(),
  })
  .refine(
    (data) => {
      if (typeof data.salePrice === "number" && typeof data.price === "number") {
        return data.salePrice <= data.price
      }
      return true // nothing to compare, so this check doesn't apply
    },
    {
      message: "Sale price must be less than or equal to the price",
      path: ["salePrice"],
    }
  )
  .refine(
    (data) =>
      data.stock !== undefined ||
      data.price !== undefined ||
      data.salePrice !== undefined,
    {
      message: "You must provide either 'stock', 'price', or 'salePrice' to update.",
      path: ["stock"],
    }
  )


export const updateSalePriceSchema = z
  .object({
    price: z.number().positive().optional(),
    salePrice: z.number().positive().nullable().optional(),
  })

export type UpdateProductVariantSchema = z.infer<typeof updateProductVariantSchema>
