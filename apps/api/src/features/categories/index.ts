import { factory } from "../../lib"
import { createCategoryHandler } from "./create-category/handler"
import { getCategoryHandler } from "./get-category/handler"

export const categoriesApp = factory
  .createApp()
  .post("/", ...createCategoryHandler)
  .get("/:categoryId", ...getCategoryHandler)
// .route('/', getCategoryApp)
// .route('/', listCategoriesApp)
// .route('/', createCategoryAttributeApp)
// .route('/', getCategoryAttributes)
// .route('/', deleteAttributeApp)
// .route('/', updateAttributeApp)
// .route('/', deleteCategoryApp)
