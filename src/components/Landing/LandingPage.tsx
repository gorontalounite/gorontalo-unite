import Link from "next/link";

type Story = {
  number: string;
  category: string;
  title: string;
  summary: string;
  image: string;
};

const stories: Story[] = [
  { number: "001", category: "Culture", title: "Karawo, bahasa visual yang terus tumbuh dari Gorontalo", summary: "Menyusuri detail, tangan-tangan terampil, dan cerita di balik kain khas Gorontalo.", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85" },
  { number: "002", category: "Travel", title: "Pesisir yang membuat orang ingin tinggal lebih lama", summary: "Catatan perjalanan pelan dari sisi lain Gorontalo yang jarang dibicarakan.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85" },
  { number: "003", category: "People", title: "Mereka yang merawat ruang kreatif untuk generasi baru", summary: "Cerita orang-orang lokal yang memulai sesuatu dengan sumber daya seadanya.", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85" },
  { number: "004", category: "Food", title: "Rasa yang mengingatkan kita pada rumah", summary: "Mengenal meja makan, resep, dan perjumpaan yang khas dari Gorontalo.", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85" },
  { number: "005", category: "Nature", title: "Melihat laut Gorontalo dengan cara yang lebih pelan", summary: "Sebuah pengingat untuk menikmati perjalanan, bukan hanya tujuannya.", image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1200&q=85" },
  { number: "006", category: "Community", title: "Komunitas kecil yang mengubah cara kita berkumpul", summary: "Dari perbincangan sederhana lahir gerakan yang terasa dekat dan berguna.", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85" },
];

function StoryCard({ story, wide = false }: { story: Story; wide?: boolean }) {
  return (
    <article className={wide ? "grid overflow-hidden border border-[#dedede] bg-white md:grid-cols-2" : "group"}>
      <div className={wide ? "min-h-[260px]" : "aspect-[4/3] overflow-hidden bg-[#e9e9e9]"}>
        <img src={story.image} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className={wide ? "flex flex-col justify-center p-7 sm:p-10" : "pt-4"}>
        <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#8a6b3f]">[No.{story.number}] &nbsp; {story.category}</p>
        <h3 className={wide ? "mt-4 font-serif text-3xl leading-[1.1] text-[#2f2f2f] sm:text-5xl" : "mt-3 font-serif text-2xl leading-tight text-[#2f2f2f]"}>{story.title}</h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#777]">{story.summary}</p>
        <Link href="/blog" className="mt-5 text-xs font-bold uppercase tracking-[.15em] underline decoration-[#f0bf75] underline-offset-4">Read article</Link>
      </div>
    </article>
  );
}

export default function LandingPage() {
  return (
    <div className="overflow-hidden bg-[#f7f7f5] text-[#2f2f2f]">
      <section className="border-b border-[#dedede] px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#8a6b3f]">Gorontalo Unite — independent local journal</p>
              <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-[.94] tracking-[-.04em] sm:text-7xl lg:text-[6.5rem]">Stories for people who stay curious.</h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#777] sm:text-lg">A new editorial home for people, places, food, culture, and thoughtful conversations from Gorontalo.</p>
            </div>
            <div className="border-t border-[#2f2f2f] pt-5">
              <p className="font-serif text-3xl leading-tight">Don&apos;t miss a thing.</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#777]">A compact weekly read, delivered to your inbox.</p>
              <form className="mt-8 flex border-b border-[#2f2f2f] pb-3"><input aria-label="Email" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#999]" /><button type="button" className="text-xs font-bold uppercase tracking-[.16em]">Subscribe ↗</button></form>
            </div>
          </div>
          <div className="mt-16 flex gap-2 overflow-x-auto border-y border-[#dedede] py-4 no-scrollbar">{["All", "Finance", "Health", "Business", "Food", "Travel", "Lifestyle", "Tech"].map((item) => <button type="button" key={item} className="shrink-0 rounded-full border border-[#d5d5d2] bg-white px-4 py-2 text-xs font-semibold transition hover:bg-[#2f2f2f] hover:text-white">{item}</button>)}</div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto max-w-[1440px]"><StoryCard story={stories[0]} wide /></div></section>

      <section className="bg-[#f0bf75] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1440px]"><div className="flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em]">[Recent posts]</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Read what&apos;s new</h2></div><Link href="/blog" className="text-xs font-bold uppercase tracking-[.15em]">View all ↗</Link></div><div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{stories.slice(1).map((story) => <StoryCard key={story.number} story={story} />)}</div></div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1440px]"><div className="flex items-end justify-between border-b border-[#dedede] pb-5"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8a6b3f]">[Editor&apos;s choice]</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Worth your time</h2></div><span className="text-xs text-[#777]">Selected by our editors</span></div><div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_.6fr]"><StoryCard story={stories[2]} wide /><div className="grid content-start gap-7">{stories.slice(3, 5).map((story) => <StoryCard key={story.number} story={story} />)}</div></div></div></section>

      <section className="bg-[#2f2f2f] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#f0bf75]">[Watch]</p><h2 className="mt-4 font-serif text-5xl leading-tight">Watch and listen.</h2><p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">Conversations, portraits, and moving stories from a changing Gorontalo.</p><Link href="/podcast" className="mt-8 inline-block text-xs font-bold uppercase tracking-[.15em] text-[#f0bf75]">Explore audio ↗</Link></div><div className="grid gap-px bg-white/20 sm:grid-cols-3">{stories.slice(0, 3).map((story) => <article key={story.number} className="bg-[#2f2f2f] p-4"><div className="relative aspect-video overflow-hidden"><img src={story.image} alt="" className="size-full object-cover opacity-75" /><span className="absolute inset-0 grid place-items-center text-3xl">◯</span></div><p className="mt-4 text-[10px] uppercase tracking-[.16em] text-[#f0bf75]">Video · 08:42</p><h3 className="mt-2 font-serif text-xl leading-tight">{story.title}</h3></article>)}</div></div></section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1440px]"><div className="grid gap-10 border-y border-[#dedede] py-12 lg:grid-cols-[.7fr_1.3fr]"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8a6b3f]">[Our point of view]</p><div><h2 className="font-serif text-4xl leading-tight sm:text-6xl">A modern journal, rooted in a place we love.</h2><p className="mt-6 max-w-2xl text-base leading-relaxed text-[#777]">Gorontalo Unite is a place to discover the people, ideas, and everyday details that make this region feel alive.</p><Link href="/about" className="mt-7 inline-block text-xs font-bold uppercase tracking-[.15em] underline decoration-[#f0bf75] underline-offset-4">About Gorontalo Unite</Link></div></div></div></section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28"><div className="mx-auto max-w-[1440px] border border-[#dedede] bg-white px-6 py-14 text-center sm:px-12"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8a6b3f]">[Newsletter]</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">Stay in the loop.</h2><p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#777]">A weekly dose of considered stories, sent with care.</p><form className="mx-auto mt-8 flex max-w-md border-b border-[#2f2f2f] pb-3"><input aria-label="Email" placeholder="Email address" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /><button type="button" className="text-xs font-bold uppercase tracking-[.15em]">Join ↗</button></form></div></section>
    </div>
  );
}
