import z from "zod";
import { appFactory } from "../../../lib/factory";
import { authMiddleware, validate } from "../../../middleware";
import { categoryAttributes, db } from "@repo/db";
import { eq } from "drizzle-orm";

export const deleteAttributeApp = appFactory()
  .delete('/attributes/:id',
    // authMiddleware,
    validate('param', z.object({id: z.coerce.number()})),
    async (c) => {
      const { id } =  c.req.valid('param')
      try {
      const deleted = await deleteAttributeById(id)
      return c.json({ data:deleted})
      } catch (error) {
        return c.json({
          error: {
            code: "internal_server_error",
            message: error instanceof Error ? error.message : "Unknown error",
          }
        }, 500)
      }
    })


async function deleteAttributeById(id: number) {
  const row = await db
    .delete(categoryAttributes)
    .where(eq(categoryAttributes.id, id))
    .returning()
  return row[0]?? null
}
