import z from "zod"
import { appFactory } from "../../../lib/factory"
import { authMiddleware, validate } from "../../../middleware"

export const getDemo = appFactory.get("/test/:id", async (c) => {
  const user = c.get("user")
  console.log("user", user)
  const { id } = c.req.param()
  return c.json({ message: `Hello from the demo endpoint with ID: ${id}` })
})
