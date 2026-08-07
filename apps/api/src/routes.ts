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
import { appFactory } from "./lib/factory"

export const apiRoutes = appFactory
  .route("/demo", demoApp)
  .route("/variants", productVariantsApp)
  .route("/products", productsApp)
  .route("/users", usersApp)
  .route("/auth", authApp)
  .route("/wishlist", wishlistApp)
  .route("/cart", cartsApp)
  .route("/orders", ordersApp)
  .route("/categories", categoriesApp)
  .route("/addresses", addressApp)
  .route("/checkout", checkoutApp)
