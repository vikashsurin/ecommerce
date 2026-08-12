import { db, productVariants } from "@repo/db"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import { factory } from "../../../lib"
import { validate } from "../../../middleware"
import {
  type UpdateProductVariantSchema,
  updateProductVariantSchema,
} from "./schema"

export const updateProductVariantApp = factory.createApp().put(
  "/:id",
  // authMiddleware,
  validate(
    "param",
    z.object({
      id: z.coerce.number(),
    })
  ),
  validate("json", updateProductVariantSchema),
  async (c) => {
    const {  id } = c.req.valid("param")
    const data = c.req.valid("json")

    try {
      const variant = await updateProductVariant( id, data)
      return c.json({ data: variant })
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

async function updateProductVariant(
  id: number,
  data: UpdateProductVariantSchema
) {
  const row = await db
    .update(productVariants)
    .set(data)
    .where(
      and(
        eq(productVariants.id, id)
      )
    )
    .returning()

  return row[0] ?? null
}
