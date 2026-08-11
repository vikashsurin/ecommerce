import { describe, expect, test } from "bun:test";
import { testClient } from "hono/testing";
import { deleteImageApp } from "./handler";

describe("Test delete variant images.ts", () => {
  const client = testClient(deleteImageApp);

  test("should delete a variant image", async () => {
    const res = await client[":id"].images.$delete({
      param: {
        id: String(64),
      },
    }, {
      headers: {
        "Content-Type": `application/json`,
      },
    });

    expect(res.status).toBe(200);
    const result = await res.json();
    console.log(result);
  });
});
