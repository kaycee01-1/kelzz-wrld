import type { APIRoute } from "astro";
import { PRODUCTS } from "../../data/products";

// Same codes as the cart page. Discounts are recalculated here, never trusted from the browser.
const PROMO: Record<string, (s: number) => number> = {
  STREET5: (s) => Math.min(5000, s),
  WELCOME10: (s) => Math.round(s * 0.1),
  KELZZ: (s) => Math.round(s * 0.25),
};

export const POST: APIRoute = async ({ request, locals }) => {
  const { supabase, user } = locals;
  if (!user) return new Response("Sign in required", { status: 401 });

  const { items, code } = await request.json().catch(() => ({ items: [] }));
  const lines = (Array.isArray(items) ? items : []).flatMap((l: any) => {
    const p = PRODUCTS.find((x) => x.id === l.id);
    if (!p) return [];
    return [{
      product_id: p.id,
      color: p.colors[l.ci]?.[0] ?? null,
      size: String(l.size),
      qty: Math.min(10, Math.max(1, Math.floor(+l.qty || 1))),
      price: p.price,
    }];
  });
  if (!lines.length) return new Response("Empty cart", { status: 400 });

  const subtotal = lines.reduce((a, l) => a + l.price * l.qty, 0);
  const disc = PROMO[String(code ?? "").toUpperCase()]?.(subtotal) ?? 0;
  const order_no = "BRD-" + Math.floor(10000 + Math.random() * 90000);

  const { data: order, error } = await supabase
    .from("orders")
    .insert({ order_no, user_id: user.id, email: user.email, total: subtotal - disc })
    .select("id")
    .single();
  if (error) return new Response(error.message, { status: 500 });

  const { error: e2 } = await supabase
    .from("order_items")
    .insert(lines.map((l) => ({ ...l, order_id: order.id })));
  if (e2) return new Response(e2.message, { status: 500 });

  return Response.json({ order_no });
};
