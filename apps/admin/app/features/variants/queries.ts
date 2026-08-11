import { queryClient } from "@/lib";
import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import { getVariant, uploadVariantImages } from "./api";
import { variantKeys } from "./keys";

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
