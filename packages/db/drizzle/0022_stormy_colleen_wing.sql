CREATE TYPE "public"."checkout_status" AS ENUM('in_progress', 'address_selected', 'payment_pending', 'payment_confirmed', 'completed', 'abandoned');--> statement-breakpoint
CREATE TYPE "public"."payment_gateway" AS ENUM('upi', 'stripe', 'razorpay', 'paypal');--> statement-breakpoint
CREATE TABLE "checkout_sessions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "checkout_sessions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" uuid NOT NULL,
	"cart_id" uuid NOT NULL,
	"address_id" uuid,
	"payment_gateway" "payment_gateway" NOT NULL,
	"gateway_order_id" uuid,
	"gateway_payment_id" uuid,
	"payment_status" "payment_status" DEFAULT 'pending' NOT NULL,
	"subtotal_minor_units" integer NOT NULL,
	"shipping_cost_minor_units" integer DEFAULT 0 NOT NULL,
	"total_minor_units" integer NOT NULL,
	"status" "checkout_status" DEFAULT 'in_progress' NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD CONSTRAINT "checkout_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD CONSTRAINT "checkout_sessions_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD CONSTRAINT "checkout_sessions_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE set null ON UPDATE no action;