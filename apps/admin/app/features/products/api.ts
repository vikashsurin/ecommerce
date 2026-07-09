import { apiClient } from "@/lib";
import { parseResponse } from "hono/client";
import { type CreateProductSchema } from "./schema";



export async function createProduct(data: CreateProductSchema) {

  const response = await apiClient.api.products.$post({
    json: {
      name: data.name,
      price: data.price,
      description: data.description,
      salePrice: data.salePrice,
      stock: data.stock,
      categoryId: data.categoryId,
      brandId: data.brandId,
    },
  })
  const result = await parseResponse(response)
  return result.data
}


export const getProducts = async () => {
  try {
    const response = await apiClient.api.products.$get()
    const result = await parseResponse(response)
    return result.data
  } catch (error) {
    console.error("Failed to fetch products:", error)
    throw error
  }
}

export const getProduct = async (id: string) => {
  try {
    const response = await apiClient.api.products[":id"].$get({
      param: { id },
    })
    const result = await parseResponse(response)
    return result.data
  } catch (error) {
    console.error("Failed to fetch product:", error)
    throw error
  }
}


