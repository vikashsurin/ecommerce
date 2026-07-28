import { hc } from "hono/client"
import type { AppType } from "@repo/api"

// Create the typed client instance
export const rpcClient = hc<AppType>("http://localhost:4000", {
  headers: {},
  init: {
    credentials: "include",
  },
})
