import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { prettyJSON } from "hono/pretty-json"
import { AppError } from "./lib/app-error.ts"
import { type Env } from "./lib/types.ts"
import { apiRoutes } from "./routes.ts"

const app = new Hono<Env>()
  .use(prettyJSON())
  .use("*", logger())
  .use(
    "*",
    cors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    })
  )
  .onError((error, c) => {
    if (error instanceof AppError) {
      return c.json(
        {
          error: {
            code: error.code,
            message: error.message,
          },
        },
        error.status
      )
    }

    console.error(error) // unexpected — log it
    return c.json(
      {
        error: {
          code: "internal_server_error",
          message: error instanceof Error ? error.message : String(error),
        },
      },
      500
    )
  })

const mainApp = app.route("/api", apiRoutes)

export type AppType = typeof mainApp

export default mainApp
