import { factory } from "../../lib"
import { deleteProductVariantHandler } from "./delete/handler"
import { generateSkuHandler } from "./generate-sku/handler"
import { getVariantHandler } from "./get/handler"
import { variantImagesApp } from "./images/index"
import { updateProductVariantHandler} from "./update/handler"

export const productVariantsApp = factory
  .createApp()
  .get("/:id", ...getVariantHandler)
  .delete("/:id", ...deleteProductVariantHandler)
  .post("/:productId/variants/generate-sku", ...generateSkuHandler)
  .put("/:id", ...updateProductVariantHandler)
  .route("/", variantImagesApp)
