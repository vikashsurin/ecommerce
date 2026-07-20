import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { apiRoutes } from "./routes";


interface User {
  id: number
  email: string
  role: string // user, seller
}

type Env = {
  Variables: {
    user: User
  }
}

const app = new Hono<Env>()

app.use('*', logger())
app.use("*", cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
}))


const mainApp = app.route('/api', apiRoutes)

export type AppType = typeof mainApp

export default mainApp
