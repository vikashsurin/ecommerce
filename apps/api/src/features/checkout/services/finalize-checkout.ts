import {
  type Transaction,
  checkoutSessions,
  db
} from "@repo/db";
import { and, eq } from "drizzle-orm";


export async function finalizeCheckout(
  cartId: number,
  userId: number,
  tx: Transaction = db,
) {

  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  const row = await tx
    .update(checkoutSessions)
    .set({
      status: "ready_for_payment",
      expiresAt,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(checkoutSessions.cartId, cartId),
        eq(checkoutSessions.userId, userId),
      )
    )
    .returning();

  return row[0] ?? null
}
