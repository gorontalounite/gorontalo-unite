"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds?: { process: () => void } };
  }
}

function permalink(value: string) {
  try {
    const url = new URL(value);
    const parts = url.pathname.split("/").filter(Boolean);
    const index = parts.findIndex((part) => part === "p" || part === "reel" || part === "tv");
    if (index < 0 || !parts[index + 1]) return value;
    return `https://www.instagram.com/${parts[index]}/${parts[index + 1]}/?utm_source=ig_embed&utm_campaign=loading`;
  } catch {
    return value;
  }
}

export default function InstagramEmbedGrid({ posts }: { posts: string[] }) {
  const key = posts.join("|");

  useEffect(() => {
    const process = () => window.instgrm?.Embeds?.process();
    const current = document.querySelector<HTMLScriptElement>('script[data-gorontalo-instagram-embed]');
    if (current) {
      process();
      return;
    }
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    script.dataset.gorontaloInstagramEmbed = "true";
    script.onload = process;
    document.body.appendChild(script);
  }, [key]);

  return <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    {posts.slice(0, 9).map((post) => {
      const url = permalink(post);
      return <div key={post} className="min-w-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
        <blockquote className="instagram-media !m-0 !min-w-0 !w-full" data-instgrm-captioned data-instgrm-permalink={url} data-instgrm-version="14">
          <a href={url} target="_blank" rel="noreferrer" className="block p-5 text-sm font-medium text-amber-700 underline">Lihat post Instagram</a>
        </blockquote>
      </div>;
    })}
  </div>;
}
