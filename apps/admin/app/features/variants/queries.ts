import { useMutation, useQuery } from "@tanstack/react-query";
import { getVariant, uploadVariantImages } from "./api";

export const useVariant = (id: number | undefined) => {
  return useQuery({
    queryKey: ["variants", id],
    queryFn: id ? () => getVariant(id) : skipToken,
  });
};

export const useUploadVariantImages = () => {
  return useMutation({
    mutationFn: async (data: { variantId: number; files: File[] }) => uploadVariantImages(data.variantId, data.files),
    onSuccess: (_data, variables) => {
      console.log("it was a success");
    },
  });
};
