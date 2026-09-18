import { S3Client } from "@aws-sdk/client-s3"
import { getBunEnv } from "../env"

export const rustfs_client = new S3Client({
  region: "us-east-1", // RustFS default region
  endpoint: "http://localhost:9001", // RustFS S3 API address
  credentials: {
    accessKeyId: getBunEnv().RUSTFS_ACCESS_KEY,
    secretAccessKey: getBunEnv().RUSTFS_SECRET_KEY,
  },
  // RustFS uses path-style URLs by default; virtual-host style requires RUSTFS_SERVER_DOMAINS
  forcePathStyle: true,
})
