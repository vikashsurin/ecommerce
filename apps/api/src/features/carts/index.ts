import { Hono } from "hono";
import { addToCartApp } from "./add-to-cart/handler";
import { removeFromCartApp } from "./remove-from-cart/handler";
import { addItemToCart, findOrCreateCart } from "./services/add-to-cart";

export const cartsApp = new Hono()
  .route('/', addToCartApp)
  .route('/', removeFromCartApp)

export { addItemToCart, findOrCreateCart };

