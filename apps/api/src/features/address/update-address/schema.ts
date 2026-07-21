import z from "zod";

export const updateAddressSchema = z.object({
  address: z.string().optional(),
  landmark: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  country: z.string().optional(),
  type: z.string().optional()
})

export type UpdateAddressSchema = z.infer<typeof updateAddressSchema>
