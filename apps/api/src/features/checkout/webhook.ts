import { Hono } from "hono";
import crypto from "node:crypto";

export const webhookRoute = new Hono().post("/", async (c) => {
  const rawBody = await c.req.text();
  const signature = c.req.header("x-razorpay-signature");

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (expected !== signature) {
    return c.json({ error: { code: "INVALID_SIGNATURE" } }, 400);
  }

  const payload = JSON.parse(rawBody);

  if (payload.event === "payment.captured") {
    const { order_id, id: paymentId } = payload.payload.payment.entity;
    // same idempotent "mark paid + create order if not exists" logic as step 4,
    // factored into a shared service so both routes call it
  }

  return c.json({ data: { received: true } });
});
