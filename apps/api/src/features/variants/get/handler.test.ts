import { expect, test } from "bun:test";

const url = "http://localhost:4000/api";

test("Should return a variant", async () => {
  const res = await fetch(`${url}/variants/2`, {
    method: "GET",
  });

  if (!res.ok) {

    throw new Error("There was an error");
  }
  const data = await res.json();
  console.log({ data });
  expect(data).toBeDefined();
});
