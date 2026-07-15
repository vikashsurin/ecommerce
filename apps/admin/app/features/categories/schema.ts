import { z } from "zod";
import { InferResponseType } from "hono/client";
import { apiClient } from "@/lib";

export const createAttributeSchema = z.object({
  categoryId:z.number(),
  key: z.string(),
  label: z.string(),
  inputType: z.string(),
  options: z.array(z.string()),
  required: z.boolean(),
  skuAbbreviation: z.boolean(),
  sortOrder: z.number(),
});

export type CreateAttributeSchema = z.infer<typeof createAttributeSchema>;


export const updateAttributeSchema = z.object({
  categoryId:z.number(),
  key: z.string().optional(),
  label: z.string().optional(),
  inputType: z.string().optional(),
  options: z.array(z.string()).optional(),
  required: z.boolean().optional(),
  skuAbbreviation: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export type UpdateAttributeSchema = z.infer<typeof updateAttributeSchema>;


type CategoryResponse = InferResponseType<typeof apiClient.api.categories[':categoryId']['$get'], 200>

export type Category = CategoryResponse['data']
