import { factory } from "../../../lib";
import { confirmImagesApp } from "./confirm/handler";
import { deleteImageApp } from "./delete/handler";
import { presignImagesApp } from "./presign/handler";

export const variantImagesApp = factory.createApp()
  .route("/", presignImagesApp)
  .route("/", confirmImagesApp)
  .route("/", deleteImageApp);
