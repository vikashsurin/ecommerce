import { expect, describe, test, it } from "bun:test"
import { testClient } from "hono/testing"
import { listProductsApp } from "./handler"

describe("listProductsApp", () => {
  it("should return list", async () => {
    const client = testClient(listProductsApp)

    const response = await client.index.$get()
    const data = await response.json()
    console.log({ data })
  })
})
