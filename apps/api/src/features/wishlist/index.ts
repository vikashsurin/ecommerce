import { factory } from "../../lib";
import { addToWishlistHandler } from "./add-to-wishlist/handler";
import { moveItemToCartApp } from "./move-item-to-cart/handler";
import { removeFromWishlistApp } from "./remove-from-wishlist/handler";
import { viewWishlistApp } from "./view-wishlist/handler";



export const wishlistApp = factory.createApp()
  .route('/', viewWishlistApp)
  .route('/', addToWishlistHandler)
  .route('/', removeFromWishlistApp)
  .route('/', moveItemToCartApp)
