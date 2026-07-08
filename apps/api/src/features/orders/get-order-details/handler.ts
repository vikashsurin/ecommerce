import { db, orders } from "@repo/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { appFactory } from "../../../lib/factory";
import { authMiddleware, validate } from "../../../middleware";

export const getOrderDetailsApp = appFactory()
  .get("/:orderId",
    authMiddleware,
    validate('param', z.object({ orderId: z.coerce.number() })),
    async (c) => {
      const user = c.get('user')
      const { orderId } = c.req.valid('param')

      try {
        const order = await selectOrder(orderId)
        if (!order) {
          return c.json({
            error: {
              code: 'not_found',
              message: "Order not found"
            }
          }, 404)
        }
        return c.json({ data: order })
      } catch (error) {
        return c.json({
          error: {
            code: 'internal_server_error',
            message: "Internal server error"
          }
        }, 500)
      }
    })


async function selectOrder(orderId: number) {
  const row = await db
    .select()
    .from(orders)
    .where(eq(
      orders.id, orderId
    )).
    limit(1)
  return row[0] ?? null
}
