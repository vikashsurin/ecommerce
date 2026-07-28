import {
  type Transaction,
  cartItems,
  checkoutSessions,
  db,
  productVariants,
  products
} from "@repo/db";
import { eq, sql } from "drizzle-orm";


export async function updateCheckoutItems(
  userId: number,
  cartId: number,
  tx: Transaction = db,
) {

  const snapshot = await tx
    .select({
      productId: productVariants.productId,
      variantId: productVariants.id,
      name: products.name,
      sku: productVariants.sku,
      attributes: sql<Record<string, string> | undefined>`${productVariants.attributes}`,
      unitPrice: sql<number>`coalesce(${productVariants.salePrice}, ${productVariants.price})`,
      originalUnitPrice: sql<number>`${productVariants.price}`,
      quantity: cartItems.quantity,
    })
    .from(cartItems)
    .innerJoin(productVariants,
      eq(cartItems.productVariantId, productVariants.id))
    .innerJoin(products,
      eq(productVariants.productId, products.id))
    .where(eq(cartItems.cartId, cartId))

  const subtotal = snapshot.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  const row = await db
    .insert(checkoutSessions)
    .values({
      userId,
      cartId,
      subtotal: subtotal,
      total: subtotal,
      items: snapshot,
      status: "in_progress",
      expiresAt,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [checkoutSessions.userId, checkoutSessions.cartId],
      set: {
        subtotal,
        total: subtotal,
        items: snapshot,
        expiresAt,
        updatedAt: new Date(),
      },
    })
    .returning();

  return row[0] ?? null
}
