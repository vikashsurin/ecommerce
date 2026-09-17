import { factory } from "../../lib"
import { createCategoryHandler } from "./create-category/handler"
import { createCategoryAttributeHandler } from "./create-category-attribute/handler"
import { deleteAttributeHandler } from "./delete-attribute/handler"
import { deleteCategoryHandler } from "./delete-category/handler"
import { getCategoryAttributesHandler } from "./get-category-attributes/handler"
import { getCategoryHandler } from "./get-category/handler"
import { listCategoriesHandler } from "./list-categories/handler"
import { updateAttributeHandler } from "./update-attribute/handler"

export const categoriesApp = factory
  .createApp()
  .post("/", ...createCategoryHandler)
  .get("/", ...listCategoriesHandler)
  .get("/:categoryId", ...getCategoryHandler)
  .delete("/:id", ...deleteCategoryHandler)
  .post("/attributes", ...createCategoryAttributeHandler)
  .get("/:id/attributes", ...getCategoryAttributesHandler)
  .delete("/attributes/:id", ...deleteAttributeHandler)
  .put("/attributes/:id", ...updateAttributeHandler)
