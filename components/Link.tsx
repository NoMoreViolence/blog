"use client";

import clsx from "clsx";
import NextLink, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

function isModifiedEvent(
  event: Parameters<NonNullable<LinkProps["onClick"]>>[0]
) {
  const eventTarget = event.currentTarget;
  const target = eventTarget.getAttribute("target");
  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    (event.nativeEvent && event.nativeEvent.which === 2)
  );
}

export default function Link({
  className,
  children,
  style,
  href,
  target,
  ...rest
}: React.JSX.IntrinsicElements["a"]) {
  const router = useRouter();

  if (!target && !href?.startsWith("/")) {
    target = "_blank";
  }

  return (
    <NextLink
      {...rest}
      target={target}
      href={href ?? ""}
      onClick={(e) => {
        if (!isModifiedEvent(e)) {
          e.preventDefault();
          router.push(e.currentTarget.href);
        }
      }}
      className={className}
    >
      {children}
    </NextLink>
  );
}
