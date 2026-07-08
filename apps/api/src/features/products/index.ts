import { Hono } from "hono";
import { createProductApp } from "./create-product/handler";
import { deleteProductApp } from "./delete-product/handler";
import { getProductApp } from "./get-product/handler";
import { listProductsApp } from "./list-products/handler";
import { updateProductApp } from "./update-product/handler";

export const productsApp = new Hono()
  .route('/', listProductsApp)
  .route('/', createProductApp)
  .route('/', deleteProductApp)
  .route('/', getProductApp)
  .route('/', updateProductApp)
