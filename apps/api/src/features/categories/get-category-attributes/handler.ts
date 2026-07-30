import { categoryAttributes, db } from "@repo/db"
import { appFactory } from "../../../lib/factory"
import { validate } from "../../../middleware"
import { z } from "zod"
import { eq } from "drizzle-orm"

export const getCategoryAttributes = appFactory().get(
  "/:id/attributes",
  // authMiddleware,
  validate("param", z.object({ id: z.coerce.string() })),
  async (c) => {
    const { id } = c.req.valid("param")

    console.log("id", id)

    try {
      const attributes = await selectAttributesById(Number(id))
      return c.json({ data: attributes })
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: error instanceof Error ? error.message : "Unknown error",
          },
        },
        500
      )
    }
  }
)

async function selectAttributesById(id: number) {
  const rows = await db
    .select()
    .from(categoryAttributes)
    .where(eq(categoryAttributes.categoryId, id))

  return rows
}
