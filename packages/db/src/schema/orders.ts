import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { carts } from "./carts";
import { users } from "./users";

export const orderStatus = pgEnum('order_status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])

export const paymentStatus = pgEnum('payment_status', ['pending', 'paid', 'failed', 'refunded'])


export const orders = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  cartId: integer("cart_id")
    .notNull()
    .references(() => carts.id, { onDelete: "cascade" }),
  status: orderStatus("status").notNull().default('pending'),
  paymentStatus: paymentStatus("payment_status").notNull().default('pending'),
  shippingAddress: text("shipping_address").notNull(),
  total: integer("total").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
