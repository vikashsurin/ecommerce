import { rpcClient } from "@/lib";
import { InferResponseType } from "hono";

type ProductVariantsResponse = InferResponseType<typeof rpcClient.api.products[':productId']['variants']['$get'], 200>

export type ProductVariant = ProductVariantsResponse['data'][number]
