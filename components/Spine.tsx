import DotNumerals from "@/components/DotNumerals";

/**
 * The passbook cover seen edge-on. Decorative: the wordmark is repeated as
 * a real link in the masthead, so the spine stays out of the reading order.
 */
export default function Spine({ since }: { since: number }) {
  return (
    <div aria-hidden="true" className="bg-guilloche-cover text-foil">
      <div className="h-3 lg:hidden" />
      <div className="sticky top-0 hidden h-dvh flex-col items-center justify-between py-10 lg:flex">
        <span className="font-ledger text-xs">No.1</span>
        <span className="writing-vertical text-xl font-black tracking-widest">
          NoMoreViolence
        </span>
        <DotNumerals value={String(since)} className="h-3" />
      </div>
    </div>
  );
}
