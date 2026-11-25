import HomeLink from "@/components/HomeLink";
import MastheadNav from "@/components/MastheadNav";
import Seal from "@/components/Seal";
import { ledgerDate } from "@/lib/format";

/** The holder's block printed at the top of every sheet. */
export default function Masthead({ openedIso }: { openedIso?: string }) {
  return (
    <header className="relative border-b-4 border-double border-ink pb-4">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <div className="flex items-baseline gap-2.5">
            <dt className="text-sm text-ink-soft">기록주</dt>
            <dd>
              <HomeLink className="text-2xl" />
            </dd>
          </div>
          <div className="flex items-baseline gap-2.5">
            <dt className="text-sm text-ink-soft">작성</dt>
            <dd className="text-lg font-bold">이지훈</dd>
          </div>
          {openedIso && (
            <div className="flex items-baseline gap-2.5">
              <dt className="text-sm text-ink-soft">개설일</dt>
              <dd className="font-ledger text-xs">
                <time dateTime={openedIso}>{ledgerDate(openedIso)}</time>
              </dd>
            </div>
          )}
        </dl>
        <MastheadNav />
      </div>
      <Seal className="pointer-events-none absolute right-0 bottom-2 size-12 opacity-80 sm:-top-3 sm:right-32 sm:bottom-auto sm:size-16" />
    </header>
  );
}
