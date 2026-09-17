import { checkoutSessions } from "@repo/db"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import { factory } from "../../../lib"
import { razorpay } from "../../../lib/razorpay"
import { authMiddleware, dbMiddleware, validate } from "../../../middleware"

export const createRazorpayOrderHandler = factory.createHandlers(
  authMiddleware,
  dbMiddleware,
  validate("json", z.object({ checkoutSessionId: z.coerce.number() })),
  async (c) => {
    const user = c.get("user")
    const userId = user.id
    const { checkoutSessionId } = c.req.valid("json")
    const db = c.get("db")

    try {
      const session = await selectSessionById(db, checkoutSessionId, userId)

      if (!session) {
        return c.json(
          {
            error: "not_found",
            code: "NOT_FOUND",
          },
          404
        )
      }

      if (session.status !== "ready_for_payment") {
        return c.json(
          {
            error: {
              code: "invalid_status",
              message: "Session status must be 'ready_for_payment'",
            },
          },
          400
        )
      }

      if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
        return c.json(
          {
            error: {
              code: "expired",
              message: "Session has expired",
            },
          },
          410
        )
      }

      // Convert session total to amount in paise
      const amountInPaise = Math.round(Number(session.total) * 100)

      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: String(session.id),
        notes: { checkoutSessionId: session.id, userId },
      })

      const updated = await updateCheckoutOrder(
        db,
        order.id,
        checkoutSessionId,
        userId
      )

      return c.json({
        data: {
          razorpayOrderId: order.id,
          amount: order.amount,
          currency: order.currency,
          checkoutSessionId: updated?.id,
        },
      })
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

async function selectSessionById(db: any, sessionId: number, userId: number) {
  const row = await db
    .select()
    .from(checkoutSessions)
    .where(
      and(
        eq(checkoutSessions.id, sessionId),
        eq(checkoutSessions.userId, userId)
      )
    )

  return row[0] ?? null
}

async function updateCheckoutOrder(
  db: any,
  orderId: any,
  sessionId: number,
  userId: number
) {
  const row = await db
    .update(checkoutSessions)
    .set({
      gatewayOrderId: orderId,
      paymentGateway: "razorpay",
      status: "ready_for_payment",
      paymentStatus: "pending",
    })
    .where(
      and(
        eq(checkoutSessions.id, sessionId),
        eq(checkoutSessions.userId, userId)
      )
    )
    .returning()
  return row[0] ?? null
}
