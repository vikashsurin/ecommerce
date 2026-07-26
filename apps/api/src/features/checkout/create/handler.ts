import { checkoutSessions, db } from "@repo/db";
import { and, eq } from "drizzle-orm";
import { appFactory } from "../../../lib/factory";
import { authMiddleware, validate } from "../../../middleware";
import { createCheckoutSchema, type CreateCheckoutSchema } from "./schema";

export const createCheckOut = appFactory()
  .post("/",
    authMiddleware,
    validate("json", createCheckoutSchema),
    async (c) => {
      const user = c.get("user");
      const data = c.req.valid('json')

      try {
        const checkout = await upsertCheckoutSession(user.id, data)
        return c.json({ data: checkout })
      } catch (error) {
        return c.json({
          error: {
            code: 'internal_server_error',
            message: "Internal server error",
          }
        }, 500)
      }
    });

async function upsertCheckoutSession(userId: number, data: CreateCheckoutSchema
) {
  const { total } = data //TODO: fetch from db and calculate subtotal

  const [existing] = await db
    .select()
    .from(checkoutSessions)
    .where(and(
      eq(checkoutSessions.userId, userId),
      eq(checkoutSessions.cartId, data.cartId)
    ));

  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  if (existing) {
    const [updated] = await db
      .update(checkoutSessions)
      .set({
        addressId: data.addressId,
        subtotal: 565656, // calcualte in server
        total,
        status: "address_selected",
        expiresAt,
        updatedAt: new Date(),
      })
      .where(eq(checkoutSessions.id, existing.id))
      .returning();
    return updated;
  }

  const [created] = await db
    .insert(checkoutSessions)
    .values({
      userId,
      cartId: data.cartId,
      addressId: data.addressId,
      subtotal: 565656,
      total,
      status: "address_selected",
      expiresAt,
    })
    .returning();
  return created;
}
