import NextLink from "next/link";

/**
 * Internal paths go through next/link; anything with a scheme opens in a new
 * tab, except mailto/tel which hand off to the OS.
 */
export default function Link({
  href = "",
  children,
  ...rest
}: React.ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("?")) {
    return (
      <NextLink href={href} {...rest}>
        {children}
      </NextLink>
    );
  }

  const handsOff = href.startsWith("mailto:") || href.startsWith("tel:");
  const isAnchor = href.startsWith("#");

  return (
    <a
      href={href}
      {...(handsOff || isAnchor
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" })}
      {...rest}
    >
      {children}
    </a>
  );
}
