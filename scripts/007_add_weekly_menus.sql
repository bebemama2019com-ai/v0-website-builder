-- Weekly Menus Table
create table if not exists public.weekly_menus (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  age_group text not null, -- 'yasla' (1-3 years) or 'kindergarten' (3-7 years)
  week_start_date date not null,
  week_end_date date not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Menu Items Table (meals for each day)
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  menu_id uuid not null references public.weekly_menus(id) on delete cascade,
  day_of_week integer not null, -- 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday
  meal_type text not null, -- 'breakfast', 'lunch', 'snack', 'dinner'
  dish_name text not null,
  allergens text, -- comma-separated allergen codes (A, B, C, D, E, F)
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Allergens Reference Table
create table if not exists public.allergen_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null, -- A, B, C, D, E, F
  name_bg text not null,
  name_en text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table public.weekly_menus enable row level security;
alter table public.menu_items enable row level security;
alter table public.allergen_codes enable row level security;

-- Public read access for menus
create policy "Anyone can view weekly menus"
  on public.weekly_menus for select
  using (true);

create policy "Anyone can view menu items"
  on public.menu_items for select
  using (true);

create policy "Anyone can view allergen codes"
  on public.allergen_codes for select
  using (true);

-- Admin-only write access for menus
create policy "Admins can insert weekly menus"
  on public.weekly_menus for insert
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can update weekly menus"
  on public.weekly_menus for update
  using (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can delete weekly menus"
  on public.weekly_menus for delete
  using (exists (select 1 from public.admin_users where id = auth.uid()));

-- Admin-only write access for menu items
create policy "Admins can insert menu items"
  on public.menu_items for insert
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can update menu items"
  on public.menu_items for update
  using (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can delete menu items"
  on public.menu_items for delete
  using (exists (select 1 from public.admin_users where id = auth.uid()));

-- Admin-only write access for allergen codes
create policy "Admins can insert allergen codes"
  on public.allergen_codes for insert
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "Admins can update allergen codes"
  on public.allergen_codes for update
  using (exists (select 1 from public.admin_users where id = auth.uid()));

-- Create indexes for better performance
create index if not exists idx_weekly_menus_age_group on public.weekly_menus(age_group);
create index if not exists idx_weekly_menus_week_dates on public.weekly_menus(week_start_date, week_end_date);
create index if not exists idx_menu_items_menu_id on public.menu_items(menu_id);
create index if not exists idx_menu_items_day_meal on public.menu_items(day_of_week, meal_type);
create index if not exists idx_allergen_codes_code on public.allergen_codes(code);

-- Create triggers for updated_at
create trigger weekly_menus_updated_at
  before update on public.weekly_menus
  for each row
  execute function public.handle_updated_at();

create trigger menu_items_updated_at
  before update on public.menu_items
  for each row
  execute function public.handle_updated_at();

-- Insert allergen codes
insert into public.allergen_codes (code, name_bg, name_en, description) values
  ('A', 'Глутен', 'Gluten', 'Съдържа глутен'),
  ('B', 'Мълко', 'Milk', 'Съдържа мляко'),
  ('C', 'Яйца', 'Eggs', 'Съдържа яйца'),
  ('D', 'Риба', 'Fish', 'Съдържа риба'),
  ('E', 'Бобови', 'Nuts', 'Съдържа бобови'),
  ('F', 'Соя', 'Soy', 'Съдържа соя')
on conflict do nothing;

-- Insert sample menus for week 6/15-6/19/2026
-- Yasla menu (1-3 years)
insert into public.weekly_menus (title, age_group, week_start_date, week_end_date) values
  ('Weekly Menu June 15-19, 2026', 'yasla', '2026-06-15', '2026-06-19')
on conflict do nothing;

-- Kindergarten menu (3-7 years)
insert into public.weekly_menus (title, age_group, week_start_date, week_end_date) values
  ('Weekly Menu June 15-19, 2026', 'kindergarten', '2026-06-15', '2026-06-19')
on conflict do nothing;
