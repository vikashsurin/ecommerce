import { apiClient } from "@/lib"
import { parseResponse } from "hono/client"

export const getVariant = async (id: number) => {
  try {
    const response = await apiClient.api.variants[":id"].$get({
      param: {
        id: String(id),
      },
    })
    const result = await parseResponse(response)
    return result.data
  } catch (error) {
    console.error(error)
    return error
  }
}

export const uploadVariantImages = async (
  variantId: number,
  isPrimary: boolean,
  files: File[]
) => {
  console.log("api call")
  try {
    console.log("calling presign")
    const response = await apiClient.api.variants[
      ":variantId"
    ].images.presign.$post({
      param: { variantId: String(variantId) },
      json: {
        images: files.map((f) => ({ filename: f.name, contentType: f.type })),
      },
    })
    const { data: presigned } = await response.json()
    if (!presigned) throw new Error("presigned urls not received")

    await Promise.all(
      files.map(async (file, i) => {
        const res = await fetch(presigned[i].presignedUrl, {
          method: "PUT",
          headers: { "Content-Type": presigned[i].contentType },
          body: file,
        })
        if (!res.ok)
          throw new Error(`Upload failed for ${file.name}: ${res.status}`)
      })
    )

    console.log("calling confirm")
    const confirmRes = await apiClient.api.variants[
      ":variantId"
    ].images.confirm.$post({
      param: { variantId: String(variantId) },
      json: {
        images: presigned.map((p, i) => ({
          key: p.key,
          sortOrder: i,
          isPrimary: isPrimary,
        })),
      },
    })
    const result = await confirmRes.json()
    console.log({ result })
    return result
  } catch (error) {
    console.error("upload failed", error)
    return
  }
}
