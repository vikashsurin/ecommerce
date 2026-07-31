import z from "zod";

export const createAddressSchema = z.object({
  address: z.string(),
  // landmark: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  country: z.string(),
  type: z.string()
})

export const updateAddressSchema = z.object({
  address: z.string().optional(),
  // landmark: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  country: z.string().optional(),
  type: z.string().optional()
})

export type CreateAddressSchema = z.infer<typeof createAddressSchema>
export type UpdateAddressSchema = z.infer<typeof updateAddressSchema>
