import { db, products } from '@repo/db';
import { eq } from 'drizzle-orm';
import { Hono } from "hono";
import { z } from "zod";
import { validate } from "../../../middleware/validate";

const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export const updateProductApp = new Hono()
  .put('/:id',
    validate('param', z.object({ id: z.coerce.number() })),
    validate('json', updateProductSchema),
    async (c) => {
      const { id } = c.req.valid('param');
      const data = c.req.valid('json');

      try {
        const updated = await updateProduct(id, data);
        if (!updated) {
          return c.json({ error: 'Unable to update product' }, 404);
        }
        return c.json(updated);
      } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : String(error) }, 500);
      }
    });


async function updateProduct(id: number, data: z.infer<typeof updateProductSchema>) {
  const result = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
  return result[0] || null;
}
