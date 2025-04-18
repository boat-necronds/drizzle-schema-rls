CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text DEFAULT (auth.user_id()) NOT NULL,
	"post" text NOT NULL,
	"insertedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "posts" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "posts" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "posts" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "posts" AS PERMISSIVE FOR SELECT TO "anonymous" USING (true);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "posts" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (
            (
              auth.user_id() = "posts"."userId"::text
              OR auth.session()->>'role' = 'admin'::text
              OR auth.session()->>'role' = 'admin-post'::text
            )
          );--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "posts" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (
            (
              auth.user_id() = "posts"."userId"::text
              OR auth.session()->>'role' = 'admin'::text
              OR auth.session()->>'role' = 'admin-post'::text
            )
          ) WITH CHECK (
            (
              auth.user_id() = "posts"."userId"::text
              OR auth.session()->>'role' = 'admin'::text
              OR auth.session()->>'role' = 'admin-post'::text
            )
          );--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "posts" AS PERMISSIVE FOR DELETE TO "authenticated" USING (
            (
              auth.user_id() = "posts"."userId"::text
              OR auth.session()->>'role' = 'admin'::text
              OR auth.session()->>'role' = 'admin-post'::text
            )
          );--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "posts" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);