import { db, productVariants } from "@repo/db"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import { appFactory } from "@/lib/factory"
import { validate } from "@/middleware"
import {
  type UpdateProductVariantSchema,
  updateProductVariantSchema,
} from "./schema"

export const updateProductVariantApp = appFactory().put(
  "/:productId/variants/:variantId",
  // authMiddleware,
  validate(
    "param",
    z.object({
      productId: z.coerce.number(),
      variantId: z.coerce.number(),
    })
  ),
  validate("json", updateProductVariantSchema),
  async (c) => {
    const { productId, variantId } = c.req.valid("param")
    const data = c.req.valid("json")

    try {
      const variant = await updateProductVariant(productId, variantId, data)
      return c.json({ data: variant })
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: error instanceof Error ? error.message : String(error),
          },
        },
        500
      )
    }
  }
)

async function updateProductVariant(
  productId: number,
  variantId: number,
  data: UpdateProductVariantSchema
) {
  const row = await db
    .update(productVariants)
    .set(data)
    .where(
      and(
        eq(productVariants.productId, productId),
        eq(productVariants.id, variantId)
      )
    )
    .returning()

  return row[0] ?? null
}
