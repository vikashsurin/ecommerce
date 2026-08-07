import { addresses } from "@repo/db";
import { db } from "@repo/db";
import { and, eq } from "drizzle-orm";
import z from "zod";
import { factory } from "../../../lib";
import { authMiddleware, validate } from "../../../middleware";

export const getAddressApp = factory.createApp()
  .get(
    "/:addressId",
    authMiddleware,
    validate("param", z.object({ addressId: z.coerce.number() })),
    async (c) => {
      const user = c.get("user");
      const { addressId } = c.req.valid("param");

      try {
        const address = await selectAddressById(addressId, user.id);

        if (!address) {
          return c.json({
            error: {
              code: "not_found",
              message: "Address not found",
            },
          }, 404);
        }
        return c.json({ data: address });
      } catch (error) {
        return c.json({
          error: {
            code: "internal_server_error",
            message: "Internal server error",
          },
        }, 500);
      }
    },
  );

async function selectAddressById(addressId: number, userId: number) {
  const row = await db
    .select()
    .from(addresses)
    .where(
      and(
        eq(addresses.id, addressId),
        eq(addresses.userId, userId),
      ),
    );

  return row[0] ?? null;
}
