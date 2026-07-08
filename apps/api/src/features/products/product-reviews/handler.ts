import { Hono } from "hono";

export const productReviewApp = new Hono()
  .get('/', async (ctx) => {
    return ctx.json({ message: 'Product reviews' })
  })
  .post('/', async (ctx) => {
    return ctx.json({ message: 'Product review created' })
  })
