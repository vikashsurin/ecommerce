import { Hono } from "hono";
import { addToWishlistHandler } from "./add-to-wishlist/handler";
import { moveItemToCartApp } from "./move-item-to-cart/handler";
import { removeFromWishlistApp } from "./remove-from-wishlist/handler";
import { viewWishlistApp } from "./view-wishlist/handler";



export const wishlistApp = new Hono()
  .route('/', viewWishlistApp)
  .route('/', addToWishlistHandler)
  .route('/', removeFromWishlistApp)
  .route('/', moveItemToCartApp)
