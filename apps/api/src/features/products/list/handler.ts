import { products } from "@repo/db"
import { AppError, factory } from "../../../lib"

// Todo: include filtering, sorting, and pagination
export const listProductsHandler = factory.createHandlers(async (c) => {
  console.log("called")
  const productsList = await listProducts(c.get("db"))
  return c.json({ data: productsList })
})

async function listProducts(db: any) {
  try {
    const productsList = await db.select().from(products)
    return productsList
  } catch (error) {
    AppError.fromPg(error, { entity: "Products" })
  }
}
