import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(3, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(3),
  confirmPassword: z.string().min(3),
  phone: z.string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type RegisterSchema = z.infer<typeof registerSchema>
