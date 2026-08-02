import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { rustfs_client } from "./index.ts";

export async function listBuckets() {
  try {
    const response = await rustfs_client.send(new ListBucketsCommand({}));
    response.Buckets?.forEach((bucket) => console.log(bucket.Name));
  } catch (error) {
    console.log(error);
  }
}

listBuckets()
