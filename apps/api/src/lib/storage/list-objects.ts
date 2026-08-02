import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { rustfs_client } from "./index.ts";

export async function listObjects() {
  try {
    const response = await rustfs_client.send(
      new ListObjectsV2Command({
        Bucket: "my-bucket",
      }),
    );
    response.Contents?.forEach((obj) => console.log(`${obj.Key} (${obj.Size} bytes)`));
  } catch (error) {
    console.log(error);
  }
}
