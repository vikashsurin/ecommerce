
import { queryClient } from "@/lib/query-client"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  createProductVariant,
  deleteProductVariant,
  generateSku,
  listProductVariants,
  updateProductVariant
} from "./api"
import { CreateProductVariantSchema, UpdateProductVariantSchema } from "./schema"

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

export const useUpdateProductVariant = () => {
  return useMutation({
    mutationFn: async ({
      data,
      productId,
      variantId,
    }: {
      data: UpdateProductVariantSchema
      productId: number
      variantId: number
    }) => {
      return updateProductVariant({ data, productId, variantId })
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["productVariants", data.productId],
        })
      }
    },
    onError: (error) => {
      console.error("Failed to update product variant", error)
    },
  })
}

export const useProductVariants = (productId: number) => {
  return useQuery({
    queryKey: ["productVariants", productId],
    queryFn: () => listProductVariants(productId),
  })
}

export const useDeleteProductVariant = () => {
  return useMutation({
    mutationFn: async ({ productId, variantId }: { productId: number; variantId: number }) => {
      return deleteProductVariant(productId, variantId)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["productVariants", data.productId],
        })
      }
    },
    onError: (error) => {
      console.error("Failed to delete product variant", error)
    },
  })
}
