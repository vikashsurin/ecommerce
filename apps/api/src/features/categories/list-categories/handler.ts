import { categories } from "@repo/db"
import { factory } from "../../../lib"
import { dbMiddleware } from "../../../middleware"

export const listCategoriesHandler = factory.createHandlers(
  dbMiddleware,
  async (c) => {
    const db = c.get("db")
    try {
      const categories = await selectCategories(db)
      return c.json({ data: categories })
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

async function selectCategories(db: any) {
  const rows = await db.select().from(categories)
  return rows
}
