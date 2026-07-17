ALTER TABLE "products" RENAME COLUMN "metadata" TO "specifications";--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "specifications_label" text DEFAULT 'Specifications' NOT NULL;