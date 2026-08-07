import { Hono } from "hono"
import { presignImagesApp } from "./presign/handler"
import { confirmImagesApp } from "./confirm/handler"

export const variantImagesApp = new Hono()
  .route("/", presignImagesApp)
  .route("/", confirmImagesApp)