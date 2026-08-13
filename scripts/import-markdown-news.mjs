import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const [inputFile, ...options] = process.argv.slice(2);
const execute = options.includes("--execute");
const emitSql = options.includes("--emit-sql");
const batchOption = options.indexOf("--batch");

if (!inputFile) {
  throw new Error("Usage: node --env-file=.env.local scripts/import-markdown-news.mjs <file.md> [--execute]");
}

const inputPath = path.resolve(inputFile);
if (!fs.existsSync(inputPath)) throw new Error(`Input file not found: ${inputPath}`);

const MONTHS = {
  januari: "01", februari: "02", maret: "03", april: "04", mei: "05", juni: "06",
  juli: "07", agustus: "08", september: "09", oktober: "10", november: "11", desember: "12",
};

// These are Gorontalo Unite publication slots only. They are used strictly when
// the Markdown body has no explicit source date; source_published_at remains null.
const FALLBACK_PUBLICATION_DATES = [
  "2026-04-09T08:15:00.000+08:00",
  "2026-04-10T09:00:00.000+08:00",
  "2026-04-12T08:30:00.000+08:00",
  "2026-04-13T10:00:00.000+08:00",
  "2026-04-16T09:30:00.000+08:00",
  "2026-04-17T08:45:00.000+08:00",
];

function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function slugify(value) {
  return clean(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 240) || "artikel";
}

function findPublishedAt(content) {
  const numeric = content.match(/(?:Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu)?\s*\(?([0-3]?\d)\/(0?\d|1[0-2])\/(20\d{2})\)?/iu);
  if (numeric) return `${numeric[3]}-${numeric[2].padStart(2, "0")}-${numeric[1].padStart(2, "0")}T00:00:00.000+08:00`;

  const written = content.match(/\b([0-3]?\d)\s+(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s+(20\d{2})\b/iu);
  if (written) return `${written[3]}-${MONTHS[written[2].toLowerCase()]}-${written[1].padStart(2, "0")}T00:00:00.000+08:00`;

  return null;
}

function toBlocks(paragraphs, slug) {
  return paragraphs.map((content, index) => ({
    id: `${slug}-p-${index + 1}`,
    type: "paragraph",
    content,
    attrs: { align: "left" },
  }));
}

function parseMarkdown(markdown) {
  let fallbackDateIndex = 0;
  return markdown
    .split(/^###\s+/mu)
    .slice(1)
    .map((section) => {
      const lines = section.trim().split(/\r?\n/);
      const title = clean(lines.shift());
      const withoutImageLine = lines.filter((line) => !/^IMG\s*:?/iu.test(line));
      const content = withoutImageLine.join("\n").replace(/^---+\s*$/gmu, "").trim();
      const paragraphs = content.split(/\n\s*\n/u).map(clean).filter(Boolean);
      const slug = slugify(title);
      const sourcePublishedAt = findPublishedAt(content);

      if (!title || !paragraphs.length) throw new Error(`Invalid article: ${title || "untitled"}`);

      return {
        title,
        slug,
        excerpt: paragraphs[0].slice(0, 280),
        content: paragraphs.join("\n\n"),
        blocks: toBlocks(paragraphs, slug),
        image_url: null,
        image_prompt: null,
        category: "Umum",
        categories: ["Umum"],
        tags: [],
        source_name: null,
        source_url: null,
        source_published_at: sourcePublishedAt,
        seo_title: title,
        seo_description: paragraphs[0].slice(0, 160),
        published: true,
        published_at: sourcePublishedAt ?? FALLBACK_PUBLICATION_DATES[fallbackDateIndex++],
        is_trending: false,
        allow_comments: true,
      };
    });
}

const articles = parseMarkdown(fs.readFileSync(inputPath, "utf8"));
const duplicateSlugs = articles.length - new Set(articles.map((article) => article.slug)).size;
const dated = articles.filter((article) => article.source_published_at).length;

if (emitSql) {
  const start = batchOption >= 0 ? Number.parseInt(options[batchOption + 1] ?? "", 10) : 0;
  const count = batchOption >= 0 ? Number.parseInt(options[batchOption + 2] ?? "", 10) : articles.length;
  if (!Number.isInteger(start) || start < 0 || !Number.isInteger(count) || count < 1) {
    throw new Error("--batch requires a zero-based start and a positive count.");
  }
  const delimiter = "$gorontalo_news$";
  const payload = JSON.stringify(articles.slice(start, start + count));
  if (payload.includes(delimiter)) throw new Error("SQL delimiter collision in content.");
  process.stdout.write(`insert into public.articles (title, slug, excerpt, content, blocks, image_url, image_prompt, category, categories, tags, source_name, source_url, source_published_at, seo_title, seo_description, published, published_at, is_trending, allow_comments)\nselect title, slug, excerpt, content, blocks, image_url, image_prompt, category, categories, tags, source_name, source_url, source_published_at, seo_title, seo_description, published, published_at, is_trending, allow_comments\nfrom jsonb_to_recordset(${delimiter}${payload}${delimiter}::jsonb) as input(\n  title text, slug text, excerpt text, content text, blocks jsonb, image_url text, image_prompt text, category text, categories text[], tags text[], source_name text, source_url text, source_published_at timestamptz, seo_title text, seo_description text, published boolean, published_at timestamptz, is_trending boolean, allow_comments boolean\n)\non conflict (slug) do nothing\nreturning id, slug, title, category, published, published_at, image_url, is_trending;`);
  process.exit(0);
}

console.log(JSON.stringify({
  mode: execute ? "execute" : "dry-run",
  input_file: inputPath,
  articles: articles.length,
  category: "Umum",
  published: true,
  featured: false,
  featured_images: 0,
  articles_with_explicit_dates: dated,
  articles_without_explicit_dates: articles.length - dated,
  fallback_publication_slots: articles.length - dated,
  duplicate_slugs: duplicateSlugs,
  titles: articles.map(({ title, slug, published_at }) => ({ title, slug, published_at })),
}, null, 2));

if (!execute) process.exit(0);

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: existing, error: existingError } = await supabase
  .from("articles")
  .select("slug")
  .in("slug", articles.map((article) => article.slug));
if (existingError) throw new Error(`Preflight failed: ${existingError.message}`);
if (existing?.length) throw new Error(`Preflight stopped: ${existing.length} matching slug(s) already exist. No rows were written.`);

const { data, error } = await supabase.from("articles").insert(articles).select("id, slug, title, category, published, published_at, image_url, is_trending");
if (error) throw new Error(`Import failed: ${error.message}`);
if ((data ?? []).length !== articles.length) throw new Error(`Verification failed: expected ${articles.length} inserts, received ${data?.length ?? 0}.`);

console.log(JSON.stringify({
  imported: data.length,
  category: [...new Set(data.map((article) => article.category))],
  published: data.every((article) => article.published),
  featured_images: data.filter((article) => article.image_url).length,
  featured_articles: data.filter((article) => article.is_trending).length,
}, null, 2));
