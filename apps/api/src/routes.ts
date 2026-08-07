import { addressApp } from "./features/address";
import { authApp } from "./features/auth";
import { cartsApp } from "./features/carts";
import { categoriesApp } from "./features/categories";
import { checkoutApp } from "./features/checkout";
import { ordersApp } from "./features/orders";
import { productsApp } from "./features/products";
import { usersApp } from "./features/users";
import { productVariantsApp } from "./features/variants";
import { wishlistApp } from "./features/wishlist";

import { demoApp } from "./features/demo";
import { factory } from "./lib/factory";

export const apiRoutes = factory.createApp()
  .route("/demo", demoApp)
  .route("/products", productsApp)
  .route("/variants", productVariantsApp)
  .route("/users", usersApp)
  .route("/auth", authApp)
  .route("/wishlist", wishlistApp)
  .route("/cart", cartsApp)
  .route("/orders", ordersApp)
  .route("/categories", categoriesApp)
  .route("/addresses", addressApp)
  .route("/checkout", checkoutApp);
