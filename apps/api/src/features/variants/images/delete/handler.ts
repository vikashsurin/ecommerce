import { productImages } from "@repo/db";
import { db } from "@repo/db";
import { eq } from "drizzle-orm";
import z from "zod";
import { AppError, factory } from "../../../../lib";
import { validate } from "../../../../middleware";

export const deleteImageApp = factory.createApp()
  .delete("/:id/images", validate("param", z.object({ id: z.coerce.number() })), async (c) => {
    const { id } = c.req.valid("param");

    const deleted = await deleteVariantImage(id);

    if (!deleted) {
      throw AppError.internal("There was an error deleting image");
    }

    return c.json({ data: { id: deleted.id, variantId: deleted.productVariantId } });
  });

async function deleteVariantImage(id: number) {
  try {
    const [deleted] = await db
      .delete(productImages)
      .where(eq(productImages.id, id))
      .returning();
    return deleted ?? null;
  } catch (error) {
    AppError.fromPg(error, { entity: "Variant images" });
  }
}
