ALTER TABLE "checkout_sessions" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "checkout_sessions" ALTER COLUMN "status" SET DEFAULT 'in_progress'::text;--> statement-breakpoint
DROP TYPE "public"."checkout_status";--> statement-breakpoint
CREATE TYPE "public"."checkout_status" AS ENUM('in_progress', 'address_selected', 'ready_for_payment', 'completed', 'abandoned', 'expired');--> statement-breakpoint
ALTER TABLE "checkout_sessions" ALTER COLUMN "status" SET DEFAULT 'in_progress'::"public"."checkout_status";--> statement-breakpoint
ALTER TABLE "checkout_sessions" ALTER COLUMN "status" SET DATA TYPE "public"."checkout_status" USING "status"::"public"."checkout_status";