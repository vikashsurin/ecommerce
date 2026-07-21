import z from "zod";

export const createAddressSchema = z.object({
  address: z.string(),
  landmark: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  country: z.string(),
  type: z.string()
})

export type CreateAddressSchema = z.infer<typeof createAddressSchema>
