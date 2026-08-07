import { db, productVariants } from "@repo/db"
import { eq } from "drizzle-orm"
import z from "zod"
import { factory } from "../../../../lib"
import { buildImageKey, getPresignedUploadUrl } from "../../../../lib/storage"
import { authMiddleware, validate } from "../../../../middleware"

export const presignImagesApp = factory.createApp().post(
  "/:variantId/images/presign",
  authMiddleware,
  validate("param", z.object({ variantId: z.coerce.number() })),
  validate(
    "json",
    z.object({
      images: z.array(
        z.object({
          filename: z.string(),
          contentType: z.string(),
        })
      ),
    })
  ),
  async (c) => {
    const { variantId } = c.req.valid("param")
    const { images } = c.req.valid("json")

    try {
      const [variant] = await db
        .select()
        .from(productVariants)
        .where(eq(productVariants.id, variantId))

      if (!variant) {
        throw new Error("Product Not Found")
      }

      const presignedResults = await Promise.all(
        images.map(async (img) => {
          const key = buildImageKey({
            productId: variant.productId,
            variantId: variant.id,
            filename: img.filename,
          })

          const presignedUrl = await getPresignedUploadUrl({
            key,
            contentType: img.contentType,
            expiresIn: 300,
          })

          return { key, presignedUrl, contentType: img.contentType }
        })
      )

      return c.json({ data: presignedResults }, 200)
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
