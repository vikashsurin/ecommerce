import * as schema from "@repo/db"

import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

export const createNeonDb = (url: string) => {
  const client = neon(url)
  return drizzle(client, {
    schema,
    casing: "snake_case" as const,
  })
}

export type Db = ReturnType<typeof createNeonDb>
export type DB = Db
