"use client";

import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "소개", match: (path: string) => path === "/" },
  {
    href: "/blog",
    label: "기록",
    match: (path: string) => path.startsWith("/blog"),
  },
];

export default function MastheadNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="주요 메뉴" className="flex gap-6 text-base font-medium">
      {ITEMS.map((item) => {
        const current = item.match(pathname);
        return (
          <NextLink
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className={clsx(
              "border-b-2 pb-0.5 transition-colors duration-150",
              current
                ? "border-ink text-ink"
                : "border-transparent text-ink-soft hover:text-ink",
            )}
          >
            {item.label}
          </NextLink>
        );
      })}
    </nav>
  );
}
