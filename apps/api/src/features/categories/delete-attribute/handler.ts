import z from "zod"
import { factory } from "../../../lib"
import { dbMiddleware, validate } from "../../../middleware"
import { categoryAttributes } from "@repo/db"
import { eq } from "drizzle-orm"

export const deleteAttributeHandler = factory.createHandlers(
  dbMiddleware,
  validate("param", z.object({ id: z.coerce.number() })),
  async (c) => {
    const { id } = c.req.valid("param")
    const db = c.get("db")
    try {
      const deleted = await deleteAttributeById(db, id)
      return c.json({ data: deleted })
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

async function deleteAttributeById(db: any, id: number) {
  const row = await db
    .delete(categoryAttributes)
    .where(eq(categoryAttributes.id, id))
    .returning()
  return row[0] ?? null
}
