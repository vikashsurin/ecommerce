import { checkoutSessions, db } from "@repo/db";
import { eq } from "drizzle-orm";
import { appFactory } from "../../../lib/factory";
import { authMiddleware } from "../../../middleware";

export const getCheckoutSession = appFactory()
  .get("/",
    authMiddleware,
    async (c) => {
      const user = c.get("user");
      try {
        const checkoutSession = await selectCheckoutSessionByUserId(user.id)
        console.log(checkoutSession)
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
