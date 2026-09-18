import { addresses } from "@repo/db"
import { and, eq } from "drizzle-orm"
import z from "zod"
import { factory } from "../../../lib"
import { validate } from "../../../middleware"

export const getAddressHandler = factory.createHandlers(
  validate("param", z.object({ addressId: z.coerce.number() })),
  async (c) => {
    const user = c.get("user")
    const { addressId } = c.req.valid("param")

    const db = c.get("db")

    try {
      const address = await selectAddressById(db, addressId, user.id)

      if (!address) {
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Address not found",
            },
          },
          404
        )
      }
      return c.json({ data: address })
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: "Internal server error",
          },
        },
        500
      )
    }
  }
)

async function selectAddressById(db: any, addressId: number, userId: number) {
  const row = await db
    .select()
    .from(addresses)
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))

  return row[0] ?? null
}
