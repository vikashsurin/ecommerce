import { z } from "zod"

const envSchema = z.object({
  COOKIE_NAME: z.string().default("session"),
  DATABASE_URL: z.string(),
})

export const env = envSchema.parse(Bun.env)
