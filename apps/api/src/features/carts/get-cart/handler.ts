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
        const cart = await selectCartByUserId(user.id)

        const total = cart.reduce((acc, item) => {
          const price = item.productVariant.salePrice ?? item.productVariant.price
          const qty = item.cartItem.quantity;

          return acc + (price * qty)
        }, 0)


        return c.json({
          data:
          {
            cart: {
              items: cart,
              total: total
            }
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
    .where(eq(carts.userId, userId))
  if (!cart) return []

  const rows = await db
    .select({
      cartItem: cartItems,
      productVariant: productVariants,
    })
    .from(cartItems)
    .innerJoin(productVariants, eq(cartItems.productVariantId, productVariants.id))
    .where(eq(cartItems.cartId, cart.id))
    .orderBy(asc(cartItems.id))

  return rows
}
