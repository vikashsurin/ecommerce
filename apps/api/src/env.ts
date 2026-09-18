import type { R2Bucket } from "@cloudflare/workers-types"

export interface Env {
  R2_BUCKET: R2Bucket
  DATABASE_URL: string
  S3_BUCKET: string
  RUSTFS_ACCESS_KEY: string
  RUSTFS_SECRET_KEY: string
  RUSTFS_PUBLIC_URL: string
  STORAGE_BUCKET_NAME: string
  COOKIE_NAME: string
  RAZORPAY_KEY_ID: string
  RAZORPAY_KEY_SECRET: string
}
