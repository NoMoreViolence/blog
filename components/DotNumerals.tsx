import clsx from "clsx";

/**
 * Digits struck by a 5×7 dot-matrix print head: round pins, not square pixels.
 * Height comes from the className (e.g. `h-20`); colour from `currentColor`.
 */
const GLYPHS: Record<string, string[]> = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
};

const COLS = 5;
const ROWS = 7;
const PITCH = COLS + 1;

export default function DotNumerals({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const digits = Array.from(value).filter((char) => char in GLYPHS);
  const width = digits.length * PITCH - 1;

  return (
    <span className={clsx("inline-block", className)}>
      <span className="sr-only">{value}</span>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${width} ${ROWS}`}
        className="h-full w-auto"
        fill="currentColor"
      >
        {digits.map((digit, d) =>
          GLYPHS[digit].flatMap((row, y) =>
            Array.from(row).map((pin, x) =>
              pin === "1" ? (
                <circle
                  key={`${d}-${x}-${y}`}
                  cx={d * PITCH + x + 0.5}
                  cy={y + 0.5}
                  r={0.4}
                />
              ) : null,
            ),
          ),
        )}
      </svg>
    </span>
  );
}
