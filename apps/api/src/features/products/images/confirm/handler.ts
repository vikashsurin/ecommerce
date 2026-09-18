import { productImages } from "@repo/db"
import { and, eq, isNull } from "drizzle-orm"
import z from "zod"
import { AppError, factory } from "../../../../lib"
import { validate } from "../../../../middleware"

export const confirmImagesHandler = factory.createHandlers(
  //
  validate("param", z.object({ productId: z.coerce.number() })),
  validate(
    "json",
    z.object({
      images: z
        .array(
          z.object({
            key: z.string(),
            sortOrder: z.coerce.number(),
            isPrimary: z.boolean(),
          })
        )
        .min(1)
        .max(10), // cap batch size, avoid abuse
    })
  ),
  async (c) => {
    const { productId } = c.req.valid("param")
    const { images } = c.req.valid("json")
    const db = c.get("db")
    const newKey = images[0]?.key ?? ""

    const insertedImages = await upsertImage(db, Number(productId), newKey)

    return c.json(
      {
        data: insertedImages,
      },
      200
    )
  }
)

// It only inserts or updates single image
async function upsertImage(db: any, productId: number, newKey: string) {
  try {
    return db.transaction(async (tx: any) => {
      const [existing] = await tx
        .select()
        .from(productImages)
        .where(
          and(
            eq(productImages.productId, productId),
            isNull(productImages.productVariantId)
          )
        )
        .limit(1)

      if (existing) {
        // await deleteFromStorage(existing.key); // your S3/storage cleanup
        await tx
          .update(productImages)
          .set({ key: newKey, updatedAt: new Date() })
          .where(eq(productImages.id, existing.id))
      } else {
        await tx.insert(productImages).values({
          productId,
          productVariantId: null,
          key: newKey,
          sortOrder: 0,
          isPrimary: false,
        })
      }
    })
  } catch (error) {
    AppError.fromPg(error, { entity: "Product Images" })
  }
}
