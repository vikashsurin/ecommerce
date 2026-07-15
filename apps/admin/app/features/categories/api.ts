import { apiClient } from "@/lib/api-client"
import { parseResponse } from "hono/client"
import { UpdateAttributeSchema, type CreateAttributeSchema } from "./schema"

export const createCategory = async (data: {name:string}) => {
  const response = await apiClient.api.categories.$post({
    json: {
      name: data.name,
    },
  })
  const result = await parseResponse(response)
  return result.data
}


export const getCategories = async () => {
  const response = await apiClient.api.categories.$get()
  const result = await parseResponse(response)
  return result.data
}

export const getCategory = async (id: number) => {
  const response = await apiClient.api.categories[`:categoryId`].$get({
    param: {
      categoryId: String(id),
    }
  })
  const result = await parseResponse(response)
  return result.data
}

export const getAttributes = async (id: number) => {
  const response = await apiClient.api.categories[`:id`].attributes.$get({
    param: {
      id: String(id),
    }
  })
  const result = await parseResponse(response)
  return result.data
}

export const createAttribute = async (data:CreateAttributeSchema ) => {

  const response = await apiClient.api.categories.attributes.$post({
    json: {
      ...data,
    }
  })
  const result = await parseResponse(response)
  return result.data
}


export const updateAttribute = async (id: number, data: UpdateAttributeSchema) => {
console.log({id, data})

  const response = await apiClient.api.categories.attributes[`:id`].$put({
    param: {
      id: String(id),
    },
    json: {
      ...data,
    }
  })
  const result = await parseResponse(response)
  return result.data
}

export const deleteAttribute = async (id: number) => {
  const response = await apiClient.api.categories.attributes[`:id`].$delete({
    param: {
      id: String(id),
    }
  })
  const result = await parseResponse(response)
  return result.data
}
