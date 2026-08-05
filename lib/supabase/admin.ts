// This client uses the SERVICE ROLE key and can bypass all security rules.
// Only ever import this inside server actions or route handlers (files with
// "use server" or under app/api/) — never in a client component, and never
// send this key to the browser.

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
