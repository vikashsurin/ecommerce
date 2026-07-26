import { useMutation, useQuery } from "@tanstack/react-query"
import { createAddress, getAddresses } from "./api"
import { CreateAddressSchema } from "./schema"


export const useCreateAddress = () => {
  return useMutation({
    mutationFn: async (data: CreateAddressSchema) => {
      return await createAddress(data)
    },
  })
}

export const useAddresses = () => {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      return await getAddresses()
    },
  })
}
