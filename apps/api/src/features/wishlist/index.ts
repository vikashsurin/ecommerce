import { factory } from "../../lib"
import {
  authMiddleware,
  dbMiddleware,
  requireTokenMiddleware,
} from "../../middleware"
import { addToWishlistHandler } from "./add-to-wishlist/handler"
import { moveItemToCartHandler } from "./move-item-to-cart/handler"
import { removeFromWishlistHandler } from "./remove-from-wishlist/handler"
import { viewWishlistHandler } from "./view-wishlist/handler"

export const wishlistApp = factory
  .createApp()
  .use(requireTokenMiddleware)
  .use(dbMiddleware)
  .use(authMiddleware)
  .get("/", ...viewWishlistHandler)
  .post("/", ...addToWishlistHandler)
  .delete("/:productVariantId", ...removeFromWishlistHandler)
  .post("/move-to-cart", ...moveItemToCartHandler)
