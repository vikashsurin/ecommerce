import { users } from "@repo/db"
import { z } from "zod"
import { factory } from "../../../lib"
import { dbMiddleware, validate } from "../../../middleware"
import { createUserSchema } from "./schema"

export const createUserHandler = factory.createHandlers(
  dbMiddleware,
  validate("json", createUserSchema),
  async (c) => {
    const parsedData = c.req.valid("json")
    const db = c.get("db")
    try {
      const user = await createUser(db, parsedData)

      return c.json({ data: user }, 201)
    } catch (error: any) {
      if (error?.cause?.errno === "23505")
        return c.json(
          {
            error: {
              code: "email_already_exists",
              message: "Email already exists",
            },
          },
          400
        )

      return c.json(
        {
          error: {
            message: "Failed to create user",
          },
        },
        500
      )
    }
  }
)

export async function createUser(
  db: any,
  data: z.infer<typeof createUserSchema>
) {
  const passwordHash = await Bun.password.hash(data.password)

  const user = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      password_hash: passwordHash,
      phone: data.phone,
      role: data.role,
    })
    .returning({
      name: users.name,
      email: users.email,
      phone: users.phone,
      role: users.role,
    })

  return user[0] || null
}
