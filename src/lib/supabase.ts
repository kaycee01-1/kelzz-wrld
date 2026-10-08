import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { AstroCookies } from "astro";

export function createClient(ctx: { request: Request; cookies: AstroCookies }) {
  return createServerClient(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => parseCookieHeader(ctx.request.headers.get("Cookie") ?? "") as any,
      setAll: (list) =>
        list.forEach(({ name, value, options }) => ctx.cookies.set(name, value, options)),
    },
  });
}
