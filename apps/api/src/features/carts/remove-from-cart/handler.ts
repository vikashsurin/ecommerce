import { cartItems } from "@repo/db"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { factory } from "../../../lib"
import { authMiddleware, dbMiddleware, validate } from "../../../middleware"

export const removeFromCartHandler = factory.createHandlers(
  authMiddleware,
  dbMiddleware,
  validate("param", z.object({ cartItemId: z.coerce.number() })),
  async (c) => {
    const user = c.get("user")
    const { cartItemId } = c.req.valid("param")
    const db = c.get("db")

    try {
      const item = await removeItemFromCart(db, cartItemId)
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

async function removeItemFromCart(db: any, id: number) {
  const cartItem = await db
    .delete(cartItems)
    .where(eq(cartItems.id, id))
    .returning()
  return cartItem[0] ?? null
}
