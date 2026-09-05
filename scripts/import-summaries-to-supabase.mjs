import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const [inputFile = "curated-scrape/summaries/summaries.jsonl", ...options] = process.argv.slice(2);
const execute = options.includes("--execute");
const emitBatchIndex = options.indexOf("--emit-batch-base64");
const inputPath = path.resolve(inputFile);

if (!fs.existsSync(inputPath)) {
  throw new Error(`Input file not found: ${inputPath}`);
}

const MONTHS = {
  januari: "01", februari: "02", maret: "03", april: "04", mei: "05", juni: "06",
  juli: "07", agustus: "08", september: "09", oktober: "10", november: "11", desember: "12",
};

function cleanText(value, maxLength) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return maxLength ? text.slice(0, maxLength) : text;
}

function parseSourceDate(raw) {
  const value = cleanText(raw);
  if (!value || /^no date$/i.test(value)) return null;
  if (/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value)) {
    const date = new Date(value);
    return Number.isNaN(date.valueOf()) ? null : date.toISOString();
  }
  const match = value.toLowerCase().match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/u);
  if (!match || !MONTHS[match[2]]) return null;
  return `${match[3]}-${MONTHS[match[2]]}-${match[1].padStart(2, "0")}T00:00:00.000+08:00`;
}

function slugify(value) {
  const ascii = cleanText(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return ascii || "artikel";
}

function stableSuffix(value) {
  return createHash("sha256").update(value).digest("hex").slice(0, 10);
}

function asStringArray(value, maxItems = 8) {
  const values = Array.isArray(value) ? value : [];
  return [...new Set(values.map((item) => cleanText(item, 80)).filter(Boolean))].slice(0, maxItems);
}

function toArticle(record, index) {
  const title = cleanText(record.title, 300);
  const bullets = asStringArray(record.bullets, 3);
  const paragraphs = asStringArray(record.summary_paragraphs, 2);
  const category = cleanText(record.category, 80) || "Umum";
  const sourceId = cleanText(record.id) || `line-${index + 1}`;
  if (title.length < 3) throw new Error(`Line ${index + 1}: title is missing or too short`);
  if (bullets.length !== 3) throw new Error(`Line ${index + 1}: exactly 3 bullets are required`);
  if (paragraphs.length !== 2) throw new Error(`Line ${index + 1}: exactly 2 summary paragraphs are required`);

  const suffix = stableSuffix(sourceId);
  const blocks = [
    { id: `summary-${suffix}`, type: "list", content: "", attrs: { ordered: false, items: bullets } },
    ...paragraphs.map((content, paragraphIndex) => ({
      id: `paragraph-${paragraphIndex + 1}-${suffix}`,
      type: "paragraph",
      content,
      attrs: { align: "left" },
    })),
  ];

  return {
    title,
    slug: `${slugify(title).slice(0, 240)}-${suffix}`,
    excerpt: paragraphs[0],
    content: [...bullets.map((item) => `- ${item}`), "", ...paragraphs].join("\n"),
    blocks,
    image_url: null,
    image_prompt: cleanText(record.image_prompt),
    category,
    categories: [category],
    tags: asStringArray(record.tags),
    source_name: cleanText(record.source_name, 160) || null,
    source_url: cleanText(record.source_url, 2000) || null,
    source_published_at: parseSourceDate(record.source_published_at),
    seo_title: title,
    seo_description: cleanText(paragraphs[0], 160) || null,
    published: false,
    published_at: null,
    is_trending: false,
    allow_comments: true,
  };
}

const lines = fs.readFileSync(inputPath, "utf8").split(/\r?\n/).filter(Boolean);
const articles = lines.map((line, index) => toArticle(JSON.parse(line), index));
const dated = articles.filter((article) => article.source_published_at).length;
const undated = articles.length - dated;
const duplicateSlugs = articles.length - new Set(articles.map((article) => article.slug)).size;

if (emitBatchIndex >= 0) {
  const start = Number.parseInt(options[emitBatchIndex + 1] ?? "", 10);
  const count = Number.parseInt(options[emitBatchIndex + 2] ?? "", 10);
  if (!Number.isInteger(start) || start < 0 || !Number.isInteger(count) || count < 1) {
    throw new Error("--emit-batch-base64 requires a zero-based start and a positive count");
  }
  process.stdout.write(Buffer.from(JSON.stringify(articles.slice(start, start + count))).toString("base64"));
  process.exit(0);
}

console.log(JSON.stringify({
  mode: execute ? "execute" : "dry-run",
  input_file: inputPath,
  valid_articles: articles.length,
  dated_articles: dated,
  undated_articles: undated,
  duplicate_slugs: duplicateSlugs,
  published: false,
  image_url: null,
}, null, 2));

if (!execute) {
  console.log("Dry run complete. Re-run with --execute to insert drafts into Supabase.");
  process.exit(0);
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for import.");
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const chunkSize = 100;
let insertedOrExisting = 0;
for (let start = 0; start < articles.length; start += chunkSize) {
  const batch = articles.slice(start, start + chunkSize);
  const { error } = await supabase.from("articles").upsert(batch, { onConflict: "slug", ignoreDuplicates: true });
  if (error) throw new Error(`Batch ${start / chunkSize + 1} failed: ${error.message}`);
  insertedOrExisting += batch.length;
  console.log(`Imported ${insertedOrExisting}/${articles.length} draft records`);
}

const { count, error: countError } = await supabase
  .from("articles")
  .select("id", { count: "exact", head: true })
  .eq("published", false);
if (countError) throw new Error(`Import verification failed: ${countError.message}`);
console.log(`Import complete. Supabase now has ${count} draft article records.`);
