# Bayut / Dubizzle CSV Import Into Britix

This importer keeps **Britix / Bitrix** as the master listing source.

Flow:

1. Import Bayut and/or Dubizzle CSV into Britix deals.
2. Trigger `britix-sync`.
3. Website reads the synced `public.properties` rows automatically.

The provided Bayut and Dubizzle exports currently overlap 1:1 by `property_ref_no`, so the importer merges both files into one CRM deal per property instead of creating duplicates.

## Command

Dry run:

```bash
node scripts/import-marketplace-csv.mjs "d:\Downloads\BayutListingdetails_2026-3-7_2143.csv" "d:\Downloads\dubizzleListingdetails_2026-3-7_2145.csv" --dry-run
```

Live import:

```bash
node scripts/import-marketplace-csv.mjs "d:\Downloads\BayutListingdetails_2026-3-7_2143.csv" "d:\Downloads\dubizzleListingdetails_2026-3-7_2145.csv"
```

Optional flags:

- `--limit 5` imports only the first 5 merged listings.
- `--skip-sync` imports to CRM without calling the Supabase sync function.
- `--dry-run` parses and merges the CSV files without writing anything.

## Required Environment

Required for CRM import:

- `BRITIX_API_BASE_URL`

Optional auth:

- `BRITIX_API_TOKEN`
- `BRITIX_API_KEY`

Recommended for immediate website update:

- `SUPABASE_URL`
- `BRITIX_SYNC_SECRET`

Optional override:

- `BRITIX_SYNC_FUNCTION_URL`

## Bitrix Deal Mapping

Standard deal fields:

- `TITLE`
- `COMMENTS`
- `OPPORTUNITY`
- `ORIGINATOR_ID`
- `ORIGIN_ID`

The importer uses `property_ref_no` as the stable external key and upserts against:

- `ORIGINATOR_ID`
- `ORIGIN_ID`

## Custom Field Environment Variables

Use the same field env names already used by `supabase/functions/britix-sync/index.ts` so the website sync can read the imported deals correctly:

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

Additional optional CRM-only fields supported by the importer:

- `BRITIX_REFERENCE_FIELD`
- `BRITIX_PERMIT_FIELD`
- `BRITIX_FURNISHED_FIELD`
- `BRITIX_COMPLETION_STATUS_FIELD`
- `BRITIX_GEOPOINTS_FIELD`
- `BRITIX_MARKETPLACE_SOURCE_FIELD`
- `BRITIX_MARKETPLACE_IDS_FIELD`
- `BRITIX_IMPORT_STAGE_ID`
- `BRITIX_IMPORT_CATEGORY_ID`
- `BRITIX_ASSIGNED_BY_ID`
- `BRITIX_ORIGINATOR_ID`

## Notes

- Gallery and amenities are stored as JSON strings inside CRM fields so the existing sync function can parse them safely.
- If `BRITIX_LOCATION_FIELD`, `BRITIX_COVER_IMAGE_FIELD`, or `BRITIX_GALLERY_FIELD` are not configured in Britix, the website will still sync the listing, but location and images will fall back to generic values.
- If you want the website to reflect the import immediately, do not skip the sync step.
