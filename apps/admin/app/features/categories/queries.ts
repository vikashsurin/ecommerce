import { useMutation } from "@tanstack/react-query"
import { createCategory } from "./api"

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (data:{name:string}) =>
      createCategory(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      })
      console.log('Successfully created product', data)
    },
    onError: (error) => {
      console.error('Failed to create product', error)
    }
  })
}


import { useQuery } from "@tanstack/react-query"
import { getCategories } from "./api"
import { queryClient } from "@/lib"

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}

import { getAttributes } from "./api"

export const useGetAttributes = (id: number) => {
  return useQuery({
    queryKey: ['attributes', id],
    queryFn: () => getAttributes(id),
  })
}

export const useCreateAttribute = () => {
  return useMutation({
    mutationFn: async (data: {}) => {

    },
  })
}
