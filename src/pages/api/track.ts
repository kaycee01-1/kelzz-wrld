import type { APIRoute } from "astro";
export const POST: APIRoute = async ({ request, locals }) => {
  const { order, email } = await request.json().catch(() => ({}));
  const digits = String(order ?? "").replace(/\D/g, "");
  if (!digits || !email) return new Response(null, { status: 404 });
  const { data } = await locals.supabase.rpc("track_order", {
    p_order_no: "BRD-" + digits,
    p_email: String(email),
  });
  const row = data?.[0];
  if (!row) return new Response(null, { status: 404 });
  return Response.json({ status: row.status, created_at: row.created_at });
};
