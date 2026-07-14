import { db, productVariants } from "@repo/db";
import { z } from "zod";
import { appFactory } from "../../../../lib/factory";
import { validate } from "../../../../middleware";
import { type CreateProductVariantSchema, createProductVariantSchema } from "./schema";

export const createProductVariantApp = appFactory()
  .post('/:productId/variants',
    // authMiddleware,
    validate("param", z.object({ productId: z.coerce.number() })),
    validate('json', createProductVariantSchema),
    async (c) => {
      const {productId} = c.req.valid('param')
      const data = c.req.valid('json');

      try {
        const variant = await insertProductVariant(data);
        return c.json({data:variant}, 201);
      } catch (error) {

        return c.json({
          error: {
          code:"internal_server_error",
          message: "Internal server error",
        }}, 500)
      }
    })

async function insertProductVariant(data: CreateProductVariantSchema) {
  const row = await db
    .insert(productVariants)
    .values(data)
    .returning();
  return row[0]?? null
}
