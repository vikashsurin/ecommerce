import { getCookie } from "hono/cookie"

export function cookieFromContext(c: any) {
  const cookieName = Bun.env.COOKIE_NAME

  if (!cookieName) {
    console.error("Missing  COOKIE_NAME env")
    throw new Error("Internal Server Error")
  }

  const cookie = getCookie(c, cookieName)

  if (!cookie) {
    return null
  }

  return cookie
}
