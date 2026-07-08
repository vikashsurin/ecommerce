import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  phone: z.string(),
  role: z.enum(['user', 'seller', 'admin']),
});
