import { Hono } from "hono";
import { authApp } from "./features/auth";
import { cartsApp } from "./features/carts";
import { ordersApp } from "./features/orders";
import { productsApp } from "./features/products";
import { usersApp } from "./features/users";
import { wishlistApp } from "./features/wishlist";

export const apiRoutes = new Hono()
  .route('/products', productsApp)
  .route('/users', usersApp)
  .route('/auth', authApp)
  .route('/wishlist', wishlistApp)
  .route('/carts', cartsApp)
  .route('/orders', ordersApp)
