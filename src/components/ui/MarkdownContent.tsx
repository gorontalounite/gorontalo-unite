"use client";

import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = "" }: Props) {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3 leading-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-5 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
          ),
          del: ({ children }) => (
            <del className="line-through text-gray-400">{children}</del>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1.5 mb-4 text-gray-700 dark:text-gray-300 pl-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1.5 mb-4 text-gray-700 dark:text-gray-300 pl-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#2D7D46] dark:border-emerald-500 pl-4 italic text-gray-500 dark:text-gray-400 my-4">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <pre className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 overflow-x-auto my-4">
                  <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                    {children}
                  </code>
                </pre>
              );
            }
            return (
              <code className="bg-gray-100 dark:bg-zinc-800 text-[#2D7D46] dark:text-emerald-400 text-sm font-mono px-1.5 py-0.5 rounded-md">
                {children}
              </code>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D7D46] dark:text-emerald-400 underline underline-offset-2 hover:text-[#1f5a33] dark:hover:text-emerald-300 transition-colors"
            >
              {children}
            </a>
          ),
          hr: () => (
            <hr className="border-gray-200 dark:border-zinc-700 my-6" />
          ),
          img: ({ src, alt }) => (
            src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt ?? ""}
                className="rounded-xl w-full object-cover my-4 border border-gray-100 dark:border-zinc-800"
                loading="lazy"
              />
            ) : null
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
