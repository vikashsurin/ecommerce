import { db, users } from "@repo/db"
import { Hono } from "hono"
import { z } from "zod"
import { validate } from "../../../middleware/validate"
import { createUserSchema } from "../../users"

export const registerUserApp = new Hono().post(
  "/register",
  validate("json", createUserSchema),
  async (c) => {
    const parsedData = c.req.valid("json")
    try {
      const user = await insertUser(parsedData)

      if (!user) {
        throw new Error("Failed to create user")
      }

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
            code: "internal_server_error",
            message: "Internal server error",
          },
        },
        500
      )
    }
  }
)

async function insertUser(data: z.infer<typeof createUserSchema>) {
  console.info("Inserting user into database", { data })
  const passwordHash = await Bun.password.hash(data.password)

  try {
    const row = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        password_hash: passwordHash,
        phone: data.phone,
        role: data.role ?? "user",
      })
      .returning({
        name: users.name,
        email: users.email,
        phone: users.phone,
        role: users.role,
      })

    return row[0] || null
  } catch (error) {
    console.error(error)
    throw error
  }
}
