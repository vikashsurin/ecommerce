import { rpcClient } from "@/lib";
import { parseResponse } from "hono/client";

export const getOrders = async()=>{
  const response = await rpcClient.api.orders.$get()

  const result = await parseResponse(response)
  return result.data

}
