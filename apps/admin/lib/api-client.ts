import type { AppType } from "@repo/api"
import { hc } from "hono/client"

// Create the typed client instance
export const apiClient = hc<AppType>("http://localhost:4000", {
  headers: {},
  init: {
    credentials: "include",
  },
})
