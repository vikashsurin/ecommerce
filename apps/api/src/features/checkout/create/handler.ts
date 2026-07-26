import { cartItems, checkoutSessions, db, products, productVariants } from "@repo/db";
import { and, eq, sql } from "drizzle-orm";
import { appFactory } from "../../../lib/factory";
import { authMiddleware, validate } from "../../../middleware";
import { createCheckoutSchema, type CreateCheckoutSchema } from "./schema";

export const createCheckOut = appFactory()
  .post("/",
    authMiddleware,
    validate("json", createCheckoutSchema),
    async (c) => {
      const user = c.get("user");
      const data = c.req.valid('json')

      try {
        const checkout = await upsertCheckoutSession(user.id, data)
        console.log('RESULT', checkout)
        return c.json({ data: checkout })
      } catch (error) {
        console.log({ error })
        return c.json({
          error: {
            code: 'internal_server_error',
            message: "Internal server error",
          }
        }, 500)
      }
    });

async function upsertCheckoutSession(userId: number, data: CreateCheckoutSchema
) {
  const { total } = data //TODO: fetch from db and calculate subtotal

  const [existing] = await db
    .select()
    .from(checkoutSessions)
    .where(and(
      eq(checkoutSessions.userId, userId),
      eq(checkoutSessions.cartId, data.cartId)
    ));

  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  const snapshot = await db
    .select({
      productId: productVariants.productId,
      variantId: productVariants.id,
      name: products.name,
      sku: productVariants.sku,
      attributes: sql<Record<string, string> | undefined>`${productVariants.attributes}`,
      unitPrice: sql<number>`${productVariants.salePrice ?? productVariants.price}`,
      originalUnitPrice: sql<number>`${productVariants.price}`,
      quantity: cartItems.quantity,
    })
    .from(cartItems)
    .innerJoin(productVariants,
      eq(cartItems.productVariantId, productVariants.id))
    .innerJoin(products,
      eq(productVariants.productId, products.id))
    .where(eq(cartItems.cartId, data.cartId))


  if (existing) {
    const [updated] = await db
      .update(checkoutSessions)
      .set({
        addressId: data.addressId,
        subtotal: 565656, // calcualte in server
        items: snapshot,
        total,
        status: "address_selected",
        expiresAt,
        updatedAt: new Date(),
      })
      .where(eq(checkoutSessions.id, existing.id))
      .returning();
    return updated;
  }




  const [created] = await db
    .insert(checkoutSessions)
    .values({
      userId,
      items: snapshot,
      cartId: data.cartId,
      addressId: data.addressId,
      subtotal: 565656,
      total,
      status: "address_selected",
      expiresAt,
    })
    .returning();
  return created;
}
