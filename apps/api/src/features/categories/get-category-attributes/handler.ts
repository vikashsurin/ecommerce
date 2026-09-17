import { categoryAttributes } from "@repo/db"
import { factory } from "../../../lib"
import { dbMiddleware, validate } from "../../../middleware"
import { z } from "zod"
import { eq } from "drizzle-orm"

export const getCategoryAttributesHandler = factory.createHandlers(
  dbMiddleware,
  validate("param", z.object({ id: z.coerce.string() })),
  async (c) => {
    const { id } = c.req.valid("param")
    const db = c.get("db")

    console.log("id", id)

    try {
      const attributes = await selectAttributesById(db, Number(id))
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

async function selectAttributesById(db: any, id: number) {
  const rows = await db
    .select()
    .from(categoryAttributes)
    .where(eq(categoryAttributes.categoryId, id))

  return rows
}
