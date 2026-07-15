import { Hono } from "hono"
import { createCategoryAttributeApp } from "./create-category-attribute/handler"
import { createCategoryApp } from "./create-category/handler"
import { deleteAttributeApp } from "./delete-attribute/handler"
import { deleteCategoryApp } from "./delete-category/handler"
import { getCategoryAttributes } from "./get-category-attributes/handler"
import { getCategoryApp } from "./get-category/handler"
import { listCategoriesApp } from "./list-categories/handler"
import { updateAttributeApp } from "./update-attribute/handler"

export const categoriesApp = new Hono()
  .route("/", createCategoryApp)
  .route('/', getCategoryApp)
  .route('/', listCategoriesApp)
  .route('/', createCategoryAttributeApp)
  .route('/', getCategoryAttributes)
  .route('/', deleteAttributeApp)
  .route('/', updateAttributeApp)
  .route('/', deleteCategoryApp)
