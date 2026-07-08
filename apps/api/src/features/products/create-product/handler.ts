import { db, products } from '@repo/db';
import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware, isSeller } from '../../../middleware';
import { validate } from "../../../middleware/validate";

const createProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number(),
  salePrice: z.number(),
  stock: z.number(),
  categoryId: z.number(),
  brandId: z.number(),
});

export const createProductApp = new Hono()
  .post('/',
    authMiddleware,
    isSeller,
    validate("json", createProductSchema),
    async (c) => {
      const parsedData = c.req.valid("json");

      try {
        const product = await insertProduct(parsedData)
        if (!product) {
          return c.json({ message: 'Failed to create product ' }, 400)
        }
        return c.json({ message: 'Product created', data: product }, 201)
      } catch (error) {
        return c.json({
          message: 'Failed to create product',
          error: error instanceof Error ? error.message : String(error)
        }, 500)
      }
    })


const insertProduct = async (data: z.infer<typeof createProductSchema>) => {
  const product = await db
    .insert(products)
    .values({
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      salePrice: data.salePrice,
      stock: data.stock,
      categoryId: data.categoryId,
      brandId: data.brandId,
    })
    .returning()

  return product[0] || null;
}
