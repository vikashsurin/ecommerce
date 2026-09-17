import { productImages, productVariants } from "@repo/db"
import { and, eq, sql } from "drizzle-orm"
import z from "zod"
import { AppError, factory } from "../../../../lib"
import { authMiddleware, dbMiddleware, validate } from "../../../../middleware"

export const confirmImagesHandler = factory.createHandlers(
  dbMiddleware,
  authMiddleware,
  validate("param", z.object({ variantId: z.coerce.number() })),
  validate(
    "json",
    z.object({
      images: z
        .array(
          z.object({
            key: z.string(),
          })
        )
        .min(1)
        .max(10),
    })
  ),
  async (c) => {
    const db = c.get("db")
    const { variantId } = c.req.valid("param")
    const { images } = c.req.valid("json")

    const [variant] = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.id, variantId))

    if (!variant) {
      throw new Error("Product Not Found")
    }

    const insertedImages = await insertImages(db, {
      variantId: Number(variant.id),
      images: images,
    })

    if (insertedImages.length <= 0) {
      throw AppError.internal()
    }

    return c.json({ data: insertedImages }, 200)
  }
)

async function insertImages(
  db: any,
  {
    variantId,
    images,
  }: {
    variantId: number
    images: { key: string }[]
  }
) {
  try {
    return await db.transaction(async (tx:any) => {
      const [[variant], hasPrimary, maxSortResult] = await Promise.all([
        tx
          .select()
          .from(productVariants)
          .where(eq(productVariants.id, variantId))
          .for("update"),
        tx
          .select({ id: productImages.id })
          .from(productImages)
          .where(
            and(
              eq(productImages.productVariantId, variantId),
              eq(productImages.isPrimary, true)
            )
          )
          .limit(1),
        tx
          .select({
            maxSort: sql<number>`COALESCE(MAX(${productImages.sortOrder}), -1)`,
          })
          .from(productImages)
          .where(eq(productImages.productVariantId, variantId)),
      ])

      const maxSort = maxSortResult[0]?.maxSort ?? -1

      if (!variant) {
        throw AppError.notFound("Variant not found")
      }

      const inserted = await tx
        .insert(productImages)
        .values(
          images.map((img, i) => ({
            productId: variant.productId,
            productVariantId: variantId,
            key: img.key,
            sortOrder: maxSort + 1 + i,
            isPrimary: hasPrimary.length > 0 ? false : i === 0,
          }))
        )
        .returning()

      return inserted
    })
  } catch (error) {
    AppError.fromPg(error, { entity: "Variant Images" })
  }
}
