import { categories, db } from "@repo/db"
import { appFactory } from "../../../lib/factory"
import { authMiddleware } from "../../../middleware"

export const listCategoriesApp = appFactory().get(
  "/",
  // authMiddleware,
  async (c) => {
    try {
      const categories = await selectCategories()
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

async function selectCategories() {
  const rows = await db.select().from(categories)
  return rows
}
