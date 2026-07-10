import { z } from "zod";

export const createCategoryAttributeSchema = z.object({
  categoryId: z.number(),
  key: z.string(),
  label: z.string(),
  inputType: z.string(),
  options: z.array(z.string()),
  skuAbbreviation: z.boolean(),
  required: z.boolean(),
  sortOrder: z.number(),
});
