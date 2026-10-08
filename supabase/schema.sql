create table profiles (id uuid primary key references auth.users on delete cascade, full_name text, phone text, created_at timestamptz default now());
create table addresses (id bigint generated always as identity primary key, user_id uuid not null references auth.users on delete cascade, line1 text not null, city text, state text, phone text);
create table orders (id bigint generated always as identity primary key, order_no text unique not null, user_id uuid references auth.users, email text not null, status text not null default 'confirmed', total integer not null, created_at timestamptz default now());
create table order_items (id bigint generated always as identity primary key, order_id bigint not null references orders on delete cascade, product_id text not null, color text, size text, qty integer not null, price integer not null);

alter table profiles enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "own profile" on profiles for all using (id = auth.uid()) with check (id = auth.uid());
create policy "own addresses" on addresses for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own orders" on orders for select using (user_id = auth.uid());
create policy "insert own orders" on orders for insert with check (user_id = auth.uid());
create policy "own items" on order_items for select using (exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "insert own items" on order_items for insert with check (exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()));

create function handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, full_name) values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end $$;
create trigger on_signup after insert on auth.users for each row execute function handle_new_user();

-- Guest order tracking: order number + email
create function track_order(p_order_no text, p_email text) returns table(status text, created_at timestamptz)
language sql security definer set search_path = public as $$
  select status, created_at from orders where order_no = p_order_no and lower(email) = lower(p_email);
$$;
