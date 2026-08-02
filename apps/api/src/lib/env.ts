import { z } from "zod";

const envSchema = z.object({
  COOKIE_NAME: z.string().default("session"),
  DATABASE_URL: z.string(),
  RUSTFS_ACCESS_KEY: z.string(),
  RUSTFS_SECRET_KEY: z.string(),
  STORAGE_BUCKET_NAME: z.string(),
});

export const env = envSchema.parse(Bun.env);
