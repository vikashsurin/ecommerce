import { z } from "zod"
import { appFactory } from "../../../lib/factory"
import { authMiddleware } from "../../../middleware"
import { validate } from "../../../middleware/validate"
import { deleteFromWishlist } from "../services/delete-from-wishlist.service"

export const removeFromWishlistApp = appFactory.delete(
  "/:productVariantId",
  authMiddleware,
  validate("param", z.object({ itemId: z.coerce.number() })),
  async (c) => {
    const { itemId } = c.req.valid("param")
    const user = c.get("user")

    try {
      const item = await deleteFromWishlist(itemId, user.id)

      if (!item)
        return c.json({
          error: {
            code: "not_found",
            message: "Item not found",
          },
        })

      return c.json({ data: item })
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

// async function removeFromWishlist(productVariantId: number, userId: number) {
//   const item = await db
//     .delete(wishlist)
//     .where(
//       and(
//         eq(wishlist.productVariantId, productVariantId),
//         eq(wishlist.userId, userId)
//       )
//     )
//     .returning({
//       productId: wishlist.productVariantId
//     });

//   return item[0] ?? null
// }
