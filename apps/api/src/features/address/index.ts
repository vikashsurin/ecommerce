import { factory } from "../../lib"
import {
  authMiddleware,
  dbMiddleware,
  requireTokenMiddleware,
} from "../../middleware"
import { deleteAddressHandler } from "./delete-address/handler"
import { getAddressHandler } from "./get-address/handler"
import { listAddressHandler } from "./list-address/handler"
import { saveAddressHandler } from "./save-address/handler"
import { upddateAddressHandler } from "./update-address/handler"

export const addressApp = factory
  .createApp()
  .use(requireTokenMiddleware)
  .use(dbMiddleware)
  .use(authMiddleware)
  .patch("/:id", ...upddateAddressHandler)
  .post("/", ...saveAddressHandler)
  .get("/", ...listAddressHandler)
  .get("/:addressId", ...getAddressHandler)
  .delete("/:id", ...deleteAddressHandler)
