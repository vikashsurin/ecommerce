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
      checkoutSessionId: data.checkoutSessionId,
    }
  });
  const result = await parseResponse(res)
  return result.data
}


export const getCurrentCheckoutSession = async () => {
  const res = await rpcClient.api.checkout.$get()
  const result = await parseResponse(res)
  return result.data
}

export const getCheckoutSession = async (sessionId: number) => {
  const res = await rpcClient.api.checkout[":cksessionId"].$get({
    param: {
      cksessionId: String(sessionId)
    }
  })
  const result = await parseResponse(res)
  return result.data
}
