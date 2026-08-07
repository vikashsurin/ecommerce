import { addresses, db } from "@repo/db"
import { factory } from "../../../lib"
import { authMiddleware } from "../../../middleware"
import { validate } from "../../../middleware/validate"
import { type CreateAddressSchema, createAddressSchema } from "./schema"

export const saveAddressApp = factory.createApp().post(
  "/",
  authMiddleware,
  validate("json", createAddressSchema),
  async (c) => {
    const user = c.get("user")
    const data = c.req.valid("json")

    try {
      const address = await insertAddress(user.id, data)

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

async function insertAddress(userId: number, data: CreateAddressSchema) {
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
