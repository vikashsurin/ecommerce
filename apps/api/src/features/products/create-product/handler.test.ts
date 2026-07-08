import { expect, test, describe, beforeAll, afterAll } from "bun:test";
import { db, products } from "@repo/db";
// import { eq } from "drizzle-orm";
import { createProductApp } from "./handler"; // Adjust this import path to your route file

describe("POST / (Create Product)", () => {

  // Optional: Clean up test data after the tests run so your DB stays pristine
  afterAll(async () => {
    // await db.delete(products).where(eq(products.slug, "test-tshirt"));
  });

  test("should successfully create a product with valid data", async () => {
    const payload = {
      name: "Test T-Shirt",
      slug: "test-tshirt",
      description: "A comfortable testing shirt",
      price: 29,
      salePrice: 24,
      stock: 50,
      categoryId: 1, // Ensure this ID exists in your local test DB!
      brandId: 2,    // Ensure this ID exists in your local test DB!
    };

    // Hono lets us simulate a real HTTP request in-memory
    const res = await createProductApp.request("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Assertions
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body).toHaveProperty("message", "Product created");
  });

  test("should fail validation if required fields are missing", async () => {
    const invalidPayload = {
      name: "Broken Product",
      // missing slug, price, stock, etc.
    };

    const res = await createProductApp.request("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidPayload),
    });

    // Assumes your validation middleware throws a 400 or Zod error response on failure
    expect(res.status).toBe(400);
  });
});
