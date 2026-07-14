ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "category_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variants" ADD COLUMN "sale_price" integer;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "price";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "sale_price";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "stock";--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "sale_price_lower_check" CHECK ("product_variants"."sale_price" IS NULL OR "product_variants"."sale_price" < "product_variants"."price");