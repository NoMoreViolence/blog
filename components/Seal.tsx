import clsx from "clsx";

/** The account holder's 인감: a round name seal, stamped slightly crooked. */
export default function Seal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={clsx("-rotate-8 text-seal mix-blend-multiply dark:mix-blend-normal", className)}
    >
      <circle
        cx="32"
        cy="32"
        r="29"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle
        cx="32"
        cy="32"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <text
        x="32"
        fill="currentColor"
        textAnchor="middle"
        fontWeight="900"
        fontSize="13"
      >
        <tspan x="32" y="22">
          이
        </tspan>
        <tspan x="32" y="36.5">
          지
        </tspan>
        <tspan x="32" y="51">
          훈
        </tspan>
      </text>
    </svg>
  );
}
