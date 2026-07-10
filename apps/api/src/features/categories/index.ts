import { Hono } from "hono"
import { createCategoryAttributeApp } from "./create-category-attribute/handler"
import { createCategoryApp } from "./create-category/handler"
import { listCategoriesApp } from "./list-categories/handler"
import { getCategoryAttributes } from "./get-category-attributes/handler"

export const categoriesApp = new Hono()
  .route("/", createCategoryApp)
  .route('/', listCategoriesApp)
  .route('/', createCategoryAttributeApp)
  .route('/', getCategoryAttributes)
