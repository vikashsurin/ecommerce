import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getProduct, getProductImage, getProducts, uploadProductImages, uploadVariantImages } from "./api";
import { type CreateProductSchema } from "./schema";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (data: CreateProductSchema) => createProduct(data),
    onSuccess: (data) => {
      console.log("Successfully created product", data);
    },
    onError: (error) => {
      console.error("Failed to create product", error);
    },
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => getProducts(),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
};

export const useUploadProductImages = () => {
  return useMutation({
    mutationFn: async (data: { productId: number; files: File[] }) => uploadProductImages(data.productId, data.files),
  });
};

export const useUploadVariantImages = () => {
  return useMutation({
    mutationFn: async (data: { variantId: number; files: File[] }) => uploadVariantImages(data.variantId, data.files),
  });
};

export const useProductImage = (productId: string) => {
  return useQuery({
    queryKey: ["product-image", productId],
    queryFn: () => getProductImage(productId),
  });
};
