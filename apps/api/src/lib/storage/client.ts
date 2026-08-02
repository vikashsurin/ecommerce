import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../env.ts";

export const rustfs_client = new S3Client({
  region: "us-east-1", // RustFS default region
  endpoint: "http://localhost:9000", // RustFS S3 API address
  credentials: {
    accessKeyId: env.RUSTFS_ACCESS_KEY,
    secretAccessKey: env.RUSTFS_SECRET_KEY,
  },
  // RustFS uses path-style URLs by default; virtual-host style requires RUSTFS_SERVER_DOMAINS
  forcePathStyle: true,
});
