CREATE TABLE "sessions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sessions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"token_hash" text NOT NULL,
	"user_id" integer NOT NULL,
	"ip_address" text NOT NULL,
	"user_agent" text,
	"refresh_token" text,
	"is_active" boolean DEFAULT true,
	"last_activity" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"expires_at" integer,
	CONSTRAINT "sessions_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "sessions_userIdIdx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_expires_atIdx" ON "sessions" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "sessions_ipAddressIdx" ON "sessions" USING btree ("ip_address");--> statement-breakpoint
CREATE INDEX "session_is_active_lastActivityIdx" ON "sessions" USING btree ("is_active","last_activity");