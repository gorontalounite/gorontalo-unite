import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const STATUSES = new Set(["draft", "published"]);
const LIST_COLUMNS = "id, account_username, description, publish_time, permalink, post_type, category, sponsored, thumbnail_url, status, display_order, featured, views, reach, likes, shares, follows, comments, saves, created_at, updated_at";

type Authorized = Awaited<ReturnType<typeof authorizeUser>>;

async function authorizeUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (!profile || !["admin", "editor"].includes(profile.role)) return null;
  return { user, supabase };
}

function instagramShortcode(permalink: string) {
  try {
    const url = new URL(permalink);
    if (!["instagram.com", "www.instagram.com"].includes(url.hostname)) return null;
    return url.pathname.match(/^\/(?:reel|p)\/([A-Za-z0-9_-]+)\/?$/)?.[1] ?? null;
  } catch {
    return null;
  }
}

function decodeHtmlUrl(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#x2F;", "/")
    .replaceAll("\\u0026", "&")
    .replaceAll("\\/", "/");
}

function findInstagramCover(html: string) {
  const urls = [...html.matchAll(/https:\/\/(?:instagram|scontent)[^"'\\\s<]+?\.jpg[^"'\\\s<]*/g)]
    .map((match) => decodeHtmlUrl(match[0]));
  return urls.find((url) => /t51\.\d+-15\//.test(url)) ?? urls[0] ?? null;
}

async function fetchAndStoreThumbnail(auth: NonNullable<Authorized>, permalink: string) {
  const shortcode = instagramShortcode(permalink);
  if (!shortcode) throw new Error("Permalink Instagram tidak valid.");

  const embed = await fetch(`https://www.instagram.com/reel/${shortcode}/embed/`, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; GorontaloUnite/1.0)" },
    signal: AbortSignal.timeout(12_000),
    cache: "no-store",
  });
  if (!embed.ok) throw new Error(`Instagram mengembalikan status ${embed.status}.`);

  const coverUrl = findInstagramCover(await embed.text());
  if (!coverUrl) throw new Error("Thumbnail tidak ditemukan pada permalink Instagram.");

  const cover = await fetch(coverUrl, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; GorontaloUnite/1.0)" },
    signal: AbortSignal.timeout(12_000),
    cache: "no-store",
  });
  if (!cover.ok) throw new Error(`Gambar Instagram mengembalikan status ${cover.status}.`);

  const contentType = cover.headers.get("content-type")?.split(";")[0] ?? "image/jpeg";
  if (!contentType.startsWith("image/")) throw new Error("Respons thumbnail bukan gambar.");
  const bytes = await cover.arrayBuffer();
  if (bytes.byteLength === 0 || bytes.byteLength > 5 * 1024 * 1024) {
    throw new Error("Ukuran thumbnail Instagram tidak valid.");
  }

  const extension = contentType === "image/png" ? "png" : contentType === "image/webp" ? "webp" : "jpg";
  const path = `reels/${shortcode}-${crypto.randomUUID()}.${extension}`;
  const { data, error } = await auth.supabase.storage
    .from("media")
    .upload(path, bytes, { contentType, upsert: false });
  if (error) throw new Error(`Gagal menyimpan thumbnail: ${error.message}`);

  return auth.supabase.storage.from("media").getPublicUrl(data.path).data.publicUrl;
}

function nonNegativeInteger(value: unknown, field: string) {
  const parsed = Number(value ?? 0);
  if (!Number.isSafeInteger(parsed) || parsed < 0) throw new Error(`${field} harus berupa angka nol atau lebih.`);
  return parsed;
}

async function normalizeBody(auth: NonNullable<Authorized>, body: Record<string, unknown>) {
  const accountUsername = String(body.account_username ?? "").trim().replace(/^@/, "");
  const description = String(body.description ?? "").trim();
  const permalink = String(body.permalink ?? "").trim();
  const publishTime = String(body.publish_time ?? "");
  const postType = String(body.post_type ?? "Reel").trim() || "Reel";
  const category = String(body.category ?? "Wisata").trim();
  const status = String(body.status ?? "draft");
  let thumbnailUrl = String(body.thumbnail_url ?? "").trim();

  if (!accountUsername || accountUsername.length > 100) throw new Error("Account username wajib diisi.");
  if (!description) throw new Error("Description wajib diisi.");
  if (!instagramShortcode(permalink)) throw new Error("Permalink Instagram tidak valid.");
  if (!publishTime || Number.isNaN(Date.parse(publishTime))) throw new Error("Publish time tidak valid.");
  if (!/^[\p{L}\p{N}&+'’/ -]{2,50}$/u.test(category)) {
    throw new Error("Kategori harus terdiri dari 2–50 karakter.");
  }
  if (!STATUSES.has(status)) throw new Error("Status tidak valid.");
  if (!thumbnailUrl) thumbnailUrl = await fetchAndStoreThumbnail(auth, permalink);

  return {
    account_username: accountUsername,
    description,
    publish_time: new Date(publishTime).toISOString(),
    permalink,
    post_type: postType,
    category,
    sponsored: Boolean(body.sponsored),
    thumbnail_url: thumbnailUrl,
    status,
    display_order: nonNegativeInteger(body.display_order, "Urutan tampil"),
    featured: Boolean(body.featured),
    views: nonNegativeInteger(body.views, "Views"),
    reach: nonNegativeInteger(body.reach, "Reach"),
    likes: nonNegativeInteger(body.likes, "Likes"),
    shares: nonNegativeInteger(body.shares, "Shares"),
    follows: nonNegativeInteger(body.follows, "Follows"),
    comments: nonNegativeInteger(body.comments, "Comments"),
    saves: nonNegativeInteger(body.saves, "Saves"),
  };
}

export async function GET(req: NextRequest) {
  const auth = await authorizeUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  let query = auth.supabase.from("reels").select(id ? "*" : LIST_COLUMNS);
  if (id) query = query.eq("id", id);
  const result = id ? await query.single() : await query.order("display_order").order("publish_time", { ascending: false });
  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 400 });
  return NextResponse.json({ data: result.data });
}

export async function POST(req: NextRequest) {
  const auth = await authorizeUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const values = await normalizeBody(auth, await req.json());
    const { data, error } = await auth.supabase
      .from("reels")
      .insert({ ...values, author_id: auth.user.id })
      .select(LIST_COLUMNS)
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Data tidak valid." }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await authorizeUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json() as Record<string, unknown>;
    const id = String(body.id ?? "");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const values = await normalizeBody(auth, body);
    const { data, error } = await auth.supabase
      .from("reels")
      .update(values)
      .eq("id", id)
      .select(LIST_COLUMNS)
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Data tidak valid." }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await authorizeUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { error } = await auth.supabase.from("reels").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
