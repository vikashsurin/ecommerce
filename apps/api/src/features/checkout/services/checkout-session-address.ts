import { addresses, checkoutSessions } from "@repo/db"
import { and, eq } from "drizzle-orm"
import { type DB } from "../../../db"

export async function checkoutSessionAddress(
  db: DB,
  addressId: number,
  checkoutSessionId: number,
  userId: number,
  tx: DB = db
) {
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000)
  const [address] = await db
    .select()
    .from(addresses)
    .where(eq(addresses.id, addressId))
    .limit(1)

  const addressString = `${address?.street}, ${address?.city}, ${address?.state}, ${address?.zip},${address?.country}`

  const row = await tx
    .update(checkoutSessions)
    .set({
      addressId: addressId,
      shippingAddress: addressString,
      status: "address_selected",
      expiresAt,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(checkoutSessions.id, checkoutSessionId),
        eq(checkoutSessions.userId, userId)
      )
    )
    .returning()

  return row[0] ?? null
}
