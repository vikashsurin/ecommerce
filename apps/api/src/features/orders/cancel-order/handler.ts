import { db, orders } from "@repo/db"
import { and, eq } from "drizzle-orm"
import z from "zod"
import { appFactory } from "../../../lib/factory"
import { authMiddleware, validate } from "../../../middleware"

export const cancelOrderApp = appFactory().patch(
  "/:orderId",
  authMiddleware,
  validate("param", z.object({ orderId: z.coerce.number() })),
  async (c) => {
    const user = c.get("user")
    const { orderId } = c.req.valid("param")

    try {
      // 1. Fetch current order to check state before modifying
      const [existingOrder] = await db
        .select({ status: orders.status })
        .from(orders)
        .where(and(eq(orders.id, orderId), eq(orders.userId, user.id)))
        .limit(1)

      if (!existingOrder) {
        return c.json(
          {
            error: { code: "not_found", message: "Order not found" },
          },
          404
        )
      }

      const currentStatus = existingOrder.status

      // 2. Guard clause for valid state transitions
      if (currentStatus === "shipped" || currentStatus === "delivered") {
        return c.json(
          {
            error: {
              code: "bad_request",
              message: `Cannot cancel an order that has already been ${currentStatus}`,
            },
          },
          400
        )
      }

      if (currentStatus === "cancelled") {
        return c.json(
          {
            error: {
              code: "bad_request",
              message: "Order is already cancelled",
            },
          },
          400
        )
      }

      // 3. Execute the safe cancellation
      const order = await cancelOrder(user.id, orderId)

      if (!order) {
        throw new Error("Failed to cancel order")
      }

      return c.json({ data: { id: order.id, status: order.status } })
    } catch (error) {
      // Log the actual error internally so you can trace it in Datadog/CloudWatch
      console.error("[CANCEL_ORDER_ERROR]:", error)

      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: "Failed to cancel order",
          },
        },
        500
      )
    }
  }
)

async function cancelOrder(userId: number, orderId: number) {
  const order = await db
    .update(orders)
    .set({
      status: "cancelled",
      updatedAt: new Date(),
    })
    .where(and(eq(orders.id, orderId), eq(orders.userId, userId)))
    .returning()

  return order[0] ?? null
}
