import { db, products } from '@repo/db';
import { Hono } from "hono";
import { authMiddleware } from '../../../middleware';

// Todo: include filtering, sorting, and pagination
export const listProductsApp = new Hono()
  .get('/', authMiddleware, async (c) => {
    try {
      const productsList = await listProducts();
      return c.json({ data: productsList });
    } catch (error) {
      return c.json({
        error: {
          code: 'internal_server_error',
          message: 'Internal server error'
        }
      }, 500);
    }
  });

async function listProducts() {
  const productsList = await db.select().from(products);
  return productsList;
}
