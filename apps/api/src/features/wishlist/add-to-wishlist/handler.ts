import { wishlist } from "@repo/db"
import { factory } from "../../../lib"
import { validate } from "../../../middleware"
import { addToWishlistSchema } from "./schema"

export const addToWishlistHandler = factory.createHandlers(
  validate("json", addToWishlistSchema),
  async (c) => {
    const { productVariantId } = c.req.valid("json")
    const user = c.get("user")
    const db = c.get("db")

    const item = await saveWishlistItem(db, user.id, productVariantId)

    return c.json({ data: item })
  }
)

async function saveWishlistItem(
  db: any,
  userId: number,
  productVariantId: number
) {
  const item = await db
    .insert(wishlist)
    .values({ userId, productVariantId })
    .onConflictDoNothing({
      target: wishlist.productVariantId,
    })
    .returning()

  return item[0] ?? null
}
