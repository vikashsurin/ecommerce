import { addresses, db } from "@repo/db"
import { eq } from "drizzle-orm"
import { factory } from "../../../lib"
import { authMiddleware } from "../../../middleware"

export const listAddressApp = factory.createApp().get(
  "/",
  authMiddleware,
  async (c) => {
    const user = c.get("user")

    try {
      const addresses = await selectAddresses(user.id)

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
  }
)

async function selectAddresses(userId: number) {
  const rows = await db
    .select()
    .from(addresses)
    .where(eq(addresses.userId, userId))

  return rows
}
