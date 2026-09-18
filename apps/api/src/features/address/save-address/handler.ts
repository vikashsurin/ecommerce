import { addresses } from "@repo/db"
import { factory } from "../../../lib"
import { authMiddleware } from "../../../middleware"
import { dbMiddleware } from "../../../middleware/db"
import { validate } from "../../../middleware/validate"
import { type CreateAddressSchema, createAddressSchema } from "./schema"

export const saveAddressHandler = factory.createHandlers(
  validate("json", createAddressSchema),
  async (c) => {
    const user = c.get("user")
    const data = c.req.valid("json")

    const db = c.get("db")

    try {
      const address = await insertAddress(db, user.id, data)

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

async function insertAddress(
  db: any,
  userId: number,
  data: CreateAddressSchema
) {
  const row = await db
    .insert(addresses)
    .values({
      userId: userId,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.pincode,
      country: data.country,
      type: data.type,
    })
    .returning()

  return row[0] ?? null
}
