import { env } from "hono/adapter"
import { type DB } from "../db"
import { createBunDb } from "../db/bun"
import { factory } from "../lib/factory"

export const dbMiddleware = factory.createMiddleware(async (c, next) => {
  const { DATABASE_URL } = env(c)

  const db = createBunDb(DATABASE_URL)

  c.set("db", db as DB)
  await next()
})
