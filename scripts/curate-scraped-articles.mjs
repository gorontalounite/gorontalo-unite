import fs from "node:fs";
import path from "node:path";

const inputRoot = path.resolve(process.argv[2] ?? "../RAG/Hasil Scrape");
const outputRoot = path.resolve(process.argv[3] ?? "curated-scrape");

const TOPICS = [
  { key: "wisata", label: "Wisata", terms: /\b(wisata|pariwisata|destinasi|pantai|pulau|teluk|danau|air terjun|taman nasional|travel|liburan|hotel|homestay)\b/gi },
  { key: "kuliner", label: "Kuliner", terms: /\b(kuliner|makanan|masakan|resep|kopi|kafe|cafe|restoran|warung|jajanan|barista)\b/gi },
  { key: "event", label: "Event", terms: /\b(event|festival|konser|pameran|karnaval|lomba|kompetisi|turnamen|pertunjukan|agenda budaya)\b/gi },
  { key: "lifestyle", label: "Lifestyle", terms: /\b(lifestyle|gaya hidup|fashion|musik|film|seni|hobi|komunitas kreatif|kesehatan mental|olahraga rekreasi)\b/gi },
  { key: "budaya", label: "Budaya", terms: /\b(budaya|adat|tradisi|karawo|tumbilotohe|upacara adat|warisan budaya|bahasa daerah|tari|kerajinan tradisional)\b/gi },
  { key: "anak-muda", label: "Anak Muda", terms: /\b(anak muda|milenial|millennial|generasi z|gen z|remaja|pemuda|mahasiswa|pelajar|kreator|content creator|influencer|komunitas)\b/gi },
];

const CEREMONIAL = /\b(rapat paripurna|pelantikan|serah terima|kunjungan kerja|audiensi|bimbingan teknis|bimtek|musrenbang|raker|sosialisasi|pembahasan rancangan|nota kesepahaman|mou|peresmian gedung|pemerintah.*menggelar|pemkab|pemprov|pemkot|bappeda|dinas.*(gelar|adakan|laksanakan)|polres.*(gelar|adakan|laksanakan))\b/i;
const POLITICAL = /\b(politik|partai|pemilu|pilkada|dprd|legislatif|kampanye|fraksi|calon gubernur|calon bupati)\b/i;
const LOCAL_CONTEXT = /\b(gorontalo|bone bolango|boalemo|pohuwato|gorontalo utara|kabupaten gorontalo|kota gorontalo|limboto|tilamuta|marisa|suwawa|kabila|hulondalo|universitas negeri gorontalo|\bung\b|tumbilotohe|karawo|olele|tomilito)\b/i;
const EXCLUDED_CONTEXT = /\b(tersangka|korupsi|pemerasan|tega|tikam|tewas|meninggal|bencana|banjir|hoaks|pemilu|pilkada|kampanye|rapat|sidang|anggaran|bansos|pajak|makan bergizi gratis)\b/i;

function allJsonFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? allJsonFiles(full) : (/\.jsonl?$/i.test(entry.name) ? [full] : []);
  });
}

function readRecords(file) {
  const raw = fs.readFileSync(file, "utf8").trim();
  if (!raw) return [];
  const value = file.endsWith(".jsonl") ? raw.split(/\r?\n/).filter(Boolean).map(JSON.parse) : JSON.parse(raw);
  return Array.isArray(value) ? value : [value];
}

function headlineOf(article) {
  const explicit = String(article.title ?? article.judul ?? "").trim();
  const inferred = String(article.content ?? article.konten ?? article.description ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.length >= 8 && line.length <= 220) ?? "";
  return [explicit || inferred]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function classify(article) {
  const headline = headlineOf(article);
  if (!headline || !LOCAL_CONTEXT.test(headline) || EXCLUDED_CONTEXT.test(headline) || POLITICAL.test(headline) || CEREMONIAL.test(headline)) return null;
  const matches = TOPICS.flatMap(({ key, label, terms }) => {
    // The headline/category must carry the topic. Searching the whole article
    // made incidental mentions (for example students in a crime report) appear
    // as youth lifestyle stories.
    const count = (headline.match(terms) ?? []).length;
    return count ? [{ key, label, count }] : [];
  });
  return matches.length ? matches : null;
}

const manifest = { generated_at: new Date().toISOString(), input_root: inputRoot, total_source_files: 0, total_records: 0, selected_records: 0, by_topic: {}, outputs: [] };
for (const file of allJsonFiles(inputRoot)) {
  let records;
  try { records = readRecords(file); } catch { continue; }
  manifest.total_source_files += 1;
  manifest.total_records += records.length;
  const selected = records.flatMap((article) => {
    const topics = classify(article);
    if (!topics) return [];
    for (const { key } of topics) manifest.by_topic[key] = (manifest.by_topic[key] ?? 0) + 1;
    return [{
      ...article,
      curation: {
        detected_title: headlineOf(article),
        topics: topics.map(({ key, label }) => ({ key, label })),
        selection_reason: "Topik wisata, kuliner, event, lifestyle, atau anak muda terdeteksi; bukan laporan politik/seremonial rutin.",
        status: "full_text_local_only",
      },
    }];
  });
  if (!selected.length) continue;
  const relative = path.relative(inputRoot, file);
  const destination = path.join(outputRoot, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, JSON.stringify(selected, null, 2));
  manifest.selected_records += selected.length;
  manifest.outputs.push({ input: relative, output: path.relative(outputRoot, destination), selected: selected.length });
}

fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(path.join(outputRoot, "manifest.json"), JSON.stringify(manifest, null, 2));
fs.writeFileSync(path.join(outputRoot, "README.md"), `# Curated local scrape\n\n${manifest.selected_records} full-text records selected from ${manifest.total_records} scraped records. Files retain their original source/batch layout. These are local review materials only and must not be published verbatim without rights and editorial review.\n`);
console.log(JSON.stringify({ source_files: manifest.total_source_files, records: manifest.total_records, selected: manifest.selected_records, by_topic: manifest.by_topic }, null, 2));
