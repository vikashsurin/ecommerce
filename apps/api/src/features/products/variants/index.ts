import { Hono } from "hono";
import { createProductVariantApp } from "./create/handler";
import { listProductVariantsApp } from "./list/handler";
import { updateProductVariantApp } from "./update/handler";
import { deleteProductVariantApp } from "./delete/handler";
import { generateSkuApp } from "./generate-sku/handler";

export const productVariantsApp = new Hono()
  .route('/', createProductVariantApp)
  .route('/', listProductVariantsApp)
  .route('/', updateProductVariantApp)
  .route('/', deleteProductVariantApp)
  .route('/', generateSkuApp)
