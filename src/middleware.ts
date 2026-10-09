import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (ctx, next) => {
  try {
    const { createClient } = await import("./lib/supabase");
    const supabase = createClient({ request: ctx.request, cookies: ctx.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    ctx.locals.supabase = supabase;
    ctx.locals.user = user;
    if (ctx.url.pathname.startsWith("/account") && !user) return ctx.redirect("/signin");
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    return new Response("DEBUG: " + err.message + "\n\n" + (err.stack ?? ""), {
      status: 500,
      headers: { "content-type": "text/plain" },
    });
  }
  return next();
});