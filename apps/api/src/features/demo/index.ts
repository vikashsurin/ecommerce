import { factory } from "../../lib"
import { getDemoHandler } from "./get/handler"
import { dbMiddleware } from "../../middleware"

export const demoApp = factory
  .createApp()
  .use(dbMiddleware)
  .get("/", ...getDemoHandler)
