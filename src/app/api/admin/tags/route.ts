import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { TAG_ALIASES } from "@/app/tag/[tag]/aliases";

/**
 * Tags already in use, with how many stories carry each, for the editor's
 * suggestions. Retired spellings come along so the editor can steer a writer
 * typing "penas2026" to the canonical "penasxvii".
 */
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("articles")
    .select("tags")
    .is("deleted_at", null);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    for (const raw of (row.tags as string[] | null) ?? []) {
      if (raw.startsWith("stack:")) continue;
      const tag = raw.trim().toLowerCase();
      if (tag) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  const tags = [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));

  return NextResponse.json({ tags, aliases: TAG_ALIASES });
}
