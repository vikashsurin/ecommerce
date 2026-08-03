import { z } from "zod"

// 1. Define allowed image MIME types
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// 2. Create the schema
export const imageSchema = z.object({
  profilePicture: z
    .instanceof(File)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max image size is 5MB."),
})

z.object({
  images: z
    .array(
      z.object({
        filename: z.string(),
        contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
      })
    )
    .min(1)
    .max(10), // cap batch size, avoid abuse
})
