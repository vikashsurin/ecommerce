import { z } from 'zod'

export const verifyPaymentSchema = z.object({
  checkoutSessionId: z.coerce.number(),
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
})
