import { factory } from "../../lib"
import { deleteProductVariantApp } from "./delete/handler"
import { generateSkuApp } from "./generate-sku/handler"
import { getVariantApp } from "./get/handler"
import { variantImagesApp } from "./images/index"
import { updateProductVariantApp } from "./update/handler"

export const productVariantsApp = factory.createApp()
  .route("/", getVariantApp)
  .route("/", generateSkuApp)
  .route("/", updateProductVariantApp)
  .route("/", deleteProductVariantApp)
  .route("/", variantImagesApp)
