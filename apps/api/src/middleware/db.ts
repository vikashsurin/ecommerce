import { factory } from "../lib/factory"
import { createDb } from "@repo/db"

export const dbMiddleware = factory.createMiddleware(async (c, next) => {
  const url = c.env?.DATABASE_URL || process.env.DATABASE_URL!
  const isWorkers = !!c.env?.R2 // if R2 binding exists, we are on Workers
  
  const db = createDb(url, isWorkers ? 'workers' : 'bun')
  c.set('db', db as any)
  await next()
})