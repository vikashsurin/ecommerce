import { checkoutSessions, db } from "@repo/db";
import crypto from "crypto";
import { and, eq } from "drizzle-orm";
import { appFactory } from "../../../lib/factory";
import { authMiddleware, validate } from "../../../middleware";
import { verifyPaymentSchema } from "./schema";
import { toDotPath } from "zod/v4/core";
import orders from "razorpay/dist/types/orders";

export const verifyRazorpayApp = appFactory()
  .post("/verify-payment",
    authMiddleware,
    validate("json", verifyPaymentSchema),
    async (c) => {
      const user = c.get('user')
      const userId = user?.id

      const {
        checkoutSessionId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature } = c.req.valid("json");

      console.log({
        checkoutSessionId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      })

      // TODO: LOOK AT THIS
      const secret = process.env.RAZORPAY_KEY_SECRET!;

      console.log({ secret })

      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        // If the signature does not match, update the session status to 'ready_for_payment' and payment status to 'failed'
        await db
          .update(checkoutSessions)
          .set({
            status: 'ready_for_payment',
            paymentStatus: 'failed',
          })

        return c.json({
          error: {
            code: 'invalid_signature',
            message: 'The signature does not match the expected signature',
          }
        }, 400)
      }


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
        return c.json({
          error: {
            code: 'not_found',
            message: 'Session/Order mismatch',
          }
        }, 404)
      }

      if (session.status === 'completed') {
        return c.json({
          data: {
            alreadyProcessed: true
          }
        }, 200)
      }



      // return c.json({
      //   data: {
      //     orderId: razorpay_order_id,
      //     paymentId: razorpay_payment_id,
      //   }
      // }, 200)


      // Insert the order
      const result = await db.transaction(
        async (tx) => {
          const row = await tx
            .update(checkoutSessions)
            .set({
              status: 'completed',
              paymentStatus: 'captured',
              gatewayPaymentId: razorpay_payment_id,
            })
            .where(eq(checkoutSessions.id, session.id))
            .returning()
          return row[0] ?? null
        }
      )


      console.log({ result })
      return c.json({
        data: result,
      }, 200)
    });
