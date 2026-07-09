import { apiClient } from "@/lib/api-client";
import { LoginSchema, RegisterSchema } from "./schema";

export async function loginUser({ email, password }: LoginSchema) {
  const res = await apiClient.api.auth.login.$post({
    json: {
      email,
      password,
    },
  })

  return res.json()
}


export async function registerUser({ name, email, password, phone }: RegisterSchema) {

  const res = await apiClient.api.auth.register.$post({
    json: {
      name,
      email,
      password,
      phone,
      role: 'seller',
    },
  })

  return res.json()
}
