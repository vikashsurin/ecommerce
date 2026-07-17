import { apiClient } from "@/lib";
import { InferResponseType } from "hono";

type ProductVariantsResponse = InferResponseType<typeof apiClient.api.products[':productId']['variants']['$get'], 200>

export type ProductVariant = ProductVariantsResponse['data'][number]
