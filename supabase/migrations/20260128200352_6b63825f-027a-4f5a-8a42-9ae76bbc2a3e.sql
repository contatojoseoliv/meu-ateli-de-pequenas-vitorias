-- Profiles (student-facing)
create table if not exists public.profiles (
  user_id uuid primary key,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Access requests (manual purchase verification)
create table if not exists public.access_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  purchase_email text not null,
  note text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  constraint access_requests_status_check check (status in ('pending','approved','rejected'))
);
create index if not exists access_requests_user_id_idx on public.access_requests(user_id);
create index if not exists access_requests_status_idx on public.access_requests(status);

-- Entitlements (granted access)
create table if not exists public.entitlements (
  user_id uuid primary key,
  product_code text not null default 'primeira-vitoria-amigurumi',
  status text not null default 'active',
  granted_at timestamptz not null default now(),
  granted_by uuid,
  note text,
  constraint entitlements_status_check check (status in ('active','revoked'))
);
create index if not exists entitlements_status_idx on public.entitlements(status);

-- Journey progress
create table if not exists public.journey_progress (
  user_id uuid primary key,
  current_day smallint not null default 1,
  completed_days smallint[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint journey_progress_current_day_check check (current_day between 1 and 7)
);

-- Timestamp trigger helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists trg_journey_progress_updated_at on public.journey_progress;
create trigger trg_journey_progress_updated_at
before update on public.journey_progress
for each row execute function public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.access_requests enable row level security;
alter table public.entitlements enable row level security;
alter table public.journey_progress enable row level security;

-- Profiles policies
create policy "Profiles: users can view own"
on public.profiles
for select
using (auth.uid() = user_id);

create policy "Profiles: users can insert own"
on public.profiles
for insert
with check (auth.uid() = user_id);

create policy "Profiles: users can update own"
on public.profiles
for update
using (auth.uid() = user_id);

-- Access requests policies
create policy "Access requests: users can create own"
on public.access_requests
for insert
with check (auth.uid() = user_id);

create policy "Access requests: users can view own"
on public.access_requests
for select
using (auth.uid() = user_id);

create policy "Access requests: admins can view all"
on public.access_requests
for select
using (public.has_role(auth.uid(), 'admin'::public.app_role));

create policy "Access requests: admins can update"
on public.access_requests
for update
using (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Entitlements policies
create policy "Entitlements: users can view own"
on public.entitlements
for select
using (auth.uid() = user_id);

create policy "Entitlements: admins can view all"
on public.entitlements
for select
using (public.has_role(auth.uid(), 'admin'::public.app_role));

create policy "Entitlements: admins can insert"
on public.entitlements
for insert
with check (public.has_role(auth.uid(), 'admin'::public.app_role));

create policy "Entitlements: admins can update"
on public.entitlements
for update
using (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Journey progress policies
create policy "Journey progress: users can view own"
on public.journey_progress
for select
using (auth.uid() = user_id);

create policy "Journey progress: users can insert own"
on public.journey_progress
for insert
with check (auth.uid() = user_id);

create policy "Journey progress: users can update own"
on public.journey_progress
for update
using (auth.uid() = user_id);

create policy "Journey progress: admins can view all"
on public.journey_progress
for select
using (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Ensure new users have progress row (lazy creation still allowed in app)
-- We'll keep this as app-managed for MVP to avoid triggers on auth schema.
