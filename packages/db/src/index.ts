import { SQL } from "bun"
import { BunSQLDatabase, drizzle } from "drizzle-orm/bun-sql"
import type { PgTransaction } from "drizzle-orm/pg-core"
import * as schema from "./schema"

const globalForDb = globalThis as unknown as {
  conn: SQL | undefined
}

const client =
  globalForDb.conn ??
  new SQL({
    url: process.env.DATABASE_URL,
    max: process.env.NODE_ENV === "production" ? 10 : undefined,
  })

if (process.env.NODE_ENV !== "production") globalForDb.conn = client

export const db = drizzle({ client, schema, casing: "snake_case" })

export * from "./schema"

export type Transaction = BunSQLDatabase<typeof schema> | PgTransaction<any, any, any>
