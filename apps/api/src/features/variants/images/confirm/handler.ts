import { appFactory } from "@/lib/factory"
import { validate } from "@/middleware"
import { db, productImages, productVariants } from "@repo/db"
import { eq } from "drizzle-orm"
import z from "zod"

export const confirmImagesApp = appFactory()
  .post(
    "/:variantId/images/confirm",
    // authMiddleware,
    validate("param", z.object({ variantId: z.coerce.number() })),
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

      const user = c.get("user")
      const { variantId } = c.req.valid("param")
      const { images } = c.req.valid("json")

      const primaryCount = images.filter((img) => img.isPrimary).length
      if (primaryCount > 1) {
        throw new Error("Only one image can be marked as primary")
      }

      try {
        const [variant] = await db
          .select()
          .from(productVariants)
          .where(eq(productVariants.id, variantId))

        if (!variant) {
          throw new Error("Product Not Found")
        }
        
        const insertedImages = await insertImages({
          productId: Number(variant.productId),
          variantId: Number(variant.id),
          images: images,
        })

        if (insertedImages.length <= 0) {
          return c.json(
            {
              error: {
                code: "failed",
                message: "Failed to upload images",
              },
            },
            400
          )
        }

        return c.json({ data: insertedImages }, 200)
      } catch (error) {
        return c.json(
          {
            error: {
              code: "internal_server_error",
              message: "Internal server error" + error,
            },
          },
          500
        )
      }
    }
  )

export async function insertImages({
  productId,
  variantId,
  images,
}: {
  productId: number
  variantId: number
  images: { key: string; sortOrder: number; isPrimary: boolean }[]
}) {
  const inserted = await db
    .insert(productImages)
    .values(
      images.map((img) => ({
        productId,
        variantId,
        key: img.key,
        sortOrder: img.sortOrder,
        isPrimary: img.isPrimary,
      }))
    )
    .returning()

  return inserted
}
