import { categories, db } from "@repo/db"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { appFactory } from "../../../lib/factory"
import { validate } from "../../../middleware"

export const deleteCategoryApp = appFactory().delete(
  "/:id",
  // authMiddleware,
  validate("param", z.object({ id: z.string() })),
  async (c) => {
    const { id } = c.req.valid("param")
    try {
      const deleted = await deleteCategoryById(Number(id))
      if (!deleted) {
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Category not found",
            },
          },
          404
        )
      }
      return c.json({ data: { id: deleted?.id } })
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

async function deleteCategoryById(id: number) {
  const row = await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning()

  return row[0] ?? null
}
