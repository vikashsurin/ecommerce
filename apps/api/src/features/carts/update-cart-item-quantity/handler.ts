import { cartItems, carts, db } from "@repo/db"
import { and, eq, inArray } from "drizzle-orm"
import { z } from "zod"
import { appFactory } from "../../../lib/factory"
import { authMiddleware, validate } from "../../../middleware"

export const updateCartItemQuantity = appFactory.patch(
  "/items/:cartItemId",
  authMiddleware,
  validate(
    "param",
    z.object({
      cartItemId: z.string(),
    })
  ),

  validate(
    "json",
    z.object({
      quantity: z.number(),
    })
  ),

  async (c) => {
    const { cartItemId } = c.req.valid("param")
    const { quantity } = c.req.valid("json")
    const user = c.get("user")
    const userId = user.id

    if (quantity === 0) return c.json({ data: null }, 200)

    try {
      const updated = await updateQuantity(
        Number(cartItemId),
        Number(quantity),
        Number(userId)
      )

      if (!updated) {
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Cart item not found",
            },
          },
          404
        )
      }

      return c.json({ data: updated }, 200)
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: "Internal server error",
          },
        },
        500
      )
    }
  }
)

async function updateQuantity(
  cartItemId: number,
  quantity: number,
  userId: number
) {
  const row = await db
    .update(cartItems)
    .set({ quantity, updatedAt: new Date() })
    .where(
      and(
        eq(cartItems.id, cartItemId),
        inArray(
          cartItems.cartId,
          db
            .select({ id: carts.id })
            .from(carts)
            .where(eq(carts.userId, userId))
        )
      )
    )
    .returning()

  return row[0] ?? null
}
