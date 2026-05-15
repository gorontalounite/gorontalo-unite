import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const maxDuration = 120;

interface UnstructuredElement {
  type: string;
  text: string;
  metadata?: {
    filename?: string;
    page_number?: number;
    [key: string]: unknown;
  };
}

function buildChunks(
  elements: UnstructuredElement[],
  filename: string
): { title: string; content: string }[] {
  const chunks: { title: string; content: string }[] = [];
  let currentTitle = filename;
  let currentContent = "";

  const flush = () => {
    const trimmed = currentContent.trim();
    if (trimmed.length >= 80) chunks.push({ title: currentTitle, content: trimmed });
    currentContent = "";
  };

  for (const el of elements) {
    const text = (el.text ?? "").trim();
    if (!text || text.length < 5) continue;
    if (el.type === "Title" || el.type === "Header") {
      flush();
      currentTitle = text.slice(0, 200);
      currentContent = text + "\n";
    } else {
      currentContent += text + "\n";
      if (currentContent.length >= 1800) flush();
    }
  }
  flush();
  return chunks;
}

async function embedText(text: string): Promise<number[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/embed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ text }),
      }
    );
    if (!res.ok) return null;
    const json = await res.json() as { embedding?: number[] };
    return json.embedding ?? null;
  } catch (err) {
    console.error("[rag/embed] embedding failed:", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const adminClient = createAdminClient();
    const { data: profileRaw } = await adminClient
      .from("user_profiles").select("role").eq("id", user.id).single();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const profile = profileRaw as any as { role: string } | null;
    if (!profile || !["admin", "editor"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: "File terlalu besar (maks 20MB)" }, { status: 400 });
    }

    // Forward to Unstructured API
    const unstructuredForm = new FormData();
    unstructuredForm.append("files", file, file.name);

    const unstructuredRes = await fetch(
      "https://api.unstructuredapp.io/general/v0/general",
      {
        method: "POST",
        headers: { "unstructured-api-key": process.env.UNSTRUCTURED_API_KEY ?? "" },
        body: unstructuredForm,
      }
    );

    if (!unstructuredRes.ok) {
      const errText = await unstructuredRes.text().catch(() => "");
      console.error("[rag/upload] Unstructured error:", unstructuredRes.status, errText);
      return NextResponse.json({ error: `Unstructured API error: ${unstructuredRes.status}` }, { status: 502 });
    }

    const elements = (await unstructuredRes.json()) as UnstructuredElement[];
    const chunks = buildChunks(elements, file.name);

    // Record the upload first to get its ID
    const { data: uploadRow } = await adminClient.from("rag_uploads").insert({
      filename: file.name,
      file_type: file.type || file.name.split(".").pop(),
      file_size: file.size,
      chunks_created: 0,
      elements_processed: elements.length,
      status: "embedding",
      uploaded_by: user.id,
    }).select("id").single();

    const uploadId = uploadRow?.id ?? null;

    let savedChunks: { id: string; title: string; content: string }[] = [];

    if (chunks.length > 0) {
      // Insert chunks first (without embeddings)
      const rows = chunks.map((c) => ({
        title: c.title,
        content: c.content,
        category: "RAG",
        source_url: null,
        is_active: true,
        source_upload_id: uploadId,
      }));

      const { data: inserted, error: kbError } = await adminClient
        .from("knowledge_base").insert(rows).select("id, title, content");

      if (kbError) {
        console.error("[rag/upload] knowledge_base insert error:", kbError);
        return NextResponse.json({ error: kbError.message }, { status: 500 });
      }

      savedChunks = (inserted ?? []) as { id: string; title: string; content: string }[];

      // Generate and store embeddings (non-blocking per chunk)
      const embedPromises = savedChunks.map(async (chunk) => {
        const embedding = await embedText(`${chunk.title}\n${chunk.content}`);
        if (!embedding) return;
        await adminClient
          .from("knowledge_base")
          .update({ embedding: JSON.stringify(embedding) })
          .eq("id", chunk.id);
      });

      await Promise.allSettled(embedPromises);
    }

    // Update upload record with final count
    if (uploadId) {
      await adminClient.from("rag_uploads").update({
        chunks_created: savedChunks.length,
        status: "done",
      }).eq("id", uploadId);
    }

    return NextResponse.json({
      success: true,
      filename: file.name,
      elements_processed: elements.length,
      chunks_created: savedChunks.length,
      chunks: savedChunks,
    });
  } catch (err) {
    console.error("[rag/upload] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
