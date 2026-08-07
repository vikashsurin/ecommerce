import { factory } from "../../../lib"
import { confirmImagesApp } from "./confirm/handler"
import { getImagesApp } from "./get/handler"
import { presignImagesApp } from "./presign/handler"

export const productImagesApp = factory
  .createApp()
  .route("/", presignImagesApp)
  .route("/", confirmImagesApp)
  .route("/", getImagesApp)
