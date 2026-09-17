import { categories } from "@repo/db"
import { factory } from "../../../lib"
import { dbMiddleware } from "../../../middleware"

export const getDemoHandler = factory.createHandlers(
  dbMiddleware,
  async (c) => {
    const db = c.get("db")
    const result = await db.select().from(categories)
    return c.json({ message: `Hello from the demo endpoint `, data: result })
  }
)
