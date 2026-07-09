
import { useMutation } from "@tanstack/react-query"
import { createCategory } from "./api"

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (data:{name:string}) => {
      return createCategory(data)
    },
    onSuccess: (data) => {
      console.log('Successfully created category', data)
    },
    onError: (error) => {
      console.error('Failed to create category', error)
    }
  })
}
