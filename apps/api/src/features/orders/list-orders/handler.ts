import { orders } from "@repo/db"
import { eq } from "drizzle-orm"
import { factory } from "../../../lib"
import { authMiddleware, dbMiddleware } from "../../../middleware"

export const listOrdersHandler = factory.createHandlers(
  authMiddleware,
  dbMiddleware,
  async (c) => {
    const user = c.get("user")
    const db = c.get("db")

    try {
      const orders = await selectOrders(db, user.id)
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

async function selectOrders(db: any, userId: number) {
  const rows = await db.select().from(orders).where(eq(orders.userId, userId))
  return rows
}
