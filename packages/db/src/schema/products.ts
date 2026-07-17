import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const products = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  categoryId: integer("category_id").notNull(),
  brandId: integer("brand_id"),
  specifications: jsonb("specifications"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
