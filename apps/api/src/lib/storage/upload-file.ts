import { PutObjectCommand } from "@aws-sdk/client-s3";
import * as fs from "fs/promises";
import * as path from "path";
import { env } from "../env.ts";
import { rustfs_client } from "./index.ts";

export async function uploadFile() {
  console.log("uploading file...");

  try {
    const filePath = path.join(import.meta.dirname, "image12.jpg");
    const fileBuffer = await fs.readFile(filePath);

    await rustfs_client.send(
      new PutObjectCommand({
        Bucket: env.STORAGE_BUCKET_NAME,
        Key: "test/test-image.jpg",
        Body: fileBuffer,
        ContentType: "image/jpg",
        ContentLength: fileBuffer.length,
      }),
    );
    console.log("Object uploaded");
  } catch (error) {
    console.log(error);
  }
}

uploadFile();
