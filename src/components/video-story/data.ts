/**
 * Video Story: the sponsored reels, presented as video rather than as another
 * row of article cards.
 *
 * It replaces what shipped as "Editor Choice", which drew from articles. The
 * material turned out to be the endorsement reels — the same set behind
 * /reels?kategori=sponsored — so the source moved with the name.
 */

export const VIDEO_STORY_TITLE = "Video Story";
export const VIDEO_STORY_KEY = "video-story";
export const VIDEO_STORY_HREF = `/category/${VIDEO_STORY_KEY}`;

/** Ten on the homepage: enough to be worth an arrow, short of a second screenful. */
export const HOME_SLIDES = 10;

export interface VideoStoryItem {
  id: string;
  title: string;
  username: string;
  permalink: string;
  thumbnail: string | null;
  durationSec: number | null;
  publishedAt: string;
  views: number;
}

/** mm:ss, the way a player writes it. */
export function runtime(seconds: number) {
  const whole = Math.max(0, Math.round(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

/**
 * A caption is not a headline. The first sentence usually is, so the card
 * shows that much and stops before the hashtags.
 */
export function headline(caption: string) {
  const firstLine = caption.split("\n").find((line) => line.trim().length > 0) ?? "";
  const sentence = firstLine.split(/(?<=[.!?])\s/)[0] ?? firstLine;
  const clean = sentence.replace(/#\S+/g, "").replace(/\s+/g, " ").trim();
  return (clean.length > 90 ? `${clean.slice(0, 90).trimEnd()}…` : clean) || "Tanpa judul";
}

