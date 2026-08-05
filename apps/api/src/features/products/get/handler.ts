import { Hono } from "hono"
import { z } from "zod"
import { validate } from "../../../middleware/validate"
import { getProductById } from "../shared"

export const getProductApp = new Hono().get(
  "/:id",
  validate("param", z.object({ id: z.coerce.number() })),
  async (c) => {
    const { id } = c.req.valid("param")

    try {
      const product = await getProductById(id)
      if (!product) {
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Product not found",
            },
          },
          404
        )
      }
      return c.json({ data: product })
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
