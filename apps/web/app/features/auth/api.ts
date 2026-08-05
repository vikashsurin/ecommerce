import { rpcClient } from "@/lib/rpc-client";
import { LoginSchema, RegisterSchema } from "./schema";

export async function loginUser({ email, password }: LoginSchema) {
  const res = await rpcClient.api.auth.login.$post({
    json: {
      email,
      password,
    },
  })

  return res.json()
}

export async function registeruser({ name, email, password, phone }: RegisterSchema) {
  const res = await rpcClient.api.auth.register.$post({
    json: {
      name,
      email,
      password,
      phone,
      role: 'user',
    },
  })

  return res.json()
}
