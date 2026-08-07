import { factory } from "../../../lib"

export const productReviewApp = factory
  .createApp()
  .get("/", async (ctx) => {
    return ctx.json({ message: "Product reviews" })
  })
  .post("/", async (ctx) => {
    return ctx.json({ message: "Product review created" })
  })
