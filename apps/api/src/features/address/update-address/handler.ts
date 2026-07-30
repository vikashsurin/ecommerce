import { addresses, db } from "@repo/db"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import { appFactory } from "../../../lib/factory"
import { authMiddleware } from "../../../middleware"
import { validate } from "../../../middleware/validate"
import { type UpdateAddressSchema, updateAddressSchema } from "./schema"

export const updateAddressApp = appFactory().patch(
  "/:id",
  authMiddleware,
  validate("param", z.object({ id: z.coerce.number() })),
  validate("json", updateAddressSchema),
  async (c) => {
    const user = c.get("user")
    const data = c.req.valid("json")
    const { id } = c.req.valid("param")

    try {
      const address = await updateAddress(Number(id), user.id, data)

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

async function updateAddress(
  id: number,
  userId: number,
  data: UpdateAddressSchema
) {
  const row = await db
    .update(addresses)
    .set({
      street: data?.street,
      city: data?.city,
      state: data?.state,
      zip: data?.pincode,
      country: data?.country,
      type: data?.type,
      updatedAt: new Date(),
    })
    .where(and(eq(addresses.id, id), eq(addresses.userId, userId)))
    .returning()

  return row[0] ?? null
}
