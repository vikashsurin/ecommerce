import { categoryAttributes, db } from "@repo/db"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { factory } from "../../../lib"
import { validate } from "../../../middleware"
import { updateCategoryAttributeSchema } from "./schema"

export const updateAttributeApp = factory.createApp().put(
  "/attributes/:id",
  // authMiddleware,
  validate("param", z.object({ id: z.coerce.number() })),
  validate("json", updateCategoryAttributeSchema),
  async (c) => {
    const { id } = c.req.valid("param")
    const data = c.req.valid("json")

    try {
      const updated = await updateAttributeById(id, data)

      console.log({ updated })

      if (!updated)
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Attribute not found",
            },
          },
          404
        )

      return c.json({
        data: updated,
      })
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

async function updateAttributeById(
  id: number,
  data: z.infer<typeof updateCategoryAttributeSchema>
) {
  const row = await db
    .update(categoryAttributes)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(categoryAttributes.id, id))
    .returning()

  return row[0] ?? null
}
