import { checkoutSessions, db } from "@repo/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { appFactory } from "../../../lib/factory";
import { authMiddleware, validate } from "../../../middleware";

export const getCheckoutSessionApp = appFactory()
  .get('/:cksessionId',
    authMiddleware,
    validate('param', z.object({ cksessionId: z.coerce.number() })),
    async (c) => {
      const sessionId = c.req.param('cksessionId')

      try {
        const checkoutSession = await selectCheckoutSessionById(Number(sessionId))

        if (!checkoutSession) {
          return c.json({ data: null })
        }

        return c.json({ data: checkoutSession })
      } catch (error) {
        return c.json({
          error: {
            code: "internal_server_error",
            message: "Internal Server Error",
          }
        }, 500)
      }
    })
  .get("/",
    authMiddleware,
    async (c) => {
      const user = c.get("user");
      try {
        const checkoutSession = await selectCheckoutSessionByUserId(user.id)
        if (!checkoutSession) {
          return c.json({ data: null })
        }
        return c.json({ data: checkoutSession })

      } catch (error) {
        return c.json({
          error: {
            code: "internal_server_error",
            message: "Internal Server Error",
          }
        }, 500)
      }
    });

async function selectCheckoutSessionByUserId(userId: number) {

  const row = await db
    .select()
    .from(checkoutSessions)
    .where(eq(checkoutSessions.userId, userId))
  return row[0] ?? null
}

async function selectCheckoutSessionById(sessionId: number) {
  const row = await db
    .select()
    .from(checkoutSessions)
    .where(eq(checkoutSessions.id, sessionId))
  return row[0] ?? null
}
