import { db, wishlist } from '@repo/db'
import { eq } from 'drizzle-orm'
import { appFactory } from '../../../lib/factory'
import { authMiddleware } from '../../../middleware'

export const viewWishlistApp = appFactory()
  .get('/',
    authMiddleware,
    async (c) => {
      const user = c.get('user')

      try {
        const items = await selectWishlistItems(user.id)
        return c.json({ data: items })
      } catch (error) {
        return c.json({ error: 'Failed to fetch wishlist items' }, 500)
      }
    })

async function selectWishlistItems(userId: number) {
  const items = await db
    .select()
    .from(wishlist)
    .where(eq(wishlist.userId, userId))
    .execute()
  return items
}
