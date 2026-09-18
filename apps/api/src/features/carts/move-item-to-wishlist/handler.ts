import { factory } from "../../../lib"

export const moveItemToWishlistHandler = factory.createHandlers(async (c) => {
  return c.json({ error: "Not implemented" }, 501)
})
