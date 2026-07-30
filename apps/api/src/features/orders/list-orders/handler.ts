import { db, orders } from "@repo/db"
import { eq } from "drizzle-orm"
import { appFactory } from "../../../lib/factory"
import { authMiddleware } from "../../../middleware"

export const listOrdersApp = appFactory().get(
  "/",
  authMiddleware,
  async (c) => {
    const user = c.get("user")

    try {
      const orders = await selectOrders(user.id)
      return c.json({ data: orders })
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: "Internal server error",
          },
        },
        500
      )
    }
  }
)

async function selectOrders(userId: number) {
  const rows = await db.select().from(orders).where(eq(orders.userId, userId))
  return rows
}
