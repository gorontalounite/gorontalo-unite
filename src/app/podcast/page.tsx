import Link from "next/link";

const episodes = ["A conversation about what makes a place feel alive", "The quiet work behind a local creative movement", "A field note from Gorontalo&apos;s coast", "Food, memory, and the people at the table"];

export default function PodcastPage() {
  return <div className="bg-[#2f2f2f] px-5 pb-24 pt-28 text-white sm:px-8 lg:px-12 lg:pt-36"><div className="mx-auto max-w-[1440px]"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#f0bf75]">[Podcast]</p><div className="mt-5 grid gap-12 border-b border-white/20 pb-16 lg:grid-cols-[1.2fr_.8fr]"><h1 className="font-serif text-5xl leading-[.95] sm:text-7xl">Conversations worth sitting with.</h1><p className="self-end text-base leading-relaxed text-white/65">Listen to voices, ideas, and stories that help us see Gorontalo in a new light.</p></div><div className="mt-12 grid gap-px bg-white/20 md:grid-cols-2">{episodes.map((episode, index) => <article key={episode} className="bg-[#2f2f2f] p-7 sm:p-10"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#f0bf75]">Episode {String(index + 1).padStart(2, "0")} · 28 min</p><h2 className="mt-14 font-serif text-3xl leading-tight">{episode}</h2><Link href="/podcast" className="mt-7 inline-block text-xs font-bold uppercase tracking-[.15em] text-[#f0bf75]">Play episode ↗</Link></article>)}</div></div></div>;
}
