import { db, productImages, productVariants } from "@repo/db"
import { eq } from "drizzle-orm"
import z from "zod"
import { factory } from "../../../lib"
import { authMiddleware, validate } from "../../../middleware"

export const getVariantApp = factory.createApp().get(
  "/:id",
  authMiddleware,
  validate("param", z.object({ id: z.coerce.number() })),
  async (c) => {
    const { id } = c.req.param()
    try {
      const variant = await selectVariant(Number(id))
      if (!variant) {
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Not Found",
            },
          },
          404
        )
      }

      return c.json({ data: variant })
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: "Internal Server Error",
          },
        },
        500
      )
    }
  }
)

async function selectVariant(id: number) {
  const [row] = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.id, id))

  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productVariantId, id))

  return { ...row, images }
}
