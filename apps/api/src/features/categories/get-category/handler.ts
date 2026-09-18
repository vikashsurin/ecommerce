import { categories } from "@repo/db"
import { eq } from "drizzle-orm"
import z from "zod"
import { factory } from "../../../lib"
import { validate } from "../../../middleware"

export const getCategoryHandler = factory.createHandlers(
  validate("param", z.object({ categoryId: z.coerce.number() })),
  async (c) => {
    const { categoryId } = c.req.valid("param")
    const db = c.get("db")
    try {
      const category = await selectCategory(db, categoryId)

      if (!category) {
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

      return c.json({ data: category })
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: "Internal server error",
          },
        },
        500
      )
    }
  }
)

async function selectCategory(db: any, categoryId: number) {
  const row = await db
    .select()
    .from(categories)
    .where(eq(categories.id, categoryId))

  return row[0] ?? null
}
