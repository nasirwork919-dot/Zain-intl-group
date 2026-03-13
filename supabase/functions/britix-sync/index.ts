import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Json = Record<string, unknown>;

type BitrixDeal = Json & {
  ID?: string | number;
  ORIGIN_ID?: string;
  TITLE?: string;
  OPPORTUNITY?: string | number;
  STAGE_ID?: string;
  COMMENTS?: string;
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-sync-secret",
};

const DEFAULT_PLACEMENTS = ["buy"] as string[];
const BITRIX_PAGE_SIZE = 50;
const FALLBACK_IMAGE = "https://placehold.co/1280x720?text=Property";

const BEDS_FIELD = Deno.env.get("BRITIX_BEDS_FIELD") ?? "UF_CRM_1772302750653";
const BATHS_FIELD = Deno.env.get("BRITIX_BATHS_FIELD") ?? "UF_CRM_1772303064261";
const AREA_FIELD = Deno.env.get("BRITIX_AREA_FIELD") ?? "UF_CRM_1772303090036";
const PROPERTY_TYPE_FIELD = Deno.env.get("BRITIX_PROPERTY_TYPE_FIELD") ?? "UF_CRM_1772303144011";
const LISTING_TYPE_FIELD = Deno.env.get("BRITIX_LISTING_TYPE_FIELD") ?? "UF_CRM_1772303195091";
const LOCATION_FIELD = Deno.env.get("BRITIX_LOCATION_FIELD") ?? "UF_CRM_1772385717044";
const COVER_FIELD = Deno.env.get("BRITIX_COVER_IMAGE_FIELD") ?? "UF_CRM_1772365261741";
const GALLERY_FIELD = Deno.env.get("BRITIX_GALLERY_FIELD") ?? "UF_CRM_1772365274394";
const AMENITIES_FIELD = Deno.env.get("BRITIX_AMENITIES_FIELD") ?? "UF_CRM_1772367383673";
const TAG_FIELD = Deno.env.get("BRITIX_TAG_FIELD") ?? "";
const FEATURED_FIELD = Deno.env.get("BRITIX_FEATURED_FIELD") ?? "UF_CRM_1772369604965";
const REFERENCE_FIELD = Deno.env.get("BRITIX_REFERENCE_FIELD") ?? "";
const PERMIT_FIELD = Deno.env.get("BRITIX_PERMIT_FIELD") ?? "UF_CRM_1772385640292";
const AGENT_NAME_FIELD =
  Deno.env.get("BRITIX_LISTING_AGENT_NAME_FIELD") ?? "UF_CRM_1772385684972";
const AGENT_PHONE_FIELD =
  Deno.env.get("BRITIX_LISTING_AGENT_PHONE_FIELD") ?? "UF_CRM_1772385701700";
const AGENT_EMAIL_FIELD =
  Deno.env.get("BRITIX_LISTING_AGENT_EMAIL_FIELD") ?? "UF_CRM_1772385709132";

function toNumber(value: unknown, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function toStringSafe(value: unknown, fallback = "") {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((x) => toStringSafe(x)).filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    const raw = value.trim();
    if (raw.startsWith("[") && raw.endsWith("]")) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.map((x) => toStringSafe(x)).filter(Boolean);
        }
      } catch {
        // fallback to delimiter parsing below
      }
    }
    return value
      .split(/[\n,;]+/)
      .map((x) => x.trim())
      .filter(Boolean);
  }

  return [] as string[];
}

function stripBitrixMarkup(value: unknown, fallback = "") {
  const raw = toStringSafe(value, fallback);
  if (!raw) return fallback;

  return raw
    .replace(/\[(\/)?p\]/gi, " ")
    .replace(/\[(\/)?br\]/gi, "\n")
    .replace(/\[br\s*\/?\]/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/\[\/?[a-z0-9_]+(?:=[^\]]+)?\]/gi, " ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function normalizeListingType(value: unknown) {
  const v = toStringSafe(value).toLowerCase();
  if (v === "54") return "rent";
  if (v === "52") return "sale";
  return v === "rent" ? "rent" : "sale";
}

function inferPlacements(listingType: "sale" | "rent", featured: boolean) {
  const base = listingType === "rent" ? ["rent"] : [...DEFAULT_PLACEMENTS];
  if (featured && !base.includes("featured")) base.push("featured");
  return base;
}

function normalizePublished(value: unknown, status: unknown) {
  if (typeof value === "boolean") return value;
  const s = toStringSafe(status).toLowerCase();
  if (!s) return true;
  return ![
    "inactive",
    "offmarket",
    "off-market",
    "deleted",
    "draft",
    "lose",
    "junk",
    "won",
  ].some((x) => s.includes(x));
}

function normalizePropertyType(value: unknown) {
  const v = toStringSafe(value).toLowerCase();
  const byId: Record<string, string> = {
    "44": "apartment",
    "46": "villa",
    "48": "townhouse",
    "50": "office",
  };
  if (byId[v]) return byId[v];
  if (["apartment", "villa", "townhouse", "office"].includes(v)) return v;
  return "apartment";
}

function toBool(value: unknown) {
  if (typeof value === "boolean") return value;
  const v = toStringSafe(value).toLowerCase();
  return ["1", "true", "yes", "y"].includes(v);
}

function readDealField(item: BitrixDeal, fieldName: string) {
  if (!fieldName) return null;
  return item[fieldName] ?? null;
}

function mapDeal(item: BitrixDeal) {
  const dealId = toStringSafe(item.ID);
  if (!dealId) return null;

  const referenceId =
    toStringSafe(item.ORIGIN_ID) || toStringSafe(readDealField(item, REFERENCE_FIELD)) || dealId;

  const listingType = normalizeListingType(readDealField(item, LISTING_TYPE_FIELD));
  const propertyType = normalizePropertyType(readDealField(item, PROPERTY_TYPE_FIELD));
  const featured = toBool(readDealField(item, FEATURED_FIELD));

  const gallery = toStringArray(readDealField(item, GALLERY_FIELD));
  const cover = toStringSafe(readDealField(item, COVER_FIELD)) || gallery[0] || FALLBACK_IMAGE;
  const stageId = toStringSafe(item.STAGE_ID);

  return {
    external_source: "britix",
    external_id: referenceId,
    external_url: null,
    title: toStringSafe(item.TITLE, `Bitrix Listing ${dealId}`),
    location: toStringSafe(readDealField(item, LOCATION_FIELD), "Dubai"),
    price: Math.max(0, Math.round(toNumber(item.OPPORTUNITY, 0))),
    beds: Math.max(0, Math.round(toNumber(readDealField(item, BEDS_FIELD), 0))),
    baths: Math.max(0, Math.round(toNumber(readDealField(item, BATHS_FIELD), 0))),
    area_sqft: Math.max(0, Math.round(toNumber(readDealField(item, AREA_FIELD), 0))),
    tag: toStringSafe(readDealField(item, TAG_FIELD)) || null,
    cover_image: cover,
    gallery,
    description: stripBitrixMarkup(item.COMMENTS, "Imported from Bitrix24."),
    amenities: toStringArray(readDealField(item, AMENITIES_FIELD)).map((x) => stripBitrixMarkup(x)).filter(Boolean),
    published: normalizePublished(null, stageId),
    listing_type: listingType,
    property_type: propertyType,
    placements: inferPlacements(listingType, featured),
    featured,
    last_synced_at: new Date().toISOString(),
    sync_payload: item,
  };
}

async function fetchBritixListings() {
  const baseUrl = Deno.env.get("BRITIX_API_BASE_URL");
  const path = Deno.env.get("BRITIX_LISTINGS_PATH") ?? "/crm.deal.list.json";
  const token = Deno.env.get("BRITIX_API_TOKEN");
  const apiKey = Deno.env.get("BRITIX_API_KEY");

  if (!baseUrl) throw new Error("Missing BRITIX_API_BASE_URL");

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (apiKey) headers["X-API-Key"] = apiKey;

  const all: BitrixDeal[] = [];
  let start = 0;

  while (true) {
    const url = new URL(`${baseUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`);
    if (!url.searchParams.has("start")) url.searchParams.set("start", String(start));
    if (!url.searchParams.has("select[]")) {
      url.searchParams.append("select[]", "ID");
      url.searchParams.append("select[]", "ORIGIN_ID");
      url.searchParams.append("select[]", "TITLE");
      url.searchParams.append("select[]", "OPPORTUNITY");
      url.searchParams.append("select[]", "STAGE_ID");
      url.searchParams.append("select[]", "COMMENTS");
      url.searchParams.append("select[]", BEDS_FIELD);
      url.searchParams.append("select[]", BATHS_FIELD);
      url.searchParams.append("select[]", AREA_FIELD);
      url.searchParams.append("select[]", PROPERTY_TYPE_FIELD);
      url.searchParams.append("select[]", LISTING_TYPE_FIELD);
      if (LOCATION_FIELD) url.searchParams.append("select[]", LOCATION_FIELD);
      if (COVER_FIELD) url.searchParams.append("select[]", COVER_FIELD);
      if (GALLERY_FIELD) url.searchParams.append("select[]", GALLERY_FIELD);
      if (AMENITIES_FIELD) url.searchParams.append("select[]", AMENITIES_FIELD);
      if (TAG_FIELD) url.searchParams.append("select[]", TAG_FIELD);
      if (FEATURED_FIELD) url.searchParams.append("select[]", FEATURED_FIELD);
      if (REFERENCE_FIELD) url.searchParams.append("select[]", REFERENCE_FIELD);
      if (PERMIT_FIELD) url.searchParams.append("select[]", PERMIT_FIELD);
      if (AGENT_NAME_FIELD) url.searchParams.append("select[]", AGENT_NAME_FIELD);
      if (AGENT_PHONE_FIELD) url.searchParams.append("select[]", AGENT_PHONE_FIELD);
      if (AGENT_EMAIL_FIELD) url.searchParams.append("select[]", AGENT_EMAIL_FIELD);
    }

    const res = await fetch(url.toString(), { method: "GET", headers });
    if (!res.ok) throw new Error(`Britix API error: ${res.status} ${res.statusText}`);

    const json = (await res.json()) as Json;
    const chunk = Array.isArray(json.result) ? (json.result as BitrixDeal[]) : [];
    all.push(...chunk);

    const next = typeof json.next === "number" ? json.next : null;
    if (next === null || chunk.length < BITRIX_PAGE_SIZE) break;
    start = next;
  }

  return all;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  try {
    const syncSecret = Deno.env.get("BRITIX_SYNC_SECRET");
    if (syncSecret) {
      const supplied = req.headers.get("x-sync-secret") ?? "";
      if (supplied !== syncSecret) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRole) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }

    const supabase = createClient(supabaseUrl, serviceRole, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const listings = await fetchBritixListings();
    const mapped = listings.map(mapDeal).filter(Boolean) as Json[];

    if (mapped.length) {
      const { error: upsertError } = await supabase
        .from("properties")
        .upsert(mapped, { onConflict: "external_source,external_id" });

      if (upsertError) throw upsertError;
    }

    const activeIds = mapped
      .map((x) => toStringSafe(x.external_id))
      .filter(Boolean);

    const { data: unpublishedCount, error: rpcError } = await supabase
      .rpc("sync_mark_missing_britix_unpublished", { active_external_ids: activeIds });

    if (rpcError) throw rpcError;

    return new Response(
      JSON.stringify({
        ok: true,
        fetched: listings.length,
        upserted: mapped.length,
        unpublished: unpublishedCount ?? 0,
        at: new Date().toISOString(),
      }),
      { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : JSON.stringify(error);

    return new Response(
      JSON.stringify({
        ok: false,
        error: message || "Unknown error",
      }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
    );
  }
});
