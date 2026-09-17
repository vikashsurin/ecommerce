import { productImages, productVariants, type Transaction } from "@repo/db"
import { eq } from "drizzle-orm"
import z from "zod"
import { AppError, factory } from "../../../lib"
import { getImageUrl } from "../../../lib/storage"
import { authMiddleware, dbMiddleware, validate } from "../../../middleware"

export const getVariantHandler = factory.createHandlers(
  dbMiddleware,
  authMiddleware,
  validate("param", z.object({ id: z.coerce.number() })),
  async (c) => {
    const { id } = c.req.valid("param")
    const db = c.get("db")
    const variant = await selectVariant(db, Number(id))

    if (!variant) {
      AppError.notFound("Variant not found")
    }

    return c.json({ data: variant })
  }
)

async function selectVariant(db: Transaction, id: number) {
  try {
    const { row, images } = await db.transaction(async (tx: Transaction) => {
      const [[row], images] = await Promise.all([
        tx.select().from(productVariants).where(eq(productVariants.id, id)),
        tx
          .select()
          .from(productImages)
          .where(eq(productImages.productVariantId, id)),
      ])
      return { row, images }
    })

    return {
      ...row,
      images: images.map(({ key, ...rest }) => ({
        ...rest,
        url: getImageUrl(key),
      })),
    }
  } catch (error) {
    AppError.fromPg(error, { entity: "Variant" })
  }
}
