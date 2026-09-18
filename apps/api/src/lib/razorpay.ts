import Razorpay from "razorpay"

import type { Env } from "../env"

function getAuthHeader(keyId: string, keySecret: string) {
  // Razorpay uses Basic Auth: Base64(key_id:key_secret)
  return `Basic ${btoa(`${keyId}:${keySecret}`)}`
}

export function createRazorpayClient(env: Env) {
  const keyId = env.RAZORPAY_KEY_ID
  const keySecret = env.RAZORPAY_KEY_SECRET

  return {
    // Create Order
    async createOrder(options: {
      amount: number
      currency: string
      receipt: string
      notes: Record<string, string | number>
    }) {
      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: getAuthHeader(keyId, keySecret),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: options.amount * 100, // Razorpay expects paise
          currency: options.currency,
          receipt: options.receipt,
          notes: options.notes,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(`Razorpay create order failed: ${err}`)
      }
      return (await res.json()) as {
        id: string
        amount: number
        currency: string
      }
    },

    // Fetch Payment
    async fetchPayment(paymentId: string) {
      const res = await fetch(
        `https://api.razorpay.com/v1/payments/${paymentId}`,
        {
          headers: { Authorization: getAuthHeader(keyId, keySecret) },
        }
      )
      if (!res.ok) throw new Error("Failed to fetch payment")
      return await res.json()
    },
  }
}
