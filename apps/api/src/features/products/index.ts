import { Hono } from "hono";
import { createProductApp } from "./create/handler";
import { deleteProductApp } from "./delete/handler";
import { getProductApp } from "./get/handler";
import { listProductsApp } from "./list/handler";
import { updateProductApp } from "./update/handler";
import { productVariantsApp } from "./variants/index";

export const productsApp = new Hono()
  .route('/', listProductsApp)
  .route('/', createProductApp)
  .route('/', deleteProductApp)
  .route('/', getProductApp)
  .route('/', updateProductApp)
  .route('/', productVariantsApp)
