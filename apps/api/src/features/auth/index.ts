import { factory } from "../../lib"
import { dbMiddleware } from "../../middleware"
import { loginUserHandler } from "./login-user/handler"
import { logoutUserHandler } from "./logout-user/handler"
import { meHandler } from "./me/handler"
import { registerUserHandler } from "./register-user/handler"

export const authApp = factory
  .createApp()
  // .use(dbMiddleware)
  .post("/login", ...loginUserHandler)
  .post("/logout", ...logoutUserHandler)
  .post("/register", ...registerUserHandler)
  .get("/me", ...meHandler)
