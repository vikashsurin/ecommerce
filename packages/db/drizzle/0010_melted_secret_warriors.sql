ALTER TABLE "wishlist" RENAME COLUMN "product_id" TO "product_variant_id";--> statement-breakpoint
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_product_id_unique";--> statement-breakpoint
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_product_variant_id_product_variants_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_product_variant_id_unique" UNIQUE("product_variant_id");