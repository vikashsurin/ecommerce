import { factory } from "../../lib"
import { createProductVariantApp } from "./create-variant/handler"
import { createProductApp } from "./create/handler"
import { deleteProductApp } from "./delete/handler"
import { getProductApp } from "./get/handler"
import { productImagesApp } from "./images/index"
import { listProductVariantsApp } from "./list-variants/handler"
import { listProductsApp } from "./list/handler"
import { updateProductApp } from "./update/handler"

export const productsApp = factory
  .createApp()
  .route("/", listProductsApp)
  .route("/", createProductApp)
  .route("/", productImagesApp)
  .route("/", deleteProductApp)
  .route("/", getProductApp)
  .route("/", updateProductApp)
  .route("/", createProductVariantApp)
  .route("/", listProductVariantsApp)
