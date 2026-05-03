"use client";

import { Block, CalloutAttrs } from "../types";

interface Props {
  block: Block;
  onChange: (b: Block) => void;
  selected: boolean;
}

type CalloutType = "info" | "warning" | "success" | "error";

const CALLOUT_STYLES: Record<CalloutType, { border: string; bg: string; iconDefault: string }> = {
  info:    { border: "border-blue-600",    bg: "bg-blue-50 dark:bg-blue-950/30",    iconDefault: "ℹ️" },
  warning: { border: "border-amber-700",   bg: "bg-amber-50 dark:bg-amber-950/30",  iconDefault: "⚠️" },
  success: { border: "border-emerald-700", bg: "bg-emerald-50 dark:bg-emerald-950/30", iconDefault: "✅" },
  error:   { border: "border-red-600",     bg: "bg-red-50 dark:bg-red-950/30",      iconDefault: "❌" },
};

const ICON_OPTIONS: { icon: string; label: string }[] = [
  { icon: "ℹ️",  label: "Info" },
  { icon: "⚠️",  label: "Peringatan" },
  { icon: "✅",  label: "Sukses" },
  { icon: "❌",  label: "Error" },
  { icon: "💡",  label: "Idea" },
  { icon: "📌",  label: "Pin" },
  { icon: "🔔",  label: "Notif" },
  { icon: "🚀",  label: "Roket" },
];

export default function CalloutBlock({ block, onChange, selected }: Props) {
  const attrs = block.attrs as CalloutAttrs;
  const type: CalloutType = (attrs.type as CalloutType) ?? "info";
  const style = CALLOUT_STYLES[type];
  const icon = attrs.icon ?? style.iconDefault;

  const updateType = (newType: CalloutType) => {
    onChange({
      ...block,
      attrs: { ...block.attrs, type: newType, icon: CALLOUT_STYLES[newType].iconDefault },
    });
  };

  const updateIcon = (newIcon: string) => {
    onChange({ ...block, attrs: { ...block.attrs, icon: newIcon } });
  };

  return (
    <div className="space-y-2">
      {selected && (
        <div className="flex flex-wrap gap-1 p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-xl text-xs">
          {(["info", "warning", "success", "error"] as CalloutType[]).map((t) => (
            <button
              key={t}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); updateType(t); }}
              className={`px-2 py-1 rounded-lg border capitalize transition-colors ${
                type === t
                  ? "border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "border-gray-200 dark:border-zinc-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
              }`}
            >
              {CALLOUT_STYLES[t].iconDefault} {t}
            </button>
          ))}
          <div className="w-px h-5 bg-gray-200 dark:bg-zinc-600 self-center mx-0.5" />
          {ICON_OPTIONS.map((opt) => (
            <button
              key={opt.icon}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); updateIcon(opt.icon); }}
              title={opt.label}
              className={`px-1.5 py-1 rounded-lg border transition-colors ${
                icon === opt.icon
                  ? "border-blue-400 bg-blue-50 dark:bg-blue-900/30"
                  : "border-gray-200 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-700"
              }`}
            >
              {opt.icon}
            </button>
          ))}
        </div>
      )}

      <div className={`border-l-4 ${style.border} ${style.bg} rounded-r-xl px-4 py-3 flex gap-3`}>
        <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
        <textarea
          value={block.content}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          placeholder="Tulis konten callout di sini…"
          rows={2}
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300 resize-none placeholder:text-gray-300 dark:placeholder:text-gray-600 leading-relaxed"
        />
      </div>
    </div>
  );
}
