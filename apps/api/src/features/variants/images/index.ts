import { factory } from "../../../lib"
import { presignImagesHandler } from "../../products/images/presign/handler"
import { confirmImagesHandler } from "./confirm/handler"
import { deleteImagesHandler } from "./delete/handler"
import { promoteImgToPrimaryHandler } from "./promote-image/handler"

export const variantImagesApp = factory
  .createApp()
  .post("/:variantId/images/confirm", ...confirmImagesHandler)
  .delete("/:id/images", ...deleteImagesHandler)
  .post("/:variantId/images/presign", ...presignImagesHandler)
  .put("/:id/images", ...promoteImgToPrimaryHandler)
