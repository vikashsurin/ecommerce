import { GetObjectCommand} from "@aws-sdk/client-s3";
import { rustfs_client } from "./index.ts";

export async function getObject() {
  try {
    const response = await rustfs_client.send(
      new GetObjectCommand({
        Bucket: "my-bucket",
        Key: "test/hello.txt",
      })
    );

    // get object content
    if (response.Body) {
      const chunks: Buffer[] = [];
      for await (const chunk of response.Body as any) {
        chunks.push(chunk as Buffer);
      }
      const data = Buffer.concat(chunks).toString("utf-8");
      console.log("Object content:", data);
    }
  } catch (error) {
    console.log(error);
  }
}
