import { addressApp } from "./features/address"
import { authApp } from "./features/auth"
import { cartsApp } from "./features/carts"
import { categoriesApp } from "./features/categories"
import { checkoutApp } from "./features/checkout"
import { demoApp } from "./features/demo"
import { ordersApp } from "./features/orders"
import { productsApp } from "./features/products"
import { usersApp } from "./features/users"
import { productVariantsApp } from "./features/variants"
import { wishlistApp } from "./features/wishlist"
import { factory } from "./lib/factory"

export const apiRoutes = factory
  .createApp()
  .route("/demo", demoApp)
  .route("/users", usersApp)
  .route("/auth", authApp)
  .route("/categories", categoriesApp)
  .route("/products", productsApp)
  .route("/variants", productVariantsApp)
  .route("/wishlist", wishlistApp)
  .route("/cart", cartsApp)
  .route("/orders", ordersApp)
  .route("/addresses", addressApp)
  .route("/checkout", checkoutApp)
