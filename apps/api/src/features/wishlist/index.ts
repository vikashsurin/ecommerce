import { factory } from "../../lib";
import { addToWishlistHandler } from "./add-to-wishlist/handler";
import { moveItemToCartHandler } from "./move-item-to-cart/handler";
import { removeFromWishlistHandler } from "./remove-from-wishlist/handler";
import { viewWishlistHandler } from "./view-wishlist/handler";



export const wishlistApp = factory.createApp()
  .get('/', ...viewWishlistHandler)
  .post('/', ...addToWishlistHandler)
  .delete('/:productVariantId', ...removeFromWishlistHandler)
  .post('/move-to-cart', ...moveItemToCartHandler)
