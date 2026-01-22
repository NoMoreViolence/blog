import clsx from "clsx";
import Link from "./Link";

export default function HomeLink() {
  return (
    <Link
      href="/"
      className={clsx(
        "inline-block text-2xl font-black text-charcoal-grey",
        "transition-all duration-100 ease-in-out scale-100 hover:scale-105 active:scale-95",
      )}
    >
      NoMoreViolence
    </Link>
  );
}
