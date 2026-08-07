import { factory } from "../../../lib"
import { presignImagesApp } from "./presign/handler"
import { confirmImagesApp } from "./confirm/handler"

export const variantImagesApp = factory.createApp()
  .route("/", presignImagesApp)
  .route("/", confirmImagesApp)