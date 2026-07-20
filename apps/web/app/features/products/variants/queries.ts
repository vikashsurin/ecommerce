import { useQuery } from "@tanstack/react-query"
import { listProductVariants } from "./api"


export const useProductVariants = (productId: number) => {
  return useQuery({
    queryKey: ["productVariants", productId],
    queryFn: async () => await listProductVariants(productId),
  })
}
