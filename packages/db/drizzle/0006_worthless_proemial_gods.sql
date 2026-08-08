DROP INDEX "product_images_one_primary_per_variant";--> statement-breakpoint
CREATE UNIQUE INDEX "one_product_level_image" ON "product_images" USING btree ("product_id") WHERE "product_images"."product_variant_id" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "one_primary_per_variant" ON "product_images" USING btree ("product_variant_id") WHERE "product_images"."is_primary" = true;