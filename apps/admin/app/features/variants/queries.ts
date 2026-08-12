import { queryClient } from "@/lib";
import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProductVariant, getVariant, updateProductVariant, uploadVariantImages } from "./api";
import { variantKeys } from "./keys";
import { UpdateProductVariantSchema } from "./schema";

export const useVariant = (id: number | undefined) => {
  return useQuery({
    queryKey: variantKeys.detail(id!),
    queryFn: id ? async () => await getVariant(id) : skipToken,
  });
};

export const useUploadVariantImages = () => {
  return useMutation({
    mutationFn: async (data: { variantId: number; files: File[] }) => uploadVariantImages(data.variantId, data.files),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: variantKeys.detail(variables.variantId),
      });
    },
  });
};

export const useUpdateProductVariant = () => {
  return useMutation({
    mutationFn: async ({
      data,
      variantId,
    }: {
      data: UpdateProductVariantSchema;
      variantId: number;
    }) => {
      return updateProductVariant({ data, variantId });
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["productVariants", data.productId],
        });
      }
    },
    onError: (error) => {
      console.error("Failed to update product variant", error);
    },
  });
};

export const useDeleteProductVariant = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return deleteProductVariant(id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["productVariants", data.productId],
        });
      }
    },
    onError: () => {
      toast.error("Unable to delete image.");
    },
  });
};
