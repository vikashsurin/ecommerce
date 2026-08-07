import { factory } from "../../lib"
import { loginUserApp } from "./login-user/handler"
import { logoutUserApp } from "./logout-user/handler"
import { registerUserApp } from "./register-user/handler"
import { meApp } from "./me/handler"

export const authApp = factory.createApp()
  .route("/", loginUserApp)
  .route("/", logoutUserApp)
  .route("/", registerUserApp)
  .route("/", meApp)
