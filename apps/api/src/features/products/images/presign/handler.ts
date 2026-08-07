import { db, products } from "@repo/db"
import { eq } from "drizzle-orm"
import z from "zod"
import { factory } from "../../../../lib"
import { buildImageKey, getPresignedUploadUrl } from "../../../../lib/storage"
import { validate } from "../../../../middleware"

export const presignImagesApp = factory.createApp().post(
  "/:productId/images/presign",
  // authMiddleware,
  validate("param", z.object({ productId: z.coerce.number() })),
  validate(
    "json",
    z.object({
      images: z
        .array(
          z.object({
            filename: z.string(),
            contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
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

    try {
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))

      if (!product) {
        throw new Error("Product Not Found")
      }

      const presignedResults = await Promise.all(
        images.map(async (img) => {
          const key = buildImageKey({
            productId: productId,
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
