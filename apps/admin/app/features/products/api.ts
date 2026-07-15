import { apiClient } from "@/lib"
import { parseResponse } from "hono/client"
import {
  CreateProductVariantSchema,
  type CreateProductSchema,
  type UpdateProductVariantSchema
} from "./schema"

export async function createProduct(data: CreateProductSchema) {
  const response = await apiClient.api.products.$post({
    json: {
      name: data.name,
      description: data.description,
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

export const generateSku = async (
  productId: number,
  attributes: Record<string, unknown>
) => {
  try {
    const response = await apiClient.api.products[":productId"].variants[
      "generate-sku"
    ].$post({
      param: {
        productId: String(productId),
      },
      json: {
        attributes,
      },
    })
    const result = await parseResponse(response)
    return result.data
  } catch (error) {
    console.error("Failed to generate SKU:", error)
    throw error
  }
}

export const createProductVariant = async (
  data: CreateProductVariantSchema
) => {
  try {
    const response = await apiClient.api.products[":productId"].variants.$post({
      param: {
        productId: String(data.productId),
      },
      json: {
        productId: data.productId,
        attributes: data.attributes,
        price: data.price,
        salePrice: data.salePrice,
        stock: data.stock,
        sku: data.sku,
      },
    })
    const result = await parseResponse(response)
    return result.data
  } catch (error) {
    console.error("Failed to create product variant:", error)
    throw error
  }
}


export const updateProductVariant = async ({
  data,
  productId,
  variantId,
}: {
  data: UpdateProductVariantSchema
  productId: number
  variantId: number
}) => {
  try {
    const response = await apiClient.api.products[":productId"].variants[":variantId"].$put({
      param: {
        productId: String(productId),
        variantId: String(variantId),
      },
      json: {
        productId:productId,
        stock: data.stock,
        price: data.price,
        salePrice: data.salePrice,
      },
    })
    const result = await parseResponse(response)
    return result.data
  } catch (error) {
    console.error("Failed to update product variant:", error)
    throw error
  }
}

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
