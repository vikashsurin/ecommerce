import { integer, text, timestamp, pgTable } from "drizzle-orm/pg-core"

export const promotions = pgTable("promotions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  code: text("code").notNull(),
  discount: integer("discount").notNull(),
  discountType: text("discount_type").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
