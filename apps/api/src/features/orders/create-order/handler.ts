import { carts, db, orders } from "@repo/db";
import { eq } from "drizzle-orm";
import z from "zod";
import { appFactory } from "../../../lib/factory";
import { authMiddleware, validate } from "../../../middleware";
import { createOrderSchema } from "./schema";


export const createOrderApp = appFactory()
  .post("/",
    authMiddleware,
    validate('json', createOrderSchema),
    async (c) => {
      const user = c.get('user')
      const orderData = c.req.valid('json')

      try {
        const order = await saveOrder(user.id, orderData)
        if (!order) {
          throw new Error("Failed to create order")
        }
        return c.json({ data: order })
      } catch (error) {
        return c.json({
          error: {
            code: "internal_server_error",
            message: "Failed to create order"
          }
        }, 500)
      }
    })

async function saveOrder(userId: number, orderData: z.infer<typeof createOrderSchema>) {

  const { cartId, shippingAddress } = orderData

  const [cart] = await db
    .select()
    .from(carts)
    .where(eq(carts.id, cartId))
    .limit(1)

  if (!cart) {
    throw new Error("Cart not found")
  }

  const total = calculateTotal(cart)

  const order = await db
    .insert(orders)
    .values({
      userId,
      cartId,
      shippingAddress,
      total,
      status: "pending",
      paymentStatus: "pending",
    })
    .returning()

  return order[0] ?? null
}

function calculateTotal(cart: any) {
  const total = 344;
  return total
}
