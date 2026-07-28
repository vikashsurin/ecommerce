import {
  type Transaction,
  checkoutSessions,
  db
} from "@repo/db";
import { and, eq } from "drizzle-orm";


export async function updateCheckoutPayment(
  paymentId: number,
  checkoutSessionId: number,
  userId: number,
  cartId: number,
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
        eq(checkoutSessions.id, checkoutSessionId),
        eq(checkoutSessions.userId, userId),
        eq(checkoutSessions.cartId, cartId)
      )
    )
    .returning();

  return row[0] ?? null
}
