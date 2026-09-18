import { factory } from "../../lib"
import {
  authMiddleware,
  dbMiddleware,
  requireTokenMiddleware,
} from "../../middleware"
import { createProductVariantHandler } from "./create-variant/handler"
import { createProductHandler } from "./create/handler"
import { deleteProductHandler } from "./delete/handler"
import { getProductHandler } from "./get/handler"
import { productImagesApp } from "./images/index"
import { listProductVariantsHandler } from "./list-variants/handler"
import { listProductsHandler } from "./list/handler"
import { updateProductHandler } from "./update/handler"

export const productsApp = factory
  .createApp()
  .use(requireTokenMiddleware)
  .use(dbMiddleware)
  .use(authMiddleware)
  .get("/", ...listProductsHandler)
  .post("/", ...createProductHandler)
  .route("/", productImagesApp)
  .delete("/:id", ...deleteProductHandler)
  .get("/:id", ...getProductHandler)
  .put("/:id", ...updateProductHandler)
  .post("/:productId/variants", ...createProductVariantHandler)
  .get("/:productId/variants", ...listProductVariantsHandler)
