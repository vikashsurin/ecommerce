import { db, productVariants } from "@repo/db"
import { eq } from "drizzle-orm"
import z from "zod"
import { appFactory } from "../../../lib/factory"
import { authMiddleware, validate } from "../../../middleware"

export const listProductVariantsApp = appFactory.get(
  "/:productId/variants",
  authMiddleware,
  validate(
    "param",
    z.object({
      productId: z.coerce.number(),
    })
  ),
  async (c) => {
    const { productId } = c.req.valid("param")
    const user = c.get("user")

    try {
      const result = await selectProductVariants(productId)
      return c.json({ data: result })
    } catch (error) {
      return c.json(
        {
          error: {
            code: "INTERNAL_SERVER_ERROR",
            message: error instanceof Error ? error.message : String(error),
          },
        },
        500
      )
    }
  }
)

async function selectProductVariants(productId: number) {
  const rows = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, productId))

  return rows
}
