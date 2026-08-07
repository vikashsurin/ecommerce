import { factory } from "../lib/factory"

export const isSeller = factory.createMiddleware(async (c, next) => {
  const user = c.get("user")
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  if (user.role !== "seller") {
    return c.json({ error: "Unauthorized" }, 401)
  }

  await next()
})
