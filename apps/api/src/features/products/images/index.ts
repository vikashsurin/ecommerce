import { factory } from "../../../lib"
import { confirmImagesHandler } from "./confirm/handler"
import { getImagesHandler } from "./get/handler"
import { presignImagesHandler } from "./presign/handler"

export const productImagesApp = factory
  .createApp()
  .get("/:productId/images", ...getImagesHandler)
  .post("/:productId/images/confirm", ...confirmImagesHandler)
  .post("/:productId/images/presign", ...presignImagesHandler)
