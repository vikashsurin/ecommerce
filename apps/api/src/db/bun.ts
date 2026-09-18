import * as schema from "@repo/db"
import { drizzle } from "drizzle-orm/bun-sql"
import { PgTransaction } from "drizzle-orm/pg-core"

let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null

export function createBunDb(url: string) {
  if (!dbInstance) {
    dbInstance = drizzle(url, { schema, casing: "snake_case" as const })
  }
  return dbInstance
}

export type DB = ReturnType<typeof createBunDb>
export type Transaction = PgTransaction<any, any, any>
