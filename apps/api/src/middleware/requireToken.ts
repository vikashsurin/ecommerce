import { cookieFromContext } from "../lib/cookie-from-context"
import { factory } from "../lib"

export const requireTokenMiddleware = factory.createMiddleware(
  async (c, next) => {
    const token = cookieFromContext(c)
    if (!token) {
      return c.json({ error: "Missing Authorization" }, 401)
    }
    c.set("token" as any, token)
    await next()
  }
)
