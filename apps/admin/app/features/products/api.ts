import { apiClient } from "@/lib";
import { parseResponse } from "hono/client";
import { type CreateProductSchema, type UploadImageSchema } from "./schema";

export async function createProduct(data: CreateProductSchema) {
  const response = await apiClient.api.products.$post({
    json: {
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
      brandId: data.brandId,
    },
  });
  const result = await parseResponse(response);
  return result.data;
}

export const getProducts = async () => {
  try {
    const response = await apiClient.api.products.$get();
    const result = await parseResponse(response);
    return result.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await apiClient.api.products[":id"].$get({
      param: { id },
    });
    const result = await parseResponse(response);
    return result.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
};

export async function uploadVariantImages(
  productId: number,
  variantId?: number,
  files: File[],
) {
  // Step 1: ask backend for presigned URLs
  const presignRes = await apiClient.api.products[":productId"].variants[
    ":variantId"
  ].images.presign.$post({
    param: { productId: String(productId), variantId: String(variantId) },
    json: {
      images: files.map((f) => ({
        filename: f.name,
        contentType: f.type,
      })),
    },
  });

  const { data: presigned } = await parseResponse(presignRes);
  // presigned: [{ key, presignedUrl, contentType }, ...] — same order as `files`

  console.log({ presigned });

  // Step 2: upload each file directly to RustFS
  await Promise.all(
    files.map((file, i) =>
      fetch(presigned[i].presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": presigned[i].contentType },
        body: file,
      })
    ),
  );

  // Step 3: confirm with backend so it writes product_images rows
  const confirmRes = await apiClient.api.products[":productId"].variants[":variantId"].images.confirm.$post({
    param: { productId: String(productId), variantId: String(variantId) },
    json: {
      images: presigned.map((p, i) => ({
        key: p.key,
        sortOrder: i,
        isPrimary: i === 0,
      })),
    },
  });

  const result = await confirmRes.json();
  console.log({ result });
  return result;
}
