import { factory } from "../../lib"
import { loginUserHandler } from "./login-user/handler"
import { logoutUserHandler } from "./logout-user/handler"
import { registerUserHandler } from "./register-user/handler"
import { meHandler } from "./me/handler"

export const authApp = factory.createApp()
  .post("/login", ...loginUserHandler)
  .post("/logout", ...logoutUserHandler)
  .post("/register", ...registerUserHandler)
  .get("/me", ...meHandler)
