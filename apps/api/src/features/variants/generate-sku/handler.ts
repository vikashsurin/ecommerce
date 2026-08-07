import z from "zod"
import { factory } from "../../../lib"
import { authMiddleware, validate } from "../../../middleware"
import { getProductById } from "../../products/shared"
import { generateSku } from "../../../utils/generate-sku"
import { generateSkuSchema } from "./schema"

export const generateSkuApp = factory.createApp().post(
  "/:productId/variants/generate-sku",
  // authMiddleware,
  validate(
    "param",
    z.object({
      productId: z.coerce.number(),
    })
  ),
  validate("json", generateSkuSchema),
  async (c) => {
    const { productId } = c.req.valid("param")
    const data = c.req.valid("json")

    console.log({ data })

    try {
      const product = await getProductById(productId)

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
