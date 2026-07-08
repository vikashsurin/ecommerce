import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";
import { productVariants } from "./product_variants";
import { users } from "./users";

export const wishlist = pgTable("wishlist", {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  productVariantId: integer('product_variant_id')
    .notNull()
    .unique()
    .references(() => productVariants.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
