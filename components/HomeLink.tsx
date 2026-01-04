import { CSSProperties } from "react";
import Link from "./Link";

export default function HomeLink() {
  return (
    <Link
      href="/"
      className="inline-block text-2xl font-black hover:scale-[1.02]"
    >
      <span
        style={
          {
            "--dynamic-color-1": "var(--charcoal-grey)",
            "--dynamic-color-2": "var(--charcoal-grey)",
            backgroundImage:
              "linear-gradient(45deg, var(--dynamic-color-1), var(--dynamic-color-2))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            transition:
              "--dynamic-color-1 0.2s ease-out, --dynamic-color-2 0.2s ease-in-out",
          } as CSSProperties
        }
      >
        NoMoreViolence
      </span>
    </Link>
  );
}
