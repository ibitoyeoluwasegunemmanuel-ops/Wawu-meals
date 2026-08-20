"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "./supabase/client";
import type { Session } from "@supabase/supabase-js";

/** Tracks the vendor's Supabase Auth session, client-side only. */
export function useVendorSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, loading };
}

export async function authedFetch(url: string, options: RequestInit = {}) {
  const { data } = await supabaseBrowser.auth.getSession();
  const token = data.session?.access_token;
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
}
