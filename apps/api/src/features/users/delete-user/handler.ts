import { users } from "@repo/db"
import { factory } from "../../../lib"
import { z } from "zod"
import { validate } from "../../../middleware"
import { eq } from "drizzle-orm"

export const deleteUserHandler = factory.createHandlers(
  validate("param", z.object({ id: z.coerce.number() })),
  async (c) => {
    const { id } = c.req.valid("param")
    const db = c.get("db")

    try {
      const user = await deleteUser(db, id)

      if (!user) {
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Nothing to delete",
            },
          },
          404
        )
      }

      return c.json({ data: { id: user?.id } }, 200)
    } catch (error) {
      return c.json(
        {
          error: { message: "Unable to delete user" },
        },
        500
      )
    }
  }
)

async function deleteUser(db: any, id: number) {
  const user = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning({ id: users.id })
  return user[0] ?? null
}
