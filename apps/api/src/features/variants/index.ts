import { Hono } from "hono"
import { deleteProductVariantApp } from "./delete/handler"
import { generateSkuApp } from "./generate-sku/handler"
import { getVariantApp } from "./get/handler"
import { variantImagesApp } from "./images/index"
import { updateProductVariantApp } from "./update/handler"
import { appFactory } from "../../lib"

export const productVariantsApp = new Hono()
  .route("/", getVariantApp)
  .route("/", generateSkuApp)
  .route("/", updateProductVariantApp)
  .route("/", deleteProductVariantApp)
  .route("/", variantImagesApp)
