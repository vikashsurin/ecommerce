import { users } from "@repo/db"
import { eq } from "drizzle-orm"
import { deleteCookie } from "hono/cookie"
import { AppError, factory } from "../../../lib"
import { cookieFromContext } from "../../../lib/cookie-from-context"
import { getSession } from "../../sessions"

export const meHandler = factory.createHandlers(async (c) => {
  const cookie = cookieFromContext(c)
  const db = c.get("db")

  if (!cookie) {
    throw AppError.unauthorized("Not logged in")
  }

  const session = await getSession(db, cookie)

  if (!session) {
    deleteCookie(c, c.env.COOKIE_NAME)
    return c.json(
      {
        data: null,
      },
      200
    )
  }

  try {
    const user = await getUser(db, session.userId)

    return c.json({
      data: user,
    })
  } catch (error) {
    return c.json(
      {
        error: {
          code: "internal_server_error",
          message: "Internal Server Error",
        },
      },
      500
    )
  }
})

async function getUser(db: any, id: number) {
  const user = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, id))

  return user[0] || null
}
