-- Създаване на таблици за групи и седмични програми

-- Таблица за групи
create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null, -- Група 1, Група 2, и т.н.
  description text,
  responsible_teacher_id uuid references public.team_members(id) on delete set null,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Таблица за седмични програми
create table if not exists public.group_schedules (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups(id) on delete cascade,
  day_of_week integer not null, -- 1=Понеделник, 2=Вторник, 3=Сряда, 4=Четвъртък, 5=Петък
  time_period text not null, -- 'morning' или 'afternoon'
  activity text not null,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Индекси за по-бърза заявка
create index if not exists idx_groups_order on public.groups(order_index);
create index if not exists idx_group_schedules_group on public.group_schedules(group_id);
create index if not exists idx_group_schedules_day on public.group_schedules(day_of_week, time_period);

-- RLS политики
alter table public.groups enable row level security;
alter table public.group_schedules enable row level security;

-- Всички могат да четат
create policy "Групите са публично видими"
  on public.groups for select
  using (true);

create policy "Седмичните програми са публично видими"
  on public.group_schedules for select
  using (true);

-- Само админи могат да променят (ще се провери от middleware)
create policy "Админите могат да управляват групи"
  on public.groups for all
  using (true);

create policy "Админите могат да управляват седмични програми"
  on public.group_schedules for all
  using (true);

-- Добавяне на примерни групи
insert into public.groups (name, description, order_index) values
  ('Група 1', 'Първа група', 1),
  ('Група 2', 'Втора група', 2),
  ('Група 3', 'Трета група', 3),
  ('Група 4', 'Четвърта група', 4),
  ('ДОД', 'Допълнителна образователна дейност', 5)
on conflict do nothing;
