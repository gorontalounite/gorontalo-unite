"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";

interface Props {
  url: string;
  title: string;
  compact?: boolean;
  readMinutes?: number;
  /** "dark" sits the bar on a photo hero; "surface" is the default page ground. */
  tone?: "surface" | "dark";
}

const subscribeToBrowserCapabilities = () => () => {};
const SAVED_ARTICLE_EVENT = "gorontalo-unite:saved-article";

function subscribeToSavedArticles(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(SAVED_ARTICLE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SAVED_ARTICLE_EVENT, callback);
  };
}

function SocialIcon({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} width={24} height={24} className="h-5 w-5 object-contain sm:h-6 sm:w-6" />;
}

export default function ShareButtons({ url, title, readMinutes, tone = "surface" }: Props) {
  const [copied, setCopied] = useState(false);
  const canNativeShare = useSyncExternalStore(
    subscribeToBrowserCapabilities,
    () => "share" in navigator,
    () => false,
  );
  const saved = useSyncExternalStore(
    subscribeToSavedArticles,
    () => localStorage.getItem(`saved-article:${url}`) === "1",
    () => false,
  );

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const shareText = encodeURIComponent(`${title} ${url}`);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  const nativeShare = async () => {
    if (!canNativeShare) {
      await copyLink();
      return;
    }
    try {
      await navigator.share({ title, url });
    } catch {
      // The user can dismiss the native share sheet.
    }
  };

  const toggleSaved = () => {
    localStorage.setItem(`saved-article:${url}`, saved ? "0" : "1");
    window.dispatchEvent(new Event(SAVED_ARTICLE_EVENT));
  };

  const iconClass = "grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white text-black transition hover:bg-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 sm:h-10 sm:w-10";

  const onDark = tone === "dark";
  const barClass = onDark
    ? "border border-white/20 bg-black/25 backdrop-blur-sm"
    : "bg-stone-100 dark:bg-zinc-900";
  const readClass = onDark
    ? "border-white/25 text-white/85"
    : "border-stone-300 text-stone-600 dark:border-zinc-700 dark:text-zinc-400";

  return (
    <div className={`flex min-h-12 items-center justify-between gap-2 overflow-hidden rounded-xl px-2 py-2 sm:min-h-16 sm:px-4 ${barClass}`}>
      <div className="flex min-w-0 items-center gap-0.5 sm:gap-1">
        <button type="button" onClick={nativeShare} className={iconClass} aria-label="Share article">
          <SocialIcon src="/social-icons/share.png" alt="Share" />
        </button>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Share on Facebook">
          <SocialIcon src="/social-icons/facebook.jpg" alt="Facebook" />
        </a>
        <a href={`https://www.threads.net/intent/post?text=${shareText}`} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Share on Threads">
          <SocialIcon src="/social-icons/threads.png" alt="Threads" />
        </a>
        <a href={`https://api.whatsapp.com/send?text=${shareText}`} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Share on WhatsApp">
          <SocialIcon src="/social-icons/whatsapp.png" alt="WhatsApp" />
        </a>
        <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Share on X">
          <SocialIcon src="/social-icons/x.png" alt="X" />
        </a>
        <button type="button" onClick={copyLink} className={iconClass} aria-label={copied ? "Link copied" : "Copy article URL"} title={copied ? "Copied" : "Copy URL"}>
          <SocialIcon src="/social-icons/url.png" alt="Copy URL" />
        </button>
        <button type="button" onClick={toggleSaved} className={`${iconClass} ${saved ? "ring-2 ring-amber-400" : ""}`} aria-label={saved ? "Remove saved article" : "Save article"} aria-pressed={saved}>
          <SocialIcon src="/social-icons/save.webp" alt="Save" />
        </button>
      </div>
      {readMinutes != null ? (
        <div className={`flex shrink-0 items-center border-l pl-2 text-[10px] font-medium tracking-[.04em] sm:pl-4 sm:text-xs ${readClass}`}>
          {readMinutes} min read
        </div>
      ) : null}
    </div>
  );
}
