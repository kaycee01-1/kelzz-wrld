import type { APIRoute } from "astro";
export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const f = await request.formData();
  const { error } = await locals.supabase.auth.signInWithPassword({
    email: String(f.get("email")),
    password: String(f.get("password")),
  });
  if (error) return redirect("/signin?error=" + encodeURIComponent(error.message));
  const next = String(f.get("next") || "/account");
  return redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/account");
};
