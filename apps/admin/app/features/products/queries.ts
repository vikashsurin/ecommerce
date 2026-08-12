import { queryClient } from "@/lib/query-client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  createProduct,
  createProductVariant,
  generateSku,
  getProduct,
  getProductImage,
  getProducts,
  uploadProductImages,
} from "./api"
import { listProductVariants } from "./api"
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

export const useProductImage = (productId: string) => {
  return useQuery({
    queryKey: ["product-images", String(productId)],
    queryFn: () => getProductImage(productId),
  })
}

export const useProductVariants = (productId: number) => {
  return useQuery({
    queryKey: ["productVariants", productId],
    queryFn: () => listProductVariants(productId),
  })
}
export const useUploadProductImages = () => {
  return useMutation({
    mutationFn: async (data: { productId: number; files: File[] }) =>
      uploadProductImages(data.productId, data.files),
    onSuccess: (data: any, variables) => {
      console.log("it was a success ! ", data, variables)
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["product-images", String(variables.productId)],
        })
      }
    },
    onError: () => {
      toast.error("There was an error")
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
