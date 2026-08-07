import { Hono } from "hono"
import { deleteProductVariantApp } from "./delete/handler"
import { generateSkuApp } from "./generate-sku/handler"
import { getVariantApp } from "./get/handler"
import { updateProductVariantApp } from "./update/handler"
import { variantImagesApp } from "./images/index"

export const productVariantsApp = new Hono().route("/", getVariantApp)
// .route("/", generateSkuApp)
// .route("/", updateProductVariantApp)
// .route("/", deleteProductVariantApp)
.route("/", variantImagesApp)
