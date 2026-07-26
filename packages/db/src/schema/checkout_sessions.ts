import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { addresses } from "./addresses";
import { carts } from "./carts";
import { users } from "./users";

export const checkoutStatusEnum = pgEnum("checkout_status", [
  "in_progress",
  "address_selected",
  "payment_pending",
  "payment_confirmed",
  "completed",
  "abandoned",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending", //created
  "authorized",
  "captured",
  "failed",
  "refunded",
]);

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

export const checkoutSessions = pgTable("checkout_sessions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  cartId: integer("cart_id")
    .notNull()
    .references(() => carts.id, { onDelete: "cascade" }),
  addressId: integer("address_id")
    .references(() => addresses.id, { onDelete: "set null", }),
  paymentGateway: paymentGatewayEnum("payment_gateway")
    .notNull().default('razorpay'),
  paymentMethod: paymentMethodEnum("payment_method"),
  gatewayOrderId: text("gateway_order_id"),
  gatewayPaymentId: text("gateway_payment_id"),
  paymentStatus: paymentStatusEnum("payment_status")
    .notNull().default("pending"),
  subtotal: integer("subtotal").notNull(),
  shippingCost: integer("shipping_cost")
    .notNull().default(0),
  total: integer("total").notNull(),
  status: checkoutStatusEnum("status").notNull()
    .default("in_progress"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
