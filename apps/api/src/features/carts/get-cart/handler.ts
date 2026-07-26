import { cartItems, carts, db, productVariants } from "@repo/db";
import { asc, eq } from "drizzle-orm";
import { appFactory } from "../../../lib/factory";
import { authMiddleware } from "../../../middleware";

export const getCartApp = appFactory()
  .get('/',
    authMiddleware,
    async (c) => {
      const user = c.get('user')
      try {
        const result = await selectCartByUserId(user.id)

        if (!result) return c.json({ data: null }, 200)

        const total = result.items.reduce((acc, item) => {
          const price = item.productVariant.salePrice ?? item.productVariant.price
          const qty = item.cartItem.quantity;

          return acc + (price * qty)
        }, 0)


        return c.json({
          data:
          {
            ...result.cart,
            items: result.items,
            total: total
          }
        }, 200)

      } catch (error) {
        return c.json({
          error: {
            code: "internal_server_error",
            message: "Internal server error",
          }
        }, 500)
      }
    },
  )


async function selectCartByUserId(userId: number) {
  const [cart] = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, userId));

  if (!cart) return null;

  const items = await db
    .select({
      cartItem: cartItems,
      productVariant: productVariants,
    })
    .from(cartItems)
    .innerJoin(productVariants, eq(cartItems.productVariantId, productVariants.id))
    .where(eq(cartItems.cartId, cart.id))
    .orderBy(asc(cartItems.id));

  return { cart, items };
}
