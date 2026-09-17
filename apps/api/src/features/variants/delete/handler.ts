import { productVariants } from "@repo/db"
import { and, eq } from "drizzle-orm"
import z from "zod"
import { factory } from "../../../lib"
import { AppError } from "../../../lib/app-error"
import { authMiddleware, dbMiddleware, validate } from "../../../middleware"

export const deleteProductVariantHandler = factory.createHandlers(
  dbMiddleware,
  authMiddleware,
  validate(
    "param",
    z.object({
      id: z.coerce.number(),
    })
  ),
  async (c) => {
    const db = c.get("db")
    const { id } = c.req.valid("param")

    const deleted = await deleteProductVariant(db, id)
    if (!deleted) {
      throw AppError.notFound("Product variant not found")
    }
    return c.json({ data: deleted })
  }
)

async function deleteProductVariant(db: any, id: number) {
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
