import { Hono } from "hono";
import { listProductVariantsApp } from "./list-product-variants/handler";


export const productVariantsApp = new Hono()
  .route('/', listProductVariantsApp)
