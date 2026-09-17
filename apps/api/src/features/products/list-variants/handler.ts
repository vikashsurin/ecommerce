import { productVariants } from "@repo/db"
import { eq } from "drizzle-orm"
import z from "zod"
import { factory } from "../../../lib"
import { authMiddleware, dbMiddleware, validate } from "../../../middleware"

export const listProductVariantsHandler = factory.createHandlers(
  authMiddleware,
  dbMiddleware,
  validate(
    "param",
    z.object({
      productId: z.coerce.number(),
    })
  ),
  async (c) => {
    const { productId } = c.req.valid("param")
    const user = c.get("user")
    const db = c.get("db")

    try {
      const result = await selectProductVariants(db, productId)
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

async function selectProductVariants(db: any, productId: number) {
  const rows = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, productId))

  return rows
}
