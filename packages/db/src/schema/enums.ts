import { pgEnum } from "drizzle-orm/pg-core";

export const paymentStatusEnum = pgEnum('payment_status', [
  "pending",
  "authorized",
  "captured",
  "failed",
  "refunded",
])
