async function uploadFile() {
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
