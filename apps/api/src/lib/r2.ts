import type { R2Bucket } from "@cloudflare/workers-types"

export type R2BucketBinding = R2Bucket

export async function uploadFile(
  bucket: R2Bucket,
  key: string,
  body: ArrayBuffer | Uint8Array | string,
  contentType?: string
) {
  const obj = await bucket.put(key, body, {
    httpMetadata: contentType ? { contentType } : undefined,
  })
  return obj
}

export async function getFile(bucket: R2Bucket, key: string) {
  const obj = await bucket.get(key)
  if (!obj) return null
  return obj
}

export async function deleteFile(bucket: R2Bucket, key: string) {
  await bucket.delete(key)
}

export async function fileExists(bucket: R2Bucket, key: string) {
  const head = await bucket.head(key)
  return !!head
}

// For public URLs - if bucket is public
export function getPublicUrl(
  bucketName: string,
  accountId: string,
  key: string
) {
  // Replace with your custom domain if you have one
  return `https://${bucketName}.${accountId}.r2.dev/${key}`
}
