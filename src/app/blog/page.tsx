import Link from "next/link";

const posts = [
  ["Culture", "Karawo, bahasa visual yang terus tumbuh dari Gorontalo", "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85"],
  ["Travel", "Pesisir yang membuat orang ingin tinggal lebih lama", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"],
  ["People", "Mereka yang merawat ruang kreatif untuk generasi baru", "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85"],
  ["Food", "Rasa yang mengingatkan kita pada rumah", "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"],
  ["Nature", "Melihat laut Gorontalo dengan cara yang lebih pelan", "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1200&q=85"],
  ["Community", "Komunitas kecil yang mengubah cara kita berkumpul", "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85"],
];

export default function BlogPage() {
  return <div className="bg-[#f7f7f5] px-5 pb-20 pt-28 sm:px-8 lg:px-12 lg:pt-36"><div className="mx-auto max-w-[1440px]"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8a6b3f]">[All stories]</p><div className="mt-4 flex flex-wrap items-end justify-between gap-5 border-b border-[#dedede] pb-7"><h1 className="font-serif text-5xl sm:text-7xl">The Journal</h1><div className="flex gap-3 overflow-x-auto text-xs font-semibold"><span>All</span><span>Culture</span><span>Travel</span><span>People</span><span>Food</span></div></div><div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{posts.map(([category, title, image], index) => <article key={title} className="group"><div className="aspect-[4/3] overflow-hidden bg-[#e9e9e9]"><img src={image} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" /></div><p className="mt-4 text-[10px] font-bold uppercase tracking-[.18em] text-[#8a6b3f]">[No. {String(index + 1).padStart(3, "0")}] &nbsp; {category}</p><h2 className="mt-3 font-serif text-3xl leading-tight">{title}</h2><p className="mt-3 text-sm leading-relaxed text-[#777]">Cerita dan gagasan yang memberi cara baru untuk melihat Gorontalo.</p><Link href="/blog" className="mt-5 inline-block text-xs font-bold uppercase tracking-[.15em] underline decoration-[#f0bf75] underline-offset-4">Read article</Link></article>)}</div></div></div>;
}
