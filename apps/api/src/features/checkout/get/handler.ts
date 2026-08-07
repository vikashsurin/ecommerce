import { checkoutSessions, db } from "@repo/db"
import { and, desc, eq, notInArray } from "drizzle-orm"
import { z } from "zod"
import { appFactory } from "../../../lib/factory"
import { authMiddleware, validate } from "../../../middleware"

export const getCheckoutSessionApp = appFactory
  .get(
    "/:id",
    authMiddleware,
    validate("param", z.object({ id: z.coerce.number() })),
    async (c) => {
      const { id } = c.req.valid("param")
      const user = c.get("user")
      const userId = user.id
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
  .get("/", authMiddleware, async (c) => {
    const user = c.get("user")
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
  })
