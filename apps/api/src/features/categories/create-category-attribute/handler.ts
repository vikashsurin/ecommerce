import { categoryAttributes, db } from "@repo/db"
import { appFactory } from "../../../lib/factory"
import { validate } from "../../../middleware"
import { createCategoryAttributeSchema } from "./schema"

export const createCategoryAttributeApp = appFactory().post(
  "/attributes",
  // authMiddleware,
  validate("json", createCategoryAttributeSchema),
  async (c) => {
    const data = c.req.valid("json")

    try {
      const attribute = await insertCategoryAttribute(data)
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

async function insertCategoryAttribute(data: any) {
  const result = await db.insert(categoryAttributes).values(data).returning()
  return result[0] ?? null
}
