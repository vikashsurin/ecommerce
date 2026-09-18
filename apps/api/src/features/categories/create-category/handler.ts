import { categories } from "@repo/db"
import { factory } from "../../../lib"
import { dbMiddleware, validate } from "../../../middleware"

import z from "zod"
import { createCategorySchema } from "./schema"

const slugSchema = z.string().slugify()

export const createCategoryHandler = factory.createHandlers(
  validate("json", createCategorySchema),
  async (c) => {
    const data = c.req.valid("json")

    const slug = slugSchema.parse(data.name)
    const db = c.get("db")

    try {
      const category = await createCategory(db, {
        name: data.name,
        specificationsLabel: data.specificationsLabel,
        slug,
      })
      return c.json({ data: category })
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: error instanceof Error ? error.message : String(error),
          },
        },
        500
      )
    }
  }
)

async function createCategory(
  db: any,
  data: {
    name: string
    specificationsLabel: string
    slug: string
  }
) {
  const category = await db
    .insert(categories)
    .values({
      name: data.name,
      slug: data.slug,
      specificationsLabel: data.specificationsLabel,
    })
    .returning()
  return category[0] ?? null
}
