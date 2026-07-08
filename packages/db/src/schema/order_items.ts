import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { products } from "./products";
import { productVariants } from "./product_variants";

export const orderItems = pgTable('order_items', {
  id: integer("id").primaryKey().notNull(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  productVariantId: integer("product_variant_id")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  priceAtPurchase: integer("price_at_purchase").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
