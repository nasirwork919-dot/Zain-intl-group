-- Britix listing sync support
-- Run this in Supabase SQL editor before deploying the edge function.

alter table public.properties
  add column if not exists external_source text,
  add column if not exists external_id text,
  add column if not exists external_url text,
  add column if not exists last_synced_at timestamp with time zone,
  add column if not exists sync_payload jsonb;

drop index if exists public.properties_external_source_external_id_uidx;
create unique index if not exists properties_external_source_external_id_uidx
  on public.properties (external_source, external_id);

create index if not exists properties_external_source_idx
  on public.properties (external_source);

-- Mark listings missing from the latest Britix snapshot as unpublished.
create or replace function public.sync_mark_missing_britix_unpublished(active_external_ids text[])
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  affected_count integer;
begin
  if active_external_ids is null or cardinality(active_external_ids) = 0 then
    update public.properties
    set
      published = false,
      updated_at = now()
    where external_source = 'britix'
      and published = true;
  else
    update public.properties
    set
      published = false,
      updated_at = now()
    where external_source = 'britix'
      and published = true
      and not (external_id = any(active_external_ids));
  end if;

  get diagnostics affected_count = row_count;
  return affected_count;
end;
$$;

revoke all on function public.sync_mark_missing_britix_unpublished(text[]) from public;
grant execute on function public.sync_mark_missing_britix_unpublished(text[]) to service_role;
