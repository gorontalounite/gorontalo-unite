import type { Block } from "@/components/editor/types";

export interface AutoLink {
  start: number;
  end: number;
  href: string;
}

/** Tags so broad that linking them would only add noise to every story. */
const TOO_BROAD = new Set(["gorontalo"]);

/** At most this many tag links per story, so the body still reads as prose. */
const MAX_LINKS = 6;

/** The longest phrase (in words) that can spell a tag, e.g. "Pemprov Gorontalo" → 2. */
const MAX_WORDS = 4;

const key = (word: string) => word.toLocaleLowerCase("id-ID").replace(/[^\p{L}\p{N}]/gu, "");

/**
 * Finds the first mention of each hub tag in the story's plain-text
 * paragraphs. Tags are stored hashtag-style ("gusnarismail"), so a run of up
 * to four words is joined and compared: "Gusnar Ismail" matches gusnarismail.
 * Returns character ranges per paragraph block id.
 */
export function findTagLinks(blocks: Block[], hubTags: ReadonlySet<string>): Record<string, AutoLink[]> {
  const links: Record<string, AutoLink[]> = {};
  const used = new Set<string>();
  let total = 0;

  for (const block of blocks) {
    if (total >= MAX_LINKS) break;
    if (block.type !== "paragraph") continue;
    const text = block.content ?? "";
    if (!text || /<[a-z][\s\S]*>/i.test(text)) continue;

    const words = [...text.matchAll(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu)].map((m) => ({
      text: m[0].replace(/[.'’-]+$/u, ""),
      start: m.index ?? 0,
    }));
    const ranges: AutoLink[] = [];
    let i = 0;

    while (i < words.length && total < MAX_LINKS) {
      let matched = 0;
      for (let n = Math.min(MAX_WORDS, words.length - i); n >= 1; n -= 1) {
        const tag = words.slice(i, i + n).map((w) => key(w.text)).join("");
        if (tag.length < 3 || TOO_BROAD.has(tag) || used.has(tag) || !hubTags.has(tag)) continue;
        const last = words[i + n - 1];
        ranges.push({
          start: words[i].start,
          end: last.start + last.text.length,
          href: `/tag/${encodeURIComponent(tag)}`,
        });
        used.add(tag);
        total += 1;
        matched = n;
        break;
      }
      i += matched || 1;
    }

    if (ranges.length) links[block.id] = ranges;
  }

  return links;
}

export interface ReadAlso {
  slug: string;
  title: string;
}

/**
 * The story sharing the most tags with this one (newest first on a tie), for
 * a "Read also" line inside the body. Returns null when nothing overlaps.
 */
export function pickReadAlso(
  slug: string,
  tags: readonly string[],
  candidates: ReadonlyArray<{ slug: string; title: string; tags: string[] | null; published_at: string | null }>,
  exclude: ReadonlySet<string> = new Set(),
): ReadAlso | null {
  const own = new Set(tags.map((t) => t.toLowerCase()));
  let best: { score: number; date: string; item: ReadAlso } | null = null;
  for (const c of candidates) {
    if (c.slug === slug || exclude.has(c.slug)) continue;
    const score = (c.tags ?? []).filter((t) => own.has(t.toLowerCase()) && !TOO_BROAD.has(t.toLowerCase())).length;
    if (score === 0) continue;
    const date = c.published_at ?? "";
    if (!best || score > best.score || (score === best.score && date > best.date)) {
      best = { score, date, item: { slug: c.slug, title: c.title } };
    }
  }
  return best?.item ?? null;
}
