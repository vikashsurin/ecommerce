import * as t from "drizzle-orm/pg-core"
import { pgTable as table } from "drizzle-orm/pg-core"
import { users } from "./users"

export const sessions = table(
  "sessions",
  {
    id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
    tokenHash: t.text("token_hash").notNull().unique(),
    userId: t
      .integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ipAddress: t.text("ip_address").notNull(),
    userAgent: t.text("user_agent"),
    refreshToken: t.text("refresh_token"),
    isActive: t.boolean("is_active").notNull().default(true),
    lastActivity: t.timestamp("last_activity").defaultNow(),
    expiresAt: t.timestamp("expires_at").notNull(),
    createdAt: t.timestamp("created_at").defaultNow(),
    updatedAt: t.timestamp("updated_at").defaultNow(),
  },
  (table) => [
    t
      .foreignKey({
        name: "sessions_user_fk",
        columns: [table.userId],
        foreignColumns: [users.id],
      })
      .onDelete("cascade"),

    t.index("sessions_userIdIdx").on(table.userId),
    t.index("session_expires_atIdx").on(table.expiresAt),
    t.index("sessions_ipAddressIdx").on(table.ipAddress),
    t
      .index("session_is_active_lastActivityIdx")
      .on(table.isActive, table.lastActivity),
  ]
)
