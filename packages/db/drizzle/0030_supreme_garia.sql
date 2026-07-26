ALTER TABLE "checkout_sessions" ADD COLUMN "items" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD COLUMN "gateway_response" jsonb;--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD COLUMN "idempotency_key" text;--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD COLUMN "currency" varchar(3) DEFAULT 'INR' NOT NULL;--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD COLUMN "tax_amount" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD COLUMN "discount_amount" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD COLUMN "coupon_code" text;--> statement-breakpoint
CREATE UNIQUE INDEX "checkout_sessions_gateway_order_id_idx" ON "checkout_sessions" USING btree ("gateway_order_id");--> statement-breakpoint
CREATE UNIQUE INDEX "checkout_sessions_idempotency_key_idx" ON "checkout_sessions" USING btree ("idempotency_key");