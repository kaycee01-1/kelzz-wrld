# KELZZ WRLD: Astro SSR + Supabase (portfolio demo)

Auth (cookie sessions), order history and order tracking run on the server with Supabase Auth and Postgres.
Checkout is a demo: it creates the order without taking payment.

## Setup
1. `npm install astro @astrojs/node @supabase/supabase-js @supabase/ssr`
2. Create a Supabase project and run `supabase/schema.sql` in the SQL Editor.
3. Authentication → Providers → Email: turn **Confirm email** off for the demo.
4. Copy `.env.example` to `.env` and fill in your project URL and anon (publishable) key.
5. `npm run dev`, then open http://localhost:4321

Never put the service_role key in this project.

## Deploy
Swap the adapter for your host, e.g. `npx astro add vercel` (or netlify / cloudflare), set the two env vars there, and add your live URL under Supabase → Authentication → URL Configuration.

## Layout
- `src/pages/*.astro` pages, `src/pages/api/*` server routes
- `src/middleware.ts` loads the user and protects `/account`
- `public/site.js` client code for the shop grid, product dialog, cart (localStorage) and checkout call
- `src/data/products.ts` products used by the server to recalculate prices
