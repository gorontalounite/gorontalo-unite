import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@/lib/supabase/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await req.json() as {
      message: string;
      conversationHistory?: { role: "user" | "assistant"; content: string }[];
    };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1. Fetch RAG context from knowledge_base
    const supabase = await createClient();
    const { data: kbEntries } = await supabase
      .from("knowledge_base")
      .select("title, content, category, source_url")
      .eq("is_active", true)
      .limit(20);

    // 2. Improved RAG scoring — tokenize query, score by token hits + partial match
    const queryTokens = message
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const allEntries = kbEntries ?? [];
    const scoredEntries = allEntries.map((entry) => {
      const haystack = [entry.title, entry.content, entry.category, ...(entry as { tags?: string[] }).tags ?? []]
        .join(" ")
        .toLowerCase();
      const haystackTokens = haystack.split(/\s+/);
      let score = 0;
      for (const token of queryTokens) {
        // exact token match (higher weight)
        if (haystackTokens.includes(token)) score += 3;
        // substring match (lower weight)
        else if (haystack.includes(token)) score += 1;
      }
      return { ...entry, score };
    });

    // Take top-5 relevant entries; only include entries with score > 0
    const relevantEntries = scoredEntries
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .filter((e) => e.score > 0);

    // If nothing is relevant, pass all KB entries so AI can say "not found" properly
    const contextEntries = relevantEntries.length > 0 ? relevantEntries : allEntries.slice(0, 10);
    const hasRelevantContext = relevantEntries.length > 0;

    const contextBlock = contextEntries
      .map((e) => `[${e.category}] ${e.title}:\n${e.content}`)
      .join("\n\n---\n\n");

    const sources = relevantEntries
      .filter((e) => e.source_url)
      .map((e) => ({ title: e.title, url: e.source_url, category: e.category }));

    // 3. Build system prompt — strict grounding, no hallucination
    const systemPrompt = `Kamu adalah Gorontalo AI — asisten informasi resmi tentang Provinsi Gorontalo, Indonesia.

## ATURAN KETAT (WAJIB DIIKUTI):

1. **HANYA gunakan informasi dari KNOWLEDGE BASE di bawah ini.** Jangan pernah mengarang, menebak, atau menggunakan pengetahuan umum yang tidak ada di knowledge base.

2. **Jika informasi TIDAK ADA di knowledge base**, jawab dengan jujur:
   "Maaf, saya belum memiliki data tentang hal tersebut di knowledge base kami. Silakan hubungi Dinas terkait di Gorontalo untuk informasi yang lebih akurat."
   Jangan pernah mengarang jawaban.

3. **Jika pertanyaan di luar topik Gorontalo**, tolak dengan sopan:
   "Saya hanya dapat membantu pertanyaan seputar Provinsi Gorontalo. Ada yang ingin Anda ketahui tentang Gorontalo?"

4. **Kutip sumber**: Jika kamu menggunakan data dari knowledge base, sebutkan judul sumbernya di akhir jawaban dalam format: *Sumber: [judul]*

5. **Format**: Gunakan bullet points untuk list, bold untuk istilah penting. Jawaban ringkas dan padat, maksimal 300 kata.

6. **Bahasa**: Bahasa Indonesia yang baku dan mudah dipahami.

${!hasRelevantContext ? "⚠️ PERINGATAN: Tidak ada data spesifik yang cocok dengan pertanyaan ini. Gunakan aturan no. 2 — jawab bahwa data tidak tersedia, JANGAN mengarang." : ""}

## KNOWLEDGE BASE (SATU-SATUNYA SUMBER YANG BOLEH DIGUNAKAN):

${contextBlock}`;

    // 4. Build messages
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    // 5. Call Groq
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 800,
      temperature: 0.1,
    });

    const aiResponse = completion.choices[0]?.message?.content ?? "Maaf, terjadi kesalahan. Coba lagi.";

    // 6. Save conversation (if user is logged in)
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("conversations").insert({
        user_id: user.id,
        user_message: message,
        ai_response: aiResponse,
        sources: sources as unknown as never,
      });
    }

    return NextResponse.json({ response: aiResponse, sources });
  } catch (err) {
    console.error("[/api/chat] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
