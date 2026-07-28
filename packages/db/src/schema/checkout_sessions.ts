import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { addresses } from "./addresses";
import { carts } from "./carts";
import { users } from "./users";

export const checkoutStatusEnum = pgEnum("checkout_status", [
  "in_progress",
  "address_selected",
  "ready_for_payment",
  "completed",
  "abandoned",
  "expired",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
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

// Snapshot type — frozen at session creation, independent of live cart/product state
export type CheckoutSessionItem = {
  productId: number;
  variantId?: number;
  name: string;
  sku?: string;
  attributes?: Record<string, string>;
  unitPrice: number; // price at time of checkout, not live product price
  originalUnitPrice: number;
  quantity: number;
  imageUrl?: string;
};

export const checkoutSessions = pgTable(
  "checkout_sessions",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .unique(),
    cartId: integer("cart_id")
      .notNull()
      .references(() => carts.id, { onDelete: "cascade" })
      .unique(),
    addressId: integer("address_id").references(() => addresses.id, {
      onDelete: "set null",
    }),

    // Frozen snapshot of what's being purchased — review/order pages read from here, never from live cart
    items: jsonb("items").notNull().$type<CheckoutSessionItem[]>(),

    paymentGateway: paymentGatewayEnum("payment_gateway")
      .notNull()
      .default("razorpay"),
    paymentMethod: paymentMethodEnum("payment_method"),
    gatewayOrderId: text("gateway_order_id"),
    gatewayPaymentId: text("gateway_payment_id"),

    // Raw webhook/response payload from the gateway — useful for dispute/debugging without depending on their dashboard retention
    gatewayResponse: jsonb("gateway_response"),

    paymentStatus: paymentStatusEnum("payment_status")
      .notNull()
      .default("pending"),

    // Prevents duplicate session creation on retry/double-click before a gateway order exists
    idempotencyKey: text("idempotency_key"),

    currency: varchar("currency", { length: 3 }).notNull().default("INR"),

    subtotal: integer("subtotal").notNull(),
    shippingCost: integer("shipping_cost").notNull().default(0),
    taxAmount: integer("tax_amount").notNull().default(0),
    discountAmount: integer("discount_amount").notNull().default(0),
    couponCode: text("coupon_code"),
    total: integer("total").notNull(),

    status: checkoutStatusEnum("status").notNull().default("in_progress"),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    // Fast, safe lookup when Razorpay sends a webhook keyed on gateway_order_id
    uniqueIndex("checkout_sessions_gateway_order_id_idx").on(
      table.gatewayOrderId
    ),
    uniqueIndex("checkout_sessions_idempotency_key_idx").on(
      table.idempotencyKey
    ),
    uniqueIndex("checkout_sessions_user_id_cart_id_idx").on(
      table.userId,
      table.cartId
    ),
  ]
);
