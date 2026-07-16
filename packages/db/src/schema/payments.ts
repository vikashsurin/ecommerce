import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { orders } from "./orders"

export const payments = pgTable("payments", {
  id: integer("id").primaryKey().notNull(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  transactionId: text("transaction_id").notNull(),
  amount: integer("amount").notNull(),
  provider: text("provider").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
