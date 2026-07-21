import { useMutation } from "@tanstack/react-query"
import { createAddress } from "./api"
import { CreateAddressSchema } from "./schema"

export const useCreateAddress = () => {
  return useMutation({
    mutationFn: async (data: CreateAddressSchema) => {
      return await createAddress(data)
    },
  })
}
