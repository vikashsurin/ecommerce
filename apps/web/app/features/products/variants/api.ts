import { apiClient } from "@/lib/api-client"
import { parseResponse } from "hono/client"

export const listProductVariants = async (productId: number) => {
  try {
    const response = await apiClient.api.products[":productId"].variants.$get({
      param: {
        productId: String(productId),
      },
    })
    const result = await parseResponse(response)
    return result.data
  } catch (error) {
    console.error("Failed to list product variants:", error)
    throw error
  }
}
