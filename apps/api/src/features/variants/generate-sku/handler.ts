import z from "zod"
import { factory } from "../../../lib"
import { validate } from "../../../middleware"
import { generateSku } from "../../../utils/generate-sku"
import { getProductById } from "../../products/shared"
import { generateSkuSchema } from "./schema"

export const generateSkuHandler = factory.createHandlers(
  validate(
    "param",
    z.object({
      productId: z.coerce.number(),
    })
  ),
  validate("json", generateSkuSchema),
  async (c) => {
    const db = c.get("db")
    const { productId } = c.req.valid("param")
    const data = c.req.valid("json")

    console.log({ data })

    try {
      const product = await getProductById(db, productId)

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

      const sku = generateSku(product.name, data.attributes)
      return c.json({ data: sku })
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
