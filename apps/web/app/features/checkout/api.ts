import { apiClient } from "@/lib";
import { parseResponse } from "hono/client";
import { type CreateCheckoutSessionSchema } from "./schema";

export const createCheckoutSession = async (data: CreateCheckoutSessionSchema) => {
  const res = await apiClient.api.checkout.$post({
    json: {
      ...data,
    }
  });
  const result = await parseResponse(res)
  return result.data
}

export const getCurrentCheckoutSession = async () => {
  const res = await apiClient.api.checkout.$get()
  const result = await parseResponse(res)
  return result.data
}


export const verifyRazorpayOrder = async (sessionId: number, razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string) => {
  const res = await apiClient.api.checkout[":sessionId"]["payment"]["verify"].$post({
    param: {
      sessionId: String(sessionId)
    },
    json: {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    }
  });
  const result = await parseResponse(res)
  return result.data
}
