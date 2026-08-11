import { db, products } from "@repo/db";
import { AppError, factory } from "../../../lib";

// Todo: include filtering, sorting, and pagination
export const listProductsApp = factory.createApp()
  .get(
    "/",
    // authMiddleware,
    async (c) => {
      console.log("called");
      const productsList = await listProducts();
      return c.json({ data: productsList });
    },
  );

async function listProducts() {
  try {
    const productsList = await db.select().from(products);
    return productsList;
  } catch (error) {
    AppError.fromPg(error, { entity: "Products" });
  }
}
