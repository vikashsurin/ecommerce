import { checkoutSessions } from "@repo/db"
import { and, eq } from "drizzle-orm"
import { type DB } from "../../../db"

export async function checkoutSessionFinalize(
  db: any,
  checkoutSessionsId: number,
  userId: number,
  tx: DB = db
) {
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000)

  const row = await tx
    .update(checkoutSessions)
    .set({
      status: "ready_for_payment",
      expiresAt,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(checkoutSessions.id, checkoutSessionsId),
        eq(checkoutSessions.userId, userId)
      )
    )
    .returning()

  return row[0] ?? null
}
