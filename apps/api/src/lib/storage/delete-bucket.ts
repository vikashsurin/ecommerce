import { DeleteBucketCommand } from "@aws-sdk/client-s3";
import { rustfs_client } from "./index.ts";

export async function deleteBucket() {
  try {
    await rustfs_client.send(
      new DeleteBucketCommand({
        Bucket: "my-bucket",
      }),
    );
    console.log("Bucket deleted");
  } catch (error) {
    console.log(error);
  }
}
