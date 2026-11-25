import Link from "@/components/Link";

const CONTACTS = [
  { href: "mailto:ljh86029926@gmail.com", label: "ljh86029926@gmail.com" },
  { href: "https://www.linkedin.com/in/ljh000323/", label: "LinkedIn" },
  { href: "https://github.com/NoMoreViolence", label: "GitHub" },
];

/** The back cover's small print, on the same ledger tracks as every row. */
export default function SiteFooter({
  firstYear,
  lastYear,
}: {
  firstYear?: number;
  lastYear?: number;
}) {
  return (
    <footer className="ledger-grid mt-24 items-baseline border-t-4 border-double border-ink pt-5 pb-12">
      <span className="area-no text-sm text-ink-soft">문의</span>
      <ul className="area-body flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {CONTACTS.map((contact) => (
          <li key={contact.href}>
            <Link
              href={contact.href}
              className="text-ink underline decoration-rule decoration-1 underline-offset-4 transition-colors duration-150 hover:decoration-ink"
            >
              {contact.label}
            </Link>
          </li>
        ))}
      </ul>
      {firstYear && lastYear && (
        <p className="area-tail font-ledger text-xs text-ink-soft">
          NoMoreViolence {firstYear}—{lastYear}
        </p>
      )}
    </footer>
  );
}
