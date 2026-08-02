import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { rustfs_client } from "./index.ts";

export async function createBucket() {
  try {
    const response = await rustfs_client.send(
      new CreateBucketCommand({
        Bucket: "my-bucket",
      }),
    );
    console.log("Bucket created:", response.Location);
  } catch (error) {
    console.log(error);
  }
}
