#!/usr/bin/env python3
"""Batch-summarize curated-scrape articles via OpenRouter.

Prompt rules (from user):
- Tepat 3 bullet point faktual dan singkat.
- Tepat 2 paragraf ringkas, masing-masing 2-3 kalimat.
- Bahasa Indonesia netral, jelas, mudah dibaca.
- Hapus dateline/penanda kantor berita.
- Pertahankan tanggal, sumber, URL apa adanya dari input.
- 1 kategori, 3-5 tag.
- Balas HANYA JSON valid dengan struktur persis yang ditentukan.

Deterministic fields (title/source/url/date/label/status) are filled by the
script directly from input records so they are preserved "apa adanya".
"""
import json, os, re, sys, time, argparse, threading, random
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
import urllib.request, urllib.error

ROOT = os.path.expanduser("~/Documents/Gorontalo Unite/gorontalo-unite/curated-scrape")
OUT_DIR = os.path.join(ROOT, "summaries")
OUT_PATH = os.path.join(OUT_DIR, "summaries.jsonl")
ERR_PATH = os.path.join(OUT_DIR, "errors.jsonl")

SOURCE_FALLBACK = {
    "Antaranews": "Antara News Gorontalo",
    "Barakati ID": "Barakati.id",
    "Gopos": "Gopos.id",
    "Gorontalo Post": "Gorontalo Post",
    "Pemprov Gorontalo": "Pemprov Gorontalo",
    "Universitas Negeri Gorontalo": "Universitas Negeri Gorontalo",
}
DATELINE_RE = re.compile(
    r"^\s*(?:[A-Z][A-Z .'/,()-]{1,60}?\s*(?:\(ANTARA\)|\(Antara\)|ANTARA|-\s*ANTARA|GORONTALOPOST\.ID)\s*[-–—)]+\s*)",
    re.IGNORECASE)

USER_TEMPLATE = """Anda adalah editor Gorontalo Unite. Tugas: buat RINGKASAN ORIGINAL dari artikel berita berikut. Jangan menyalin atau menulis ulang artikel lengkap. Jangan menambah fakta, angka, tanggal, nama, kutipan, atau konteks yang tidak terdapat dalam artikel. Aturan:
- Tepat 3 bullet point faktual dan singkat.
- Tepat 2 paragraf ringkas, masing-masing 2–3 kalimat.
- Gunakan bahasa Indonesia netral, jelas, dan mudah dibaca.
- Hapus dateline/penanda kantor berita di awal teks, misalnya “JAKARTA (ANTARA) -”.
- Tentukan 1 kategori dan 3–5 tag relevan.
- Bila artikel tidak cukup jelas, tetap ringkas hanya berdasarkan informasi yang tersedia.
Balas HANYA JSON valid, tanpa Markdown, dengan struktur persis ini:
{{
  "bullets": ["<poin 1>", "<poin 2>", "<poin 3>"],
  "summary_paragraphs": ["<paragraf 1>", "<paragraf 2>"],
  "category": "<kategori>",
  "tags": ["<tag 1>", "<tag 2>", "<tag 3>"],
  "image_prompt": "Black-and-white editorial doodle/caricature illustration,..."
}}
INPUT ARTIKEL:
Judul: {title}
Sumber: {source_name}
URL: {source_url}
Tanggal: {date}
Isi:
{content}"""


def normalize(r, folder, fpath, idx):
    title = (r.get("title") or r.get("judul") or "").strip()
    date = (r.get("publish_date") or r.get("published_date") or r.get("date")
            or r.get("tanggal_publish") or r.get("tanggal") or "")
    if isinstance(date, dict):  # safety
        date = json.dumps(date, ensure_ascii=False)
    source = (r.get("source") or "").strip() or SOURCE_FALLBACK.get(folder, folder)
    content = (r.get("content") or r.get("isi_berita") or "")
    if isinstance(content, list):
        content = "\n".join(str(x) for x in content)
    content = DATELINE_RE.sub("", content.strip())
    return {
        "id": f"{os.path.relpath(fpath, ROOT)}#{idx}",
        "file": os.path.relpath(fpath, ROOT),
        "url": (r.get("url") or "").strip(),
        "title": title,
        "source": source,
        "date": str(date).strip(),
        "content": content[:12000],
    }


def load_records():
    import glob
    recs = []
    for fpath in sorted(glob.glob(os.path.join(ROOT, "*", "*.json"))):
        folder = os.path.basename(os.path.dirname(fpath))
        try:
            with open(fpath, encoding="utf-8") as fh:
                data = json.load(fh)
        except Exception as e:
            print(f"WARN skip unreadable {fpath}: {e}", file=sys.stderr)
            continue
        if isinstance(data, dict):
            data = [data]
        for i, r in enumerate(data):
            n = normalize(r, folder, fpath, i)
            if not n["title"] or not n["content"]:
                continue
            recs.append(n)
    return recs


def extract_json(text):
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    try:
        return json.loads(text)
    except Exception:
        m = re.search(r"\{.*\}", text, re.DOTALL)
        if m:
            return json.loads(m.group(0))
        raise


def validate_shape(obj):
    out = {
        "bullets": [str(b).strip() for b in (obj.get("bullets") or []) if str(b).strip()][:3],
        "summary_paragraphs": [str(p).strip() for p in (obj.get("summary_paragraphs") or []) if str(p).strip()][:2],
        "category": str(obj.get("category") or "").strip(),
        "tags": [str(t).strip() for t in (obj.get("tags") or []) if str(t).strip()][:5],
        "image_prompt": str(obj.get("image_prompt") or "").strip(),
    }
    if len(out["bullets"]) != 3:
        raise ValueError(f"bullets={len(out['bullets'])}")
    if len(out["summary_paragraphs"]) != 2:
        raise ValueError(f"paragraphs={len(out['summary_paragraphs'])}")
    if not out["category"] or len(out["tags"]) < 3:
        raise ValueError("category/tags missing")
    return out


def call_llm(rec, model, api_key, max_retries=6, timeout=120):
    body = json.dumps({
        "model": model,
        "messages": [{"role": "user", "content": USER_TEMPLATE.format(
            title=rec["title"], source_name=rec["source"],
            source_url=rec["url"], date=rec["date"], content=rec["content"])}],
        "max_tokens": 1600,
        "temperature": 0.2,
        "reasoning": {"enabled": False},
    }).encode()
    last = None
    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(
                "https://openrouter.ai/api/v1/chat/completions",
                data=body,
                headers={"Authorization": f"Bearer {api_key}",
                         "Content-Type": "application/json",
                         "HTTP-Referer": "https://gorontalo-unite.local",
                         "X-Title": "Gorontalo Unite Summarizer"})
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                payload = json.loads(resp.read().decode())
            msg = payload["choices"][0]["message"]
            text = msg.get("content") or ""
            if not text.strip() and msg.get("reasoning"):
                raise ValueError("empty content (model returned reasoning only)")
            return extract_json(text)
        except urllib.error.HTTPError as e:
            code = e.code
            detail = e.read()[:200].decode(errors="replace")
            last = f"HTTP {code}: {detail}"
            if code in (429, 500, 502, 503, 504):
                time.sleep(min(60, (2 ** attempt) + random.uniform(0, 1)))
                continue
            if code in (401, 403):
                raise RuntimeError(last)
            time.sleep(min(30, 2 ** attempt))
        except Exception as e:
            last = f"{type(e).__name__}: {e}"
            time.sleep(min(30, 2 ** attempt))
    raise RuntimeError(f"failed after {max_retries}: {last}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default=os.environ.get("SUMMARY_MODEL", "moonshotai/kimi-k2.5"))
    ap.add_argument("--workers", type=int, default=int(os.environ.get("WORKERS", "8")))
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()

    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        # try loading ~/.hermes/.env
        envp = os.path.expanduser("~/.hermes/.env")
        if os.path.exists(envp):
            for line in open(envp):
                if line.startswith("OPENROUTER_API_KEY="):
                    api_key = line.split("=", 1)[1].strip().strip('"').strip("'")
    if not api_key:
        sys.exit("OPENROUTER_API_KEY not found")

    os.makedirs(OUT_DIR, exist_ok=True)
    recs = load_records()
    done = set()
    if os.path.exists(OUT_PATH):
        with open(OUT_PATH, encoding="utf-8") as fh:
            for line in fh:
                try:
                    done.add(json.loads(line)["id"])
                except Exception:
                    pass
    todo = [r for r in recs if r["id"] not in done]
    if args.limit:
        todo = todo[:args.limit]
    print(f"[{datetime.now().isoformat(timespec='seconds')}] total={len(recs)} done={len(done)} todo={len(todo)} model={args.model} workers={args.workers}", flush=True)

    lock = threading.Lock()
    out_fh = open(OUT_PATH, "a", encoding="utf-8")
    err_fh = open(ERR_PATH, "a", encoding="utf-8")
    stats = {"ok": 0, "err": 0}

    def work(rec):
        try:
            obj = call_llm(rec, args.model, api_key)
            gen = validate_shape(obj)
            row = {
                "id": rec["id"],
                "title": rec["title"],
                "source_name": rec["source"],
                "source_url": rec["url"],
                "source_published_at": rec["date"],
                "label": "Ringkasan oleh Gorontalo Unite",
                "bullets": gen["bullets"],
                "summary_paragraphs": gen["summary_paragraphs"],
                "category": gen["category"],
                "tags": gen["tags"],
                "image_prompt": gen["image_prompt"],
                "status": "needs_review",
                "meta": {"source_file": rec["file"], "model": args.model,
                         "summarized_at": datetime.now(timezone.utc).isoformat(timespec="seconds")},
            }
            with lock:
                out_fh.write(json.dumps(row, ensure_ascii=False) + "\n")
                out_fh.flush()
                stats["ok"] += 1
                if stats["ok"] % 25 == 0:
                    print(f"  progress ok={stats['ok']} err={stats['err']}", flush=True)
        except Exception as e:
            with lock:
                err_fh.write(json.dumps({"id": rec["id"], "title": rec["title"],
                                         "error": str(e)[:500]}, ensure_ascii=False) + "\n")
                err_fh.flush()
                stats["err"] += 1

    with ThreadPoolExecutor(max_workers=args.workers) as ex:
        list(ex.map(work, todo))
    print(f"[{datetime.now().isoformat(timespec='seconds')}] DONE ok={stats['ok']} err={stats['err']}", flush=True)


if __name__ == "__main__":
    main()
