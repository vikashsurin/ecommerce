import { db, wishlist } from "@repo/db"
import { factory } from "../../../lib"
import { authMiddleware, validate } from "../../../middleware"
import { addToWishlistSchema } from "./schema"

export const addToWishlistHandler = factory.createApp().post(
  "/",
  authMiddleware,
  validate("json", addToWishlistSchema),
  async (c) => {
    const { productVariantId } = c.req.valid("json")
    const user = c.get("user")

    const item = await saveWishlistItem(user.id, productVariantId)

    return c.json({ data: item })
  }
)

async function saveWishlistItem(userId: number, productVariantId: number) {
  const item = await db
    .insert(wishlist)
    .values({ userId, productVariantId })
    .onConflictDoNothing({
      target: wishlist.productVariantId,
    })
    .returning()

  return item[0] ?? null
}
