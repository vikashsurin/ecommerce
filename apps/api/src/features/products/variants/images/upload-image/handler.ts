import { buildImageKey, getPresignedUploadUrl } from "@/lib/storage";
import { db, productImages, productVariants } from "@repo/db";
import { eq, inArray } from "drizzle-orm";
import type { isPrimary } from "node:cluster";
import z from "zod";
import { appFactory } from "../../../../../lib/factory";
import { authMiddleware, validate } from "../../../../../middleware";

export const uploadImageApp = appFactory()
  .post(
    "/:productId/variants/:variantId/images/presign",
    // authMiddleware,
    validate("param", z.object({ productId: z.coerce.number(), variantId: z.coerce.number() })),
    validate(
      "json",
      z.object({
        images: z
          .array(
            z.object({
              filename: z.string(),
              contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
            }),
          )
          .min(1)
          .max(10), // cap batch size, avoid abuse
      }),
    ),
    async (c) => {
      const user = c.get("user");
      const { variantId } = c.req.valid("param");
      const { images } = c.req.valid("json");

      console.log({ variantId, images });

      // check if the variant exists
      const [variant] = await db
        .select()
        .from(productVariants)
        .where(eq(productVariants.id, variantId));

      if (!variant) {
        return c.json(
          {
            error: {
              code: "not_found",
              message: "Variant Not Found",
            },
          },
          404,
        );
      }

      const presignedResults = await Promise.all(
        images.map(async (img) => {
          const key = buildImageKey({
            productId: variant.productId,
            variantId: variantId,
            filename: img.filename,
          });

          const presignedUrl = await getPresignedUploadUrl({
            key,
            contentType: img.contentType,
            expiresIn: 300,
          });

          return { key, presignedUrl, contentType: img.contentType };
        }),
      );
      console.log({ presignedResults });
      return c.json({ data: presignedResults }, 200);
    },
  )
  .post(
    "/:productId/variants/:variantId/images/confirm",
    // authMiddleware,
    validate("param", z.object({ productId: z.coerce.number(), variantId: z.coerce.number() })),
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
      const user = c.get("user");
      const { productId, variantId } = c.req.valid("param");

      const { images } = c.req.valid("json");
      const primaryCount = images.filter((img) => img.isPrimary).length;
      if (primaryCount > 1) {
        throw new Error("Only one image can be marked as primary");
      }

      try {
        const insertedImages = await insertImages({
          productId: Number(productId),
          variantId: Number(variantId),
          images: images,
        });

        if (insertedImages.length <= 0) {
          return c.json({
            error: {
              code: "failed",
              message: "Failed to upload images",
            },
          }, 400);
        }

        return c.json({ data: insertedImages });
      } catch (error) {
        return c.json({
          error: {
            code: "internal_server_error",
            message: "Internal server error" + error,
          },
        }, 500);
      }
      // const
    },
  );

export async function insertImages(
  { productId, variantId, images }: {
    productId: number;
    variantId: number;
    images: { key: string; sortOrder: number; isPrimary: boolean }[];
  },
) {
  const inserted = await db.insert(productImages).values(
    images.map((img) => ({
      productId,
      productVariantId: variantId,
      key: img.key,
      sortOrder: img.sortOrder,
      isPrimary: img.isPrimary,
    })),
  ).returning();

  return inserted;
}
