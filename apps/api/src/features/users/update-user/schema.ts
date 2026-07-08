import { z } from "zod";


export const updateNameSchema = z.object({
  type: z.literal('NAME'),
  newName: z.string()
});

export const updateEmailSchema = z.object({
  type: z.literal('EMAIL'),
  newEmail: z.email()
});

export const updatePhoneSchema = z.object({
  type: z.literal('PHONE'),
  newPhone: z.string()
});

export const updatePasswordSchema = z.object({
  type: z.literal('PASSWORD'),
  newPassword: z.string()
});



export const updateUserSchema = z.discriminatedUnion('type', [
  updateNameSchema,
  updateEmailSchema,
  updatePhoneSchema,
  updatePasswordSchema,
])
