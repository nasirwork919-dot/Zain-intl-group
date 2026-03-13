import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

type PropertyRow = {
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area_sqft: number;
  cover_image: string;
  gallery: string[] | null;
  description: string;
  amenities: string[] | null;
  listing_type: string | null;
  property_type: string | null;
  updated_at: string | null;
  last_synced_at: string | null;
  external_id: string | null;
  sync_payload: Record<string, Json> | null;
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FEED_SECRET = Deno.env.get("BAYUT_FEED_SECRET") ?? "";
const LOCATION_FIELD = Deno.env.get("BRITIX_LOCATION_FIELD") ?? "UF_CRM_1772385717044";
const REFERENCE_FIELD =
  Deno.env.get("BAYUT_REFERENCE_FIELD") ?? Deno.env.get("BRITIX_REFERENCE_FIELD") ?? "ORIGIN_ID";
const PERMIT_FIELD = Deno.env.get("BRITIX_PERMIT_FIELD") ?? "UF_CRM_1772385640292";
const AGENT_NAME_FIELD =
  Deno.env.get("BRITIX_LISTING_AGENT_NAME_FIELD") ?? "UF_CRM_1772385684972";
const AGENT_PHONE_FIELD =
  Deno.env.get("BRITIX_LISTING_AGENT_PHONE_FIELD") ?? "UF_CRM_1772385701700";
const AGENT_EMAIL_FIELD =
  Deno.env.get("BRITIX_LISTING_AGENT_EMAIL_FIELD") ?? "UF_CRM_1772385709132";
const DEFAULT_PORTALS = ["bayut", "dubizzle"];

function toStringSafe(value: unknown, fallback = "") {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((entry) => toStringSafe(entry)).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return value
      .split(/[\n,;]+/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [] as string[];
}

function cdata(value: unknown) {
  return `<![CDATA[${toStringSafe(value).replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
}

function xmlTag(name: string, value: unknown, indent = "    ") {
  return `${indent}<${name}>${cdata(value)}</${name}>`;
}

function unique(values: string[]) {
  const seen = new Set<string>();
  const output: string[] = [];
  for (const value of values) {
    const key = value.trim();
    if (!key || seen.has(key.toLowerCase())) continue;
    seen.add(key.toLowerCase());
    output.push(key);
  }
  return output;
}

function normalizeLocationPart(value: unknown) {
  const text = toStringSafe(value);
  if (!text) return "";
  const lower = text.toLowerCase();
  if (["unknown", "n/a", "na"].includes(lower)) return "";
  return text;
}

function parseLocation(rawLocation: unknown) {
  const parts = unique(
    toStringSafe(rawLocation)
      .split(",")
      .map((part) => normalizeLocationPart(part))
      .filter(Boolean),
  );

  const city = parts.at(-1) ?? "Dubai";

  if (parts.length >= 4) {
    return {
      towerName: parts[0],
      subLocality: parts[1],
      locality: parts[2],
      city,
    };
  }

  if (parts.length === 3) {
    return {
      towerName: parts[0],
      subLocality: parts[1],
      locality: parts[1],
      city,
    };
  }

  if (parts.length === 2) {
    return {
      towerName: parts[0],
      subLocality: parts[0],
      locality: parts[0],
      city,
    };
  }

  if (parts.length === 1) {
    return {
      towerName: parts[0],
      subLocality: parts[0],
      locality: parts[0],
      city,
    };
  }

  return {
    towerName: "",
    subLocality: "",
    locality: "Dubai",
    city: "Dubai",
  };
}

function formatTimestamp(value: string | null) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) return "";

  const yyyy = parsed.getUTCFullYear();
  const mm = String(parsed.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getUTCDate()).padStart(2, "0");
  const hh = String(parsed.getUTCHours()).padStart(2, "0");
  const mi = String(parsed.getUTCMinutes()).padStart(2, "0");
  const ss = String(parsed.getUTCSeconds()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

function inferFurnished(payload: Record<string, Json> | null, row: PropertyRow) {
  const raw =
    toStringSafe(payload?.UF_CRM_FURNISHED) ||
    `${row.title} ${row.description}`.toLowerCase();
  if (!raw) return "No";
  if (raw.includes("unfurnished") || raw.includes("not furnished")) return "No";
  if (raw.includes("furnished")) return "Yes";
  return "No";
}

function readPayloadField(payload: Record<string, Json> | null, fieldName: string) {
  if (!payload || !fieldName) return "";
  return toStringSafe(payload[fieldName]);
}

function buildPropertyXml(row: PropertyRow) {
  const payload = row.sync_payload ?? null;
  const reference =
    readPayloadField(payload, REFERENCE_FIELD) || readPayloadField(payload, "ORIGIN_ID") ||
    toStringSafe(row.external_id);
  const permitNumber = readPayloadField(payload, PERMIT_FIELD);
  const listingAgent = readPayloadField(payload, AGENT_NAME_FIELD);
  const listingAgentPhone = readPayloadField(payload, AGENT_PHONE_FIELD);
  const listingAgentEmail = readPayloadField(payload, AGENT_EMAIL_FIELD);
  const rawLocation = readPayloadField(payload, LOCATION_FIELD) || row.location;
  const location = parseLocation(rawLocation);
  const images = unique([row.cover_image, ...toStringArray(row.gallery)].filter(Boolean));
  const features = unique(toStringArray(row.amenities));
  const purpose = row.listing_type === "rent" ? "Rent" : "Buy";
  const propertyType = toStringSafe(row.property_type, "apartment");
  const lastUpdated = formatTimestamp(row.last_synced_at ?? row.updated_at);

  const lines = [
    "  <Property>",
    xmlTag("Property_Ref_No", reference),
    xmlTag("Permit_Number", permitNumber),
    xmlTag("Property_Status", "live"),
    xmlTag("Property_purpose", purpose),
    xmlTag("Property_Type", propertyType),
    xmlTag("Property_Size", row.area_sqft),
    xmlTag("Property_Size_Unit", "SQFT"),
    xmlTag("Bedrooms", row.beds),
    xmlTag("Bathrooms", row.baths),
    xmlTag("Property_Title", row.title),
    xmlTag("Property_Description", row.description),
    xmlTag("Price", row.price),
    xmlTag("Furnished", inferFurnished(payload, row)),
    xmlTag("City", location.city),
    xmlTag("Locality", location.locality),
    xmlTag("Sub_Locality", location.subLocality),
    xmlTag("Tower_Name", location.towerName),
    xmlTag("Building_Name", location.towerName),
    xmlTag("Listing_Agent", listingAgent),
    xmlTag("Listing_Agent_Phone", listingAgentPhone),
    xmlTag("Listing_Agent_Email", listingAgentEmail),
    "    <Features>",
    ...features.map((feature) => xmlTag("Feature", feature, "      ")),
    "    </Features>",
    "    <Images>",
    ...images.map((image) => xmlTag("Image", image, "      ")),
    "    </Images>",
    xmlTag("Last_Updated", lastUpdated),
    xmlTag("Off_Plan", "No"),
    "    <Portals>",
    ...DEFAULT_PORTALS.map((portal) => xmlTag("Portal", portal, "      ")),
    "    </Portals>",
    "  </Property>",
  ];

  return lines.join("\n");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (req.method !== "GET") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  try {
    if (FEED_SECRET) {
      const supplied = new URL(req.url).searchParams.get("secret") ?? "";
      if (supplied !== FEED_SECRET) {
        return new Response("Unauthorized", {
          status: 401,
          headers: { ...CORS_HEADERS, "Content-Type": "text/plain; charset=utf-8" },
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

    const { data, error } = await supabase
      .from("properties")
      .select(
        "title,location,price,beds,baths,area_sqft,cover_image,gallery,description,amenities,listing_type,property_type,updated_at,last_synced_at,external_id,sync_payload",
      )
      .eq("external_source", "britix")
      .eq("published", true)
      .order("updated_at", { ascending: false });

    if (error) throw error;

    const properties = (data ?? []) as PropertyRow[];
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      "<Properties>",
      ...properties.map(buildPropertyXml),
      "</Properties>",
      "",
    ].join("\n");

    return new Response(xml, {
      headers: { ...CORS_HEADERS, "Content-Type": "application/xml; charset=utf-8" },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "Unknown error";

    return new Response(message, {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "text/plain; charset=utf-8" },
    });
  }
});
