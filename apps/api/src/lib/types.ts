import type { R2Bucket } from "@cloudflare/workers-types"
import type { DB } from "../db"

type User = {
  id: number
  name: string
  email: string
  role: string
}

export type Bindings = {
  // Workers Bindings
  R2_BUCKET: R2Bucket
  // Config - works in both Bun and Workers
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

export type Env = {
  Bindings: Bindings
  Variables: {
    token: string
    user: User
    db: DB
  }
}

export type BunEnv = Omit<Bindings, "R2_BUCKET"> & { R2_BUCKET?: never }
