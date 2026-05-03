"use client";

import { useRef, useEffect, useState } from "react";
import { Block } from "../types";

interface Props {
  block:    Block;
  onChange: (b: Block) => void;
  selected: boolean;
}

/* ─── exec-command wrapper ──────────────────────────────────── */
function exec(cmd: string, value?: string) {
  document.execCommand(cmd, false, value ?? undefined);
}

/* ─── Link dialog ───────────────────────────────────────────── */
function LinkDialog({ onConfirm, onClose }: {
  onConfirm: (url: string, text: string) => void;
  onClose:   () => void;
}) {
  const [url, setText]  = useState("https://");
  const [label, setLabel] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-5 w-80 space-y-3">
        <p className="font-semibold text-gray-900 text-sm">Sisipkan Link</p>
        <input value={label} onChange={(e) => setLabel(e.target.value)}
          placeholder="Teks link (kosongkan = pakai seleksi)"
          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
        <input value={url} onChange={(e) => setText(e.target.value)}
          placeholder="https://…"
          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] font-mono" />
        <div className="flex gap-2">
          <button type="button" onClick={onClose}
            className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl hover:bg-gray-50">Batal</button>
          <button type="button" onClick={() => onConfirm(url, label)}
            className="flex-1 text-sm bg-[#2D7D46] text-white py-2 rounded-xl hover:bg-[#236137]">Sisipkan</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Image insert dialog ───────────────────────────────────── */
function ImageDialog({ onConfirm, onClose }: {
  onConfirm: (url: string, alt: string) => void;
  onClose:   () => void;
}) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (res.ok) setUrl(json.url);
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-5 w-80 space-y-3">
        <p className="font-semibold text-gray-900 text-sm">Sisipkan Gambar</p>
        {url && <img src={url} alt="" className="w-full h-28 object-cover rounded-xl border border-gray-100" />}
        <input value={url} onChange={(e) => setUrl(e.target.value)}
          placeholder="URL gambar…"
          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] font-mono" />
        <div className="flex gap-2">
          <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
            className="flex-1 text-sm bg-gray-100 text-gray-700 py-2 rounded-xl hover:bg-gray-200 disabled:opacity-50">
            {uploading ? "…" : "📂 Unggah"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
        <input value={alt} onChange={(e) => setAlt(e.target.value)}
          placeholder="Alt text gambar (opsional)"
          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
        <div className="flex gap-2">
          <button type="button" onClick={onClose}
            className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl hover:bg-gray-50">Batal</button>
          <button type="button" onClick={() => url && onConfirm(url, alt)}
            disabled={!url}
            className="flex-1 text-sm bg-[#2D7D46] text-white py-2 rounded-xl hover:bg-[#236137] disabled:opacity-50">Sisipkan</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Rich Toolbar ──────────────────────────────────────────── */
function RichToolbar({
  editorRef,
  onSync,
  onShowLink,
  onShowImage,
}: {
  editorRef:    React.RefObject<HTMLDivElement | null>;
  onSync:       () => void;
  onShowLink:   () => void;
  onShowImage:  () => void;
}) {
  const btn = (label: string, title: string, action: () => void, mono = false) => (
    <button
      key={title}
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); action(); }}
      className={`px-2 py-1 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors ${mono ? "font-mono" : "font-semibold"}`}
    >
      {label}
    </button>
  );

  const focus = () => editorRef.current?.focus();

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border border-b-0 border-gray-200 rounded-t-xl">
      {/* Text format */}
      {btn("B",  "Bold",          () => { focus(); exec("bold");          onSync(); })}
      {btn("I",  "Italic",        () => { focus(); exec("italic");        onSync(); })}
      {btn("U",  "Underline",     () => { focus(); exec("underline");     onSync(); })}
      {btn("S̶",  "Strikethrough", () => { focus(); exec("strikeThrough"); onSync(); })}

      <div className="w-px h-5 bg-gray-200 self-center mx-0.5" />

      {/* Font size */}
      <select
        title="Ukuran font"
        onMouseDown={(e) => e.preventDefault()}
        onChange={(e) => { focus(); exec("fontSize", e.target.value); onSync(); e.target.value = ""; }}
        className="text-xs border border-gray-200 rounded-lg px-1 py-0.5 bg-white text-gray-600 outline-none cursor-pointer"
        defaultValue=""
      >
        <option value="" disabled>Ukuran</option>
        <option value="1">Kecil (10pt)</option>
        <option value="2">Normal (13pt)</option>
        <option value="3">Sedang (16pt)</option>
        <option value="4">Besar (18pt)</option>
        <option value="5">X-Besar (24pt)</option>
        <option value="6">XX-Besar (32pt)</option>
      </select>

      {/* Text color */}
      <div className="relative">
        <input
          type="color"
          title="Warna teks"
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => { focus(); exec("foreColor", e.target.value); onSync(); }}
          className="w-6 h-6 rounded border border-gray-200 cursor-pointer p-0 overflow-hidden"
          style={{ padding: 1 }}
        />
      </div>

      <div className="w-px h-5 bg-gray-200 self-center mx-0.5" />

      {/* Alignment */}
      {btn("⬤⬤⬤", "Rata kiri",   () => { focus(); exec("justifyLeft");   onSync(); })}
      {btn(" ⬤⬤ ", "Rata tengah", () => { focus(); exec("justifyCenter"); onSync(); })}
      {btn(" ⬤⬤⬤", "Rata kanan",  () => { focus(); exec("justifyRight");  onSync(); })}

      <div className="w-px h-5 bg-gray-200 self-center mx-0.5" />

      {/* Lists */}
      {btn("• List",  "Bullet list",   () => { focus(); exec("insertUnorderedList"); onSync(); })}
      {btn("1. List", "Numbered list", () => { focus(); exec("insertOrderedList");   onSync(); })}

      <div className="w-px h-5 bg-gray-200 self-center mx-0.5" />

      {/* Link */}
      <button
        type="button"
        title="Sisipkan link"
        onMouseDown={(e) => { e.preventDefault(); onShowLink(); }}
        className="px-2 py-1 text-xs font-semibold rounded-lg border border-gray-200 text-[#2D7D46] hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
      >
        🔗 Link
      </button>

      {/* Image */}
      <button
        type="button"
        title="Sisipkan gambar"
        onMouseDown={(e) => { e.preventDefault(); onShowImage(); }}
        className="px-2 py-1 text-xs font-semibold rounded-lg border border-gray-200 text-purple-600 hover:bg-purple-50 hover:border-purple-200 transition-colors"
      >
        🖼 Gambar
      </button>

      {/* Unlink */}
      {btn("⊘ Hapus link", "Hapus link", () => { focus(); exec("unlink"); onSync(); })}

      <div className="w-px h-5 bg-gray-200 self-center mx-0.5" />

      {/* Clear */}
      {btn("✕ Format", "Hapus format", () => { focus(); exec("removeFormat"); onSync(); })}
    </div>
  );
}

/* ─── Main ParagraphBlock ───────────────────────────────────── */
export default function ParagraphBlock({ block, onChange, selected }: Props) {
  const editorRef  = useRef<HTMLDivElement>(null);
  const lastHtmlRef = useRef(block.content || "");
  const [showLink,  setShowLink]  = useState(false);
  const [showImage, setShowImage] = useState(false);

  // Saved selection range for dialogs
  const savedRange = useRef<Range | null>(null);

  // Set HTML on mount / when block identity changes (not on every onChange)
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = block.content || "";
      lastHtmlRef.current         = block.content || "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.id]);

  const sync = () => {
    const html = editorRef.current?.innerHTML ?? "";
    if (html !== lastHtmlRef.current) {
      lastHtmlRef.current = html;
      onChange({ ...block, content: html });
    }
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedRange.current) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
  };

  const handleInsertLink = (url: string, label: string) => {
    setShowLink(false);
    editorRef.current?.focus();
    restoreSelection();
    if (label) {
      exec("insertHTML", `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`);
    } else {
      exec("createLink", url);
      // Make all links open in new tab
      editorRef.current?.querySelectorAll(`a[href="${url}"]`).forEach((el) => {
        (el as HTMLAnchorElement).target = "_blank";
        (el as HTMLAnchorElement).rel    = "noopener noreferrer";
      });
    }
    sync();
  };

  const handleInsertImage = (url: string, alt: string) => {
    setShowImage(false);
    editorRef.current?.focus();
    restoreSelection();
    exec("insertHTML", `<img src="${url}" alt="${alt}" style="max-width:100%;border-radius:8px;margin:8px 0;" />`);
    sync();
  };

  const cleanPastedHtml = (html: string): string => {
    // Remove unwanted tags entirely (with contents)
    let clean = html
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<meta[^>]*>/gi, "")
      .replace(/<o:p[\s\S]*?<\/o:p>/gi, "")
      .replace(/<w:[^>]*>[\s\S]*?<\/w:[^>]*>/gi, "")
      .replace(/<w:[^>]*\/>/gi, "");

    // Unwrap <span> tags — keep inner content
    clean = clean.replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, "$1");
    // Remove <font> tags — keep inner content
    clean = clean.replace(/<font[^>]*>([\s\S]*?)<\/font>/gi, "$1");

    // Strip disallowed attributes (class, id, style, data-*)
    clean = clean.replace(/\s(class|id|style|data-[a-z\-]+)="[^"]*"/gi, "");
    clean = clean.replace(/\s(class|id|style|data-[a-z\-]+)='[^']*'/gi, "");

    // Replace &nbsp; with regular space
    clean = clean.replace(/&nbsp;/gi, " ");

    // Strip tags not in the allowed list — keep their inner text
    const allowed = new Set(["b", "strong", "i", "em", "u", "a", "br", "p", "ul", "ol", "li"]);
    clean = clean.replace(/<\/?([a-z][a-z0-9]*)[^>]*>/gi, (match, tag: string) => {
      if (allowed.has(tag.toLowerCase())) return match;
      return "";
    });

    // Collapse whitespace
    clean = clean.replace(/\s{2,}/g, " ").trim();
    return clean;
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.clipboardData.getData("text/html");
    const text = e.clipboardData.getData("text/plain");
    const content = html ? cleanPastedHtml(html) : text.replace(/\n/g, "<br>");
    exec("insertHTML", content);
    sync();
  };

  return (
    <>
      {selected && (
        <RichToolbar
          editorRef={editorRef}
          onSync={sync}
          onShowLink={() => { saveSelection(); setShowLink(true); }}
          onShowImage={() => { saveSelection(); setShowImage(true); }}
        />
      )}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={sync}
        onBlur={sync}
        onPaste={handlePaste}
        data-placeholder="Tulis paragraf di sini… (pilih teks lalu gunakan toolbar di atas)"
        className={`outline-none leading-relaxed text-gray-800 min-h-[56px] ${
          selected
            ? "border border-gray-200 rounded-b-xl px-3 py-2"
            : "px-1 py-0.5"
        } [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-300`}
      />

      {showLink  && <LinkDialog  onConfirm={handleInsertLink}  onClose={() => setShowLink(false)}  />}
      {showImage && <ImageDialog onConfirm={handleInsertImage} onClose={() => setShowImage(false)} />}
    </>
  );
}
