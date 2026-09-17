import { SQL } from "bun"
import { BunSQLDatabase } from "drizzle-orm/bun-sql"
import type { PgTransaction } from "drizzle-orm/pg-core"
import * as schema from "./schema"

export * from "./schema"

import { neon } from "@neondatabase/serverless"
import { drizzle as drizzleBun } from "drizzle-orm/bun-sql"
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http"

const globalForDb = globalThis as unknown as { conn: SQL | undefined }

export const createDb = (url: string, runtime: 'bun' | 'workers' = 'bun') => {
  if (runtime === 'workers') {
    const client = neon(url)
    return drizzleNeon(client, { schema, casing: "snake_case" as const })
  }

  // Bun runtime - your current optimized code
  const conn = globalForDb.conn ?? new SQL({ url, max: 10 })
  if (process.env.NODE_ENV !== "production") globalForDb.conn = conn
  return drizzleBun({ client: conn, schema, casing: "snake_case" as const })
}

// For local .env - remove this for Workers, use .dev.vars instead
// config({ path: "../../.env" }) <-- DELETE THIS LINE, Wrangler doesn't need dotenv

export type Transaction =
  BunSQLDatabase<typeof schema> | PgTransaction<any, any, any>
