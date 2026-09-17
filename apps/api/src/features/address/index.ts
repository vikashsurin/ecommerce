import { factory } from "../../lib"
import { deleteAddressHandler } from "./delete-address/handler"
import { getAddressHandler } from "./get-address/handler"
import { listAddressHandler } from "./list-address/handler"
import { saveAddressHandler } from "./save-address/handler"
import { upddateAddressHandler } from "./update-address/handler"

export const addressApp = factory
  .createApp()
  .patch("/:id", ...upddateAddressHandler)
  .post("/", ...saveAddressHandler)
  .post("/", ...listAddressHandler)
  .get("/:addressId", ...getAddressHandler)
  .delete("/:id", ...deleteAddressHandler)
