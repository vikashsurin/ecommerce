import { wishlist } from "@repo/db"
import { eq } from "drizzle-orm"
import { factory } from "../../../lib"
import { authMiddleware, dbMiddleware } from "../../../middleware"

export const viewWishlistHandler = factory.createHandlers(
  authMiddleware,
  dbMiddleware,
  async (c) => {
    const user = c.get("user")
    const db = c.get("db")

    try {
      const items = await selectWishlistItems(db, user.id)
      return c.json({ data: items })
    } catch (error) {
      return c.json({ error: "Failed to fetch wishlist items" }, 500)
    }
  }
)

async function selectWishlistItems(db: any, userId: number) {
  const items = await db
    .select()
    .from(wishlist)
    .where(eq(wishlist.userId, userId))
    .execute()
  return items
}
