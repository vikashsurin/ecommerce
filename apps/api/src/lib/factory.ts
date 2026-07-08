import { createFactory } from "hono/factory";
import { Hono } from "hono"

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
}

type Env = {
  Variables: {
    user: User
  }
}


export const factory = createFactory<Env>()

export const appFactory = () => new Hono<Env>()
