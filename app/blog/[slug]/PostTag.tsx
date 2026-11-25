import NextLink from "next/link";

export default function PostTag({ tag }: { tag: string }) {
  return (
    <NextLink
      href={`/blog?tag=${encodeURIComponent(tag)}`}
      className="text-ink-soft underline decoration-rule underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-ink"
    >
      #{tag}
    </NextLink>
  );
}
