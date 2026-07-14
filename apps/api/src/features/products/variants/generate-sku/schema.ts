import { z } from "zod";

export const generateSkuSchema = z.object({
  attributes: z.record(z.string(), z.unknown()),
});
