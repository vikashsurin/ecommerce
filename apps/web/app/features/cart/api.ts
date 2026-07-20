import { apiClient } from "@/lib";
import { parseResponse } from "hono/client";
import { type AddToCartSchema } from "./schema";

export const addToCart = async (data: AddToCartSchema) => {
  const res = await apiClient.api.cart.$post({
    json: {
      productVariantId: data.productVariantId,
      quantity: data.quantity,
    },
  });

  const result = await parseResponse(res)
  return result.data
}


export const getCart = async () => {
  const res = await apiClient.api.cart.$get()
  const result = await parseResponse(res)
  return result.data
}

export const updateCartItemQuantity = async (
  cartItemId: number,
  quantity: number) => {

  const res = await apiClient.api.cart.items[':cartItemId'].$patch({
    param: {
      cartItemId: String(cartItemId)
    },
    json: {
      quantity,
    },
  });

  console.log({ res })

  const result = await parseResponse(res)
  return result.data
}

export const deleteCartItem = async (cartItemId: number) => {
  const res = await apiClient.api.cart.items[':cartItemId'].$delete({
    param: {
      cartItemId: String(cartItemId)
    },
  });

  const result = await parseResponse(res)
  return result.data
}
