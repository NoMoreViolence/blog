import "./markdown.css";

import PostTag from "@/app/blog/[slug]/PostTag";
import Link from "@/components/Link";
import { LedgerHead } from "@/components/ledger/LedgerParts";
import { entryAnchor } from "@/components/ledger/LedgerRow";
import { ledgerCount, ledgerDate, ledgerNo } from "@/lib/format";
import {
  getLedgerEntry,
  getPostSlugs,
  getPostSource,
  type LedgerEntry,
} from "@/lib/posts";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import remarkSmartpants from "remark-smartypants";

/** The ledger line this post was printed on, repeated as the sheet's running head. */
function RunningHead({ entry }: { entry: LedgerEntry }) {
  return (
    <div className="mt-12">
      <LedgerHead />
      <div className="ledger-grid items-baseline border-b border-rule py-3 font-ledger text-xs">
        <span className="area-no text-ink-soft">{ledgerNo(entry.no)}</span>
        <span className="area-date">
          <time dateTime={entry.iso}>{ledgerDate(entry.iso)}</time>
        </span>
        <span className="area-body">
          <NextLink
            href={`/blog#${entryAnchor(entry.no)}`}
            className="font-sans text-sm text-ink-soft underline decoration-rule underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-ink"
          >
            장부에서 보기
          </NextLink>
        </span>
        <span className="area-tags font-sans text-sm text-ink-soft">
          {entry.tags.join(" · ")}
        </span>
        <span className="area-chars text-right">
          {ledgerCount(entry.chars)}
          <span className="md:sr-only">자</span>
        </span>
        <span className="area-cum text-right text-ink-blue">
          <span className="md:sr-only">누적 </span>
          {ledgerCount(entry.cumulative)}
          <span className="md:sr-only">자</span>
        </span>
      </div>
    </div>
  );
}

function CrossRef({
  label,
  entry,
}: {
  label: "이전" | "다음";
  entry?: LedgerEntry;
}) {
  if (!entry) {
    return (
      <p className="flex items-baseline gap-4 py-4 font-ledger text-xs text-ink-soft">
        <span>{label} 기록</span>
        <span>없음</span>
      </p>
    );
  }
  return (
    <NextLink
      href={`/blog/${entry.slug}`}
      rel={label === "이전" ? "prev" : "next"}
      className="-mx-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 px-3 py-4 transition-colors duration-150 hover:bg-sheet-deep active:bg-rule"
    >
      <span className="font-ledger text-xs text-ink-soft">{label} 기록</span>
      <span className="font-ledger text-xs">
        {ledgerNo(entry.no)} · {ledgerDate(entry.iso)}
      </span>
      <span className="text-lg font-bold tracking-tight">{entry.title}</span>
    </NextLink>
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { entry, prev, next } = await getLedgerEntry(slug);
  if (!entry) {
    notFound();
  }
  const { content } = await getPostSource(slug);

  return (
    <article>
      <RunningHead entry={entry} />

      <div className="ledger-grid">
        <header className="ledger-column mt-12 max-w-2xl md:mt-16">
          <h1 className="text-4xl font-black tracking-tight text-balance md:text-5xl">
            {entry.title}
          </h1>
          {entry.spoiler && (
            <p className="mt-5 text-lg text-ink-soft text-pretty">
              {entry.spoiler}
            </p>
          )}
        </header>

        <div className="markdown ledger-column mt-12 max-w-2xl">
          <MDXRemote
            source={content}
            components={{
              a: Link,
            }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkSmartpants],
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: { light: "github-light", dark: "github-dark" },
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>

        <footer className="ledger-column mt-14 max-w-2xl">
          {entry.tags.length > 0 && (
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {entry.tags.map((tag) => (
                <li key={tag}>
                  <PostTag tag={tag} />
                </li>
              ))}
            </ul>
          )}
          <nav aria-label="이어지는 기록" className="mt-10 border-t-4 border-double border-ink">
            <CrossRef label="이전" entry={prev} />
            <div className="border-t border-rule" />
            <CrossRef label="다음" entry={next} />
          </nav>
        </footer>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { entry } = await getLedgerEntry(slug);
  if (!entry) {
    return {};
  }
  return {
    title: entry.title + " — Jihoon Lee",
    description: entry.spoiler,
    alternates: { types: {} },
  };
}
