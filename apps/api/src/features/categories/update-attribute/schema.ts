import { z } from "zod";

export const updateCategoryAttributeSchema = z.object({
  categoryId: z.number(),
  key: z.string().optional(),
  label: z.string().optional(),
  inputType: z.string().optional(),
  options: z.array(z.string()).optional(),
  skuAbbreviation: z.boolean().optional(),
  required: z.boolean().optional(),
  sortOrder: z.number().optional(),
});
