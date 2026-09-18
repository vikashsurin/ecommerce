import { hmacSha256, timingSafeEqual } from "./crypto"

export async function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const payload = `${orderId}|${paymentId}`
  const expected = await hmacSha256(secret, payload)
  return timingSafeEqual(expected, signature)
}
