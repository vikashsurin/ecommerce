import { db, productImages } from "@repo/db"
import z from "zod"
import { factory } from "../../../../lib"
import { validate } from "../../../../middleware"

export const confirmImagesApp = factory.createApp().post(
  "/:productId/images/confirm",
  // authMiddleware,
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
    const user = c.get("user")
    const { productId } = c.req.valid("param")
    const { images } = c.req.valid("json")

    const primaryCount = images.filter((img) => img.isPrimary).length
    if (primaryCount > 1) {
      throw new Error("Only one image can be marked as primary")
    }

    try {
      const insertedImages = await insertImages({
        productId: Number(productId),
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

      return c.json(
        {
          data: insertedImages,
        },
        200
      )
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
  images,
}: {
  productId: number
  images: { key: string; sortOrder: number; isPrimary: boolean }[]
}) {
  const inserted = await db
    .insert(productImages)
    .values(
      images.map((img) => ({
        productId,
        key: img.key,
        sortOrder: img.sortOrder,
        isPrimary: img.isPrimary,
      }))
    )
    .returning()

  return inserted
}
