-- Schedule britix-sync every 5 minutes from Supabase Postgres
-- Run in SQL Editor after replacing placeholders below.

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Optional: remove old schedule with the same name.
select cron.unschedule('britix_sync_every_5_min')
where exists (
  select 1
  from cron.job
  where jobname = 'britix_sync_every_5_min'
);

-- Replace the placeholders before running:
-- <PROJECT_REF>   -> your Supabase project ref (example: whaihclwfwpmcvpnkctv)
-- <SYNC_SECRET>   -> BRITIX_SYNC_SECRET value
select cron.schedule(
  'britix_sync_every_5_min',
  '*/5 * * * *',
  $$
  select
    net.http_post(
      url := 'https://<PROJECT_REF>.supabase.co/functions/v1/britix-sync',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-sync-secret', '<SYNC_SECRET>'
      ),
      body := '{}'::jsonb
    );
  $$
);

-- Check active jobs
select jobid, jobname, schedule, active
from cron.job
where jobname = 'britix_sync_every_5_min';
