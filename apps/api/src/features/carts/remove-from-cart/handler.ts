import { cartItems, db } from "@repo/db"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { factory } from "../../../lib"
import { authMiddleware, validate } from "../../../middleware"

export const removeFromCartApp = factory.createApp().delete(
  "/items/:cartItemId",
  authMiddleware,
  validate("param", z.object({ cartItemId: z.coerce.number() })),
  async (c) => {
    const user = c.get("user")
    const { cartItemId } = c.req.valid("param")

    try {
      const item = await removeItemFromCart(cartItemId)
      if (!item)
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Item not found",
            },
          },
          404
        )

      return c.json({ data: item?.id })
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

async function removeItemFromCart(id: number) {
  const cartItem = await db
    .delete(cartItems)
    .where(eq(cartItems.id, id))
    .returning()
  return cartItem[0] ?? null
}
