import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  /** Omit on the current page — it renders as plain text, not a link. */
  href?: string;
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.com";

/** BreadcrumbList JSON-LD for the same trail a <Breadcrumbs> renders. */
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  // Google rejects a ListItem without `item` anywhere but the last position,
  // so an unlinked middle crumb (a City Guide category, say) is left out of
  // the markup while still showing in the visible trail.
  const linked = items.filter((item, index) => item.href || index === items.length - 1);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: linked.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${BASE}${item.href}` } : {}),
    })),
  };
}

export default function Breadcrumbs({ items, className = "" }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      {items.map((item, index) => (
        <span key={item.label}>
          {item.href ? (
            <Link href={item.href} className="hover:text-brand dark:hover:text-yellow-400">{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
          {index < items.length - 1 && <span aria-hidden="true" className="mx-1.5">/</span>}
        </span>
      ))}
    </nav>
  );
}
