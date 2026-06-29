-- International Properties Table
-- Run in Supabase SQL Editor after schema.sql is applied.
-- The set_updated_at() function must already exist (created by schema.sql).

create extension if not exists pgcrypto;

create table if not exists public.international_properties (
  id            uuid    default gen_random_uuid() primary key,
  title         text    not null,
  location      text    not null,
  country       text    not null,
  region        text    not null,  -- 'europe' | 'uk' | 'pakistan'
  price         integer not null check (price >= 0),
  currency      text    not null default 'GBP',
  beds          integer not null default 0 check (beds >= 0),
  baths         integer not null default 0 check (baths >= 0),
  area_sqft     integer not null default 0 check (area_sqft >= 0),
  tag           text,
  cover_image   text    not null default '',
  gallery       text[]  not null default '{}'::text[],
  description   text    not null default '',
  amenities     text[]  not null default '{}'::text[],
  property_type text    not null default 'apartment',
  listing_type  text    not null default 'sale',
  featured      boolean not null default false,
  published     boolean not null default true,
  created_at    timestamp with time zone not null default now(),
  updated_at    timestamp with time zone not null default now()
);

create index if not exists intl_props_region_idx     on public.international_properties (region);
create index if not exists intl_props_published_idx  on public.international_properties (published);
create index if not exists intl_props_created_at_idx on public.international_properties (created_at desc);

-- Auto-update updated_at (reuses function from schema.sql)
drop trigger if exists set_intl_properties_updated_at on public.international_properties;
create trigger set_intl_properties_updated_at
before update on public.international_properties
for each row
execute function public.set_updated_at();

alter table public.international_properties enable row level security;

-- Public can read published
drop policy if exists "intl_props_public_read" on public.international_properties;
create policy "intl_props_public_read"
on public.international_properties
for select
using (published = true);

-- Admins can read all (including drafts)
drop policy if exists "intl_props_admin_read_all" on public.international_properties;
create policy "intl_props_admin_read_all"
on public.international_properties
for select
to authenticated
using (
  exists (
    select 1 from public.admins a
    where a.email = auth.jwt() ->> 'email' and a.active = true
  )
);

drop policy if exists "intl_props_admin_insert" on public.international_properties;
create policy "intl_props_admin_insert"
on public.international_properties
for insert
to authenticated
with check (
  exists (
    select 1 from public.admins a
    where a.email = auth.jwt() ->> 'email' and a.active = true
  )
);

drop policy if exists "intl_props_admin_update" on public.international_properties;
create policy "intl_props_admin_update"
on public.international_properties
for update
to authenticated
using (
  exists (
    select 1 from public.admins a
    where a.email = auth.jwt() ->> 'email' and a.active = true
  )
);

drop policy if exists "intl_props_admin_delete" on public.international_properties;
create policy "intl_props_admin_delete"
on public.international_properties
for delete
to authenticated
using (
  exists (
    select 1 from public.admins a
    where a.email = auth.jwt() ->> 'email' and a.active = true
  )
);
