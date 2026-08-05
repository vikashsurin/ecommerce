import { Hono } from "hono"
import { presignImagesApp } from "./presign/handler"
import { confirmImagesApp } from "./confirm/handler"
import { getImagesApp } from "./get/handler"

export const productImagesApp = new Hono()
  .route("/", presignImagesApp)
  .route("/", confirmImagesApp)
  .route("/", getImagesApp)