import { factory } from "../../lib"
import {
  authMiddleware,
  dbMiddleware,
  requireTokenMiddleware,
} from "../../middleware"
import { deleteProductVariantHandler } from "./delete/handler"
import { generateSkuHandler } from "./generate-sku/handler"
import { getVariantHandler } from "./get/handler"
import { variantImagesApp } from "./images/index"
import { updateProductVariantHandler } from "./update/handler"

export const productVariantsApp = factory
  .createApp()
  .use(requireTokenMiddleware)
  .use(dbMiddleware)
  .use(authMiddleware)
  .get("/:id", ...getVariantHandler)
  .delete("/:id", ...deleteProductVariantHandler)
  .post("/:productId/generate-sku", ...generateSkuHandler)
  .put("/:id", ...updateProductVariantHandler)
  .route("/", variantImagesApp)
