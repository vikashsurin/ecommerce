import { createFactory } from "hono/factory"
import { type Env } from "../lib/types"

export const factory = createFactory<Env>()

export const appFactory = factory.createApp()
