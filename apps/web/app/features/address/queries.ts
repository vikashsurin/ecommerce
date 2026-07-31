import { useMutation, useQuery } from "@tanstack/react-query"
import { createAddress, deleteAddress, getAddresses, updateAddress } from "./api"
import { type CreateAddressSchema, type UpdateAddressSchema } from "./schema"
import { queryClient } from "@/lib/query-client"

export const useCreateAddress = () => {
  return useMutation({
    mutationFn: async (data: CreateAddressSchema) => {
      return await createAddress(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
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

export const useUpdateAddress = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateAddressSchema }) => {
      return await updateAddress(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })
}

export const useDeleteAddress = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return deleteAddress(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })
}
