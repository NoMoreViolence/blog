import clsx from "clsx";
import NextLink from "next/link";

import { ledgerCount, ledgerMonthDay, ledgerNo } from "@/lib/format";
import type { LedgerEntry } from "@/lib/posts";

export function entryAnchor(no: number) {
  return `no-${ledgerNo(no)}`;
}

/** One machine-printed line. The whole line is the way into the post. */
export default function LedgerRow({
  entry,
  newest = false,
  children,
}: {
  entry: LedgerEntry;
  newest?: boolean;
  /** overlays that sit on the row's top rule (the 정리 bookmark) */
  children?: React.ReactNode;
}) {
  return (
    <li
      id={entryAnchor(entry.no)}
      className="relative scroll-mt-24 border-b border-rule"
    >
      {children}
      <NextLink
        href={`/blog/${entry.slug}`}
        className="ledger-grid -mx-3 items-baseline px-3 py-5 transition-colors duration-150 hover:bg-sheet-deep active:bg-rule"
      >
        <span className="area-no font-ledger text-xs text-ink-soft">
          {ledgerNo(entry.no)}
        </span>
        <time
          dateTime={entry.iso}
          className={clsx(
            "area-date font-ledger text-2xl leading-none",
            newest && "overprint",
          )}
        >
          {ledgerMonthDay(entry.iso)}
        </time>
        <span className="area-body">
          <strong
            className={clsx(
              "block text-xl font-bold tracking-tight text-balance md:text-2xl",
              newest && "overprint",
            )}
          >
            {entry.title}
          </strong>
          {entry.spoiler && (
            <span className="mt-1.5 block text-base text-ink-soft text-pretty">
              {entry.spoiler}
            </span>
          )}
        </span>
        <span className="area-tags text-sm text-ink-soft">
          {entry.tags.join(" · ")}
        </span>
        <span className="area-chars text-right font-ledger text-xs">
          {ledgerCount(entry.chars)}
          <span className="md:sr-only">자</span>
        </span>
        <span className="area-cum text-right font-ledger text-xs text-ink-blue">
          <span className="md:sr-only">누적 </span>
          {ledgerCount(entry.cumulative)}
          <span className="md:sr-only">자</span>
        </span>
      </NextLink>
    </li>
  );
}
