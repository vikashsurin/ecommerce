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

export const getCheckoutSession = async () => {
  const res = await rpcClient.api.checkout.$get()
  const result = await parseResponse(res)
  return result.data
}

export const getCheckoutSessionById = async (checkoutSessionId: number) => {
  const res = await rpcClient.api.checkout[":id"].$get({
    param: {
      id: String(checkoutSessionId)
    }
  })
  const result = await parseResponse(res)
  return result.data
}


export const setReadyForPayment = async (checkoutSessionId: number) => {
  const res = await rpcClient.api.checkout['finalize'].$post({
    json: {
      checkoutSessionId: checkoutSessionId,
    }
  })
  const result = await parseResponse(res)
  return result.data
}
