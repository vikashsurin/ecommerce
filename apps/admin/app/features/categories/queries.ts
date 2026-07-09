import { useMutation } from "@tanstack/react-query"
import { createCategory } from "./api"

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (data:{name:string}) =>
      createCategory(data),
    onSuccess: (data) => {
      console.log('Successfully created product', data)
    },
    onError: (error) => {
      console.error('Failed to create product', error)
    }
  })
}


import { useQuery } from "@tanstack/react-query"
import { getCategories } from "./api"

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
