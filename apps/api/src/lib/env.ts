import type { BunEnv } from "./types"

export function getBunEnv(): BunEnv {
  // Bun.env already loads .env file
  // You can also use process.env, same thing
  const env = Bun.env

  if (!env.DATABASE_URL) throw new Error("DATABASE_URL missing in .env")

  return {
    DATABASE_URL: env.DATABASE_URL!,
    S3_BUCKET: env.S3_BUCKET!,
    RUSTFS_ACCESS_KEY: env.RUSTFS_ACCESS_KEY!,
    RUSTFS_SECRET_KEY: env.RUSTFS_SECRET_KEY!,
    RUSTFS_PUBLIC_URL: env.RUSTFS_PUBLIC_URL!,
    STORAGE_BUCKET_NAME: env.STORAGE_BUCKET_NAME!,
    COOKIE_NAME: env.COOKIE_NAME || "session",
    RAZORPAY_KEY_ID: env.RAZORPAY_KEY_ID!,
    RAZORPAY_KEY_SECRET: env.RAZORPAY_KEY_SECRET!,
  }
}
