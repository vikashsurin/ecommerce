ALTER TABLE "checkout_sessions" RENAME COLUMN "subTotal" TO "sub_total";--> statement-breakpoint
ALTER TABLE "checkout_sessions" ALTER COLUMN "gateway_order_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "checkout_sessions" ALTER COLUMN "gateway_payment_id" SET DATA TYPE text;