ALTER TABLE "sessions" ALTER COLUMN "last_activity" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "last_activity" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "expires_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "updated_at" SET DEFAULT now();