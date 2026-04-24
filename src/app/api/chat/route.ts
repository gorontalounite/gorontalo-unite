import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";
import { createClient } from "@/lib/supabase/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await req.json() as {
      message: string;
      conversationHistory?: { role: "user" | "assistant"; content: string }[];
    };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1. Search web via Tavily — append "Gorontalo" to keep results relevant
    const searchQuery = message.toLowerCase().includes("gorontalo")
      ? message
      : `${message} Gorontalo`;

    let contextBlock = "";
    let sources: { title: string; url: string | null; category: string }[] = [];
    let hasRelevantContext = false;

    try {
      const tavilyRes = await tavilyClient.search(searchQuery, {
        searchDepth: "basic",
        maxResults: 5,
        includeAnswer: false,
        includeDomains: [],        // allow all domains
        excludeDomains: [],
      });

      const results = tavilyRes.results ?? [];
      hasRelevantContext = results.length > 0;

      // Build context block from scraped snippets
      contextBlock = results
        .map((r, i) => `[${i + 1}] ${r.title}\nURL: ${r.url}\n${r.content}`)
        .join("\n\n---\n\n");

      // Build sources list
      sources = results.map((r) => ({
        title: r.title,
        url: r.url,
        category: "Web",
      }));
    } catch (tavilyErr) {
      console.error("[/api/chat] Tavily error:", tavilyErr);
      // Proceed without context — AI will say data unavailable
    }

    // 2. Build system prompt
    const systemPrompt = `Kamu adalah Gorontalo AI — asisten informasi resmi tentang Provinsi Gorontalo, Indonesia.

## ATURAN KETAT (WAJIB DIIKUTI):

1. **HANYA gunakan informasi dari HASIL PENCARIAN di bawah ini.** Jangan pernah mengarang, menebak, atau menggunakan pengetahuan umum yang tidak ada di hasil pencarian.

2. **Jika informasi TIDAK ADA di hasil pencarian**, jawab dengan jujur:
   "Maaf, saya tidak menemukan informasi yang akurat tentang hal tersebut. Silakan hubungi Dinas terkait di Gorontalo untuk informasi lebih lanjut."
   Jangan pernah mengarang jawaban.

3. **Jika pertanyaan di luar topik Gorontalo**, tolak dengan sopan:
   "Saya hanya dapat membantu pertanyaan seputar Provinsi Gorontalo. Ada yang ingin Anda ketahui tentang Gorontalo?"

4. **Kutip sumber**: Sebutkan judul dan URL sumber di akhir jawaban dalam format:
   *Sumber: [judul sumber](URL)*

5. **Format**: Gunakan bullet points untuk list, bold untuk istilah penting. Jawaban ringkas dan padat, maksimal 300 kata.

6. **Bahasa**: Bahasa Indonesia yang baku dan mudah dipahami.

7. **Dilarang keras**: Jangan gunakan emoji, emoticon, atau simbol dekoratif apapun dalam jawaban.

${!hasRelevantContext ? "⚠️ PERINGATAN: Tidak ada hasil pencarian yang tersedia. Gunakan aturan no. 2 — jawab bahwa data tidak tersedia, JANGAN mengarang." : ""}

## HASIL PENCARIAN INTERNET (SATU-SATUNYA SUMBER YANG BOLEH DIGUNAKAN):

${contextBlock || "Tidak ada hasil pencarian."}`;

    // 3. Build messages
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    // 4. Call Groq
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 800,
      temperature: 0.1,
    });

    const aiResponse =
      completion.choices[0]?.message?.content ?? "Maaf, terjadi kesalahan. Coba lagi.";

    // 5. Save conversation (if user is logged in)
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
