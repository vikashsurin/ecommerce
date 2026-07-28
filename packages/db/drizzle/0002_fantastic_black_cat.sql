ALTER TABLE "checkout_sessions" DROP CONSTRAINT "checkout_sessions_user_id_unique";--> statement-breakpoint
ALTER TABLE "checkout_sessions" DROP CONSTRAINT "checkout_sessions_cart_id_unique";--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_cart_id_carts_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "checkout_session_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "items" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "subtotal" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "shipping_cost" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "tax_amount" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "discount_amount" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment_gateway" "payment_gateway";--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment_method" "payment_method";--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "gateway_order_id" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "gateway_payment_id" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "gateway_response" jsonb;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_checkout_session_id_checkout_sessions_id_fk" FOREIGN KEY ("checkout_session_id") REFERENCES "public"."checkout_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "orders_cart_id_idx" ON "orders" USING btree ("cart_id");--> statement-breakpoint
CREATE UNIQUE INDEX "orders_checkout_session_id_idx" ON "orders" USING btree ("checkout_session_id");