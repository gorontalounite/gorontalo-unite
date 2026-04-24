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

    // 2. Simple keyword relevance scoring
    const query = message.toLowerCase();
    const relevantEntries = (kbEntries ?? [])
      .map((entry) => ({
        ...entry,
        score: [entry.title, entry.content, entry.category]
          .join(" ")
          .toLowerCase()
          .split(" ")
          .filter((word) => word.length > 3 && query.includes(word)).length,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const contextBlock =
      relevantEntries.length > 0
        ? relevantEntries
            .map((e) => `[${e.category}] ${e.title}:\n${e.content}`)
            .join("\n\n---\n\n")
        : "Tidak ada data spesifik yang ditemukan untuk pertanyaan ini.";

    const sources = relevantEntries
      .filter((e) => e.source_url)
      .map((e) => ({ title: e.title, url: e.source_url, category: e.category }));

    // 3. Build system prompt
    const systemPrompt = `Kamu adalah Gorontalo AI — asisten virtual yang ahli tentang segala informasi mengenai Provinsi Gorontalo, Indonesia. Kamu menjawab dalam Bahasa Indonesia yang ramah, jelas, dan informatif.

PANDUAN:
- Gunakan konteks dari knowledge base di bawah sebagai sumber utama
- Jika pertanyaan tidak terkait Gorontalo, arahkan kembali ke topik Gorontalo
- Format jawaban dengan bullet points atau numbering jika ada list
- Gunakan emoji sesekali untuk membuat jawaban lebih menarik
- Selalu akurat — jangan buat informasi palsu
- Jawaban maksimal 400 kata

KNOWLEDGE BASE CONTEXT:
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
      temperature: 0.7,
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
