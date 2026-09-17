import { products } from "@repo/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { factory } from "../../../lib";
import { dbMiddleware, validate } from "../../../middleware";

export const deleteProductHandler = factory.createHandlers(
  dbMiddleware,
  validate("param", z.object({ id: z.coerce.number() })), async (c) => {
    const { id } = c.req.valid("param");
    const db = c.get("db")

    try {
      const deletedProduct = await deleteProduct(db, id);
      if (!deletedProduct) {
        return c.json({ error: "Product not found" }, 404);
      }
      return c.json({ message: `Product ${id} deleted` }, 200);
    } catch (error) {
      return c.json({ error: "Failed to delete product" }, 500);
    }
  });

async function deleteProduct(db: any, id: number) {
  const [product] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();
  return product;
}
