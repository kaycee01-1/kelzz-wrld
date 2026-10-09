import { defineMiddleware } from "astro:middleware";
import { createClient } from "./lib/supabase";

export const onRequest = defineMiddleware(async (ctx, next) => {
  try {
    const supabase = createClient({ request: ctx.request, cookies: ctx.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    ctx.locals.supabase = supabase;
    ctx.locals.user = user;
    if (ctx.url.pathname.startsWith("/account") && !user) return ctx.redirect("/signin");
  } catch (e) {
    return new Response("DEBUG: " + (e instanceof Error ? e.message : String(e)), { status: 500 });
  }
  return next();
});