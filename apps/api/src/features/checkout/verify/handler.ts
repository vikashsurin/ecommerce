import z from "zod";
import { appFactory } from "../../../lib/factory";
import { authMiddleware, validate } from "../../../middleware";

export const verifyRazorpayApp = appFactory()
  .post("/:sessionId/payment/verify",
    authMiddleware,
    validate('param', z.object({
      sessionId: z.string(),
    })),
    validate("json", z.object({
      razorpay_order_id: z.coerce.number(),
      razorpay_payment_id: z.coerce.number(),
      razorpay_signature: z.coerce.number(),
    })),
    async (c) => {
      const user = c.get("user");
      const { sessionId } = c.req.param();
      const { amount } = await c.req.json();
      return c.json({ data: '' })

    });
