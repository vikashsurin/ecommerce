import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { type Env } from "./lib/types.ts"
import { apiRoutes } from "./routes.ts"

const app = new Hono<Env>().use("*", logger()).use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
)

const mainApp = app.route("/api", apiRoutes)

export type AppType = typeof mainApp

export default mainApp
