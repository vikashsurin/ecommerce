CREATE TYPE "public"."payment_method" AS ENUM('card', 'upi', 'netbanking', 'wallet');--> statement-breakpoint
ALTER TABLE "checkout_sessions" ALTER COLUMN "payment_gateway" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "checkout_sessions" ALTER COLUMN "payment_gateway" SET DEFAULT 'razorpay'::text;--> statement-breakpoint
DROP TYPE "public"."payment_gateway";--> statement-breakpoint
CREATE TYPE "public"."payment_gateway" AS ENUM('stripe', 'razorpay', 'paypal');--> statement-breakpoint
ALTER TABLE "checkout_sessions" ALTER COLUMN "payment_gateway" SET DEFAULT 'razorpay'::"public"."payment_gateway";--> statement-breakpoint
ALTER TABLE "checkout_sessions" ALTER COLUMN "payment_gateway" SET DATA TYPE "public"."payment_gateway" USING "payment_gateway"::"public"."payment_gateway";--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD COLUMN "payment_method" "payment_method";