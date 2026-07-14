import { db, products } from "@repo/db";
import { eq } from "drizzle-orm";

export async function getProductById(id: number) {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return product[0];
}
