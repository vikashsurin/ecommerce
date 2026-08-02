import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../env.ts";
import { rustfs_client } from "./index.ts";

export async function uploadObject(params: {
  key: string;
  body: Buffer | Uint8Array;
  contentType: string;
  bucket?: string;
}) {
  await rustfs_client.send(
    new PutObjectCommand({
      Bucket: params.bucket ?? env.STORAGE_BUCKET_NAME,
      Key: params.key,
      Body: params.body,
      ContentType: params.contentType,
      ContentLength: params.body.length,
    }),
  );
}
