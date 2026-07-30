import { addresses, db } from "@repo/db"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import { appFactory } from "../../../lib/factory"
import { authMiddleware } from "../../../middleware"
import { validate } from "../../../middleware/validate"

export const deleteAddressApp = appFactory().delete(
  "/:id",
  authMiddleware,
  validate("param", z.object({ id: z.coerce.number() })),

  async (c) => {
    const user = c.get("user")
    const { id } = c.req.valid("param")

    try {
      const address = await deleteAddress(Number(id), user.id)

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
            message: "Failed to save address",
          },
        },
        500
      )
    }
  }
)

async function deleteAddress(id: number, userId: number) {
  const row = await db
    .delete(addresses)
    .where(and(eq(addresses.id, id), eq(addresses.userId, userId)))
    .returning()

  return row[0] ?? null
}
