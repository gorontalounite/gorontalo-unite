import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const reelIds = [
  "DZpL7hZBRBu",
  "DZu2aNEhvkr",
  "DZoyaZMhRLO",
  "DWDp6ggE872",
  "DVqa7dGD1pB",
  "DU_c97ck4bX",
  "DV-v77ega42",
  "Dauv99eBUFx",
  "DYJXI99uALJ",
  "DVyCk6dE4Mr",
  "Dbav5taTC8j",
  "DVk9FGGT2pg",
];

const outputDir = join(process.cwd(), "public", "reels");
await mkdir(outputDir, { recursive: true });

function decodeHtml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("\\u0026", "&").replaceAll("\\/", "/");
}

function findCover(html) {
  const urls = [...html.matchAll(/https:\/\/(?:instagram|scontent)[^"'\\\s<]+?\.jpg[^"'\\\s<]*/g)]
    .map((match) => decodeHtml(match[0]));
  const covers = urls.filter((url) => /t51\.\d+-15\//.test(url));
  return covers[0];
}

for (const reelId of reelIds) {
  const embedUrl = `https://www.instagram.com/reel/${reelId}/embed/`;
  const page = await fetch(embedUrl, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!page.ok) throw new Error(`${reelId}: embed returned ${page.status}`);

  const coverUrl = findCover(await page.text());
  if (!coverUrl) throw new Error(`${reelId}: cover image not found`);

  const cover = await fetch(coverUrl, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!cover.ok) throw new Error(`${reelId}: cover returned ${cover.status}`);
  const mimeType = cover.headers.get("content-type") ?? "";
  if (!mimeType.startsWith("image/")) throw new Error(`${reelId}: unexpected ${mimeType}`);

  await writeFile(join(outputDir, `${reelId}.jpg`), Buffer.from(await cover.arrayBuffer()));
  console.log(`Downloaded ${reelId}`);
}
