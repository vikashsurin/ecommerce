import { factory } from "../../lib";
import { addToCartHandler } from "./add-to-cart/handler";
import { getCartHandler } from "./get-cart/handler";
import { removeFromCartHandler } from "./remove-from-cart/handler";
import { addItemToCart, findOrCreateCart } from "./services/add-to-cart";
import { updateCartItemQuantityHandler } from "./update-cart-item-quantity/handler";

export const cartsApp = factory.createApp()
  .post('/', ...addToCartHandler)
  .delete('/items/:cartItemId', ...removeFromCartHandler)
  .get('/', ...getCartHandler)
  .patch('/items/:cartItemId', ...updateCartItemQuantityHandler)

export { addItemToCart, findOrCreateCart };
