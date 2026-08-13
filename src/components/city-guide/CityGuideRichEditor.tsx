"use client";

import { useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import type { JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import type { Block } from "@/components/editor/types";

const emptyDoc: JSONContent = { type: "doc", content: [{ type: "paragraph" }] };
const text = (node: JSONContent): string => node.type === "text" ? node.text ?? "" : (node.content ?? []).map(text).join("");
function fromBlocks(blocks: Block[]): JSONContent {
  const content = blocks.flatMap((block): JSONContent[] => {
    if (block.type === "heading") return [{ type: "heading", attrs: { level: Number(block.attrs.level) || 2 }, content: block.content ? [{ type: "text", text: block.content }] : [] }];
    if (block.type === "list") return [{ type: block.attrs.ordered ? "orderedList" : "bulletList", content: ((block.attrs.items as string[]) ?? []).map((item) => ({ type: "listItem", content: [{ type: "paragraph", content: item ? [{ type: "text", text: item }] : [] }] })) }];
    if (block.type === "quote") return [{ type: "blockquote", content: [{ type: "paragraph", content: block.content ? [{ type: "text", text: block.content }] : [] }] }];
    if (block.type === "image" && block.attrs.url) return [{ type: "image", attrs: { src: String(block.attrs.url), alt: String(block.attrs.alt ?? ""), title: String(block.attrs.caption ?? "") } }];
    return [{ type: "paragraph", content: block.content ? [{ type: "text", text: block.content }] : [] }];
  });
  return { type: "doc", content: content.length ? content : emptyDoc.content };
}
function toBlocks(doc: JSONContent): Block[] {
  const create = (type: Block["type"], content: string, attrs: Record<string, unknown> = {}): Block => ({ id: crypto.randomUUID(), type, content, attrs });
  return (doc.content ?? []).flatMap((node): Block[] => {
    if (node.type === "heading") return [create("heading", text(node), { level: node.attrs?.level ?? 2 })];
    if (node.type === "bulletList" || node.type === "orderedList") return [create("list", "", { ordered: node.type === "orderedList", items: (node.content ?? []).map(text) })];
    if (node.type === "blockquote") return [create("quote", text(node))];
    if (node.type === "image") return [create("image", "", { url: node.attrs?.src ?? "", alt: node.attrs?.alt ?? "", caption: node.attrs?.title ?? "" })];
    return [create("paragraph", text(node))];
  }).filter((block) => block.content || block.type !== "paragraph");
}

export default function CityGuideRichEditor({ value, onChange }: { value: Block[]; onChange: (blocks: Block[]) => void }) {
  const fileInput = useRef<HTMLInputElement>(null);
  const editor = useEditor({ immediatelyRender: false, extensions: [StarterKit.configure({ heading: { levels: [1, 2, 3] } }), Image.configure({ allowBase64: false }), Link.configure({ openOnClick: false, autolink: true }), Placeholder.configure({ placeholder: "Tulis panduan tempat ini: itinerary, fasilitas, menu, aturan, atau tips kunjungan…" })], content: fromBlocks(value), editorProps: { attributes: { class: "tiptap-editor min-h-72" } }, onUpdate: ({ editor }) => onChange(toBlocks(editor.getJSON())) });
  async function upload(file: File) { const form = new FormData(); form.append("file", file); const response = await fetch("/api/admin/upload", { method: "POST", body: form }); const data = await response.json(); if (response.ok && data.url) editor?.chain().focus().setImage({ src: data.url }).run(); }
  if (!editor) return <div className="rounded-xl border border-gray-200 p-6 text-sm text-gray-400">Memuat editor…</div>;
  const button = (label: string, active: boolean, action: () => void, body: React.ReactNode) => <button key={label} type="button" title={label} onClick={action} className={`rounded-md px-2 py-1.5 text-xs font-semibold ${active ? "bg-amber-300 text-zinc-950" : "text-gray-600 hover:bg-gray-100"}`}>{body}</button>;
  return <div className="rounded-xl border border-gray-200 bg-white"><div className="sticky top-0 z-10 flex flex-wrap gap-0.5 border-b border-gray-200 bg-white p-2">{button("Tebal", editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), "B")}{button("Miring", editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), <em>I</em>)}{button("H1", editor.isActive("heading", { level: 1 }), () => editor.chain().focus().toggleHeading({ level: 1 }).run(), "H1")}{button("H2", editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), "H2")}{button("H3", editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), "H3")}{button("Daftar", editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), "•≡")}{button("Quote", editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), "❝")}{button("Gambar", false, () => fileInput.current?.click(), "🖼")}{button("Tautan", false, () => { const url = window.prompt("URL"); if (url) editor.chain().focus().setLink({ href: url }).run(); }, "↗")}<input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) upload(file); event.currentTarget.value = ""; }} /></div><EditorContent editor={editor} className="p-5" /></div>;
}
