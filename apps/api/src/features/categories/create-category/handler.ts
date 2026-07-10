import { categories, db } from "@repo/db";
import { appFactory } from "../../../lib/factory";
import { authMiddleware, validate } from "../../../middleware";

import z from "zod";

const slugSchema = z.string().slugify()

export const createCategoryApp = appFactory()
  .post('/',
    authMiddleware,
    validate("json",
      z.object({ name: z.string() })),
    async (c) => {
      const data = c.req.valid('json')
      const slug = slugSchema.parse(data.name)

      try {
        const category = await createCategory({ name: data.name, slug })
        return c.json({data:category})
      } catch (error) {
        return c.json({
          error: {
            code: 'internal_server_error',
            message: error instanceof Error ? error.message : String(error),
          },
        }, 500)
      }

    }

)


async function createCategory(data: { name: string, slug:string }) {

  const category = await db
    .insert(categories)
    .values({
      name: data.name,
      slug: data.slug,
    })
    .returning()
  return category[0] ?? null
}
