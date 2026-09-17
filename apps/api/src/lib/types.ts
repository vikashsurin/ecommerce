import type { R2Bucket } from "@cloudflare/workers-types"
import type { Transaction } from "@repo/db"

type User = {
  id: number
  name: string
  email: string
  role: string
}

export type Env = {
  Bindings: {
    R2: R2Bucket
    DATABASE_URL: string
    S3_BUCKET: string
  }
  Variables: {
    user: User
    db: Transaction
  }
}
