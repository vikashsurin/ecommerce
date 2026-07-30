import { sql } from "drizzle-orm"
import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"
import { addresses } from "./addresses"
import { carts } from "./carts"
import {
  paymentGatewayEnum,
  paymentMethodEnum,
  paymentStatusEnum,
} from "./enums"
import { users } from "./users"

export const checkoutStatusEnum = pgEnum("checkout_status", [
  "in_progress",
  "address_selected",
  "ready_for_payment",
  "completed",
  "abandoned",
  "expired",
])

export type CheckoutSessionItem = {
  productId: number
  variantId?: number
  name: string
  sku?: string
  attributes?: Record<string, string>
  unitPrice: number
  originalUnitPrice: number
  quantity: number
  imageUrl?: string
}

export const checkoutSessions = pgTable(
  "checkout_sessions",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    cartId: integer("cart_id")
      .notNull()
      .references(() => carts.id, { onDelete: "cascade" }),
    addressId: integer("address_id").references(() => addresses.id, {
      onDelete: "set null",
    }),
    shippingAddress: text("shipping_address"),
    items: jsonb("items").notNull().$type<CheckoutSessionItem[]>(),

    paymentGateway: paymentGatewayEnum("payment_gateway")
      .notNull()
      .default("razorpay"),
    paymentMethod: paymentMethodEnum("payment_method"),
    gatewayOrderId: text("gateway_order_id"),
    gatewayPaymentId: text("gateway_payment_id"),

    gatewayResponse: jsonb("gateway_response"),

    paymentStatus: paymentStatusEnum("payment_status")
      .notNull()
      .default("pending"),

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
    uniqueIndex("checkout_sessions_user_id_cart_id_idx")
      .on(table.userId, table.cartId)
      .where(sql`status NOT IN ('completed', 'abandoned', 'expired')`),
  ]
)
