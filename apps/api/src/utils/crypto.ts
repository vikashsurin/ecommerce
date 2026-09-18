const enc = new TextEncoder()

// hex helper
function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

// constant time compare - prevents timing attacks
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let res = 0
  for (let i = 0; i < a.length; i++) res |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return res === 0
}

// Plain SHA256 - no secret
export async function sha256(message: string): Promise<string> {
  const hash = await crypto.subtle.digest("SHA-256", enc.encode(message))
  return toHex(hash)
}

// HMAC SHA256 - with secret (for Razorpay, session tokens)
export async function hmacSha256(
  secret: string,
  message: string
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message))
  return toHex(sig)
}

// secure random token - replaces crypto.randomBytes
export function generateSecureToken(bytes = 32): string {
  const arr = new Uint8Array(bytes)
  crypto.getRandomValues(arr)
  return [...arr].map((b) => b.toString(16).padStart(2, "0")).join("")
}
