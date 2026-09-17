import { factory } from "../../lib"
import { createUserHandler } from "./create-user/handler"
import { createUserSchema } from "./create-user/schema"
import { deleteUserHandler } from "./delete-user/handler"
import { updateUserHandler } from "./update-user/handler"

export const usersApp = factory
  .createApp()
  .post("/", ...createUserHandler)
  .delete("/:id", ...deleteUserHandler)
  .patch("/:id", ...updateUserHandler)

export { createUserSchema }
