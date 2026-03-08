#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_ORIGINATOR_ID = "zain-marketplace-csv";
const DEFAULT_BEDS_FIELD = "UF_CRM_1772302750653";
const DEFAULT_BATHS_FIELD = "UF_CRM_1772303064261";
const DEFAULT_AREA_FIELD = "UF_CRM_1772303090036";
const DEFAULT_PROPERTY_TYPE_FIELD = "UF_CRM_1772303144011";
const DEFAULT_LISTING_TYPE_FIELD = "UF_CRM_1772303195091";
const DEFAULT_LOCATION_FIELD = "UF_CRM_1772385717044";
const DEFAULT_COVER_FIELD = "UF_CRM_1772365261741";
const DEFAULT_GALLERY_FIELD = "UF_CRM_1772365274394";
const DEFAULT_AMENITIES_FIELD = "UF_CRM_1772367383673";
const DEFAULT_FEATURED_FIELD = "UF_CRM_1772369604965";
const DEFAULT_PLACEMENTS_FIELD = "UF_CRM_1772369684967";
const DEFAULT_PERMIT_FIELD = "UF_CRM_1772385640292";
const DEFAULT_AGENT_NAME_FIELD = "UF_CRM_1772385684972";
const DEFAULT_AGENT_PHONE_FIELD = "UF_CRM_1772385701700";
const DEFAULT_AGENT_EMAIL_FIELD = "UF_CRM_1772385709132";

const PROPERTY_TYPE_ENUM_IDS = {
  apartment: "44",
  villa: "46",
  townhouse: "48",
  office: "50",
};

const LISTING_TYPE_ENUM_IDS = {
  sale: "52",
  rent: "54",
};

const WEBSITE_PLACEMENT_ENUM_IDS = {
  buy: "56",
  rent: "58",
  featured: "60",
};

function fail(message) {
  console.error(message);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {
    dryRun: false,
    skipSync: false,
    limit: null,
    files: [],
  };

  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];
    if (value === "--dry-run") {
      args.dryRun = true;
      continue;
    }
    if (value === "--skip-sync") {
      args.skipSync = true;
      continue;
    }
    if (value === "--limit") {
      const next = argv[i + 1];
      if (!next) fail("Missing value after --limit");
      args.limit = Number(next);
      if (!Number.isFinite(args.limit) || args.limit <= 0) {
        fail(`Invalid --limit value: ${next}`);
      }
      i += 1;
      continue;
    }
    if (value.startsWith("--")) {
      fail(`Unknown flag: ${value}`);
    }
    args.files.push(value);
  }

  if (!args.files.length) {
    fail(
      [
        "Usage:",
        '  node scripts/import-marketplace-csv.mjs "<csv-file>" ["<csv-file-2>" ...] [--dry-run] [--skip-sync] [--limit N]',
      ].join("\n"),
    );
  }

  return args;
}

function decodeHtmlEntities(input) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
    rsquo: "'",
    lsquo: "'",
    rdquo: '"',
    ldquo: '"',
    ndash: "-",
    mdash: "-",
    bull: "*",
    hellip: "...",
  };

  return String(input ?? "").replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (full, entity) => {
    const lower = String(entity).toLowerCase();
    if (lower.startsWith("#x")) {
      const code = Number.parseInt(lower.slice(2), 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : full;
    }
    if (lower.startsWith("#")) {
      const code = Number.parseInt(lower.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : full;
    }
    return named[lower] ?? full;
  });
}

function cleanRichText(input) {
  return decodeHtmlEntities(String(input ?? ""))
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|ul|ol)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function unique(values) {
  const seen = new Set();
  const output = [];
  for (const value of values) {
    const key = String(value ?? "").trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    output.push(key);
  }
  return output;
}

function parseCsv(text) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;
  const input = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(field);
      field = "";
      const hasContent = row.some((value) => String(value ?? "").length > 0);
      if (hasContent) rows.push(row);
      row = [];
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    const hasContent = row.some((value) => String(value ?? "").length > 0);
    if (hasContent) rows.push(row);
  }

  if (!rows.length) return [];

  const headers = rows[0].map((value) => String(value ?? "").trim());
  return rows.slice(1).map((values) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = values[index] ?? "";
    });
    return record;
  });
}

function detectSource(headers) {
  if (headers.includes("images_1")) return "dubizzle";
  if (headers.includes("images")) return "bayut";
  fail(`Unsupported CSV format. Headers: ${headers.join(", ")}`);
}

function toNumber(value, fallback = 0) {
  const text = String(value ?? "").replace(/,/g, "").trim();
  if (!text) return fallback;
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toInteger(value, fallback = 0) {
  return Math.max(0, Math.round(toNumber(value, fallback)));
}

function toTimestamp(value) {
  const text = String(value ?? "").trim();
  if (!text) return 0;
  const parsed = Date.parse(text.replace(" ", "T"));
  return Number.isFinite(parsed) ? parsed : 0;
}

function splitImagesCell(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return [];

  if (raw.includes("|")) {
    return raw
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return raw
    .split(/\s*,\s*(?=https?:\/\/)/i)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizePurpose(value) {
  return String(value ?? "").toLowerCase().includes("rent") ? "rent" : "sale";
}

function normalizePropertyType(rawType, parentType) {
  const text = `${rawType ?? ""} ${parentType ?? ""}`.toLowerCase();
  if (text.includes("townhouse")) return "townhouse";
  if (text.includes("villa")) return "villa";
  if (
    text.includes("office") ||
    text.includes("commercial") ||
    text.includes("shop") ||
    text.includes("retail") ||
    text.includes("warehouse")
  ) {
    return "office";
  }
  return "apartment";
}

function parseAmenities(value) {
  return unique(
    String(value ?? "")
      .split("|")
      .map((item) => cleanRichText(item))
      .filter(Boolean),
  );
}

function normalizeLocation(row) {
  return unique(
    [row.tower_name, row.sub_locality, row.locality, row.city]
      .map((value) => cleanRichText(value))
      .filter((value) => value && value.toLowerCase() !== "unknown"),
  ).join(", ");
}

function parseGeopoints(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function normalizeRow(row, source) {
  const images =
    source === "bayut"
      ? splitImagesCell(row.images)
      : unique(
          ["images_1", "images_2", "images_3", "images_4", "images_5", "images_6"]
            .flatMap((key) => splitImagesCell(row[key])),
        );

  return {
    key: String(row.property_ref_no ?? "").trim() || `${source}-${String(row.listing_id ?? "").trim()}`,
    source,
    listingId: String(row.listing_id ?? "").trim(),
    propertyRefNo: String(row.property_ref_no ?? "").trim(),
    externalReferenceId: String(row.external_reference_id ?? "").trim(),
    permitNumber: String(row.permit_number ?? "").trim(),
    listingType: normalizePurpose(row.property_purpose),
    propertyType: normalizePropertyType(row.property_type, row.propertyparenttype),
    title: cleanRichText(row.property_title),
    description: cleanRichText(row.property_description),
    areaSqft: toInteger(row.property_size),
    beds: toInteger(row.bedrooms),
    baths: toInteger(row.bathroom),
    price: toInteger(row.price),
    location: normalizeLocation(row),
    features: parseAmenities(row.features),
    images,
    coverImage: images[0] ?? "",
    completionStatus: cleanRichText(row.completion_status),
    furnished: String(row.furnished ?? "").trim().toLowerCase() === "yes",
    listingAgentName: cleanRichText(row.listing_agent),
    listingAgentPhone: cleanRichText(row.listing_agent_phone),
    listingAgentEmail: cleanRichText(row.listing_agent_email),
    lastUpdated: String(row.last_updated ?? "").trim(),
    updatedAtMs: toTimestamp(row.last_updated),
    geopoints: parseGeopoints(row.geopoints),
    raw: row,
  };
}

function pickLatest(records, selector, fallback = "") {
  for (const record of records) {
    const value = selector(record);
    if (value === null || value === undefined) continue;
    if (typeof value === "number" && value > 0) return value;
    if (typeof value === "string" && value.trim()) return value.trim();
    if (Array.isArray(value) && value.length > 0) return value;
    if (typeof value === "boolean") return value;
    if (typeof value === "object") return value;
  }
  return fallback;
}

function pickLongest(records, selector, fallback = "") {
  let best = fallback;
  for (const record of records) {
    const value = String(selector(record) ?? "").trim();
    if (value.length > best.length) best = value;
  }
  return best;
}

function mergeListings(listings) {
  const groups = new Map();

  for (const listing of listings) {
    const existing = groups.get(listing.key) ?? [];
    existing.push(listing);
    groups.set(listing.key, existing);
  }

  return [...groups.values()].map((group) => {
    const records = [...group].sort((a, b) => b.updatedAtMs - a.updatedAtMs);
    const sources = unique(records.map((item) => item.source));
    const gallery = unique(records.flatMap((item) => item.images));
    const listingIds = Object.fromEntries(records.map((item) => [item.source, item.listingId]));

    return {
      key: records[0].key,
      propertyRefNo: pickLatest(records, (item) => item.propertyRefNo),
      listingType: pickLatest(records, (item) => item.listingType, "sale"),
      propertyType: pickLatest(records, (item) => item.propertyType, "apartment"),
      title: pickLongest(records, (item) => item.title, `Imported Listing ${records[0].key}`),
      description: pickLongest(records, (item) => item.description, "Imported from marketplace CSV."),
      areaSqft: pickLatest(records, (item) => item.areaSqft, 0),
      beds: pickLatest(records, (item) => item.beds, 0),
      baths: pickLatest(records, (item) => item.baths, 0),
      price: pickLatest(records, (item) => item.price, 0),
      location: pickLatest(records, (item) => item.location, "Dubai"),
      features: unique(records.flatMap((item) => item.features)),
      gallery,
      coverImage: gallery[0] ?? pickLatest(records, (item) => item.coverImage, ""),
      completionStatus: pickLatest(records, (item) => item.completionStatus),
      furnished: Boolean(pickLatest(records, (item) => item.furnished, false)),
      listingAgentName: pickLatest(records, (item) => item.listingAgentName),
      listingAgentPhone: pickLatest(records, (item) => item.listingAgentPhone),
      listingAgentEmail: pickLatest(records, (item) => item.listingAgentEmail),
      permitNumber: pickLatest(records, (item) => item.permitNumber),
      externalReferenceId: pickLatest(records, (item) => item.externalReferenceId),
      geopoints: pickLatest(records, (item) => item.geopoints, null),
      lastUpdated: pickLatest(records, (item) => item.lastUpdated),
      sources,
      listingIds,
      sourceRows: records.length,
    };
  });
}

function buildApiHeaders() {
  const headers = {};
  if (process.env.BRITIX_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.BRITIX_API_TOKEN}`;
  }
  if (process.env.BRITIX_API_KEY) {
    headers["X-API-Key"] = process.env.BRITIX_API_KEY;
  }
  return headers;
}

function buildEndpoint(baseUrl, methodPath, params = null) {
  const cleanBase = String(baseUrl ?? "").replace(/\/$/, "");
  const cleanPath = methodPath.startsWith("/") ? methodPath : `/${methodPath}`;
  const url = new URL(`${cleanBase}${cleanPath}`);
  if (params) {
    for (const [key, value] of params.entries()) {
      url.searchParams.append(key, value);
    }
  }
  return url;
}

function toBitrixFieldValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "1" : "0";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map((item) => toBitrixFieldValue(item));
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function fieldsToParams(fields) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    if (value === null || value === undefined || value === "") continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        const encoded = toBitrixFieldValue(item);
        if (encoded === "") continue;
        params.append(`fields[${key}][]`, encoded);
      }
      continue;
    }
    params.set(`fields[${key}]`, toBitrixFieldValue(value));
  }
  return params;
}

function getFieldEnv(name, fallback = null) {
  const value = String(process.env[name] ?? "").trim();
  return value || fallback;
}

function buildDealFields(listing, originatorId) {
  const fields = {
    TITLE: listing.title,
    COMMENTS: listing.description,
    OPPORTUNITY: listing.price,
    CURRENCY_ID: "AED",
    ORIGINATOR_ID: originatorId,
    ORIGIN_ID: listing.propertyRefNo || listing.key,
  };

  const stageId = getFieldEnv("BRITIX_IMPORT_STAGE_ID");
  const categoryId = getFieldEnv("BRITIX_IMPORT_CATEGORY_ID");
  const assignedById = getFieldEnv("BRITIX_ASSIGNED_BY_ID");
  const bedsField = getFieldEnv("BRITIX_BEDS_FIELD", DEFAULT_BEDS_FIELD);
  const bathsField = getFieldEnv("BRITIX_BATHS_FIELD", DEFAULT_BATHS_FIELD);
  const areaField = getFieldEnv("BRITIX_AREA_FIELD", DEFAULT_AREA_FIELD);
  const propertyTypeField = getFieldEnv("BRITIX_PROPERTY_TYPE_FIELD", DEFAULT_PROPERTY_TYPE_FIELD);
  const listingTypeField = getFieldEnv("BRITIX_LISTING_TYPE_FIELD", DEFAULT_LISTING_TYPE_FIELD);
  const locationField = getFieldEnv("BRITIX_LOCATION_FIELD", DEFAULT_LOCATION_FIELD);
  const coverField = getFieldEnv("BRITIX_COVER_IMAGE_FIELD", DEFAULT_COVER_FIELD);
  const galleryField = getFieldEnv("BRITIX_GALLERY_FIELD", DEFAULT_GALLERY_FIELD);
  const amenitiesField = getFieldEnv("BRITIX_AMENITIES_FIELD", DEFAULT_AMENITIES_FIELD);
  const tagField = getFieldEnv("BRITIX_TAG_FIELD");
  const featuredField = getFieldEnv("BRITIX_FEATURED_FIELD", DEFAULT_FEATURED_FIELD);
  const placementsField = getFieldEnv("BRITIX_PLACEMENTS_FIELD", DEFAULT_PLACEMENTS_FIELD);
  const referenceField = getFieldEnv("BRITIX_REFERENCE_FIELD");
  const permitField = getFieldEnv("BRITIX_PERMIT_FIELD", DEFAULT_PERMIT_FIELD);
  const furnishedField = getFieldEnv("BRITIX_FURNISHED_FIELD");
  const completionField = getFieldEnv("BRITIX_COMPLETION_STATUS_FIELD");
  const geopointsField = getFieldEnv("BRITIX_GEOPOINTS_FIELD");
  const sourceField = getFieldEnv("BRITIX_MARKETPLACE_SOURCE_FIELD");
  const listingIdsField = getFieldEnv("BRITIX_MARKETPLACE_IDS_FIELD");
  const listingAgentNameField = getFieldEnv("BRITIX_LISTING_AGENT_NAME_FIELD", DEFAULT_AGENT_NAME_FIELD);
  const listingAgentPhoneField = getFieldEnv("BRITIX_LISTING_AGENT_PHONE_FIELD", DEFAULT_AGENT_PHONE_FIELD);
  const listingAgentEmailField = getFieldEnv("BRITIX_LISTING_AGENT_EMAIL_FIELD", DEFAULT_AGENT_EMAIL_FIELD);
  const placements = [
    listing.listingType === "rent"
      ? WEBSITE_PLACEMENT_ENUM_IDS.rent
      : WEBSITE_PLACEMENT_ENUM_IDS.buy,
  ];

  if (stageId) fields.STAGE_ID = stageId;
  if (categoryId) fields.CATEGORY_ID = categoryId;
  if (assignedById) fields.ASSIGNED_BY_ID = assignedById;
  if (bedsField) fields[bedsField] = listing.beds;
  if (bathsField) fields[bathsField] = listing.baths;
  if (areaField) fields[areaField] = listing.areaSqft;
  if (propertyTypeField) fields[propertyTypeField] = PROPERTY_TYPE_ENUM_IDS[listing.propertyType] ?? PROPERTY_TYPE_ENUM_IDS.apartment;
  if (listingTypeField) fields[listingTypeField] = LISTING_TYPE_ENUM_IDS[listing.listingType] ?? LISTING_TYPE_ENUM_IDS.sale;
  if (locationField) fields[locationField] = listing.location;
  if (coverField) fields[coverField] = listing.coverImage;
  if (galleryField) fields[galleryField] = listing.gallery;
  if (amenitiesField) fields[amenitiesField] = listing.features;
  if (tagField) fields[tagField] = listing.sources.map(capitalize).join(" + ");
  if (featuredField) fields[featuredField] = "0";
  if (placementsField) fields[placementsField] = placements;
  if (referenceField) fields[referenceField] = listing.propertyRefNo || listing.key;
  if (permitField) fields[permitField] = listing.permitNumber;
  if (furnishedField) fields[furnishedField] = listing.furnished ? "yes" : "no";
  if (completionField) fields[completionField] = listing.completionStatus;
  if (geopointsField) fields[geopointsField] = JSON.stringify(listing.geopoints ?? "");
  if (sourceField) fields[sourceField] = listing.sources.join(",");
  if (listingIdsField) fields[listingIdsField] = JSON.stringify(listing.listingIds);
  if (listingAgentNameField) fields[listingAgentNameField] = listing.listingAgentName;
  if (listingAgentPhoneField) fields[listingAgentPhoneField] = listing.listingAgentPhone;
  if (listingAgentEmailField) fields[listingAgentEmailField] = listing.listingAgentEmail;

  return fields;
}

function capitalize(value) {
  const text = String(value ?? "").trim();
  return text ? `${text[0].toUpperCase()}${text.slice(1)}` : "";
}

async function callBitrix(methodPath, params, { baseUrl, headers, post = false }) {
  const url = buildEndpoint(baseUrl, methodPath, post ? null : params);
  const response = await fetch(url, {
    method: post ? "POST" : "GET",
    headers: post
      ? {
          ...headers,
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        }
      : headers,
    body: post ? params.toString() : undefined,
  });

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    const description =
      json?.error_description || json?.error || `${response.status} ${response.statusText}`;
    throw new Error(`Bitrix API failed for ${methodPath}: ${description}`);
  }
  if (json?.error) {
    throw new Error(`Bitrix API failed for ${methodPath}: ${json.error_description || json.error}`);
  }
  return json;
}

async function findExistingDeal(listing, config) {
  const params = new URLSearchParams();
  params.set("filter[ORIGINATOR_ID]", config.originatorId);
  params.set("filter[ORIGIN_ID]", listing.propertyRefNo || listing.key);
  params.append("select[]", "ID");
  params.append("select[]", "TITLE");
  const result = await callBitrix("/crm.deal.list.json", params, config);
  const existing = Array.isArray(result?.result) ? result.result[0] : null;
  return existing?.ID ? String(existing.ID) : null;
}

async function upsertDeal(listing, config) {
  const existingId = await findExistingDeal(listing, config);
  const fields = buildDealFields(listing, config.originatorId);

  if (existingId) {
    const params = fieldsToParams(fields);
    params.set("id", existingId);
    await callBitrix("/crm.deal.update.json", params, { ...config, post: true });
    return { action: "updated", id: existingId };
  }

  const params = fieldsToParams(fields);
  const result = await callBitrix("/crm.deal.add.json", params, { ...config, post: true });
  return { action: "created", id: String(result?.result ?? "") };
}

async function triggerWebsiteSync() {
  const syncUrl =
    String(process.env.BRITIX_SYNC_FUNCTION_URL ?? "").trim() ||
    (String(process.env.SUPABASE_URL ?? "").trim()
      ? `${String(process.env.SUPABASE_URL).replace(/\/$/, "")}/functions/v1/britix-sync`
      : "");
  const syncSecret = String(process.env.BRITIX_SYNC_SECRET ?? "").trim();

  if (!syncUrl || !syncSecret) {
    return { skipped: true, reason: "Missing BRITIX_SYNC_FUNCTION_URL or SUPABASE_URL / BRITIX_SYNC_SECRET" };
  }

  const response = await fetch(syncUrl, {
    method: "POST",
    headers: {
      "x-sync-secret": syncSecret,
    },
  });

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    const description = json?.error || `${response.status} ${response.statusText}`;
    throw new Error(`Website sync failed: ${description}`);
  }

  return { skipped: false, result: json };
}

async function loadListings(files) {
  const normalized = [];

  for (const file of files) {
    const absolutePath = path.resolve(file);
    const csvText = await fs.readFile(absolutePath, "utf8");
    const rows = parseCsv(csvText);
    if (!rows.length) continue;
    const source = detectSource(Object.keys(rows[0]));
    normalized.push(...rows.map((row) => normalizeRow(row, source)));
  }

  return mergeListings(normalized);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const mergedListings = await loadListings(args.files);
  const listings = args.limit ? mergedListings.slice(0, args.limit) : mergedListings;

  console.log(`Loaded ${mergedListings.length} unique listings from ${args.files.length} CSV file(s).`);
  if (mergedListings.length !== listings.length) {
    console.log(`Applying limit: ${listings.length} listing(s).`);
  }
  console.log(
    `Sources merged by property_ref_no: ${unique(mergedListings.flatMap((item) => item.sources)).join(", ") || "n/a"}`,
  );

  if (args.dryRun) {
    const preview = listings.slice(0, 3).map((item) => ({
      ref: item.propertyRefNo,
      title: item.title,
      listingType: item.listingType,
      propertyType: item.propertyType,
      price: item.price,
      beds: item.beds,
      baths: item.baths,
      location: item.location,
      images: item.gallery.length,
      sources: item.sources,
    }));
    console.log(JSON.stringify({ dryRun: true, count: listings.length, preview }, null, 2));
    return;
  }

  const baseUrl = String(process.env.BRITIX_API_BASE_URL ?? "").trim();
  if (!baseUrl) {
    fail("Missing BRITIX_API_BASE_URL. Set it before running a live import.");
  }

  const config = {
    baseUrl,
    headers: buildApiHeaders(),
    originatorId: String(process.env.BRITIX_ORIGINATOR_ID ?? DEFAULT_ORIGINATOR_ID).trim(),
  };

  const summary = {
    created: 0,
    updated: 0,
  };

  for (const listing of listings) {
    const result = await upsertDeal(listing, config);
    summary[result.action] += 1;
    console.log(`${result.action.toUpperCase()} ${listing.propertyRefNo || listing.key} -> deal ${result.id}`);
  }

  console.log(JSON.stringify({ imported: listings.length, ...summary }, null, 2));

  if (!args.skipSync) {
    const syncResult = await triggerWebsiteSync();
    console.log(JSON.stringify({ websiteSync: syncResult }, null, 2));
  }
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
