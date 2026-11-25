import clsx from "clsx";
import Link from "./Link";

/** The NoMoreViolence wordmark, always a way back to the first sheet. */
export default function HomeLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={clsx(
        "font-black tracking-tight text-ink transition-opacity duration-150 hover:opacity-70 active:opacity-50",
        className,
      )}
    >
      NoMoreViolence
    </Link>
  );
}
