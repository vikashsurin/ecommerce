export function buildImageKey(params: {
  productId: number;
  variantId?: number; // undefined for product-level images
  filename: string;
}): string {
  const ext = params.filename.split(".").pop();
  const uniqueName = `${crypto.randomUUID()}.${ext}`;

  return params.variantId
    ? `products/${params.productId}/variants/${params.variantId}/${uniqueName}`
    : `products/${params.productId}/${uniqueName}`;
}
