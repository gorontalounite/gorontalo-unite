import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const STATUSES = new Set(["draft", "published"]);
const ORIENTATIONS = new Set(["portrait", "landscape"]);
const LIST_COLUMNS = "id, title, orientation, account_username, description, publish_time, permalink, post_type, category, sponsored, thumbnail_url, status, display_order, featured, editor_choice, views, reach, likes, shares, follows, comments, saves, created_at, updated_at, deleted_at";

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

/** Instagram serves the still frame to a browser user agent, not to a bot one. */
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

async function fetchAndStoreThumbnail(auth: NonNullable<Authorized>, permalink: string) {
  const shortcode = instagramShortcode(permalink);
  if (!shortcode) throw new Error("Permalink Instagram tidak valid.");

  // The /embed/ page used to carry the cover in its markup. It now answers
  // with a login wall and no image at all, so the cover comes from the media
  // redirect instead, which still serves the still frame directly.
  const cover = await fetch(`https://www.instagram.com/p/${shortcode}/media/?size=l`, {
    headers: { "user-agent": BROWSER_UA },
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
    cache: "no-store",
  });
  if (!cover.ok) throw new Error(`Instagram mengembalikan status ${cover.status}.`);

  const contentType = cover.headers.get("content-type")?.split(";")[0] ?? "image/jpeg";
  if (!contentType.startsWith("image/")) throw new Error("Thumbnail tidak ditemukan pada permalink Instagram.");
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
  const orientation = String(body.orientation ?? "portrait");
  if (!ORIENTATIONS.has(orientation)) throw new Error("Orientasi tidak valid.");
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
    // Omitted entirely when the caller has no title column to write to.
    ...("title" in body ? { title: String(body.title ?? "").trim() || null } : {}),
    account_username: accountUsername,
    description,
    publish_time: new Date(publishTime).toISOString(),
    permalink,
    post_type: postType,
    category,
    sponsored: Boolean(body.sponsored),
    orientation,
    thumbnail_url: thumbnailUrl,
    status,
    display_order: nonNegativeInteger(body.display_order, "Urutan tampil"),
    featured: Boolean(body.featured),
    editor_choice: Boolean(body.editor_choice),
    views: nonNegativeInteger(body.views, "Views"),
    reach: nonNegativeInteger(body.reach, "Reach"),
    likes: nonNegativeInteger(body.likes, "Likes"),
    shares: nonNegativeInteger(body.shares, "Shares"),
    follows: nonNegativeInteger(body.follows, "Follows"),
    comments: nonNegativeInteger(body.comments, "Comments"),
    saves: nonNegativeInteger(body.saves, "Saves"),
  };
}

/** Fields the admin grid may change in place. Anything else needs the form. */
function inlineValues(body: Record<string, unknown>) {
  const values: Record<string, unknown> = {};
  if ("title" in body) values.title = String(body.title ?? "").trim() || null;
  if ("status" in body) {
    const status = String(body.status);
    if (!STATUSES.has(status)) throw new Error("Status tidak valid.");
    values.status = status;
  }
  if ("category" in body) {
    const category = String(body.category).trim();
    if (!/^[\p{L}\p{N}&+'\u2019/ -]{2,50}$/u.test(category)) throw new Error("Kategori harus terdiri dari 2\u201350 karakter.");
    values.category = category;
  }
  if ("featured" in body) values.featured = Boolean(body.featured);
  if ("editor_choice" in body) values.editor_choice = Boolean(body.editor_choice);
  if ("orientation" in body) {
    const orientation = String(body.orientation);
    if (!ORIENTATIONS.has(orientation)) throw new Error("Orientasi tidak valid.");
    values.orientation = orientation;
  }
  if ("sponsored" in body) values.sponsored = Boolean(body.sponsored);
  if ("display_order" in body) values.display_order = nonNegativeInteger(body.display_order, "Urutan tampil");
  if (Object.keys(values).length === 0) throw new Error("Tidak ada perubahan yang dapat disimpan.");
  return values;
}

export async function GET(req: NextRequest) {
  const auth = await authorizeUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  let query = auth.supabase.from("reels").select(id ? "*" : LIST_COLUMNS);
  if (id) query = query.eq("id", id);
  // Staff can read binned reels under RLS, so the bin is opt-in here.
  else query = req.nextUrl.searchParams.get("status") === "trash"
    ? query.not("deleted_at", "is", null)
    : query.is("deleted_at", null);
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
    // Grid cells patch a single field, so they skip the whole-record validation
    // (which would reject a body that carries no permalink or caption).
    // Restoring returns the reel as a draft — it was set to draft on the way
    // into the bin and stays there until someone publishes it again.
    const values = body.restore
      ? { deleted_at: null }
      : body.inline ? inlineValues(body) : await normalizeBody(auth, body);
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

// Into the bin by default; `permanent` destroys the row for good.
export async function DELETE(req: NextRequest) {
  const auth = await authorizeUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, permanent } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  // Reels record the same state as text, so binning writes status, not a
  // boolean. `reels_binned_is_draft` enforces the pair.
  const { error } = permanent
    ? await auth.supabase.from("reels").delete().eq("id", id)
    : await auth.supabase.from("reels")
        .update({ deleted_at: new Date().toISOString(), status: "draft" })
        .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
