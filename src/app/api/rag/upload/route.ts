import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const maxDuration = 60; // allow up to 60s for large files

interface UnstructuredElement {
  type: string;
  text: string;
  metadata?: {
    filename?: string;
    page_number?: number;
    [key: string]: unknown;
  };
}

/** Group raw Unstructured elements into sensible knowledge chunks */
function buildChunks(
  elements: UnstructuredElement[],
  filename: string
): { title: string; content: string }[] {
  const chunks: { title: string; content: string }[] = [];
  let currentTitle = filename;
  let currentContent = "";

  const flush = () => {
    const trimmed = currentContent.trim();
    if (trimmed.length >= 80) {
      chunks.push({ title: currentTitle, content: trimmed });
    }
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
      // Split large chunks so context window stays manageable
      if (currentContent.length >= 1800) {
        flush();
      }
    }
  }
  flush();

  return chunks;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Auth — admin / editor only
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profileRaw } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const profile = profileRaw as any as { role: string } | null;
    if (!profile || !["admin", "editor"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Parse uploaded file
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const MAX_MB = 20;
    if (file.size > MAX_MB * 1024 * 1024) {
      return NextResponse.json({ error: `File terlalu besar (maks ${MAX_MB}MB)` }, { status: 400 });
    }

    // 3. Forward to Unstructured API
    const unstructuredForm = new FormData();
    unstructuredForm.append("files", file, file.name);

    const unstructuredRes = await fetch(
      "https://api.unstructuredapp.io/general/v0/general",
      {
        method: "POST",
        headers: {
          "unstructured-api-key": process.env.UNSTRUCTURED_API_KEY ?? "",
        },
        body: unstructuredForm,
      }
    );

    if (!unstructuredRes.ok) {
      const errText = await unstructuredRes.text().catch(() => "");
      console.error("[rag/upload] Unstructured error:", unstructuredRes.status, errText);
      return NextResponse.json(
        { error: `Unstructured API error: ${unstructuredRes.status}` },
        { status: 502 }
      );
    }

    const elements = (await unstructuredRes.json()) as UnstructuredElement[];

    // 4. Chunk & store in knowledge_base
    const chunks = buildChunks(elements, file.name);

    let chunksCreated = 0;
    if (chunks.length > 0) {
      const rows = chunks.map((c) => ({
        title: c.title,
        content: c.content,
        category: "RAG",
        source_url: null,
        is_active: true,
      }));
      const { error: kbError } = await supabase.from("knowledge_base").insert(rows);
      if (kbError) {
        console.error("[rag/upload] knowledge_base insert error:", kbError);
        return NextResponse.json({ error: kbError.message }, { status: 500 });
      }
      chunksCreated = rows.length;
    }

    // 5. Record the upload in rag_uploads
    await supabase.from("rag_uploads").insert({
      filename: file.name,
      file_type: file.type || file.name.split(".").pop(),
      file_size: file.size,
      chunks_created: chunksCreated,
      elements_processed: elements.length,
      status: "done",
      uploaded_by: user.id,
    });

    return NextResponse.json({
      success: true,
      filename: file.name,
      elements_processed: elements.length,
      chunks_created: chunksCreated,
    });
  } catch (err) {
    console.error("[rag/upload] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
