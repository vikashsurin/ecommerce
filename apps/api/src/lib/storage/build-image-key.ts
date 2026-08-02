export function buildImageKey({ productId, variantId, filename }: { productId: number; variantId: number; filename: string }) {
  const ext = filename.split(".").pop();
  return `products/${productId}/variants/${variantId}/${crypto.randomUUID()}.${ext}`;
}
