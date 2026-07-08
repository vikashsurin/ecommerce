import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTypes = pgEnum('user_types', ['user', 'seller', 'admin']);

export const users = pgTable("users", {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
  role: userTypes("role").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
