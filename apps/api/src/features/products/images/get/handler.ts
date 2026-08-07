import { validate } from "../../../../middleware"
import { z } from "zod"
import { appFactory } from "../../../../lib/factory"
import { db, productImages } from "@repo/db"
import { eq } from "drizzle-orm"
import { getImageUrl } from "../../../../lib/storage"

export const getImagesApp = appFactory
  .get(
    "/:productId/images",
    validate("param", z.object({ productId: z.coerce.number() })),
    async (c) => {
      const { productId } = c.req.valid("param")

      try {
        const image = await selectImage(productId)
        
        if (!image) {
          return c.json({ data: null })
        }
        
        const { key, ...rest } = image 
        const url = getImageUrl(key)
        
        return c.json({ data:{ ...rest, url }})
      } catch (error) {
        return c.json({
          error: {
            code: 'internal_server_error',
            message: 'Internal server error' + error,
          }
        }, 500)
      }
    }
  )

async function selectImage(productId: number) {
  const row = await db
    .select()
    .from(productImages)
    .where(
      eq(productImages.productId, productId)
    ).limit(1)

  return row[0] ?? null
}
