import { index, integer, jsonb, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core"

import { checkoutSessions } from "./checkout_sessions"
import {
  orderStatusEnum,
  paymentGatewayEnum,
  paymentMethodEnum,
  paymentStatusEnum,
} from "./enums"
import { users } from "./users"



export const orders = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  cartId: integer("cart_id")
    .notNull(),
  checkoutSessionId: integer("checkout_session_id")
    .notNull()
    .references(() => checkoutSessions.id),
  items: jsonb("items").notNull(),


  subtotal: integer("subtotal").notNull(),
  shippingCost: integer("shipping_cost").notNull().default(0),
  taxAmount: integer("tax_amount").notNull().default(0),
  discountAmount: integer("discount_amount").notNull().default(0),
  total: integer("total").notNull(),

  shippingAddress: text("shipping_address").notNull(),

  status: orderStatusEnum("status").notNull().default("pending"),
  paymentStatus: paymentStatusEnum("payment_status").notNull().default("pending"),

  paymentGateway: paymentGatewayEnum("payment_gateway"),
  paymentMethod: paymentMethodEnum("payment_method"),
  gatewayOrderId: text("gateway_order_id"),      // razorpay_order_id
  gatewayPaymentId: text("gateway_payment_id"),  // razorpay_payment_id
  gatewayResponse: jsonb("gateway_response"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
},
  (table) => [
    index('orders_cart_id_idx').on(table.cartId),
    uniqueIndex("orders_checkout_session_id_idx")
      .on(table.checkoutSessionId),
  ])
