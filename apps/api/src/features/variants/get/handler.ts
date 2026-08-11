import { db, productImages, productVariants } from "@repo/db";
import { eq } from "drizzle-orm";
import z from "zod";
import { AppError, factory } from "../../../lib";
import { getImageUrl } from "../../../lib/storage";
import { authMiddleware, validate } from "../../../middleware";

export const getVariantApp = factory.createApp().get(
  "/:id",
  authMiddleware,
  validate("param", z.object({ id: z.coerce.number() })),
  async (c) => {
    const { id } = c.req.param();

    const variant = await selectVariant(Number(id));

    if (!variant) {
      AppError.notFound("Variant not found");
    }

    return c.json({ data: variant });
  },
);

async function selectVariant(id: number) {
  try {
    const { row, images } = await db.transaction(async (tx) => {
      const [[row], images] = await Promise.all([
        tx
          .select()
          .from(productVariants)
          .where(eq(productVariants.id, id)),
        tx
          .select()
          .from(productImages)
          .where(eq(productImages.productVariantId, id)),
      ]);
      return { row, images };
    });

    return {
      ...row,
      images: images.map(({ key, ...rest }) => ({
        ...rest,
        url: getImageUrl(key),
      })),
    };
  } catch (error) {
    AppError.fromPg(error, { entity: "Variant" });
  }
}
