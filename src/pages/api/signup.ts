import type { APIRoute } from "astro";
export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const f = await request.formData();
  const { data, error } = await locals.supabase.auth.signUp({
    email: String(f.get("email")),
    password: String(f.get("password")),
    options: { data: { full_name: String(f.get("name")) } },
  });
  if (error) return redirect("/signup?error=" + encodeURIComponent(error.message));
  if (!data.session) return redirect("/signin?msg=" + encodeURIComponent("Check your email to confirm your account."));
  return redirect("/account");
};
