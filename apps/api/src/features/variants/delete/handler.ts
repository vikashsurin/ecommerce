import { db, productVariants } from "@repo/db"
import { and, eq } from "drizzle-orm"
import z from "zod"
import { factory } from "../../../lib"
import { AppError } from "../../../lib/app-error"
import { authMiddleware, validate } from "../../../middleware"

export const deleteProductVariantApp = factory.createApp().delete(
  "/:id",
  authMiddleware,
  validate(
    "param",
    z.object({
      id: z.coerce.number(),
    })
  ),
  async (c) => {
    const { id } = c.req.valid("param")

    const deleted = await deleteProductVariant(id)
    if (!deleted) {
      throw AppError.notFound("Product variant not found")
    }
    return c.json({ data: deleted })
  }
)

async function deleteProductVariant(id: number) {
  try {
    const row = await db
      .delete(productVariants)
      .where(and(eq(productVariants.id, id)))
      .returning()
    return row[0] ?? null
  } catch (error) {
    AppError.fromPg(error, { entity: "Product variant" })
  }
}
