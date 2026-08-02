import { buildImageKey, getPresignedUploadUrl } from "@/lib/storage";
import { db, productVariants } from "@repo/db";
import { eq } from "drizzle-orm";
import z from "zod";
import { appFactory } from "../../../../../lib/factory";

import { authMiddleware, validate } from "../../../../../middleware";
export const uploadImageApp = appFactory()
  .post(
    "/variants/:variantId/images/presign",
    authMiddleware,
    validate(
      "param",
      z
        .object({ variantId: z.coerce.number() }),
    ),
    validate(
      "json",
      z.object({
        images: z.array(
          z.object({
            filename: z.string(),
            contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
          }),
        ).min(1).max(10), // cap batch size, avoid abuse
      }),
    ),
    async (c) => {
      const user = c.get("user");
      const { variantId } = c.req.valid("param");
      const { images } = c.req.valid("json");

      // check if the variant exists
      const [variant] = await db
        .select()
        .from(productVariants)
        .where(eq(productVariants.id, variantId));

      if (!variant) {
        return c.json({
          error: {
            code: "not_found",
            message: "Variant Not Found",
          },
        }, 404);
      }

      const presignedResults = await Promise.all(
        images.map(async (img) => {
          const key = buildImageKey({
            productId: variant.productId,
            variantId: variantId,
            filename: img.filename,
          });

          const presignedUrl = getPresignedUploadUrl({
            key,
            contentType: img.contentType,
            expiresIn: 300,
          });

          return { key, presignedUrl, contentType: img.contentType };
        }),
      );
      return c.json({ data: presignedResults });
    },
  );
