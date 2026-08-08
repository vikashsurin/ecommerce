import { sql } from "drizzle-orm";
import { boolean, index, integer, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { productVariants } from "./product_variants";
import { products } from "./products";

export const productImages = pgTable("product_images", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  productVariantId: integer("product_variant_id")
    .references(() => productVariants.id, { onDelete: "cascade" }),
  key: text("key").notNull(),
  altText: text("alt_text"),
  isPrimary: boolean("is_primary").notNull().default(false),
  sortOrder: integer("sort_order").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => [
  index("product_images_product_id_idx").on(table.productId),
  index("product_images_product_variant_id_idx").on(table.productVariantId),
  uniqueIndex("product_images_sort_order_idx").on(
    table.productId,
    table.productVariantId,
    table.sortOrder,
  ),

  // only one product-level image (variantId IS NULL) per product
  uniqueIndex("one_product_level_image")
    .on(table.productId)
    .where(sql`${table.productVariantId} IS NULL`),

  uniqueIndex("one_primary_per_variant")
    .on(table.productVariantId)
    .where(sql`${table.isPrimary} = true`),
]);
