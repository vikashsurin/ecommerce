import { pgEnum } from "drizzle-orm/pg-core";

export const paymentStatusEnum = pgEnum('payment_status', [
  "pending",
  "authorized",
  "captured",
  "failed",
  "refunded",
])

export const paymentGatewayEnum = pgEnum("payment_gateway", [
  "stripe",
  "razorpay",
  "paypal",
]);


export const paymentMethodEnum = pgEnum("payment_method", [
  "card",
  "upi",
  "netbanking",
  "wallet",
]);


export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
])
