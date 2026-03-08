# Britix + Website Deployment Setup

This project can be live with:
- Frontend on **Vercel**
- Listings sync backend on **Supabase Edge Functions**
- Database on **Supabase Postgres**

You do not need a separate custom backend server for this flow.

## 1) Run SQL setup in Supabase

In Supabase SQL Editor, run:

`supabase/britix-sync.sql`

This adds external sync columns and creates a helper function that unpublishes missing Britix listings.

## 2) Deploy the Edge Function

Function path:

`supabase/functions/britix-sync/index.ts`

Deploy with Supabase CLI:

```bash
supabase functions deploy britix-sync
```

## 3) Set function secrets

Set these in Supabase Edge Function secrets:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `BRITIX_API_BASE_URL` (Bitrix webhook base, example: `https://<subdomain>.bitrix24.ae/rest/1/<webhook_key>`)
- `BRITIX_LISTINGS_PATH` (use `/crm.deal.list.json`)
- `BRITIX_API_TOKEN` (optional)
- `BRITIX_API_KEY` (optional)
- `BRITIX_SYNC_SECRET` (custom secret to protect trigger endpoint)

Optional field-code overrides (if your Bitrix field codes change):

- `BRITIX_BEDS_FIELD`
- `BRITIX_BATHS_FIELD`
- `BRITIX_AREA_FIELD`
- `BRITIX_PROPERTY_TYPE_FIELD`
- `BRITIX_LISTING_TYPE_FIELD`
- `BRITIX_LOCATION_FIELD`
- `BRITIX_COVER_IMAGE_FIELD`
- `BRITIX_GALLERY_FIELD`
- `BRITIX_AMENITIES_FIELD`
- `BRITIX_TAG_FIELD`
- `BRITIX_FEATURED_FIELD`

## 4) Trigger sync manually

```bash
curl -X POST "https://<project-ref>.supabase.co/functions/v1/britix-sync" \
  -H "x-sync-secret: <BRITIX_SYNC_SECRET>"
```

## 5) Schedule automatic sync

Use one of:
- Supabase Scheduler (recommended)
- External cron (GitHub Actions, EasyCron, etc.)

For every 5 minutes, run:

`supabase/britix-sync-cron.sql`

## 6) Keep frontend on Vercel

Your frontend already reads published rows from `public.properties`, so no code changes are needed in UI for ongoing sync.

## 7) Bayut + Dubizzle note

For Bayut/Dubizzle publication, keep Britix as master and connect Britix to their official broker feed onboarding.
Your website sync remains independent and controlled by this function.

## 8) Import Bayut / Dubizzle CSV into Britix

Use:

`BRITIX_CSV_IMPORT.md`

This importer merges Bayut and Dubizzle exports by `property_ref_no`, upserts the combined listing into Britix, and can trigger the website sync immediately after import.
