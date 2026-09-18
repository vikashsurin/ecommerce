import { addresses } from "@repo/db"
import { eq } from "drizzle-orm"
import { factory } from "../../../lib"
import { dbMiddleware } from "../../../middleware"

export const listAddressHandler = factory.createHandlers(async (c) => {
  const user = c.get("user")

  const db = c.get("db")
  try {
    const addresses = await selectAddresses(db, user.id)

    return c.json({ data: addresses })
  } catch (error) {
    return c.json(
      {
        error: {
          code: "internal_server_error",
          message: "Failed to save address",
        },
      },
      500
    )
  }
})

async function selectAddresses(db: any, userId: number) {
  const rows = await db
    .select()
    .from(addresses)
    .where(eq(addresses.userId, userId))

  return rows
}
