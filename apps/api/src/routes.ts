import { categoriesApp } from "./features/categories"
import { demoApp } from "./features/demo"
import { factory } from "./lib/factory"

export const apiRoutes = factory
  .createApp()
  .route("/demo", demoApp)
  .route("/categories", categoriesApp)
// .route("/products", productsApp)
// .route("/variants", productVariantsApp)
// .route("/users", usersApp)
// .route("/auth", authApp)
// .route("/wishlist", wishlistApp)
// .route("/cart", cartsApp)
// .route("/orders", ordersApp)
// .route("/addresses", addressApp)
// .route("/checkout", checkoutApp);
