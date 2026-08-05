import { Hono } from "hono"
import { deleteProductVariantApp } from "./delete/handler"
import { generateSkuApp } from "./generate-sku/handler"
import { updateProductVariantApp } from "./update/handler"

export const productVariantsApp = new Hono()
  .route("/", generateSkuApp)
  .route("/", updateProductVariantApp)
  .route("/", deleteProductVariantApp)
