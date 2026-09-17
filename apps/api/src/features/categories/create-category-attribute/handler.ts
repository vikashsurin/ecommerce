import { categoryAttributes } from "@repo/db"
import { factory } from "../../../lib"
import { dbMiddleware, validate } from "../../../middleware"
import { createCategoryAttributeSchema } from "./schema"

export const createCategoryAttributeHandler = factory.createHandlers(
  dbMiddleware,
  validate("json", createCategoryAttributeSchema),
  async (c) => {
    const data = c.req.valid("json")
    const db = c.get("db")

    try {
      const attribute = await insertCategoryAttribute(db, data)
      return c.json({ data: attribute })
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: error instanceof Error ? error.message : String(error),
          },
        },
        500
      )
    }
  }
)

async function insertCategoryAttribute(db: any, data: any) {
  const result = await db.insert(categoryAttributes).values(data).returning()
  return result[0] ?? null
}
