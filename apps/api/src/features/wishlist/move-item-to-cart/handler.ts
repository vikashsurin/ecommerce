import { db, wishlist } from "@repo/db"
import { and, eq } from "drizzle-orm"
import z from "zod"
import { factory } from "../../../lib"
import { authMiddleware, validate } from "../../../middleware"
import { addItemToCart, findOrCreateCart } from "../../carts"
import { deleteFromWishlist } from "../services/delete-from-wishlist.service"

export const moveItemToCartApp = factory.createApp().post(
  "/move-to-cart",
  authMiddleware,
  validate(
    "json",
    z.object({
      itemId: z.coerce.number(),
    })
  ),
  async (c) => {
    const user = c.get("user")
    const { itemId } = c.req.valid("json")
    try {
      const wishlistItem = await getWishlistItem(itemId, user.id)
      if (!wishlistItem) {
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Wishlist item not found",
            },
          },
          400
        )
      }
      const cartId = await findOrCreateCart(user.id)
      const cartItem = await addItemToCart(cartId, {
        quantity: 1,
        productVariantId: wishlistItem.productVariantId,
      })

      if (!cartItem) {
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Cart item not found",
            },
          },
          400
        )
      }

      await deleteFromWishlist(itemId, user.id)

      return c.json({ data: cartItem })
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: error instanceof Error ? error.message : String(error),
          },
        },
        500
      )
    }
  }
)

async function getWishlistItem(id: number, userId: number) {
  const item = await db
    .select()
    .from(wishlist)
    .where(and(eq(wishlist.id, id), eq(wishlist.userId, userId)))
  return item[0] ?? null
}
