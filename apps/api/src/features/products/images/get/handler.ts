import { db, productImages } from "@repo/db";
import { and, eq, isNull } from "drizzle-orm";
import { z } from "zod";
import { factory } from "../../../../lib";
import { getImageUrl } from "../../../../lib/storage";
import { validate } from "../../../../middleware";

export const getImagesApp = factory
  .createApp()
  .get(
    "/:productId/images",
    validate("param", z.object({ productId: z.coerce.number() })),
    async (c) => {
      const { productId } = c.req.valid("param");
      console.log("calling imge");
      try {
        const image = await selectImage(productId);

        console.log("imgessdgfsg", image);
        if (!image) {
          return c.json({ data: null });
        }

        const { key, ...rest } = image;
        const url = getImageUrl(key);

        return c.json({ data: { ...rest, url } });
      } catch (error) {
        return c.json(
          {
            error: {
              code: "internal_server_error",
              message: "Internal server error" + error,
            },
          },
          500,
        );
      }
    },
  );

async function selectImage(productId: number) {
  const row = await db
    .select()
    .from(productImages)
    .where(
      and(
        eq(productImages.productId, productId),
        isNull(productImages.productVariantId),
      ),
    )
    .limit(1);

  return row[0] ?? null;
}
