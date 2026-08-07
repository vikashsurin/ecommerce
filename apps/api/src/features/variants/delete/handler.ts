import { db, productVariants } from "@repo/db"
import { and, eq } from "drizzle-orm"
import z from "zod"
import { AppError } from "../../../lib/app-error"
import { toAppError } from "../../../lib/db-error"
import { appFactory } from "../../../lib/factory"
import { authMiddleware, validate } from "../../../middleware"

export const deleteProductVariantApp = appFactory.delete(
  "/:productId/variants/:variantId",
  authMiddleware,
  validate(
    "param",
    z.object({
      productId: z.coerce.number(),
      variantId: z.coerce.number(),
    })
  ),
  async (c) => {
    const { productId, variantId } = c.req.valid("param")

    const deleted = await deleteProductVariant(productId, variantId)
    if (!deleted) {
      throw AppError.notFound("Product variant not found")
    }
    return c.json({ data: deleted })
  }
)

async function deleteProductVariant(productId: number, variantId: number) {
  try {
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
  } catch (error) {
    toAppError(error, { entity: "Product variant" })
  }
}
