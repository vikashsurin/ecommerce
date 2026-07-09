import { db, products } from '@repo/db';
import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware, isSeller } from '../../../middleware';
import { validate } from "../../../middleware/validate";
import { createProductSchema, slugSchema } from './schema';



export const createProductApp = new Hono()
  .post('/',
    authMiddleware,
    isSeller,
    validate("json", createProductSchema),
    async (c) => {
      const parsedData = c.req.valid("json");

      try {
        const productSlug = slugSchema.parse(parsedData.name)

        const product = await insertProductWithUniqueSlug(parsedData, productSlug)
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


const insertProductWithUniqueSlug = async (data: z.infer<typeof createProductSchema>, baseSlug: string) => {
  let slug = baseSlug;
  let attempt = 0;
  let maxAttempts = 10;


  while (attempt < maxAttempts) {
    try {
  const product = await db
    .insert(products)
    .values({
      name: data.name,
      slug: slug,
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
    catch (error:any) {
      const isUniqueViolation = error?.cause?.errno === '23505';
      const isSlugConflict = error?.cause?.constraint?.includes('slug');


      if (isUniqueViolation && isSlugConflict && attempt < maxAttempts - 1) {
        attempt++;
        slug = `${baseSlug}-${attempt + 1}`;
        continue;
      }

      throw error;
    }
  }
  throw new Error('Failed to generate unique slug after max attempts');

}
