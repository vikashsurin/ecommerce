// TODO: use env for secret
import {
  generateSecureToken,
  hmacSha256,
  timingSafeEqual,
} from "../../../utils/crypto"

const xxx = "temp_secret"

// For DB: we store hash, return plain token to user once
export async function hashToken(
  token: string,
  secret: string = xxx
): Promise<string> {
  return hmacSha256(secret, token)
}

export async function verifyHashedToken(
  token: string,
  hash: string,
  secret: string
): Promise<boolean> {
  const expected = await hmacSha256(secret, token)
  return timingSafeEqual(expected, hash)
}

export async function createSession(
  db: any,
  userId: number,
  ip: string,
  secret: string
) {
  const token = crypto.randomUUID() // native, works in Workers
  const tokenHash = await hashToken(token, secret)

  // adapt to your schema
  await db.insert(/* sessions table */).values({
    user_id: userId,
    token_hash: tokenHash,
    ip_address: ip,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  })

  return token // send this to client only once
}

// For password reset / email verify links
export async function createOneTimeToken(
  secret: string
): Promise<{ token: string; hash: string }> {
  const token = generateSecureToken(32)
  const hash = await hashToken(token, secret)
  return { token, hash }
}
