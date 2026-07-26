ALTER TABLE "checkout_sessions" RENAME COLUMN "subtotal_minor_units" TO "subtotal";--> statement-breakpoint
ALTER TABLE "checkout_sessions" RENAME COLUMN "shipping_cost_minor_units" TO "shipping_cost";--> statement-breakpoint
ALTER TABLE "checkout_sessions" RENAME COLUMN "total_minor_units" TO "total";