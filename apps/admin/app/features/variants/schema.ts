import { apiClient } from "@/lib"
import { InferResponseType } from "hono"
import z from "zod"



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
