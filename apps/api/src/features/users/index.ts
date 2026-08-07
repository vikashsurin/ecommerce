import { factory } from "../../lib"
import { createUserApp } from './create-user/handler'
import { deleteUserApp } from './delete-user/handler'
import { updateUserApp } from './update-user/handler'
import { createUserService } from './services/create-user.service'
import { createUserSchema } from './create-user/schema'
import { getUserService } from './services/get-user.service'

export const usersApp = factory.createApp()
  .route('/', createUserApp)
  .route('/', deleteUserApp)
  .route('/', updateUserApp)

export { createUserService, createUserSchema, getUserService }
