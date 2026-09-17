import { checkoutSessions } from "@repo/db"
import { and, desc, eq, notInArray } from "drizzle-orm"
import { z } from "zod"
import { factory } from "../../../lib"
import { authMiddleware, dbMiddleware, validate } from "../../../middleware"

export const getCheckoutSessionHandler = factory.createHandlers(
    authMiddleware,
    dbMiddleware,
    validate("param", z.object({ id: z.coerce.number() })),
    async (c) => {
      const { id } = c.req.valid("param")
      const user = c.get("user")
      const userId = user.id
      const db = c.get("db")
      try {
        const [checkoutSession] = await db
          .select()
          .from(checkoutSessions)
          .where(
            and(
              eq(checkoutSessions.id, id),
              eq(checkoutSessions.userId, userId)
            )
          )
          .limit(1)

        if (!checkoutSession) {
          return c.json({ data: null })
        }

        return c.json({ data: checkoutSession })
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
    }
)

export const listCheckoutSessionsHandler = factory.createHandlers(
  authMiddleware,
  dbMiddleware,
  async (c) => {
    const user = c.get("user")
    const db = c.get("db")
    try {
      const [checkoutSession] = await db
        .select()
        .from(checkoutSessions)
        .where(
          and(
            eq(checkoutSessions.userId, user.id),
            notInArray(checkoutSessions.status, [
              "completed",
              "abandoned",
              "expired",
            ])
          )
        )
        .orderBy(desc(checkoutSessions.createdAt))
        .limit(1)

      if (!checkoutSession) {
        return c.json({ data: null })
      }
      return c.json({ data: checkoutSession })
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
  }
)
