import { checkoutSessions, db } from "@repo/db";
import crypto from "crypto";
import { and, eq } from "drizzle-orm";
import { appFactory } from "../../../lib/factory";
import { authMiddleware, validate } from "../../../middleware";
import { verifyPaymentSchema } from "./schema";

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

      // TODO: LOOK AT THIS
      const secret = process.env.RAZORPAY_KEY_SECRET!;

      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {

        await failCheckoutSession(Number(checkoutSessionId));

        return c.json({
          error: {
            code: 'invalid_signature',
            message: 'The signature does not match the expected signature',
          }
        }, 400)
      }


      const session = await selectCheckoutSession(
        Number(checkoutSessionId), Number(userId), razorpay_order_id)

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
    });


async function failCheckoutSession(sessionId: number) {

  const row = await db
    .update(checkoutSessions)
    .set({ paymentStatus: 'failed' })
    .where(eq(checkoutSessions.id, sessionId))
    .returning()

  return row[0] ?? null
}


async function selectCheckoutSession(
  sessionId: number,
  userId: number,
  razorpayOrderId: string
) {
  const row = await db
    .select()
    .from(checkoutSessions)
    .where(
      and(
        eq(checkoutSessions.id, sessionId),
        eq(checkoutSessions.userId, userId),
        eq(checkoutSessions.gatewayOrderId, razorpayOrderId)
      )
    )

  return row[0] ?? null
}
