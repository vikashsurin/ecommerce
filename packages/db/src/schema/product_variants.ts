import { sql } from "drizzle-orm"
import {
  check,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

import { products } from "./products"

export const productVariants = pgTable(
  "product_variants",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    sku: text("sku").notNull().unique(),
    attributes: jsonb("attributes"),
    price: integer("price").notNull(),
    salePrice: integer("sale_price"),
    stock: integer("stock").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    check(
      "sale_price_lower_check",
      sql`${table.salePrice} IS NULL OR ${table.salePrice} < ${table.price}`
    ),
  ]
)
