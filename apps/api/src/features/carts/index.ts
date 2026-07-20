import { Hono } from "hono";
import { addToCartApp } from "./add-to-cart/handler";
import { getCartApp } from "./get-cart/handler";
import { removeFromCartApp } from "./remove-from-cart/handler";
import { addItemToCart, findOrCreateCart } from "./services/add-to-cart";
import { updateCartItemQuantity } from "./update-cart-item-quantity/handler";

export const cartsApp = new Hono()
  .route('/', addToCartApp)
  .route('/', removeFromCartApp)
  .route('/', getCartApp)
  .route('/', updateCartItemQuantity)

export { addItemToCart, findOrCreateCart };
