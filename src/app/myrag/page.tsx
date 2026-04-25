"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface RagUpload {
  id: string;
  filename: string;
  file_type: string | null;
  file_size: number;
  chunks_created: number;
  elements_processed: number;
  status: string;
  error_message: string | null;
  created_at: string;
}

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ACCEPTED_EXT = ".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.jpg,.jpeg,.png,.webp";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon({ type }: { type: string | null }) {
  const t = (type ?? "").toLowerCase();
  if (t.includes("pdf")) return <span className="text-red-500 font-bold text-xs">PDF</span>;
  if (t.includes("word") || t.includes("doc")) return <span className="text-blue-500 font-bold text-xs">DOC</span>;
  if (t.includes("sheet") || t.includes("excel") || t.includes("csv")) return <span className="text-green-600 font-bold text-xs">XLS</span>;
  if (t.includes("image") || t.includes("jpg") || t.includes("png")) return <span className="text-purple-500 font-bold text-xs">IMG</span>;
  return <span className="text-gray-400 font-bold text-xs">TXT</span>;
}

export default function MyRagPage() {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [result, setResult] = useState<{ success?: boolean; error?: string; chunks?: number; elements?: number } | null>(null);
  const [uploads, setUploads] = useState<RagUpload[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadHistory = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("rag_uploads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    setUploads((data as RagUpload[]) ?? []);
    setLoadingHistory(false);
  }, []);

  useEffect(() => { loadHistory(); }, [loadHistory]);

  const handleFile = async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type) && file.type !== "") {
      setResult({ error: `Tipe file tidak didukung: ${file.type || file.name.split(".").pop()}` });
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setResult({ error: "File terlalu besar (maks 20 MB)" });
      return;
    }

    setUploading(true);
    setResult(null);
    setUploadProgress(`Mengunggah ${file.name}...`);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadProgress("Memproses dokumen via Unstructured API...");
      const res = await fetch("/api/rag/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (!res.ok) {
        setResult({ error: json.error ?? `Error ${res.status}` });
      } else {
        setResult({ success: true, chunks: json.chunks_created, elements: json.elements_processed });
        await loadHistory();
      }
    } catch {
      setResult({ error: "Terjadi kesalahan jaringan. Coba lagi." });
    } finally {
      setUploading(false);
      setUploadProgress("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = () => setDragOver(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Upload Dokumen RAG</h1>
        <p className="text-sm text-gray-500 mt-1">
          Unggah dokumen untuk dijadikan konteks pengetahuan Gorontalo AI. Dokumen akan diproses dan dipecah menjadi chunk yang dapat dicari.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer select-none
          ${dragOver ? "border-[#2D7D46] bg-emerald-50" : "border-gray-200 bg-white hover:border-[#2D7D46]/50 hover:bg-gray-50"}
          ${uploading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXT}
          className="hidden"
          onChange={onInputChange}
          disabled={uploading}
        />

        {uploading ? (
          <>
            <div className="w-10 h-10 border-4 border-[#2D7D46] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-gray-700">{uploadProgress}</p>
            <p className="text-xs text-gray-400">Harap tunggu, proses ini bisa memakan waktu 10–30 detik</p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#2D7D46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-800">
                {dragOver ? "Lepaskan file di sini" : "Klik atau seret file ke sini"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, DOCX, TXT, CSV, XLS, XLSX, JPG, PNG &mdash; maks 20 MB
              </p>
            </div>
          </>
        )}
      </div>

      {/* Result banner */}
      {result && (
        <div className={`mt-4 px-4 py-3 rounded-xl text-sm flex items-start gap-3 ${
          result.success ? "bg-emerald-50 border border-emerald-200 text-emerald-800" : "bg-red-50 border border-red-200 text-red-700"
        }`}>
          {result.success ? (
            <>
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold">Upload berhasil!</p>
                <p className="text-xs mt-0.5">
                  {result.elements} elemen diproses &rarr; {result.chunks} chunk tersimpan ke Knowledge Base.
                </p>
              </div>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold">Upload gagal</p>
                <p className="text-xs mt-0.5">{result.error}</p>
              </div>
            </>
          )}
          <button onClick={() => setResult(null)} className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-600 text-lg leading-none">&times;</button>
        </div>
      )}

      {/* Upload history */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Riwayat Upload</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loadingHistory ? (
            <div className="flex justify-center py-10">
              <div className="w-5 h-5 border-2 border-[#2D7D46] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : uploads.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">
              Belum ada dokumen yang diunggah.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">File</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Ukuran</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Chunk</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {uploads.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 flex-shrink-0">
                          <FileIcon type={u.file_type} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate max-w-[160px]">{u.filename}</p>
                          <p className="text-xs text-gray-400">{u.elements_processed} elemen</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs text-gray-500">
                      {formatBytes(u.file_size)}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-500">
                      {u.chunks_created} chunk
                    </td>
                    <td className="px-4 py-3">
                      {u.status === "done" ? (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-700">Selesai</span>
                      ) : u.status === "error" ? (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-600" title={u.error_message ?? ""}>
                          Gagal
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-700">Proses</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs text-gray-400">
                      {new Date(u.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
