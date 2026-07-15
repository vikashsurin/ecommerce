import { categories, db } from "@repo/db";
import { eq } from "drizzle-orm";
import z from "zod";
import { appFactory } from "../../../lib/factory";
import { authMiddleware, validate } from "../../../middleware";

export const getCategoryApp = appFactory()
  .get("/:categoryId",
    // authMiddleware,
    validate("param", z.object({categoryId:z.coerce.number()})),
    async (c) => {
      const { categoryId } = c.req.valid("param");

      try {
        const category = await selectCategory(categoryId);

        if (!category) {
          return c.json({
            error: {
              code: 'not_found',
              message: 'Category not found'
            }
          },404)
        }

        return c.json({ data: category });

      } catch (error) {
        return c.json({
          error: {
            code: 'internal_server_error',
            message: 'Internal server error'
          }
        },500)
      }
  })


async function selectCategory(categoryId: number) {
  const row = await db
    .select()
    .from(categories)
    .where(eq(categories.id, categoryId))

  return row[0] ?? null
}
