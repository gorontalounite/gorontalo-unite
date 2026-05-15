import { NextRequest } from "next/server";
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

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
 */
function isGorontaloContext(
  message: string,
  history: { role: "user" | "assistant"; content: string }[]
): boolean {
  const hasKeyword = (text: string) =>
    GORONTALO_KEYWORDS.some((kw) => text.toLowerCase().includes(kw));

  if (hasKeyword(message)) return true;
  const recent = history.slice(-6);
  return recent.some((msg) => hasKeyword(msg.content));
}

const SHARED_RULES = `
- Jangan gunakan emoji, emoticon, atau simbol dekoratif apapun.
- Jangan tulis baris "Sumber:" dalam jawaban — sistem menampilkannya secara terpisah.
- Jangan menyebut "berdasarkan hasil pencarian saya" atau frase sejenisnya.
- Format jawaban dengan rapi: penomoran (1. 2. 3.) untuk langkah/urutan, bullet (-) untuk daftar, **teks tebal** untuk istilah penting, *teks miring* untuk penekanan. Setiap item list di baris baru.
- Bahasa Indonesia baku, ringkas, maksimal 400 kata.
- Jika tidak memiliki informasi yang cukup, cukup katakan "Saya tidak memiliki informasi yang cukup tentang hal ini." — jangan mengarang dan jangan minta hubungi Dinas kecuali pertanyaan memang tentang prosedur pemerintahan.`;

const PRIMARY_MODEL = "llama-3.3-70b-versatile";
const FALLBACK_MODEL = "mixtral-8x7b-32768";

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await req.json() as {
      message: string;
      conversationHistory?: { role: "user" | "assistant"; content: string }[];
    };

    if (!message?.trim()) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const gorontalo = isGorontaloContext(message, conversationHistory);
    let contextBlock = "";
    let sources: { title: string; url: string | null; category: string }[] = [];
    let hasContext = false;

    // KB semantic search — runs in parallel with Tavily
    let kbBlock = "";
    try {
      const adminClient = createAdminClient();
      let kbChunks: { id: string; title: string; content: string; category: string }[] = [];

      // Try vector search first, fall back to full-text
      try {
        const embRes = await groq.embeddings.create({
          model: "nomic-ai/nomic-embed-text-v1.5",
          input: message.slice(0, 2000),
        });
        const queryVec = embRes.data[0]?.embedding;
        if (queryVec) {
          const { data } = await adminClient.rpc("match_knowledge_base", {
            query_embedding: JSON.stringify(queryVec),
            match_count: 4,
            min_similarity: 0.45,
          });
          kbChunks = (data ?? []) as typeof kbChunks;
        }
      } catch {
        // Vector search failed, try full-text
        const { data } = await adminClient.rpc("search_knowledge_base_fts", {
          search_query: message,
          match_count: 4,
        });
        kbChunks = (data ?? []) as typeof kbChunks;
      }

      if (kbChunks.length > 0) {
        kbBlock = "## DOKUMEN INTERNAL (gunakan jika relevan):\n\n" +
          kbChunks.map((c, i) => `[KB${i + 1}] ${c.title}\n${c.content}`).join("\n\n---\n\n");
      }
    } catch (err) {
      console.error("[/api/chat] KB retrieval error:", err);
    }

    // Tavily search (non-streaming, awaited before Groq stream starts)
    try {
      const searchQuery =
        gorontalo && !message.toLowerCase().includes("gorontalo")
          ? `${message} Gorontalo`
          : message;

      const tavilyRes = await tavilyClient.search(searchQuery, {
        searchDepth: "basic",
        maxResults: 7,
        includeAnswer: false,
        includeDomains: [],
        excludeDomains: [],
      });

      const MIN_SCORE = 0.45;
      const results = (tavilyRes.results ?? [])
        .filter((r) => (r.score ?? 0) >= MIN_SCORE)
        .slice(0, 5);

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

    // Build system prompt
    let systemPrompt: string;

    if (gorontalo) {
      systemPrompt = `Kamu adalah Gorontalo AI — asisten yang ahli tentang Provinsi Gorontalo, Indonesia, sekaligus mampu menjawab pertanyaan umum.

## CARA MENJAWAB:

1. **Jika ada DOKUMEN INTERNAL**, utamakan informasi dari sana — itu adalah data resmi yang sudah diverifikasi.
2. **Jika ada HASIL PENCARIAN yang relevan**, gunakan sebagai pelengkap.
3. **Jika tidak ada keduanya**, jawab berdasarkan pengetahuanmu. Jangan katakan "hubungi Dinas" kecuali soal prosedur administrasi resmi.
4. **Jika benar-benar tidak tahu**, katakan: "Saya tidak memiliki informasi yang cukup tentang hal ini."

${SHARED_RULES}

${kbBlock}

${hasContext ? "## HASIL PENCARIAN WEB (gunakan jika relevan):\n\n" + contextBlock : ""}`;
    } else {
      systemPrompt = `Kamu adalah Gorontalo AI — asisten AI yang membantu menjawab berbagai pertanyaan.

## ATURAN:
1. **Utamakan DOKUMEN INTERNAL** jika tersedia dan relevan.
2. **Gunakan HASIL PENCARIAN WEB** sebagai pelengkap.
3. Jika tidak ada keduanya, jawab berdasarkan pengetahuanmu.
4. Jika benar-benar tidak tahu: "Saya tidak memiliki informasi yang cukup tentang ini."

${SHARED_RULES}

${kbBlock}

${hasContext ? "## HASIL PENCARIAN WEB:\n\n" + contextBlock : ""}`;
    }

    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const groqParams = {
      messages,
      max_tokens: 800,
      temperature: gorontalo ? 0.1 : 0.4,
      stream: true as const,
    };

    // Try primary model, fall back to mixtral on error
    let streamIterable: AsyncIterable<Groq.Chat.ChatCompletionChunk>;
    try {
      streamIterable = await groq.chat.completions.create({
        model: PRIMARY_MODEL,
        ...groqParams,
      });
    } catch (primaryErr) {
      console.error("[/api/chat] Primary model error, retrying with fallback:", primaryErr);
      streamIterable = await groq.chat.completions.create({
        model: FALLBACK_MODEL,
        ...groqParams,
      });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";

        try {
          for await (const chunk of streamIterable) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              fullResponse += text;
              controller.enqueue(
                encoder.encode(
                  JSON.stringify({ type: "chunk", text }) + "\n"
                )
              );
            }
          }

          // Send sources after streaming completes
          controller.enqueue(
            encoder.encode(
              JSON.stringify({ type: "sources", sources }) + "\n"
            )
          );

          // Send done
          controller.enqueue(
            encoder.encode(JSON.stringify({ type: "done" }) + "\n")
          );

          // Persist to Supabase (fire-and-forget, don't block the stream)
          try {
            const supabase = await createClient();
            const {
              data: { user },
            } = await supabase.auth.getUser();
            if (user) {
              await supabase.from("conversations").insert({
                user_id: user.id,
                user_message: message,
                ai_response: fullResponse,
                sources: sources as unknown as never,
              });
            }
          } catch (dbErr) {
            console.error("[/api/chat] Supabase insert error:", dbErr);
          }
        } catch (streamErr) {
          console.error("[/api/chat] Stream error:", streamErr);
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "chunk",
                text: "Maaf, terjadi kesalahan saat memuat respons. Coba lagi.",
              }) + "\n"
            )
          );
          controller.enqueue(
            encoder.encode(JSON.stringify({ type: "done" }) + "\n")
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("[/api/chat] Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
