import { env } from "../env";

export function getImageUrl(key: string): string {
  return `${env.RUSTFS_PUBLIC_URL}/${env.STORAGE_BUCKET_NAME}/${key}`;
}
