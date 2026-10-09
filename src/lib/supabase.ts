import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { AstroCookies } from "astro";

export function createClient(ctx: { request: Request; cookies: AstroCookies }) {
  const url = import.meta.env.SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;
  return createServerClient(url!, key!, {
    cookies: {
      getAll: () => parseCookieHeader(ctx.request.headers.get("Cookie") ?? "") as any,
      setAll: (list) =>
        list.forEach(({ name, value, options }) => ctx.cookies.set(name, value, options)),
    },
  });
}