import { db, productImages } from "@repo/db";
import { and, eq, isNull } from "drizzle-orm";
import z from "zod";
import { factory, toAppError } from "../../../../lib";
import { validate } from "../../../../middleware";

export const confirmImagesApp = factory.createApp().post(
  "/:productId/images/confirm",
  // authMiddleware,
  validate("param", z.object({ productId: z.coerce.number() })),
  validate(
    "json",
    z.object({
      images: z
        .array(
          z.object({
            key: z.string(),
            sortOrder: z.coerce.number(),
            isPrimary: z.boolean(),
          }),
        )
        .min(1)
        .max(10), // cap batch size, avoid abuse
    }),
  ),
  async (c) => {
    const { productId } = c.req.valid("param");
    const { images } = c.req.valid("json");

    const newKey = images[0]["key"];

    const insertedImages = await upsertImage(
      Number(productId),
      newKey,
    );

    return c.json(
      {
        data: insertedImages,
      },
      200,
    );
  },
);

// It only inserts or updates single image
async function upsertImage(productId: number, newKey: string) {
  try {
    return db.transaction(async (tx) => {
      const [existing] = await tx
        .select()
        .from(productImages)
        .where(and(
          eq(productImages.productId, productId),
          isNull(productImages.productVariantId),
        ))
        .limit(1);

      if (existing) {
        // await deleteFromStorage(existing.key); // your S3/storage cleanup
        await tx
          .update(productImages)
          .set({ key: newKey, updatedAt: new Date() })
          .where(eq(productImages.id, existing.id));
      } else {
        await tx.insert(productImages).values({
          productId,
          productVariantId: null,
          key: newKey,
          sortOrder: 0,
          isPrimary: false,
        });
      }
    });
  } catch (error) {
    toAppError(error, { entity: "Product Images" });
  }
}
