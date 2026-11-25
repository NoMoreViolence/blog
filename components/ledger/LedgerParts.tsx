import DotNumerals from "@/components/DotNumerals";
import type { LedgerGap } from "@/lib/posts";

/** The column captions offset-printed on every sheet. Visual only. */
export function LedgerHead() {
  return (
    <div
      aria-hidden="true"
      className="ledger-grid hidden border-y border-ink py-2 text-xs text-ink-soft md:grid"
    >
      <span className="area-no">번호</span>
      <span className="area-date">일자</span>
      <span className="area-body">적요</span>
      <span className="area-tags">태그</span>
      <span className="area-chars text-right">글자</span>
      <span className="area-cum text-right">누적 글자</span>
    </div>
  );
}

/** Months with nothing printed still take a line: the silence is part of the record. */
export function LedgerGapRow({ gap }: { gap: LedgerGap }) {
  return (
    <li className="flex items-center gap-4 border-b border-rule py-5 font-ledger text-xs text-ink-soft">
      <span aria-hidden="true" className="rule-dotted flex-1" />
      <span>
        {gap.from} — {gap.to} · 무기록 {gap.months}개월
      </span>
      <span aria-hidden="true" className="rule-dotted flex-1" />
    </li>
  );
}

/** The head of a sheet: its year struck large, the only loud thing on the page. */
export function SheetHead({
  year,
  caption,
  as: Heading = "h2",
}: {
  year: number;
  caption: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="flex items-end justify-between gap-6 pb-4">
      <Heading className="text-numeral">
        <DotNumerals value={String(year)} className="h-12 md:h-20" />
      </Heading>
      <p className="font-ledger text-xs text-ink-soft">{caption}</p>
    </div>
  );
}
