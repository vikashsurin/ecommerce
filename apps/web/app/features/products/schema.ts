import { apiClient } from "../../../lib/api-client"
import { InferResponseType } from "hono"

const $get = apiClient.api.products.$get

// Targeted extraction using status code 200
type ResponseType200 = InferResponseType<typeof $get, 200>

// [number] extracts the type of items inside the array safely
export type Product = ResponseType200[number]
