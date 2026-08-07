import { demoApp } from "./features/demo"
import { appFactory } from "./lib/factory"

export const apiRoutes = appFactory.route("/demo", demoApp)
// .route("/variants", productVariantsApp)
// .route("/products", productsApp)
// .route("/users", usersApp)
// .route("/auth", authApp)
// .route("/wishlist", wishlistApp)
// .route("/cart", cartsApp)
// .route("/orders", ordersApp)
// .route("/categories", categoriesApp)
// .route("/addresses", addressApp)
// .route("/checkout", checkoutApp)
