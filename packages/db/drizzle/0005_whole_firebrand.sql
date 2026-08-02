ALTER TABLE "product_images" RENAME COLUMN "url" TO "key";--> statement-breakpoint
ALTER TABLE "product_images" ADD COLUMN "product_variant_id" integer;--> statement-breakpoint
ALTER TABLE "product_images" ADD COLUMN "alt_text" text;--> statement-breakpoint
ALTER TABLE "product_images" ADD COLUMN "is_primary" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_variant_id_product_variants_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_images_product_id_idx" ON "product_images" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_images_product_variant_id_idx" ON "product_images" USING btree ("product_variant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "product_images_sort_order_idx" ON "product_images" USING btree ("product_id","product_variant_id","sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "product_images_one_primary_per_variant" ON "product_images" USING btree ("product_variant_id") WHERE "product_images"."is_primary" = true;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "stock_is_non_negative" CHECK ("product_variants"."stock" >= 0);