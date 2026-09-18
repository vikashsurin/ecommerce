import { sign, verify, decode } from "hono/jwt"
import type { JWTPayload } from "hono/utils/jwt/types"

export type AppJWTPayload = JWTPayload & {
  userId: number
  role?: string
}

export async function createAccessToken(
  payload: Omit<AppJWTPayload, "exp" | "iat">,
  secret: string,
  expiresInSeconds = 60 * 60 * 24 * 7
) {
  const now = Math.floor(Date.now() / 1000)
  return await sign(
    {
      ...payload,
      iat: now,
      exp: now + expiresInSeconds,
    },
    secret,
    "HS256"
  )
}

export async function verifyAccessToken(
  token: string,
  secret: string
): Promise<AppJWTPayload | null> {
  try {
    const payload = (await verify(token, secret, "HS256")) as AppJWTPayload
    return payload
  } catch {
    return null
  }
}

export function decodeToken(token: string) {
  try {
    return decode(token)
  } catch {
    return null
  }
}
