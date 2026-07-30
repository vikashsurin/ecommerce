import { orders, cartItems, checkoutSessions, db } from "@repo/db"
import crypto from "crypto"
import { and, eq } from "drizzle-orm"
import { appFactory } from "../../../lib/factory"
import { authMiddleware, validate } from "../../../middleware"
import { verifyPaymentSchema } from "./schema"

export const verifyRazorpayApp = appFactory().post(
  "/verify-payment",
  authMiddleware,
  validate("json", verifyPaymentSchema),
  async (c) => {
    const user = c.get("user")
    const userId = user?.id
    const ALREADY_PROCESSED = Symbol("already_processed")
    const {
      checkoutSessionId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = c.req.valid("json")

    console.log({
      checkoutSessionId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    })

    // TODO: LOOK AT THIS
    const secret = process.env.RAZORPAY_KEY_SECRET!

    console.log({ secret })

    const [session] = await db
      .select()
      .from(checkoutSessions)
      .where(
        and(
          eq(checkoutSessions.id, Number(checkoutSessionId)),
          eq(checkoutSessions.userId, userId),
          eq(checkoutSessions.gatewayOrderId, razorpay_order_id)
        )
      )

    console.log({ session })

    if (!session) {
      return c.json(
        {
          error: {
            code: "not_found",
            message: "Session/Order mismatch",
          },
        },
        404
      )
    }

    if (session.status === "completed") {
      return c.json(
        {
          data: {
            alreadyProcessed: true,
          },
        },
        200
      )
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      // If the signature does not match, update the session status to 'ready_for_payment' and payment status to 'failed'
      await db
        .update(checkoutSessions)
        .set({
          status: "ready_for_payment",
          paymentStatus: "failed",
        })
        .where(eq(checkoutSessions.id, session.id))

      return c.json(
        {
          error: {
            code: "invalid_signature",
            message: "The signature does not match the expected signature",
          },
        },
        400
      )
    }

    try {
      const result = await db.transaction(async (tx) => {
        // Update the session status to 'completed' and payment status to 'captured'
        const [updatedSession] = await tx
          .update(checkoutSessions)
          .set({
            status: "completed",
            paymentStatus: "captured",
            gatewayPaymentId: razorpay_payment_id,
          })
          .where(eq(checkoutSessions.id, session.id))
          .returning()

        if (!updatedSession) {
          throw new Error("Failed to update session status")
        }

        try {
          const [order] = await db
            .insert(orders)
            .values({
              userId: updatedSession.userId,
              cartId: updatedSession.cartId,
              checkoutSessionId: updatedSession.id,
              items: updatedSession.items,
              subtotal: 33,
              shippingCost: 33,
              taxAmount: 33,
              discountAmount: 3,
              total: 334,
              shippingAddress: updatedSession.shippingAddress!,
              status: "pending",
              paymentStatus: updatedSession.paymentStatus,
              paymentGateway: updatedSession.paymentGateway,
              paymentMethod: updatedSession.paymentMethod,
              gatewayOrderId: razorpay_order_id,
              gatewayPaymentId: razorpay_payment_id,
              gatewayResponse: updatedSession.gatewayResponse,
            })
            .returning()

          if (!order) {
            throw new Error("Failed to create order")
          }

          return order
        } catch (error: any) {
          if (error.code === "23505") {
            return ALREADY_PROCESSED
          }
          throw error
        }
      })

      // Remove cart_items
      await deleteCartItems(session.cartId)

      if (result === ALREADY_PROCESSED) {
        const [existingOrder] = await db
          .select()
          .from(orders)
          .where(eq(orders.checkoutSessionId, session.id))

        return c.json(
          {
            data: {
              orderId: existingOrder?.id,
              alreadyProcessed: true,
            },
          },
          200
        )
      }

      return c.json({
        data: {
          orderId: result.id,
          alreadyProcessed: false,
        },
      })
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: "Failed to update session status",
          },
        },
        500
      )
    }
  }
)

async function deleteCartItems(cartId: number) {
  const rows = await db
    .delete(cartItems)
    .where(eq(cartItems.cartId, cartId))
    .returning()

  return rows
}
