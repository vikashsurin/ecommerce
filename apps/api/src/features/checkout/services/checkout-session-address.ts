import {
  type Transaction,
  checkoutSessions,
  db
} from "@repo/db";
import { and, eq } from "drizzle-orm";


export async function checkoutSessionAddress(
  addressId: number,
  checkoutSessionId: number,
  userId: number,
  tx: Transaction = db,
) {

  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  const row = await tx
    .update(checkoutSessions)
    .set({
      addressId: addressId,
      status: "address_selected",
      expiresAt,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(checkoutSessions.id, checkoutSessionId),
        eq(checkoutSessions.userId, userId),
      )
    )
    .returning();

  return row[0] ?? null
}
