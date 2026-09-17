import { factory } from "../../../lib"
import { authMiddleware, dbMiddleware } from "../../../middleware"
import { validate } from "../../../middleware/validate"
import { addItemToCart, findOrCreateCart } from "../services/add-to-cart"
import { addToCartSchema } from "./schema"

export const addToCartHandler = factory.createHandlers(
  authMiddleware,
  dbMiddleware,
  validate("json", addToCartSchema),
  async (c) => {
    const user = c.get("user")
    const parsedData = c.req.valid("json")
    const db = c.get("db")

    try {
      const cartId = await findOrCreateCart(db, user.id)
      const cartItem = await addItemToCart(db, cartId, parsedData)

      if (!cartItem) {
        return c.json(
          {
            error: {
              code: "internal_server_error",
              message: "Failed to add item to cart",
            },
          },
          500
        )
      }

      return c.json({ data: cartItem }, 201)
    } catch (error) {
      console.log({ error })
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
