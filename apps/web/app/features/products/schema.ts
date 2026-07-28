import { rpcClient } from "../../../lib/rpc-client"
import { InferResponseType } from "hono"

const $get = rpcClient.api.products.$get

// Targeted extraction using status code 200
type ResponseType200 = InferResponseType<typeof $get, 200>

// [number] extracts the type of items inside the array safely
export type Product = ResponseType200[number]
