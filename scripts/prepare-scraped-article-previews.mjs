import fs from "node:fs";
import path from "node:path";

const inputRoot = path.resolve(process.argv[2] ?? "../RAG/Hasil Scrape");
const outputRoot = path.resolve(process.argv[3] ?? "article-previews");

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return files(full);
    return /\.jsonl?$/i.test(entry.name) ? [full] : [];
  });
}

function sentences(text = "") {
  return String(text)
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.replace(/^[\p{L}][\p{L}\s.'’-]{1,90}\s*\((?:ANTARA|Antara|antara)\)\s*[-–—]\s*/u, ""))
    .filter((item) => item.length > 35);
}

function bullets(items) {
  const unique = [...new Set(items.map((item) => item.replace(/^[-•]\s*/, "").trim()))];
  return unique.slice(0, 3);
}

function localCategory(value = "") {
  const text = value.toLowerCase();
  if (/wisata|pariwisata|pantai|pulau/.test(text)) return "Wisata";
  if (/pendidikan|sekolah|kampus/.test(text)) return "Pendidikan";
  if (/kesehatan|rumah sakit/.test(text)) return "Kesehatan";
  if (/ekonomi|bisnis|umkm|harga/.test(text)) return "Ekonomi";
  if (/hukum|kejaksaan|polisi/.test(text)) return "Hukum";
  if (/pemerintah|pemkab|pemprov|pemkot|bupati|gubernur/.test(text)) return "Pemerintahan";
  return "Umum";
}

function draft(raw, origin) {
  const title = String(raw.title ?? raw.judul ?? "Tanpa judul").trim();
  const content = String(raw.content ?? raw.konten ?? raw.text ?? raw.description ?? "").trim();
  const source = String(raw.source ?? raw.sumber ?? path.basename(path.dirname(origin))).trim();
  const all = sentences(content);
  const keyPoints = bullets(all);
  const paragraphs = [all.slice(0, 3).join(" "), all.slice(3, 6).join(" ")].filter(Boolean);
  const category = localCategory(`${title} ${raw.category ?? ""}`);
  return {
    title, source, source_url: raw.url ?? raw.link ?? null, published_at: raw.publish_date ?? raw.date ?? null,
    suggested_category: category,
    label: "Ringkasan oleh Gorontalo Unite",
    bullets: keyPoints,
    summary_paragraphs: paragraphs,
    image_prompt: `Editorial doodle caricature illustration, black ink on white paper only, high-contrast monochrome, playful Indonesian newspaper sketch style, symbolic scene for: ${title}. No text, no logos, no photorealistic people, no copyrighted characters, clean composition with ample negative space.`,
    needs_review: !title || keyPoints.length < 3 || paragraphs.length < 2,
  };
}

const records = [];
for (const file of files(inputRoot)) {
  const text = fs.readFileSync(file, "utf8").trim();
  if (!text) continue;
  try {
    const parsed = file.endsWith(".jsonl") ? text.split(/\r?\n/).map(JSON.parse) : JSON.parse(text);
    for (const item of (Array.isArray(parsed) ? parsed : [parsed])) if (item && typeof item === "object") records.push(draft(item, file));
  } catch { console.warn(`Skipped invalid JSON: ${file}`); }
}

fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(path.join(outputRoot, "article-drafts.json"), JSON.stringify(records, null, 2));
const reviewCount = records.filter((item) => item.needs_review).length;
fs.writeFileSync(
  path.join(outputRoot, "README.md"),
  `# Local article draft preview\n\nGenerated ${records.length} local draft summaries. Each usable draft contains exactly three editorial key points and two short summary paragraphs. ${reviewCount} records need review because their scraped text does not contain enough usable sentences. Nothing in this folder is published.\n`,
);
console.log(`Created ${records.length} local drafts in ${outputRoot}`);
