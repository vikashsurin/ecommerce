import { db, productImages } from "@repo/db";
import { eq } from "drizzle-orm";
import z from "zod";
import { AppError, factory } from "../../../../lib";
import { validate } from "../../../../middleware";

export const promoteImgToPrimary = factory.createApp()
  .put("/:id/images", validate("param", z.object({ id: z.coerce.number() })), async (c) => {
    const { id } = c.req.valid("param");

    const updated = await promoteImage(id);
    if (!updated) {
      throw AppError.internal("Unable to promote image to primary");
    }

    return c.json({
      data: {
        id: updated.id,
        variantId: updated.productVariantId,
      },
    });
  });

async function promoteImage(id: number) {
  try {
    const updated = await db.transaction(async (tx) => {
      // find the primary image and change it
      const updated = await tx
        .update(productImages)
        .set({ isPrimary: false })
        .where(eq(productImages.isPrimary, true))
        .returning();
      if (!updated) {
        throw AppError.internal("Unable to update primary image");
      }

      // update the required image to primary
      const [row] = await tx
        .update(productImages)
        .set({ isPrimary: true })
        .where(eq(productImages.id, id))
        .returning();
      return row;
    });
    return updated;
  } catch (error) {
    AppError.fromPg(error, { entity: "Variant Image" });
  }
}
