import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser-side Supabase client — uses the public anon key only.
 * Row Level Security (see supabase/schema.sql) restricts what this
 * client can read/write; vendor-only actions go through the API routes
 * using the service-role key instead (lib/supabase/server.ts).
 *
 * Built lazily (not at module load) so `npm run build` never crashes
 * just because .env.local hasn't been filled in yet — the client is
 * only actually constructed the first time a component calls it in
 * the browser, where real env vars will be present.
 */
let cached: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!cached) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
    cached = createClient(url, anonKey);
  }
  return cached;
}

export const supabaseBrowser = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getClient();
    // @ts-expect-error - dynamic proxy forwarding
    return client[prop];
  }
});
