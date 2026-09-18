import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { rustfs_client } from "./index.ts"
import { Context } from "hono"
import { type Env } from "../types.ts"

export async function getPresignedUploadUrl(
  c: Context<Env>,
  params: {
    key: string
    contentType: string
    expiresIn?: number // seconds
    bucket?: string
  }
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: params.bucket ?? c.env.STORAGE_BUCKET_NAME,
    Key: params.key,
    ContentType: params.contentType,
  })

  return getSignedUrl(rustfs_client, command, {
    expiresIn: params.expiresIn ?? 300, // default 5 min
  })
}
