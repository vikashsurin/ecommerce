import { users } from "@repo/db"
import { eq } from "drizzle-orm"
import { getSession } from "../features/sessions"
import { cookieFromContext } from "../lib/cookie-from-context"
import { factory } from "../lib/factory"

export const authMiddleware = factory.createMiddleware(async (c, next) => {
  const token = cookieFromContext(c)
  const db = c.get("db")

  if (!token) {
    return c.json(
      {
        error: {
          code: "invalid_request",
          message: "Missing or malformed Authorization",
        },
      },
      401
    )
  }

  const session = await getSession(db, token)

  if (!session) {
    return c.json(
      {
        error: {
          code: "invalid_request",
          message: "Unauthorized",
        },
      },
      401
    )
  }

  const user = await getUser(db, session.userId)

  if (!user) {
    return c.json(
      {
        error: {
          code: "invalid_request",
          message: "Unauthorized",
        },
      },
      401
    )
  }

  c.set("user", user)

  await next()
})

async function getUser(db: any, id: number) {

  const user = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role
    })
    .from(users)
    .where(eq(users.id, id))

  return user[0] || null;
}
// function _tokenFromHeader(c: any) {
//   const authHeader = c.req.header("Authorization")

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return null
//   }

//   const token = authHeader.substring(7)

//   if (!token) {
//     return null
//   }

//   return token
// }

//  function _tokenFromCookie(c: any) {
//   if (!cookieName) {
//     console.error("COOKIE_NAME env not set")

//   }

//   const token = getCookie(c, cookieName)

//   if (!token) {
//     return null
//   }

//   // delete cookie on unauthorized

//   return token
// }
