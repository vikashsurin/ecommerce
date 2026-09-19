import {
  cartItems,
  checkoutSessions,
  productVariants,
  products,
} from "@repo/db"
import { eq, notInArray, sql } from "drizzle-orm"
import { type DB } from "../../../db"

export async function checkoutSessionCart(
  db: DB,
  userId: number,
  cartId: number,
  tx: DB = db
) {
  const pv = productVariants
  const itemsSnapshot = await tx
    .select({
      productId: pv.productId,
      variantId: pv.id,
      name: products.name,
      sku: pv.sku,
      attributes: pv.attributes,
      unitPrice: sql<number>`coalesce(${pv.salePrice}, ${pv.price})`,
      originalUnitPrice: sql<number>`${pv.price}`,
      quantity: cartItems.quantity,
    })
    .from(cartItems)
    .innerJoin(pv, eq(cartItems.productVariantId, pv.id))
    .innerJoin(products, eq(pv.productId, products.id))
    .where(eq(cartItems.cartId, cartId))

  const sanitizedItemsSnapshot = itemsSnapshot.map((item) => ({
    ...item,
    attributes:
      typeof item.attributes === "string"
        ? JSON.parse(item.attributes)
        : item.attributes,
  }))

  const subtotal = sanitizedItemsSnapshot .reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  )

  const expiresAt = new Date(Date.now() + 30 * 60 * 1000)

  const row = await tx
    .insert(checkoutSessions)
    .values({
      userId,
      cartId,
      subtotal: subtotal,
      total: subtotal,
      items: sanitizedItemsSnapshot,
      status: "in_progress",
      expiresAt,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [checkoutSessions.userId, checkoutSessions.cartId],
      targetWhere: notInArray(checkoutSessions.status, [
        "completed",
        "abandoned",
        "expired",
      ]),
      set: {
        subtotal,
        total: subtotal,
        items: sanitizedItemsSnapshot,
        expiresAt,
        updatedAt: new Date(),
      },
    })
    .returning()

  return row[0] ?? null
}
