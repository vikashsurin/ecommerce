import { z } from "zod";

export const slugSchema = z.string().slugify()

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  categoryId: z.number(),
  brandId: z.number(),
});
