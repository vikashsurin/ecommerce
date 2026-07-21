import { useMutation, useQuery } from "@tanstack/react-query"
import { createOrder, getOrder, getOrders, cancelOrder } from "./api"
import { type CreateOrderSchema } from "./schema"

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (data: CreateOrderSchema) => {
      return await createOrder(data)
    },
    onSuccess: (data) => {
      console.log("Order created:", data)
    },
    onError: (error) => {
      console.error("Failed to create order:", error)
    },
  })
}

export const useOrder = (orderId: number) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      return await getOrder(orderId)
    },
  })
}


export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders()
    },
  })
}

export const useCancelOrder = () => {
  return useMutation({
    mutationFn: async (orderId: number) => {
      return await cancelOrder(orderId)
    },
    onSuccess: (data) => {
      console.log("Order cancelled:", data)
    },
    onError: (error) => {
      console.error("Failed to cancel order:", error)
    },
  })
}
