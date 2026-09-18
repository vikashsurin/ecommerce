import { type Context } from "hono"
import { env } from "hono/adapter"
import { getCookie } from "hono/cookie"
import { type Env } from "../lib/types"

export function cookieFromContext(c: Context<Env>) {
  const { COOKIE_NAME } = env(c)

  if (!COOKIE_NAME) {
    console.error("Missing  COOKIE_NAME env")
    throw new Error("Internal Server Error")
  }

  const cookie = getCookie(c, COOKIE_NAME)

  if (!cookie) {
    return null
  }

  return cookie
}
