ALTER TABLE "category_attributes" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "category_attributes" ADD COLUMN "updated_at" timestamp DEFAULT now();