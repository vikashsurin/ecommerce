import { rpcClient } from "@/lib/rpc-client"
import { parseResponse } from "hono/client"

export const getProducts = async () => {
  try {
    const response = await rpcClient.api.products.$get()
    const result = await parseResponse(response)
    return result.data
  } catch (error) {
    console.error("Failed to fetch products:", error)
    throw error
  }
}

export const getProduct = async (id: string) => {
  try {
    const response = await rpcClient.api.products[":id"].$get({
      param: { id },
    })
    const result = await parseResponse(response)
    return result.data
  } catch (error) {
    console.error("Failed to fetch product:", error)
    throw error
  }
}
