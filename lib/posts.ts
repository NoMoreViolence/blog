import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import trim from "lodash-es/trim";
import path from "path";

const POSTS_DIR = "./public";

export interface Post {
  date: Date;
  spoiler: string;
  slug: string;
  title: string;
  tags: string[];
}

/** One printed row of the ledger: a post with its position in time. */
export interface LedgerEntry {
  kind: "entry";
  /** 1-based chronological index, printed as 001, 002 … */
  no: number;
  slug: string;
  title: string;
  spoiler: string;
  tags: string[];
  /** yyyy-mm-dd, for <time dateTime> and ordering */
  iso: string;
  year: number;
  /** characters in the body, markdown syntax and URLs excluded */
  chars: number;
  /** running total of `chars` up to and including this entry */
  cumulative: number;
}

/** Calendar months with no entry, between two entries. */
export interface LedgerGap {
  kind: "gap";
  /** yyyy.mm of the first empty month */
  from: string;
  /** yyyy.mm of the last empty month */
  to: string;
  months: number;
}

export type LedgerItem = LedgerEntry | LedgerGap;

/** One sheet of the passbook: a calendar year, printed top to bottom. */
export interface LedgerPage {
  year: number;
  /** 1-based, oldest year first */
  pageNo: number;
  items: LedgerItem[];
  entryCount: number;
}

export interface Ledger {
  /** oldest first, the order the rows were printed */
  entries: LedgerEntry[];
  /** newest year first; each page keeps print order inside */
  pages: LedgerPage[];
}

export function refineTags(tags: unknown): string[] {
  if (typeof tags !== "string") {
    return [];
  }
  return tags
    .split(",")
    .map(trim)
    .filter((tag) => tag.length > 0);
}

function postFile(slug: string) {
  return path.join(POSTS_DIR, slug, "index.mdx");
}

function toText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Strips control characters some editors leave behind (backspace, group separator). */
function cleanContent(content: string) {
  return content.replaceAll("\b", "").replaceAll(String.fromCharCode(29), "");
}

/** Visible characters a reader actually reads: no whitespace, markup, or link targets. */
export function countChars(markdown: string): number {
  const text = markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[#>*_`~|\\-]/g, "")
    .replace(/\s+/g, "");
  return Array.from(text).length;
}

/** A post is a non-underscored folder in `public/` that holds an `index.mdx`. */
export async function getPostSlugs(): Promise<string[]> {
  const entries = await readdir(POSTS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .filter((slug) => existsSync(postFile(slug)));
}

export async function getPostSource(slug: string) {
  const file = await readFile(postFile(slug), "utf8");
  const { content, data } = matter(file);
  const post: Post = {
    slug,
    title: toText(data.title),
    spoiler: toText(data.spoiler),
    date: new Date(toText(data.date)),
    tags: refineTags(data.tags),
  };
  return { post, content: cleanContent(content) };
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function monthIndex(date: Date) {
  return date.getUTCFullYear() * 12 + date.getUTCMonth();
}

function monthLabel(index: number) {
  const year = Math.floor(index / 12);
  const month = (index % 12) + 1;
  return `${year}.${String(month).padStart(2, "0")}`;
}

export async function getLedger(): Promise<Ledger> {
  const slugs = await getPostSlugs();
  const sources = await Promise.all(slugs.map(getPostSource));
  const dated = sources
    .filter(({ post }) => !Number.isNaN(post.date.getTime()))
    .sort(
      (a, b) =>
        a.post.date.getTime() - b.post.date.getTime() ||
        a.post.slug.localeCompare(b.post.slug),
    );

  let cumulative = 0;
  const entries: LedgerEntry[] = dated.map(({ post, content }, i) => {
    const chars = countChars(content);
    cumulative += chars;
    return {
      kind: "entry",
      no: i + 1,
      slug: post.slug,
      title: post.title,
      spoiler: post.spoiler,
      tags: post.tags,
      iso: isoDate(post.date),
      year: post.date.getUTCFullYear(),
      chars,
      cumulative,
    };
  });

  const pagesByYear = new Map<number, LedgerItem[]>();
  entries.forEach((entry, i) => {
    const items = pagesByYear.get(entry.year) ?? [];
    const previous = entries[i - 1];
    if (previous) {
      const prevMonth = monthIndex(new Date(previous.iso));
      const thisMonth = monthIndex(new Date(entry.iso));
      const empty = thisMonth - prevMonth - 1;
      if (empty > 0) {
        items.push({
          kind: "gap",
          from: monthLabel(prevMonth + 1),
          to: monthLabel(thisMonth - 1),
          months: empty,
        });
      }
    }
    items.push(entry);
    pagesByYear.set(entry.year, items);
  });

  const years = [...pagesByYear.keys()].sort((a, b) => a - b);
  const pages: LedgerPage[] = years
    .map((year, i) => {
      const items = pagesByYear.get(year) ?? [];
      return {
        year,
        pageNo: i + 1,
        items,
        entryCount: items.filter((item) => item.kind === "entry").length,
      };
    })
    .reverse();

  return { entries, pages };
}

export async function getLedgerEntry(slug: string) {
  const { entries } = await getLedger();
  const index = entries.findIndex((entry) => entry.slug === slug);
  if (index < 0) {
    return { entry: undefined, prev: undefined, next: undefined };
  }
  return {
    entry: entries[index],
    prev: entries[index - 1],
    next: entries[index + 1],
  };
}
