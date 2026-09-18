import { Context } from "hono"
import { type Env } from "../types"

export function getImageUrl(c: Context<Env>, key: string): string {
  return `${c.env.RUSTFS_PUBLIC_URL}/${c.env.STORAGE_BUCKET_NAME}/${key}`
}
