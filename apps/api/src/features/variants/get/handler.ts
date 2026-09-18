import { productImages, productVariants } from "@repo/db"
import { eq } from "drizzle-orm"
import z from "zod"
import { type DB, type Transaction } from "../../../db"
import { AppError, factory } from "../../../lib"
import { getImageUrl } from "../../../lib/storage"
import { validate } from "../../../middleware"

export const getVariantHandler = factory.createHandlers(
  validate("param", z.object({ id: z.coerce.number() })),
  async (c) => {
    const { id } = c.req.valid("param")
    const db = c.get("db")
    const variant = await selectVariant(db, Number(id), c)

    if (!variant) {
      AppError.notFound("Variant not found")
    }

    return c.json({ data: variant })
  }
)

async function selectVariant(db: DB, id: number, c: any) {
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
        url: getImageUrl(c, key),
      })),
    }
  } catch (error) {
    AppError.fromPg(error, { entity: "Variant" })
  }
}
