import { factory } from "../../../lib"

export const getDemoHandler = factory.createHandlers(async (c) => {
  const db = c.get("db")

  const cats = await db.query.categories.findMany()

  console.log({ cats })
  return c.json({ message: `Hello from the demo endpoint ` })
})
