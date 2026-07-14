import { queryClient } from "@/lib/query-client"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  createProduct,
  createProductVariant,
  generateSku,
  getProduct,
  getProducts,
  listProductVariants,
} from "./api"
import { CreateProductVariantSchema, type CreateProductSchema } from "./schema"

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (data: CreateProductSchema) => createProduct(data),
    onSuccess: (data) => {
      console.log("Successfully created product", data)
    },
    onError: (error) => {
      console.error("Failed to create product", error)
    },
  })
}

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => getProducts(),
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  })
}

export const useGenerateSku = () => {
  return useMutation({
    mutationFn: async (data: {
      productId: number
      attributes: Record<string, unknown>
    }) => generateSku(data.productId, data.attributes),
    onSuccess: (data) => {
      console.log("Successfully generated SKU", data)
    },
    onError: (error) => {
      console.error("Failed to generate SKU", error)
    },
  })
}

export const useCreateProductVariant = () => {
  return useMutation({
    mutationFn: async (data: CreateProductVariantSchema) => {
      return createProductVariant(data)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["productVariants", data.productId],
        })
      }
    },
    onError: (error) => {
      console.error("Failed to create product variant", error)
    },
  })
}

export const useProductVariants = (productId: number) => {
  return useQuery({
    queryKey: ["productVariants", productId],
    queryFn: () => listProductVariants(productId),
  })
}
