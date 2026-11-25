"use client";

import clsx from "clsx";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";

import Bookmark, { usePrintedThrough } from "@/components/ledger/Bookmark";
import {
  LedgerGapRow,
  LedgerHead,
  SheetHead,
} from "@/components/ledger/LedgerParts";
import LedgerRow from "@/components/ledger/LedgerRow";
import type { LedgerItem, LedgerPage } from "@/lib/posts";

export interface TagCount {
  tag: string;
  count: number;
}

function TagFilter({
  tags,
  total,
  selected,
}: {
  tags: TagCount[];
  total: number;
  selected: string | null;
}) {
  const options: { tag: string | null; label: string; count: number }[] = [
    { tag: null, label: "전체", count: total },
    ...tags.map(({ tag, count }) => ({ tag, label: tag, count })),
  ];

  return (
    <nav aria-label="태그로 거르기" className="mt-6 md:mt-8">
      <ul className="flex flex-wrap gap-x-1.5 gap-y-2 text-sm">
        {options.map((option) => {
          const current = option.tag === selected;
          return (
            <li key={option.label}>
              <NextLink
                href={option.tag ? `?tag=${encodeURIComponent(option.tag)}` : "/blog"}
                scroll={false}
                aria-current={current ? "true" : undefined}
                className={clsx(
                  "inline-flex items-baseline gap-1.5 border px-2.5 py-1 transition-colors duration-150",
                  current
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-soft hover:text-ink",
                )}
              >
                {option.label}
                <span className="font-ledger text-xs">{option.count}</span>
              </NextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Ledger({
  pages,
  tags,
  total,
  newestIso,
}: {
  pages: LedgerPage[];
  tags: TagCount[];
  total: number;
  newestIso?: string;
}) {
  const selected = useSearchParams().get("tag");
  const printedThrough = usePrintedThrough(newestIso);

  const visible = pages
    .map((page) => {
      const items: LedgerItem[] = selected
        ? page.items.filter(
            (item) => item.kind === "entry" && item.tags.includes(selected),
          )
        : page.items;
      const entryCount = items.filter((item) => item.kind === "entry").length;
      return { ...page, items, entryCount };
    })
    .filter((page) => page.entryCount > 0);

  // Oldest first, the bookmark sits above the first row printed since last time.
  const firstUnseen = printedThrough
    ? visible
        .slice()
        .reverse()
        .flatMap((page) => page.items)
        .find((item) => item.kind === "entry" && item.iso > printedThrough)
    : undefined;
  const newestNo = visible[0]?.items.findLast((item) => item.kind === "entry");

  return (
    <>
      <TagFilter tags={tags} total={total} selected={selected} />

      {visible.length === 0 && (
        <p className="mt-16 font-ledger text-xs text-ink-soft">
          조회되지 않는 기록입니다
        </p>
      )}

      {visible.map((page) => (
        <section key={page.year} className="mt-10 md:mt-14">
          <SheetHead
            year={page.year}
            caption={`제 ${page.pageNo} 면 · ${page.entryCount}건`}
          />
          <LedgerHead />
          <ol>
            {page.items.map((item) =>
              item.kind === "gap" ? (
                <LedgerGapRow key={`gap-${item.from}`} gap={item} />
              ) : (
                <LedgerRow
                  key={item.slug}
                  entry={item}
                  newest={item === newestNo}
                >
                  {item === firstUnseen && <Bookmark />}
                </LedgerRow>
              ),
            )}
          </ol>
        </section>
      ))}
    </>
  );
}
