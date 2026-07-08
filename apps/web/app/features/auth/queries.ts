import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "./api";
import { LoginSchema, RegisterSchema } from "./schema";

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: LoginSchema) =>
      loginUser({ email, password }),
    onSuccess: (data) => {
      console.log("Logged in successfully", data)
    },
    onError: (error) => {
      console.error("Login failed", error)
    },
  });
}


export function useRegister() {
  return useMutation({
    mutationFn: ({ name, email, password, phone, confirmPassword }: RegisterSchema) =>
      registerUser({ name, email, password, phone, confirmPassword }),
    onSuccess: (data) => {
      console.log("Registered successfully", data)
    },
    onError: (error) => {
      console.error("Registration failed", error)
    },
  })
}
