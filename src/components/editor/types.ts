export type BlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "gallery"
  | "list"
  | "quote"
  | "code"
  | "divider"
  | "embed"
  | "table"
  | "callout";

export interface Block {
  id: string;
  type: BlockType;
  content: string;        // primary text / markdown-ish content
  attrs: Record<string, unknown>;
}

/* ─── Per-block attr shapes ──────────────────────────────────── */
export interface ParagraphAttrs {
  align?: "left" | "center" | "right";
  fontSize?: "sm" | "base" | "lg" | "xl";
}
export interface HeadingAttrs {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: "left" | "center" | "right";
}
export interface ImageAttrs {
  url?: string;
  alt?: string;
  caption?: string;
  size?: "small" | "medium" | "large" | "full";
  align?: "left" | "center" | "right";
}
export interface GalleryAttrs {
  images?: Array<{ url: string; caption?: string }>;
  columns?: 2 | 3 | 4;
}
export interface ListAttrs {
  ordered?: boolean;
  items?: string[];
}
export interface QuoteAttrs {
  cite?: string;
}
export interface CodeAttrs {
  language?: string;
}
export interface EmbedAttrs {
  url?: string;
  caption?: string;
}
export interface TableAttrs {
  rows?: number;
  cols?: number;
  hasHeader?: boolean;
}
export interface CalloutAttrs {
  type?: "info" | "warning" | "success" | "error";
  icon?: string;
}

/* ─── Block meta (for the inserter panel) ────────────────────── */
export interface BlockMeta {
  type: BlockType;
  label: string;
  description: string;
  icon: string;
  defaultContent: string;
  defaultAttrs: Record<string, unknown>;
}

export const BLOCK_REGISTRY: BlockMeta[] = [
  {
    type: "paragraph",
    label: "Paragraf",
    description: "Teks biasa / konten utama",
    icon: "¶",
    defaultContent: "",
    defaultAttrs: { align: "left" },
  },
  {
    type: "heading",
    label: "Judul",
    description: "H1–H6 untuk struktur konten",
    icon: "H",
    defaultContent: "",
    defaultAttrs: { level: 2, align: "left" },
  },
  {
    type: "image",
    label: "Gambar",
    description: "Satu gambar dengan caption opsional",
    icon: "🖼",
    defaultContent: "",
    defaultAttrs: { url: "", alt: "", caption: "", size: "full", align: "center" },
  },
  {
    type: "gallery",
    label: "Galeri",
    description: "Grid beberapa gambar",
    icon: "⊞",
    defaultContent: "",
    defaultAttrs: { images: [], columns: 2 },
  },
  {
    type: "list",
    label: "Daftar",
    description: "Bullet list atau numbered list",
    icon: "≡",
    defaultContent: "",
    defaultAttrs: { ordered: false, items: [""] },
  },
  {
    type: "quote",
    label: "Kutipan",
    description: "Blockquote dengan sumber opsional",
    icon: "❝",
    defaultContent: "",
    defaultAttrs: { cite: "" },
  },
  {
    type: "code",
    label: "Kode",
    description: "Blok kode program",
    icon: "</>",
    defaultContent: "",
    defaultAttrs: { language: "javascript" },
  },
  {
    type: "divider",
    label: "Pembatas",
    description: "Garis pemisah horizontal",
    icon: "—",
    defaultContent: "",
    defaultAttrs: {},
  },
  {
    type: "embed",
    label: "Embed",
    description: "YouTube, video, atau URL embed",
    icon: "▷",
    defaultContent: "",
    defaultAttrs: { url: "", caption: "" },
  },
  {
    type: "table",
    label: "Tabel",
    description: "Tabel HTML dengan baris dan kolom",
    icon: "⊞",
    defaultContent: JSON.stringify([["", "", ""], ["", "", ""], ["", "", ""]]),
    defaultAttrs: { rows: 3, cols: 3, hasHeader: true },
  },
  {
    type: "callout",
    label: "Callout",
    description: "Kotak info/peringatan/sukses/error",
    icon: "💬",
    defaultContent: "",
    defaultAttrs: { type: "info", icon: "ℹ️" },
  },
];

/* ─── Helpers ─────────────────────────────────────────────────── */
export function createBlock(type: BlockType): Block {
  const meta = BLOCK_REGISTRY.find((b) => b.type === type)!;
  return {
    id: crypto.randomUUID(),
    type,
    content: meta.defaultContent,
    attrs: { ...meta.defaultAttrs },
  };
}

export function blocksToText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "paragraph": return b.content;
        case "heading": {
          const level = (b.attrs as HeadingAttrs).level ?? 2;
          return "#".repeat(level) + " " + b.content;
        }
        case "list": {
          const items = (b.attrs as ListAttrs).items ?? [];
          const ordered = (b.attrs as ListAttrs).ordered;
          return items.map((it, i) => (ordered ? `${i + 1}. ${it}` : `- ${it}`)).join("\n");
        }
        case "quote": return `> ${b.content}`;
        case "code": return "```\n" + b.content + "\n```";
        case "divider": return "---";
        case "image": return `![${(b.attrs as ImageAttrs).alt ?? ""}](${(b.attrs as ImageAttrs).url ?? ""})`;
        case "embed": return `[embed](${(b.attrs as EmbedAttrs).url ?? ""})`;
        case "table": return "[table]";
        case "callout": return `[${(b.attrs as CalloutAttrs).type ?? "info"}] ${b.content}`;
        default: return b.content;
      }
    })
    .join("\n\n");
}
