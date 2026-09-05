import fs from "node:fs";
import path from "node:path";

const [inputFile, outputRoot = "article-summaries", requestedLimit] = process.argv.slice(2);
const limit = requestedLimit ? Number.parseInt(requestedLimit, 10) : undefined;
const requestDelayMs = Math.max(0, Number.parseInt(process.env.GROQ_REQUEST_DELAY_MS ?? "3500", 10) || 0);

if (!inputFile) {
  console.error("Usage: node --env-file=.env.local scripts/summarize-scrape-batch.mjs <input.json> [output-dir] [limit]");
  process.exit(1);
}
if (!process.env.GROQ_API_KEY) {
  console.error("GROQ_API_KEY is required. Its value is never written to output.");
  process.exit(1);
}

const inputPath = path.resolve(inputFile);
const outputDir = path.resolve(outputRoot);
const batchName = path.basename(inputPath).replace(/\.jsonl?$/i, "");
const outputPath = path.join(outputDir, `${batchName}.summaries.json`);

function readRecords(file) {
  const raw = fs.readFileSync(file, "utf8").trim();
  const parsed = file.endsWith(".jsonl") ? raw.split(/\r?\n/).filter(Boolean).map(JSON.parse) : JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [parsed];
}

function cleanText(value = "") {
  return String(value)
    .replace(/\s+/g, " ")
    .replace(/^[\p{L}][\p{L}\s.'’-]{1,100}\s*\((?:ANTARA|Antara|antara|[A-Za-z. ]+)\)\s*[-–—]\s*/u, "")
    .trim();
}

function sourceDate(value) {
  const raw = value ? String(value).trim() : null;
  if (!raw) return { raw: null, iso: null };
  const month = {
    januari: "01", februari: "02", maret: "03", april: "04", mei: "05", juni: "06",
    juli: "07", agustus: "08", september: "09", oktober: "10", november: "11", desember: "12",
  };
  const match = raw.toLowerCase().match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/u);
  const iso = match && month[match[2]] ? `${match[3]}-${month[match[2]]}-${match[1].padStart(2, "0")}T00:00:00+08:00` : null;
  return { raw, iso };
}

function normalize(record) {
  const title = cleanText(record.title ?? record.judul ?? "");
  const content = cleanText(record.content ?? record.konten ?? record.text ?? record.description ?? "");
  const date = sourceDate(record.publish_date ?? record.date ?? record.published_at);
  return {
    title,
    content,
    source_name: cleanText(record.source ?? record.sumber ?? path.basename(path.dirname(inputPath))),
    source_url: record.url ?? record.link ?? null,
    source_published_at: date.iso,
    source_date_raw: date.raw,
  };
}

function imagePrompt(subject) {
  return [
    "Editorial doodle/caricature illustration in black ink on white paper only, high-contrast monochrome, clean Indonesian newspaper sketch style, ample negative space.",
    subject,
    "No text, no logo, no watermark, no photorealism, no copyrighted characters, no graphic violence.",
  ].join(" ");
}

const systemPrompt = `Anda adalah editor Gorontalo Unite. Ringkas satu artikel berita Indonesia menjadi naskah editorial asli yang faktual, netral, dan tidak menyalin artikel sumber. Jangan mengarang fakta, tanggal, kutipan, angka, atau konteks yang tidak ada dalam teks. Jangan menyebut dateline seperti "JAKARTA (Antara)". Balas HANYA JSON valid dengan tepat field berikut:\n{\n  "bullets": ["poin faktual 1", "poin faktual 2", "poin faktual 3"],\n  "paragraphs": ["paragraf ringkas pertama", "paragraf ringkas kedua"],\n  "category": "satu kategori singkat",\n  "tags": ["tag 1", "tag 2", "tag 3"],\n  "image_prompt": "English prompt for a black-and-white editorial doodle/caricature illustration"\n}\nKetentuan: tepat 3 bullets, tepat 2 paragraf pendek (masing-masing 2-3 kalimat), artikel tidak boleh ditulis ulang secara utuh, tags 3-5 item, dan image prompt wajib menggambarkan inti artikel tanpa teks, logo, watermark, tokoh berhak cipta, atau gaya fotorealistik. Gaya gambar: black ink on white paper, high contrast, clean editorial doodle/caricature, ample negative space.`;

async function summarize(article, attempt = 1) {
  const content = article.content.slice(0, 14000);
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.15,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Judul: ${article.title}\nSumber: ${article.source_name}\nTanggal sumber: ${article.source_date_raw ?? "tidak tersedia"}\n\nTeks artikel:\n${content}` },
      ],
    }),
  });

  if (!response.ok) {
    if (attempt < 4 && (response.status === 429 || response.status >= 500)) {
      const retryAfter = Number.parseInt(response.headers.get("retry-after") ?? "", 10);
      const delay = Number.isFinite(retryAfter) ? retryAfter * 1000 : attempt * 15000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return summarize(article, attempt + 1);
    }
    throw new Error(`Model request failed with status ${response.status}`);
  }
  const payload = await response.json();
  const json = JSON.parse(payload.choices?.[0]?.message?.content ?? "{}");
  if (!Array.isArray(json.bullets) || json.bullets.length !== 3 || !Array.isArray(json.paragraphs) || json.paragraphs.length !== 2) {
    throw new Error("Model response does not match editorial summary format");
  }
  return {
    bullets: json.bullets.map(cleanText),
    summary_paragraphs: json.paragraphs.map(cleanText),
    suggested_category: cleanText(json.category) || "Umum",
    suggested_tags: Array.isArray(json.tags) ? json.tags.map(cleanText).filter(Boolean).slice(0, 5) : [],
    image_prompt: imagePrompt(cleanText(json.image_prompt) || article.title),
  };
}

const records = readRecords(inputPath).slice(0, Number.isFinite(limit) ? limit : undefined).map(normalize);
if (records.length === 0) throw new Error("The input batch has no records");

fs.mkdirSync(outputDir, { recursive: true });
let summaries = [];
if (fs.existsSync(outputPath)) {
  const previous = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  if (previous.input_file !== inputPath || !Array.isArray(previous.records)) {
    throw new Error(`Existing output does not match this input: ${outputPath}`);
  }
  summaries = previous.records;
  console.log(`Resuming local checkpoint at ${summaries.length}/${records.length}`);
}

function writeOutput(complete) {
  const output = {
    format: "gorontalo-unite-editorial-summary/v1",
    generated_at: new Date().toISOString(),
    input_file: inputPath,
    total_records: records.length,
    processed_records: summaries.length,
    ready_for_editorial_review: summaries.filter((item) => !item.error).length,
    complete,
    records: summaries,
  };
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
}

const pendingIndexes = records
  .map((_, index) => index)
  .filter((index) => !summaries[index] || Boolean(summaries[index].error));

for (const recordIndex of pendingIndexes) {
  const article = records[recordIndex];
  if (!article.title || article.content.length < 200) {
    summaries[recordIndex] = { ...article, status: "needs_review", error: "Insufficient title or article text" };
    writeOutput(false);
    continue;
  }
  try {
    const summary = await summarize(article);
    summaries[recordIndex] = { ...article, ...summary, label: "Ringkasan oleh Gorontalo Unite", status: "needs_review" };
    console.log(`[${recordIndex + 1}/${records.length}] summarized`);
  } catch (error) {
    summaries[recordIndex] = { ...article, status: "needs_review", error: error instanceof Error ? error.message : "Summarization failed" };
    console.error(`[${recordIndex + 1}/${records.length}] needs review`);
  }
  writeOutput(false);
  if (requestDelayMs > 0) await new Promise((resolve) => setTimeout(resolve, requestDelayMs));
}
writeOutput(summaries.length === records.length && summaries.every((item) => !item.error));
console.log(`Saved local batch: ${outputPath}`);
