import { productVariants } from "@repo/db"
import { z } from "zod"
import { factory } from "../../../lib"
import { authMiddleware, dbMiddleware, validate } from "../../../middleware"
import {
  type CreateProductVariantSchema,
  createProductVariantSchema,
} from "./schema"

export const createProductVariantHandler = factory.createHandlers(
    authMiddleware,
    dbMiddleware,
    validate("param", z.object({ productId: z.coerce.number() })),
    validate("json", createProductVariantSchema),
    async (c) => {
      const { productId } = c.req.valid("param")
      const data = c.req.valid("json")
      const db = c.get("db")

      try {
        const variant = await insertProductVariant(db, data)

        console.log({ variant })
        return c.json({ data: variant }, 201)
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

async function insertProductVariant(db: any, data: CreateProductVariantSchema) {
  const row = await db.insert(productVariants).values(data).returning()
  return row[0] ?? null
}
