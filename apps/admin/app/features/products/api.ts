import { apiClient } from "@/lib"
import { parseResponse } from "hono/client"
import { CreateProductVariantSchema, type CreateProductSchema } from "./schema"

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

// Todo: combine get products and get product images
//
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

export const getProductImage = async (productId: string) => {
  try {
    const response = await apiClient.api.products[":productId"].images.$get({
      param: { productId },
    })
    const result = await parseResponse(response)
    return result.data
  } catch (error) {
    console.error("Failed to fetch product image:", error)
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

export const uploadProductImages = async (productId: number, files: File[]) => {
  try {
    const response = await apiClient.api.products[
      ":productId"
    ].images.presign.$post({
      param: { productId: String(productId) },
      json: {
        images: files.map((f) => ({ filename: f.name, contentType: f.type })),
      },
    })
    const { data: presigned } = await response.json()
    if (!presigned) throw new Error("presigned urls not received")

    await Promise.all(
      files.map(async (file, i) => {
        const res = await fetch(presigned[i].presignedUrl, {
          method: "PUT",
          headers: { "Content-Type": presigned[i].contentType },
          body: file,
        })
        if (!res.ok) {
          throw new Error(`Upload failed for ${file.name}: ${res.status}`)
        }
      })
    )

    const confirmRes = await apiClient.api.products[
      ":productId"
    ].images.confirm.$post({
      param: { productId: String(productId) },
      json: {
        images: presigned.map((p, i) => ({
          key: p.key,
          sortOrder: i,
          isPrimary: false,
        })),
      },
    })
    const result = await confirmRes.json()
    console.log({ result })
    return result
  } catch (error) {
    console.error("upload failed", error)
    return
  }
}

export const createProductVariant = async (
  data: CreateProductVariantSchema
) => {
  console.log({ data })
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
