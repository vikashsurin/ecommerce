import { deleteCookie } from "hono/cookie"
import { cookieFromContext } from "../../../lib/cookie-from-context"
import { env } from "../../../lib/env"
import { appFactory } from "../../../lib/factory"
import { getSession } from "../../sessions"
import { getUserService } from "../../users"

export const meApp = appFactory().get("/me", async (c) => {
  const cookie = cookieFromContext(c)

  if (!cookie) {
    return c.json({
      error: {
        code: "missing_credentials",
        message: "Missing",
      },
    })
  }

  const session = await getSession(cookie)

  if (!session) {
    deleteCookie(c, env.COOKIE_NAME)
    return c.json(
      {
        data: null,
      },
      200
    )
  }

  const user = await getUserService(session.userId)

  return c.json({
    data: user,
  })
})
