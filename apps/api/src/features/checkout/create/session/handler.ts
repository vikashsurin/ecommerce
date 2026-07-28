import { z } from "zod";
import { appFactory } from "../../../../lib/factory";
import { authMiddleware, validate } from "../../../../middleware";
import { finalizeCheckout } from "../../services/finalize-checkout";
import { updateCheckoutAddress } from "../../services/udpate-checkout-address";
import { updateCheckoutItems } from "../../services/update-checkout-items";

export const checkoutSessionApp = appFactory()
  .use(authMiddleware)
  .post("/add-items",
    validate("json", z.object({
      cartId: z.coerce.number()
    })),
    async (c) => {
      const user = c.get("user");
      const { cartId } = c.req.valid('json')

      try {
        const checkoutSession = await updateCheckoutItems(user.id, cartId)

        if (!checkoutSession) {
          return c.json({
            error: {
              code: 'not_found',
              message: 'Checkout session not found',
            }
          }, 404)
        }
        return c.json({ data: checkoutSession })
      } catch (error) {
        return c.json({
          error: {
            code: 'internal_server_error',
            message: "Internal server error",
          }
        }, 500)
      }
    })
  .post('/add-address',
    validate("json", z.object({
      addressId: z.coerce.number(),
      cartId: z.coerce.number(),
    })),
    async (c) => {
      const user = c.get("user");
      const userId = user.id;
      const { addressId, cartId } = c.req.valid('json')

      try {
        const checkoutSession = await updateCheckoutAddress(
          addressId,
          cartId,
          userId)


        if (!checkoutSession) {
          return c.json({
            error: {
              code: 'not_found',
              message: 'Checkout session not found',
            }
          }, 404)
        }

        return c.json({
          data: checkoutSession
        })
      } catch (error) {
        return c.json({
          error: {
            code: 'internal_server_error',
            message: "Internal server error",
          }
        }, 500)
      }
    }
  )
  .post("/finalize",
    authMiddleware,
    validate('json', z.object({
      cartId: z.coerce.number(),
    })),
    async (c) => {
      const user = c.get("user");
      const userId = user.id;
      const { cartId } = c.req.valid('json')

      try {
        const checkoutSession = await finalizeCheckout(cartId, userId)

        if (!checkoutSession) {
          return c.json({
            error: {
              code: 'not_found',
              message: 'Checkout session not found',
            }
          }, 404)
        }

        return c.json({ data: checkoutSession })
      } catch (error) {
        console.log({ error })
        return c.json({
          error: {
            code: 'internal_server_error',
            message: 'Failed to freeze items, address, and amount',
          }
        }, 500)
      }
    })



// async function upsertCheckoutSession(userId: number, data: CreateCheckoutSchema
// ) {
//   const { total } = data //TODO: fetch from db and calculate subtotal

//   const [existing] = await db
//     .select()
//     .from(checkoutSessions)
//     .where(and(
//       eq(checkoutSessions.userId, userId),
//       eq(checkoutSessions.cartId, data.cartId)
//     ));

//   const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

//   const snapshot = await db
//     .select({
//       productId: productVariants.productId,
//       variantId: productVariants.id,
//       name: products.name,
//       sku: productVariants.sku,
//       attributes: sql<Record<string, string> | undefined>`${productVariants.attributes}`,
//       unitPrice: sql<number>`${productVariants.salePrice ?? productVariants.price}`,
//       originalUnitPrice: sql<number>`${productVariants.price}`,
//       quantity: cartItems.quantity,
//     })
//     .from(cartItems)
//     .innerJoin(productVariants,
//       eq(cartItems.productVariantId, productVariants.id))
//     .innerJoin(products,
//       eq(productVariants.productId, products.id))
//     .where(eq(cartItems.cartId, data.cartId))


//   if (existing) {
//     const [updated] = await db
//       .update(checkoutSessions)
//       .set({
//         addressId: data.addressId,
//         subtotal: 565656, // calcualte in server
//         items: snapshot,
//         total,
//         status: "address_selected",
//         expiresAt,
//         updatedAt: new Date(),
//       })
//       .where(eq(checkoutSessions.id, existing.id))
//       .returning();
//     return updated;
//   }




//   const [created] = await db
//     .insert(checkoutSessions)
//     .values({
//       userId,
//       items: snapshot,
//       cartId: data.cartId,
//       addressId: data.addressId,
//       subtotal: 565656,
//       total,
//       status: "address_selected",
//       expiresAt,
//     })
//     .returning();
//   return created;
// }
