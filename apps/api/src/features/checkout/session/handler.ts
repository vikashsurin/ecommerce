import { z } from "zod"
import { factory } from "../../../lib"
import { authMiddleware, validate } from "../../../middleware"
import { checkoutSessionAddress } from "../services/checkout-session-address"
import { checkoutSessionCart } from "../services/checkout-session-cart"
import { checkoutSessionFinalize } from "../services/checkout-session-finalize"

export const checkoutSessionApp = factory.createApp()
  .use(authMiddleware)
  .post(
    "/add-items",
    validate(
      "json",
      z.object({
        cartId: z.coerce.number(),
      })
    ),
    async (c) => {
      const user = c.get("user")
      const { cartId } = c.req.valid("json")

      try {
        const checkoutSession = await checkoutSessionCart(user.id, cartId)

        if (!checkoutSession) {
          return c.json(
            {
              error: {
                code: "not_found",
                message: "Checkout session not found",
              },
            },
            404
          )
        }
        return c.json({ data: checkoutSession })
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
  .post(
    "/add-address",
    validate(
      "json",
      z.object({
        addressId: z.coerce.number(),
        checkoutSessionId: z.coerce.number(),
      })
    ),
    async (c) => {
      const user = c.get("user")
      const userId = user.id
      const { addressId, checkoutSessionId } = c.req.valid("json")

      try {
        const checkoutSession = await checkoutSessionAddress(
          addressId,
          checkoutSessionId,
          userId
        )

        if (!checkoutSession) {
          return c.json(
            {
              error: {
                code: "not_found",
                message: "Checkout session not found",
              },
            },
            404
          )
        }

        return c.json({
          data: checkoutSession,
        })
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
  .post(
    "/finalize",
    authMiddleware,
    validate(
      "json",
      z.object({
        checkoutSessionId: z.coerce.number(),
      })
    ),
    async (c) => {
      const user = c.get("user")
      const userId = user.id
      const { checkoutSessionId } = c.req.valid("json")

      try {
        const checkoutSession = await checkoutSessionFinalize(
          checkoutSessionId,
          userId
        )

        if (!checkoutSession) {
          return c.json(
            {
              error: {
                code: "not_found",
                message: "Checkout session not found",
              },
            },
            404
          )
        }

        return c.json({ data: checkoutSession })
      } catch (error) {
        console.log({ error })
        return c.json(
          {
            error: {
              code: "internal_server_error",
              message: "Failed to freeze items, address, and amount",
            },
          },
          500
        )
      }
    }
  )
