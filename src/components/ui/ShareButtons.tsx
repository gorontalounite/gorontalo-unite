"use client";

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

/* Monochrome glyphs so the row can take its colour from the surface it sits on. */
const GLYPH = {
  share:
    "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z",
  facebook:
    "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 011.141.195v3.325a8.623 8.623 0 00-.653-.036 26.805 26.805 0 00-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 00-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  threads:
    "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.32.142 1.48.696 2.562 1.75 3.132 3.048.795 1.807.868 4.75-1.523 7.089-1.828 1.789-4.045 2.594-7.288 2.615zM12.94 12.72c-.2 0-.404.006-.61.017-1.834.104-2.973.946-2.909 2.15.064 1.16 1.32 1.7 2.522 1.634 1.111-.06 2.559-.494 2.803-3.375a10.297 10.297 0 00-1.806-.427z",
  x:
    "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
} as const;

function Glyph({ name }: { name: keyof typeof GLYPH }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px] sm:h-5 sm:w-5">
      <path d={GLYPH[name]} />
    </svg>
  );
}

export default function ShareButtons({ url, title, readMinutes, tone = "surface" }: Props) {
  const [copied, setCopied] = useState(false);
  const canNativeShare = useSyncExternalStore(
    subscribeToBrowserCapabilities,
    () => "share" in navigator,
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

  const onDark = tone === "dark";
  const barClass = onDark
    ? "border border-white/20 bg-black/25 backdrop-blur-sm"
    : "bg-stone-100 dark:bg-zinc-900";
  const iconClass = `grid h-9 w-9 shrink-0 place-items-center rounded-md transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 sm:h-10 sm:w-10 ${
    onDark
      ? "text-white hover:bg-white/15"
      : "text-[#101018] hover:bg-black/10 dark:text-white dark:hover:bg-white/15"
  }`;
  const readClass = onDark
    ? "border-white/25 text-white/85"
    : "border-stone-300 text-stone-600 dark:border-zinc-700 dark:text-zinc-400";

  return (
    <div className={`flex min-h-12 items-center justify-between gap-2 overflow-hidden rounded-xl px-2 py-2 sm:min-h-16 sm:px-4 ${barClass}`}>
      <div className="flex min-w-0 items-center gap-0.5 sm:gap-1">
        <button
          type="button"
          onClick={nativeShare}
          className={iconClass}
          aria-label={copied ? "Link copied" : "Share article"}
          title={copied ? "Link copied" : "Share"}
        >
          <Glyph name="share" />
        </button>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Share on Facebook">
          <Glyph name="facebook" />
        </a>
        <a href={`https://www.threads.net/intent/post?text=${shareText}`} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Share on Threads">
          <Glyph name="threads" />
        </a>
        <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Share on X">
          <Glyph name="x" />
        </a>
        <a href={`https://api.whatsapp.com/send?text=${shareText}`} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Share on WhatsApp">
          <Glyph name="whatsapp" />
        </a>
      </div>
      {readMinutes != null ? (
        <div className={`flex shrink-0 items-center border-l pl-2 text-[10px] font-medium tracking-[.04em] sm:pl-4 sm:text-xs ${readClass}`}>
          {readMinutes} min read
        </div>
      ) : null}
    </div>
  );
}
