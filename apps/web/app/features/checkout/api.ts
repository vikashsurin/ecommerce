import { rpcClient } from "@/lib";
import { parseResponse } from "hono/client";
import {
  type AddCheckoutAddressSchema,
  type AddCheckoutItemsSchema
} from "./schema";

export const addCheckoutItems = async (data: AddCheckoutItemsSchema) => {
  const res = await rpcClient.api.checkout['add-items'].$post({
    json: {
      cartId: data.cartId,
    }
  });
  const result = await parseResponse(res)
  return result.data
}


export const addCheckoutAddress = async (data: AddCheckoutAddressSchema) => {
  const res = await rpcClient.api.checkout['add-address'].$post({
    json: {
      addressId: data.addressId,
      cartId: data.cartId,
    }
  });
  const result = await parseResponse(res)
  return result.data
}

export const getCheckoutSession = async (cartId: number) => {
  const res = await rpcClient.api.checkout[":cartId"].$get({
    param: {
      cartId: String(cartId)
    }
  })
  const result = await parseResponse(res)
  return result.data
}


export const setReadyForPayment = async (cartId: number) => {
  const res = await rpcClient.api.checkout['finalize'].$post({
    json: {
      cartId: cartId,
    }
  })
  const result = await parseResponse(res)
  return result.data
}
