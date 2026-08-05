import { hc } from "hono/client"
import type { AppType, ProductsAppType } from "@repo/api"

// Create the typed client instance
export const apiClient = hc<AppType>("http://localhost:4000", {
  headers: {},
  init: {
    credentials: "include",
  },
})

export const productsApiClient = hc<ProductsAppType>(
  "http://localhost:4000/api/products"
)
