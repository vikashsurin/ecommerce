import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "./api";
import { LoginSchema, RegisterSchema } from "./schema";

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: LoginSchema) =>
      loginUser({ email, password }),
    onSuccess: (res:any) => {
      // Check if the user is not a seller
      if (res && res.data.user.role !== "seller") {
        throw new Error("You are not a seller")
      }
      console.log("Logged in successfully", res)
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
