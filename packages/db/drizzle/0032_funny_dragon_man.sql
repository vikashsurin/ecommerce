CREATE UNIQUE INDEX "checkout_sessions_user_id_cart_id_idx" ON "checkout_sessions" USING btree ("user_id","cart_id");--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD CONSTRAINT "checkout_sessions_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD CONSTRAINT "checkout_sessions_cart_id_unique" UNIQUE("cart_id");