import Ledger, { type TagCount } from "@/app/blog/Ledger";
import { getLedger } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "기록 — NoMoreViolence",
  description: "이지훈이 날짜 순으로 쌓아 온 기록",
};

export default async function BlogPage() {
  const { entries, pages } = await getLedger();

  const counts = new Map<string, number>();
  entries.forEach((entry) =>
    entry.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)),
  );
  const tags: TagCount[] = [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ko"));

  return (
    <>
      <h1 className="sr-only">기록</h1>
      <Ledger
        pages={pages}
        tags={tags}
        total={entries.length}
        newestIso={entries.at(-1)?.iso}
      />
    </>
  );
}
