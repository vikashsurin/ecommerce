import { Hono } from "hono"
import { loginUserApp } from "./login-user/handler"
import { logoutUserApp } from "./logout-user/handler"
import { registerUserApp } from "./register-user/handler"
import { meApp } from "./me/handler"

export const authApp = new Hono()
  .route("/", loginUserApp)
  .route("/", logoutUserApp)
  .route("/", registerUserApp)
  .route("/", meApp)
