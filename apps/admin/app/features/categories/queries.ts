import { useMutation } from "@tanstack/react-query"
import {
  createAttribute,
  createCategory,
  deleteAttribute,
  deleteCategory,
  getCategory,
  updateAttribute,
} from "./api"
import { CreateCategorySchema } from "./schema"

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (data: CreateCategorySchema) => createCategory(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      })
      console.log("Successfully created product", data)
    },
    onError: (error) => {
      console.error("Failed to create product", error)
    },
  })
}

import { queryClient } from "@/lib"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "./api"

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })
}

export const useGetCategory = (id: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
  })
}


export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return deleteCategory(id)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      })
      console.log("Successfully deleted category", data)
    },
    onError: (error) => {
      console.error("Failed to delete category", error)
    },
  })
}


import { getAttributes } from "./api"
import { CreateAttributeSchema, UpdateAttributeSchema } from "./schema"

export const useGetAttributes = (id: number) => {
  return useQuery({
    queryKey: ["attributes", id],
    queryFn: () => getAttributes(id),
  })
}

export const useCreateAttribute = () => {
  return useMutation({
    mutationFn: async (data: CreateAttributeSchema) => {
      return createAttribute(data)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["attributes"],
      })
      console.log("Successfully created attribute", data)
    },
    onError: (error) => {
      console.error("Failed to create attribute", error)
    },
  })
}

export const useUpdateAttribute = () => {
  return useMutation({
    mutationFn: async (data: { id: number; data: UpdateAttributeSchema }) => {
      return updateAttribute(data.id, data.data)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["attributes"],
      })
      console.log("Successfully updated attribute", data)
    },
    onError: (error) => {
      console.error("Failed to update attribute", error)
    },
  })
}

export const useDeleteAttribute = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return deleteAttribute(id)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["attributes"],
      })
      console.log("Successfully deleted attribute", data)
    },
    onError: (error) => {
      console.error("Failed to delete attribute", error)
    },
  })
}
