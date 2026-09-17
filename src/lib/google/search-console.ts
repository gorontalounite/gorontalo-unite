import { createSign } from "node:crypto";

/**
 * Search Console performance figures for the admin dashboard.
 *
 * Authenticated as a service account that has been added as a user on the
 * property. No SDK: `googleapis` is several megabytes to sign one JWT and make
 * one POST, and Node signs RS256 on its own.
 *
 * Every export returns null rather than throwing when the credentials are
 * absent or the call fails — a dashboard that renders without its search card
 * is worth more than one that 500s because a key expired.
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_BASE = "https://www.googleapis.com/webmasters/v3/sites";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

/** Google issues hour-long tokens; stop a few minutes short of the edge. */
const TOKEN_TTL_MS = 55 * 60 * 1000;
/** Search Console updates roughly daily, so re-asking more often buys nothing. */
const DATA_TTL_MS = 60 * 60 * 1000;

function credentials() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const site = process.env.GSC_SITE_URL;
  // Vercel stores the key as the JSON file writes it — one line with escaped
  // newlines. PEM parsing needs the real ones back.
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key || !site) return null;
  return { email, key, site };
}

export const searchConsoleConfigured = () => credentials() !== null;

const b64url = (value: string | Buffer) =>
  Buffer.from(value).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

let token: { value: string; expires: number } | null = null;

async function accessToken(): Promise<string | null> {
  const creds = credentials();
  if (!creds) return null;
  if (token && token.expires > Date.now()) return token.value;

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(JSON.stringify({
    iss: creds.email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));

  const signature = createSign("RSA-SHA256")
    .update(`${header}.${claims}`)
    .sign(creds.key)
    .toString("base64")
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
  });
  if (!response.ok) return null;

  const payload = await response.json() as { access_token?: string };
  if (!payload.access_token) return null;

  token = { value: payload.access_token, expires: Date.now() + TOKEN_TTL_MS };
  return token.value;
}

interface Row { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number }

async function query(body: Record<string, unknown>): Promise<Row[] | null> {
  const creds = credentials();
  const bearer = await accessToken();
  if (!creds || !bearer) return null;

  const response = await fetch(`${API_BASE}/${encodeURIComponent(creds.site)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${bearer}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) return null;

  const payload = await response.json() as { rows?: Row[] };
  return payload.rows ?? [];
}

const isoDate = (daysAgo: number) =>
  new Date(Date.now() - daysAgo * 86_400_000).toISOString().slice(0, 10);

export interface SearchOverview {
  days: number;
  clicks: number;
  impressions: number;
  /** Fraction, not a percentage. */
  ctr: number;
  position: number;
  topQueries: Array<{ term: string; clicks: number; impressions: number }>;
  topPages: Array<{ url: string; clicks: number; impressions: number }>;
}

let cached: { value: SearchOverview | null; expires: number } | null = null;

/** Null when unconfigured, refused, or empty. */
export async function getSearchOverview(days = 28): Promise<SearchOverview | null> {
  if (cached && cached.expires > Date.now()) return cached.value;
  if (!credentials()) return null;

  const range = { startDate: isoDate(days), endDate: isoDate(0) };

  const [totals, queries, pages] = await Promise.all([
    query({ ...range, dimensions: [] }),
    query({ ...range, dimensions: ["query"], rowLimit: 5 }),
    query({ ...range, dimensions: ["page"], rowLimit: 5 }),
  ]);

  const total = totals?.[0];
  const value: SearchOverview | null = total ? {
    days,
    clicks: total.clicks,
    impressions: total.impressions,
    ctr: total.ctr,
    position: total.position,
    topQueries: (queries ?? []).map((row) => ({
      term: row.keys?.[0] ?? "—", clicks: row.clicks, impressions: row.impressions,
    })),
    topPages: (pages ?? []).map((row) => ({
      url: row.keys?.[0] ?? "—", clicks: row.clicks, impressions: row.impressions,
    })),
  } : null;

  cached = { value, expires: Date.now() + DATA_TTL_MS };
  return value;
}
