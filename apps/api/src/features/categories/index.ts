import { Hono } from "hono"
import { createCategoryApp } from "./create-category/handler"
import { listCategoriesApp } from "./list-categories/handler"

export const categoriesApp = new Hono()
  .route("/", createCategoryApp)
  .route('/', listCategoriesApp)
