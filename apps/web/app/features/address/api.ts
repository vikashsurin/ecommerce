import { rpcClient } from "@/lib"
import { parseResponse } from "hono/client"
import { type UpdateAddressSchema, type CreateAddressSchema } from "./schema"

export const createAddress = async (data: CreateAddressSchema) => {
  const response = await rpcClient.api.addresses.$post({
    json: data
  })

  const result = await parseResponse(response)
  return result.data
}


export const getAddresses = async () => {
  const response = await rpcClient.api.addresses.$get()
  const result = await parseResponse(response)
  return result.data
}

export const updateAddress = async (id: number, data: UpdateAddressSchema) => {
  const response = await rpcClient.api.addresses[':id'].$patch({
    param: {
      id: String(id)
    },
    json: data
  })
  const result = await parseResponse(response)
  return result.data
}


export const deleteAddress = async (id: number) => {
  const response = await rpcClient.api.addresses[':id'].$delete({
    param: {
      id: String(id)
    }
  })
  const result = await parseResponse(response)
  return result.data
}
