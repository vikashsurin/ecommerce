import { appFactory } from "../../../lib/factory";
import { authMiddleware } from "../../../middleware";
import { validate } from "../../../middleware/validate";
import { addItemToCart, findOrCreateCart } from "../services/add-to-cart";
import { addToCartSchema } from "./schema";

export const addToCartApp = appFactory()
  .post('/',
    authMiddleware,
    validate('json', addToCartSchema),
    async (c) => {
      const user = c.get("user")
      const parsedData = c.req.valid('json')

      try {
        const cartId = await findOrCreateCart(user.id)
        const cartItem = await addItemToCart(cartId, parsedData)

        console.log({ cartItem })

        return c.json({ data: cartItem }, 201)

      } catch (error) {
        return c.json({
          error: {
            code: "internal_server_error",
            message: error instanceof Error ? error.message : String(error),
          },
        }, 500)
      }
    })
