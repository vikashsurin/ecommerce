import { db, productVariants } from "@repo/db"
import { and, eq } from "drizzle-orm"
import z from "zod"
import { appFactory } from "../../../lib/factory"
import { validate } from "../../../middleware"

export const deleteProductVariantApp = appFactory.delete(
  "/:productId/variants/:variantId",
  // authMiddleware,
  validate(
    "param",
    z.object({
      productId: z.coerce.number(),
      variantId: z.coerce.number(),
    })
  ),
  async (c) => {
    const { productId, variantId } = c.req.valid("param")

    try {
      const deleted = await deleteProductVariant(productId, variantId)
      if (!deleted) {
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Variant not found",
            },
          },
          404
        )
      }
      return c.json({ data: deleted })
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: "Failed to delete variant",
          },
        },
        500
      )
    }
  }
)

async function deleteProductVariant(productId: number, variantId: number) {
  const row = await db
    .delete(productVariants)
    .where(
      and(
        eq(productVariants.productId, productId),
        eq(productVariants.id, variantId)
      )
    )
    .returning()

  return row[0] ?? null
}
