import { apiClient } from "@/lib/api-client"
import { parseResponse } from "hono/client"

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
