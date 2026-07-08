import { cartItems, carts, db } from "@repo/db";
import { eq } from "drizzle-orm";
import { type AddToCartSchema } from "../add-to-cart/schema";

export async function addItemToCart(cartId: number, data: AddToCartSchema) {
  const cartItem = await db
    .insert(cartItems)
    .values({
      cartId,
      productVariantId: data.productVariantId,
      quantity: data.quantity,
    })
    .returning()
  return cartItem[0] ?? null
}


export async function findOrCreateCart(userId: number) {
  const [cart] = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, userId))
    .limit(1)

  if (!cart) {
    const [newCart] = await db
      .insert(carts)
      .values({ userId, sessionId: 1 })
      .returning()

    if (!newCart) {
      throw new Error('Failed to create cart')
    }

    return newCart.id
  }

  return cart.id
}
