import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import { categories } from "./categories"

export const categoryAttributes = pgTable("category_attributes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  key: text("key").notNull(),
  label: text("label").notNull(),
  inputType: text("input_type").notNull(),
  options: jsonb("options"),
  skuAbbreviation: boolean("sku_abbreviation").notNull().default(true),
  required: boolean("required").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
