import { db, wishlist } from "@repo/db";
import { and, eq } from "drizzle-orm";

export async function deleteFromWishlist(itemId: number, userId: number) {
  const item = await db
    .delete(wishlist)
    .where(
      and(
        eq(wishlist.id, itemId),
        eq(wishlist.userId, userId)
      )
    )
    .returning({
      productId: wishlist.id
    });

  return item[0] ?? null
}
