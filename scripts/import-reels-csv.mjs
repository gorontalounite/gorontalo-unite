import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const [, , csvPath, outputPath, startOrderArg = "1"] = process.argv;
if (!csvPath || !outputPath) {
  throw new Error("Usage: node scripts/import-reels-csv.mjs <csv-path> <json-output> [start-order]");
}

const startOrder = Number(startOrderArg);
if (!Number.isSafeInteger(startOrder) || startOrder < 0) throw new Error("Start order tidak valid.");

function parseCsv(source) {
  const table = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        value += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(value);
      value = "";
    } else if (character === "\n") {
      row.push(value.replace(/\r$/, ""));
      table.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  if (value || row.length) {
    row.push(value.replace(/\r$/, ""));
    table.push(row);
  }

  const [headers, ...rows] = table;
  return rows.filter((cells) => cells.some(Boolean)).map((cells) => Object.fromEntries(
    headers.map((header, index) => [header.replace(/^\uFEFF/, ""), cells[index] ?? ""]),
  ));
}

function parseMetric(value, field, rowNumber) {
  if (!value.trim()) return 0;
  const parsed = Number(value.replace(/[.,\s]/g, ""));
  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    throw new Error(`Baris ${rowNumber}: ${field} tidak valid.`);
  }
  return parsed;
}

function parsePublishTime(value, rowNumber) {
  const match = value.trim().match(/^(\d{2})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{2})$/);
  if (!match) throw new Error(`Baris ${rowNumber}: Date tidak valid.`);
  const [, year, month, day, hour, minute] = match;
  const iso = `20${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hour.padStart(2, "0")}:${minute}:00+08:00`;
  if (Number.isNaN(Date.parse(iso))) throw new Error(`Baris ${rowNumber}: Date tidak valid.`);
  return iso;
}

function normalizePermalink(value, rowNumber) {
  const permalink = value.trim();
  const match = permalink.match(/^https:\/\/(?:www\.)?instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)\/?$/);
  if (!match) throw new Error(`Baris ${rowNumber}: URL Instagram tidak valid.`);
  return { permalink: permalink.endsWith("/") ? permalink : `${permalink}/`, shortcode: match[1] };
}

function normalizeRows(rows) {
  const seen = new Set();
  return rows.map((row, index) => {
    const rowNumber = index + 2;
    const { permalink, shortcode } = normalizePermalink(row.URL, rowNumber);
    if (seen.has(permalink)) throw new Error(`Baris ${rowNumber}: permalink duplikat di CSV.`);
    seen.add(permalink);
    const sourceCategory = row.Kategori.trim();
    const category = sourceCategory === "Endorse" ? "Brand" : sourceCategory;
    const accountUsername = row.Account.trim().replace(/^@/, "");
    const description = row.Caption.trim();
    if (!accountUsername || !description || !category) {
      throw new Error(`Baris ${rowNumber}: Account, Caption, dan Kategori wajib diisi.`);
    }

    return {
      shortcode,
      values: {
        account_username: accountUsername,
        description,
        publish_time: parsePublishTime(row.Date, rowNumber),
        permalink,
        post_type: "Reel",
        category,
        sponsored: sourceCategory === "Endorse",
        status: "published",
        featured: false,
        display_order: startOrder + index,
        views: parseMetric(row.Views, "Views", rowNumber),
        reach: parseMetric(row.Reach, "Reach", rowNumber),
        likes: parseMetric(row.Likes, "Likes", rowNumber),
        shares: parseMetric(row.Shares, "Shares", rowNumber),
        follows: parseMetric(row.Follows, "Follows", rowNumber),
        comments: parseMetric(row.Comments, "Comments", rowNumber),
        saves: parseMetric(row.Saves, "Saves", rowNumber),
      },
    };
  });
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#x2F;", "/")
    .replaceAll("\\u0026", "&")
    .replaceAll("\\/", "/");
}

function findInstagramCover(html) {
  const urls = [...html.matchAll(/https:\/\/(?:instagram|scontent)[^"'\\\s<]+?\.jpg[^"'\\\s<]*/g)]
    .map((match) => decodeHtml(match[0]));
  return urls.find((url) => /t51\.\d+-15\//.test(url)) ?? urls[0] ?? null;
}

async function fetchWithRetry(url, label) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "Mozilla/5.0 (compatible; GorontaloUnite/1.0)" },
        signal: AbortSignal.timeout(20_000),
      });
      if (response.ok) return response;
      lastError = new Error(`${label} mengembalikan status ${response.status}.`);
      if (![429, 500, 502, 503, 504].includes(response.status)) break;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 1_500));
  }
  throw lastError ?? new Error(`${label} gagal dimuat.`);
}

async function downloadThumbnail(shortcode, outputDirectory) {
  for (const extension of [".jpg", ".png", ".webp"]) {
    const existingPath = join(outputDirectory, `${shortcode}${extension}`);
    try {
      await stat(existingPath);
      return `/reels/${shortcode}${extension}`;
    } catch {}
  }

  const embed = await fetchWithRetry(
    `https://www.instagram.com/reel/${shortcode}/embed/`,
    `Instagram ${shortcode}`,
  );
  const coverUrl = findInstagramCover(await embed.text());
  if (!coverUrl) throw new Error(`${shortcode}: thumbnail tidak ditemukan.`);
  const cover = await fetchWithRetry(coverUrl, `Thumbnail ${shortcode}`);
  const contentType = cover.headers.get("content-type")?.split(";")[0] ?? "image/jpeg";
  if (!contentType.startsWith("image/")) throw new Error(`${shortcode}: respons thumbnail bukan gambar.`);
  const bytes = Buffer.from(await cover.arrayBuffer());
  if (bytes.byteLength === 0 || bytes.byteLength > 5 * 1024 * 1024) {
    throw new Error(`${shortcode}: ukuran thumbnail tidak valid.`);
  }
  const extension = contentType === "image/png" ? ".png" : contentType === "image/webp" ? ".webp" : ".jpg";
  const filePath = join(outputDirectory, `${shortcode}${extension}`);
  await writeFile(filePath, bytes);
  return `/reels/${shortcode}${extension}`;
}

const reels = normalizeRows(parseCsv(await readFile(csvPath, "utf8")));
const outputDirectory = join(process.cwd(), "public", "reels");
await mkdir(outputDirectory, { recursive: true });

const prepared = [];
const failures = [];
for (const [index, reel] of reels.entries()) {
  try {
    const thumbnailUrl = await downloadThumbnail(reel.shortcode, outputDirectory);
    prepared.push({ ...reel.values, thumbnail_url: thumbnailUrl });
    console.log(`[${index + 1}/${reels.length}] prepared ${reel.shortcode}`);
  } catch (error) {
    failures.push({ shortcode: reel.shortcode, error: error instanceof Error ? error.message : String(error) });
    console.error(`[${index + 1}/${reels.length}] failed ${reel.shortcode}`);
  }
  await new Promise((resolve) => setTimeout(resolve, 250));
}

await writeFile(outputPath, JSON.stringify(prepared));
console.log(JSON.stringify({ validated: reels.length, prepared: prepared.length, failed: failures.length, failures }));
if (failures.length) process.exitCode = 1;
