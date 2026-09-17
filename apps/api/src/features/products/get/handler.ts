import { z } from "zod";
import { factory } from "../../../lib";
import { dbMiddleware, validate } from "../../../middleware";
import { getProductById } from "../shared";

export const getProductHandler = factory.createHandlers(
  dbMiddleware,
  validate("param", z.object({ id: z.coerce.number() })),
  async (c) => {
    const { id } = c.req.valid("param");
    const db = c.get("db")

    try {
      const product = await getProductById(db, id);
      if (!product) {
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Product not found",
            },
          },
          404,
        );
      }
      return c.json({ data: product });
    } catch (error) {
      return c.json(
        {
          error: {
            code: "internal_server_error",
            message: "Internal server error",
          },
        },
        500,
      );
    }
  },
);
