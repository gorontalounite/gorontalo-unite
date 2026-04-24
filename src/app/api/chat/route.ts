import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";
import { createClient } from "@/lib/supabase/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY! });

// Keywords that indicate a Gorontalo-specific question
const GORONTALO_KEYWORDS = [
  // Province & cities
  "gorontalo", "hulontalo", "gorut", "limboto", "pohuwato",
  "bone bolango", "boalemo", "gorontalo utara", "paguyaman",
  "marisa", "tilamuta", "kwandang", "isimu", "telaga",
  // Nature & tourism
  "olele", "bogani", "tilongkabila", "bolihutuo", "lombongo",
  "otanaha", "torosiaje", "molosipat", "pentadio", "bongo",
  "danau limboto", "teluk tomini",
  // Culture & people
  "karawo", "saronde", "polopalo", "moodutu", "tidi", "pohutu",
  "nani wartabone", "djalaluddin", "eyato", "hulawa",
  // Food
  "binte biluhuta", "ilabulo", "iloni", "curuti", "sate tuna",
  "binthe", "sagela", "acar, gohu",
  // Institutions
  "aloei saboe", "toto kabila", "ung ", "iain sultan amai",
  "universitas negeri gorontalo",
];

/**
 * Detects Gorontalo context from the current message OR recent history.
 * This handles follow-up questions like "Berapa penduduknya?" after a
 * Gorontalo conversation — no keyword needed in the current message.
 */
function isGorontaloContext(
  message: string,
  history: { role: "user" | "assistant"; content: string }[]
): boolean {
  const hasKeyword = (text: string) =>
    GORONTALO_KEYWORDS.some((kw) => text.toLowerCase().includes(kw));

  // 1. Check current message
  if (hasKeyword(message)) return true;

  // 2. Check recent history (last 6 messages = last 3 exchanges)
  const recent = history.slice(-6);
  return recent.some((msg) => hasKeyword(msg.content));
}

const SHARED_RULES = `
- Jangan gunakan emoji, emoticon, atau simbol dekoratif apapun.
- Jangan tulis baris "Sumber:" — sumber ditampilkan terpisah oleh sistem.
- Format jawaban dengan rapi: gunakan penomoran (1. 2. 3.) untuk langkah/urutan, bullet (-) untuk daftar non-urutan, **teks tebal** untuk istilah penting, *teks miring* untuk penekanan. Pastikan setiap item list berada di baris baru.
- Bahasa Indonesia yang baku, ringkas, dan mudah dipahami. Maksimal 400 kata.`;

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await req.json() as {
      message: string;
      conversationHistory?: { role: "user" | "assistant"; content: string }[];
    };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const gorontalo = isGorontaloContext(message, conversationHistory);
    let contextBlock = "";
    let sources: { title: string; url: string | null; category: string }[] = [];
    let hasContext = false;

    // Always search Tavily — every factual question needs real sources.
    // Gorontalo queries: append "Gorontalo" so results stay local-focused.
    // General queries: search as-is so the AI has cited evidence, not just training memory.
    try {
      const searchQuery = gorontalo && !message.toLowerCase().includes("gorontalo")
        ? `${message} Gorontalo`
        : message;

      const tavilyRes = await tavilyClient.search(searchQuery, {
        searchDepth: "basic",
        maxResults: 5,
        includeAnswer: false,
        includeDomains: [],
        excludeDomains: [],
      });

      const results = tavilyRes.results ?? [];
      hasContext = results.length > 0;

      contextBlock = results
        .map((r, i) => `[${i + 1}] ${r.title}\nURL: ${r.url}\n${r.content}`)
        .join("\n\n---\n\n");

      sources = results.map((r) => ({
        title: r.title,
        url: r.url,
        category: "Web",
      }));
    } catch (err) {
      console.error("[/api/chat] Tavily error:", err);
    }

    // Build system prompt based on query type
    let systemPrompt: string;

    if (gorontalo) {
      // Gorontalo mode: prioritize search results, fall back to LLM knowledge if needed
      systemPrompt = `Kamu adalah Gorontalo AI — asisten yang ahli tentang Provinsi Gorontalo, Indonesia, sekaligus mampu menjawab pertanyaan umum.

## CARA MENJAWAB:

1. **Jika ada HASIL PENCARIAN yang relevan** di bawah, utamakan informasi dari sana.

2. **Jika hasil pencarian tidak relevan atau kosong**, jawab berdasarkan pengetahuanmu sendiri. Jangan pernah mengatakan "hubungi Dinas" kecuali pertanyaannya memang menyangkut prosedur administrasi pemerintahan (seperti mengurus KTP, izin usaha, dll).

3. **Jika kamu benar-benar tidak tahu**, katakan dengan jujur: "Saya tidak memiliki informasi yang cukup tentang hal ini."

4. ${SHARED_RULES}

${hasContext ? "## HASIL PENCARIAN (gunakan jika relevan):\n\n" + contextBlock : "## CATATAN: Tidak ada hasil pencarian. Jawab berdasarkan pengetahuanmu."}`;
    } else {
      // General knowledge mode — search results available, supplement with LLM
      systemPrompt = `Kamu adalah Gorontalo AI — asisten AI yang membantu menjawab berbagai pertanyaan.

Kamu ahli tentang Provinsi Gorontalo, tetapi juga mampu menjawab pertanyaan umum berdasarkan hasil pencarian web di bawah ini.

## ATURAN:

1. **Utamakan informasi dari HASIL PENCARIAN** di bawah jika tersedia dan relevan.
2. Jika hasil pencarian tidak relevan atau kosong, jawab berdasarkan pengetahuanmu.
3. Jika kamu benar-benar tidak tahu, katakan jujur: "Saya tidak memiliki informasi yang cukup tentang ini."
4. ${SHARED_RULES}

${hasContext ? "## HASIL PENCARIAN:\n\n" + contextBlock : "## CATATAN: Tidak ada hasil pencarian. Jawab berdasarkan pengetahuanmu."}`;
    }

    // Build messages
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    // Call Groq
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 800,
      temperature: gorontalo ? 0.1 : 0.4,
    });

    const aiResponse =
      completion.choices[0]?.message?.content ?? "Maaf, terjadi kesalahan. Coba lagi.";

    // Save conversation (if logged in)
    const supabase = await createClient();
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
