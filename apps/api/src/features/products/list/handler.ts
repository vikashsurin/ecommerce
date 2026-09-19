import { factory } from "../../../lib"

// Todo: include filtering, sorting, and pagination
export const listProductsHandler = factory.createHandlers(async (c) => {
  const db = c.get("db")
  const productsList = await db.query.products.findMany()
  return c.json({ data: productsList })
})

// async function listProducts(db: DB) {
//   try {
//     const productsList = await db.query.products.findMany()
//     return productsList
//   } catch (error) {
//     AppError.fromPg(error, { entity: "Products" })
//   }
// }
