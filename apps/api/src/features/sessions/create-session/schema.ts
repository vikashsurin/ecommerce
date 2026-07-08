import z from "zod";

export const sessionCreateSchema = z.object({
  tokenHash: z.string(),
  userId: z.number(),
  ipAddress: z.string(),
  userAgent: z.string().optional(),
  refreshToken: z.string().optional(),
  expiresAt: z.date()
})

export type SessionCreatePayload = z.infer<typeof sessionCreateSchema>
