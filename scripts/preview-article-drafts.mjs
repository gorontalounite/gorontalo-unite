import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const draftsPath = path.resolve(process.argv[2] ?? "article-previews/article-drafts.json");
const drafts = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const pageSize = 20;

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function renderPage(url) {
  const query = new URL(url, "http://localhost").searchParams;
  const term = (query.get("q") ?? "").trim().toLowerCase();
  const page = Math.max(1, Number.parseInt(query.get("page") ?? "1", 10) || 1);
  const filtered = term ? drafts.filter((draft) => `${draft.title} ${draft.source} ${draft.suggested_category}`.toLowerCase().includes(term)) : drafts;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const items = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const queryString = term ? `&q=${encodeURIComponent(term)}` : "";
  const cards = items.map((draft) => `
    <article>
      <p class="meta">${escapeHtml(draft.source)} · ${escapeHtml(draft.published_at ?? "tanpa tanggal")} · ${escapeHtml(draft.suggested_category)}</p>
      <h2>${escapeHtml(draft.title)}</h2>
      <p class="label">${escapeHtml(draft.label)}</p>
      <ul>${draft.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
      ${draft.summary_paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      <details><summary>Prompt gambar doodle hitam-putih</summary><code>${escapeHtml(draft.image_prompt)}</code></details>
      ${draft.source_url ? `<a href="${escapeHtml(draft.source_url)}" target="_blank" rel="noreferrer">Buka sumber asli</a>` : ""}
    </article>`).join("");
  return `<!doctype html><html lang="id"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Preview Artikel — Gorontalo Unite</title>
  <style>body{margin:0;background:#f7f7f5;color:#171717;font:16px system-ui,sans-serif}main{max-width:880px;margin:auto;padding:36px 20px}h1{margin-bottom:4px}form{display:flex;gap:8px;margin:24px 0}input,button{padding:10px 12px;border-radius:8px;border:1px solid #ccc}input{flex:1}button{background:#f5c400;border-color:#f5c400;font-weight:700}article{background:#fff;border:1px solid #e5e5e5;border-radius:14px;margin:16px 0;padding:22px}h2{font-size:20px;margin:6px 0}.meta,.label{font-size:13px;color:#666}.label{font-weight:700;color:#8a6900}li,p{line-height:1.55}code{display:block;white-space:pre-wrap;background:#111;color:#eee;padding:12px;border-radius:8px;margin:10px 0}.pager{display:flex;justify-content:space-between;gap:10px;margin:28px 0}a{color:#705600}</style>
  <main><h1>Preview draft artikel</h1><p>${filtered.length.toLocaleString("id-ID")} draft · halaman ${currentPage}/${totalPages}. Ini bahan review lokal, belum dipublikasikan.</p>
  <form><input name="q" value="${escapeHtml(term)}" placeholder="Cari judul, sumber, atau kategori"><button>Cari</button></form>${cards}
  <nav class="pager">${currentPage > 1 ? `<a href="/?page=${currentPage - 1}${queryString}">← Sebelumnya</a>` : ""}<span></span>${currentPage < totalPages ? `<a href="/?page=${currentPage + 1}${queryString}">Berikutnya →</a>` : ""}</nav></main>`;
}

http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end(renderPage(request.url ?? "/"));
}).listen(4173, "127.0.0.1", () => console.log("Preview ready at http://127.0.0.1:4173"));
