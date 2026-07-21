import { apiClient } from "@/lib"
import { parseResponse } from "hono/client"
import { CreateOrderSchema } from "./schema"

export const createOrder = async (data: CreateOrderSchema) => {
  const response = await apiClient.api.orders.$post({
    json: {
      cartId: data.cartId,
      shippingAddress: data.shippingAddress,
    },
  })


  const result = await parseResponse(response)
  return result.data
}


export const cancelOrder = async (orderId: number) => {
  const response = await apiClient.api.orders[':orderId'].$patch({
    param: {
      orderId: String(orderId)
    },
  })
  const result = await parseResponse(response)
  return result.data
}


export const getOrders = async () => {
  const response = await apiClient.api.orders.$get()
  const result = await parseResponse(response)
  return result.data
}


export const getOrder = async (orderId: number) => {
  const response = await apiClient.api.orders[':orderId'].$get({
    param: {
      orderId: String(orderId)
    },
  })
  const result = await parseResponse(response)
  return result.data
}


// update Order
